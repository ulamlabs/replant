import itertools
from collections import defaultdict

from django import forms
from django.contrib import admin, messages
from django.contrib.admin.widgets import AutocompleteSelect
from django.db import models, transaction
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.urls import URLPattern, path, reverse

from replant.models import Plant, PlantingOrganization, Sponsor

from .utils import TrackableModelAdmin


class SponsorNeedingPlantsFilter(admin.SimpleListFilter):
    title = "need plants assignment"

    parameter_name = "need_plants_assignment"

    def lookups(self, request, model_admin):
        return [
            ("yes", "Yes"),
            ("no", "No"),
        ]

    def queryset(self, request, queryset):
        if self.value() == "yes":
            return queryset.filter(
                assigned_plants__lt=models.F("nft_ordered"),
            )
        elif self.value() == "no":
            return queryset.exclude(
                assigned_plants__lt=models.F("nft_ordered"),
            )


class AssignPlantsForm(forms.Form):
    organization = forms.ModelChoiceField(
        queryset=PlantingOrganization.objects.all(),
        widget=AutocompleteSelect(
            Plant._meta.get_field("planting_organization"), admin.site  # type:ignore
        ),
    )


@admin.register(Sponsor)
class SponsorAdmin(TrackableModelAdmin):
    list_display = (
        "name",
        "type",
        "wallet_address",
        "contact_person_email",
        "nft_ordered",
        "assigned_plants",
        "created_at",
    )
    search_fields = (
        "name",
        "wallet_address",
        "contact_person_email",
    )
    ordering = ("name",)
    list_filter = (
        "type",
        SponsorNeedingPlantsFilter,
    )

    fields = (
        "type",
        "name",
        "wallet_address",
        "contact_person_full_name",
        "contact_person_email",
        "nft_ordered",
        "assigned_plants",
        "created_at",
        "updated_at",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
        "assigned_plants",
    )

    actions = ("assign_plants",)

    def has_delete_permission(
        self, request: HttpRequest, obj: Sponsor | None = None
    ) -> bool:
        return False

    def get_urls(self) -> list[URLPattern]:
        urls = super().get_urls()
        model_info = self.opts.app_label, self.opts.model_name
        my_urls = [
            path(
                "assign_plants/",
                self.admin_site.admin_view(self.assign_plants_view),
                name="%s_%s_assign_plants" % model_info,
            )
        ]
        return my_urls + urls

    @admin.action(description="Assign plants")
    def assign_plants(self, request: HttpRequest, queryset: models.QuerySet[Sponsor]):
        sponsor_ids = queryset.values_list("pk", flat=True)
        url = reverse("admin:replant_sponsor_assign_plants")
        return redirect(
            f"{url}?sponsor_ids={", ".join(str(_id) for _id in sponsor_ids)}"
        )

    @admin.options.csrf_protect_m
    def assign_plants_view(self, request: HttpRequest) -> HttpResponse:
        sponsor_ids = request.GET.get("sponsor_ids", "").split(",")
        sponsors: list[Sponsor] = list(self.model.objects.filter(id__in=sponsor_ids))
        plants_count = 0
        organization: PlantingOrganization | None = None
        plants_per_sponsor: dict[Sponsor, int] = {}

        if request.method == "POST":
            form = AssignPlantsForm(request.POST)

            if form.is_valid():
                organization = form.cleaned_data["organization"]
                assert organization
                plants = Plant.objects.only_awaiting_sponsor().filter(
                    planting_organization=organization
                )
                plants_count = plants.count()
                plants_per_sponsor = simulate_plants_distribution(
                    sponsors, plants_count
                )

                if form.data.get("step2"):
                    assign_plants(organization, plants_per_sponsor)
                    messages.success(
                        request, "Plants successfully assigned to sponsores."
                    )
                    return redirect("admin:replant_sponsor_changelist")
        else:
            form = AssignPlantsForm()

        sponsor_dicts = [
            {
                "id": sponsor.id,
                "name": sponsor.name,
                "assigned_plants": sponsor.assigned_plants,
                "nft_ordered": sponsor.nft_ordered,
                "plants_to_assign": sponsor.plants_to_assign,
                "plants_given": plants_per_sponsor.get(sponsor),
            }
            for sponsor in sponsors
        ]

        total_assigned_plants = sum(plants_per_sponsor.values())

        return render(
            request,
            "admin/sponsor_assign_plants.html",
            {
                **self.admin_site.each_context(request),
                "title": "Assign plants",
                "sponsors": sponsor_dicts,
                "form": form,
                "plants_count": plants_count - total_assigned_plants,
                "total_assigned_plants": total_assigned_plants,
                "organization": organization,
                "action_label": (
                    "Assign plants" if organization else "Preview plants assignment"
                ),
            },
        )


def simulate_plants_distribution(
    sponsors: list[Sponsor], plants_count: int
) -> dict[Sponsor, int]:
    sponsors = [sponsor for sponsor in sponsors if sponsor.plants_to_assign > 0]
    if not sponsors:
        return {}

    plants_per_sponsor: dict[Sponsor, int] = defaultdict(int)
    sponsors_cycle = itertools.cycle(sponsors)

    for _ in range(plants_count):
        sponsor = next(sponsors_cycle)
        plants_per_sponsor[sponsor] += 1
        sponsor.assigned_plants += 1

        if sponsor.plants_to_assign <= 0:
            sponsors.remove(sponsor)
            if not sponsors:
                return plants_per_sponsor
            sponsors_cycle = itertools.cycle(sponsors)

    return plants_per_sponsor


@transaction.atomic
def assign_plants(
    organization: PlantingOrganization, plants_per_sponsor: dict[Sponsor, int]
):
    for sponsor, count in plants_per_sponsor.items():
        plant_ids = (
            Plant.objects.only_awaiting_sponsor()
            .filter(planting_organization=organization)[:count]
            .values_list("id", flat=True)
        )
        Plant.objects.only_awaiting_sponsor().filter(id__in=plant_ids).update(
            sponsor=sponsor
        )
        sponsor.save(update_fields=["assigned_plants"])
