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

from replant.models import PlantingOrganization, Sponsor, Tree

from .utils import TrackableModelAdmin


class SponsorNeedingTreesFilter(admin.SimpleListFilter):
    title = "need trees assignment"

    parameter_name = "need_trees_assignment"

    def lookups(self, request, model_admin):
        return [
            ("yes", "Yes"),
            ("no", "No"),
        ]

    def queryset(self, request, queryset):
        if self.value() == "yes":
            return queryset.filter(
                assigned_trees__lt=models.F("nft_ordered"),
            )
        elif self.value() == "no":
            return queryset.exclude(
                assigned_trees__lt=models.F("nft_ordered"),
            )


class AssignTreesForm(forms.Form):
    organization = forms.ModelChoiceField(
        queryset=PlantingOrganization.objects.all(),
        widget=AutocompleteSelect(
            Tree._meta.get_field("planting_organization"), admin.site  # type:ignore
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
        "assigned_trees",
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
        SponsorNeedingTreesFilter,
    )

    fields = (
        "type",
        "name",
        "wallet_address",
        "contact_person_full_name",
        "contact_person_email",
        "nft_ordered",
        "assigned_trees",
        "created_at",
        "updated_at",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
        "assigned_trees",
    )

    actions = ("assign_trees",)

    def has_delete_permission(
        self, request: HttpRequest, obj: Sponsor | None = None
    ) -> bool:
        return False

    def get_urls(self) -> list[URLPattern]:
        urls = super().get_urls()
        model_info = self.opts.app_label, self.opts.model_name
        my_urls = [
            path(
                "assign_trees/",
                self.admin_site.admin_view(self.assign_trees_view),
                name="%s_%s_assign_trees" % model_info,
            )
        ]
        return my_urls + urls

    @admin.action(description="Assign trees")
    def assign_trees(self, request: HttpRequest, queryset: models.QuerySet[Sponsor]):
        sponsor_ids = queryset.values_list("pk", flat=True)
        url = reverse("admin:replant_sponsor_assign_trees")
        return redirect(
            f"{url}?sponsor_ids={", ".join(str(_id) for _id in sponsor_ids)}"
        )

    @admin.options.csrf_protect_m
    def assign_trees_view(self, request: HttpRequest) -> HttpResponse:
        sponsor_ids = request.GET.get("sponsor_ids", "").split(",")
        sponsors: list[Sponsor] = list(self.model.objects.filter(id__in=sponsor_ids))
        trees_count = 0
        organization: PlantingOrganization | None = None
        trees_per_sponsor: dict[Sponsor, int] = {}

        if request.method == "POST":
            form = AssignTreesForm(request.POST)

            if form.is_valid():
                organization = form.cleaned_data["organization"]
                assert organization
                trees = Tree.objects.only_awaiting_sponsor().filter(
                    planting_organization=organization
                )
                trees_count = trees.count()
                trees_per_sponsor = simulate_trees_distribution(sponsors, trees_count)

                if form.data.get("step2"):
                    assign_trees(organization, trees_per_sponsor)
                    messages.success(
                        request, "Trees successfully assigned to sponsores."
                    )
                    return redirect("admin:replant_sponsor_changelist")
        else:
            form = AssignTreesForm()

        sponsor_dicts = [
            {
                "id": sponsor.id,
                "name": sponsor.name,
                "assigned_trees": sponsor.assigned_trees,
                "nft_ordered": sponsor.nft_ordered,
                "trees_to_assign": sponsor.trees_to_assign,
                "trees_given": trees_per_sponsor.get(sponsor),
            }
            for sponsor in sponsors
        ]

        total_assigned_trees = sum(trees_per_sponsor.values())

        return render(
            request,
            "admin/sponsor_assign_trees.html",
            {
                **self.admin_site.each_context(request),
                "title": "Assign trees",
                "sponsors": sponsor_dicts,
                "form": form,
                "trees_count": trees_count - total_assigned_trees,
                "total_assigned_trees": total_assigned_trees,
                "organization": organization,
                "action_label": (
                    "Assign trees" if organization else "Preview trees assignment"
                ),
            },
        )


def simulate_trees_distribution(
    sponsors: list[Sponsor], trees_count: int
) -> dict[Sponsor, int]:
    sponsors = [sponsor for sponsor in sponsors if sponsor.trees_to_assign > 0]
    if not sponsors:
        return {}

    trees_per_sponsor: dict[Sponsor, int] = defaultdict(int)
    sponsors_cycle = itertools.cycle(sponsors)

    for _ in range(trees_count):
        sponsor = next(sponsors_cycle)
        trees_per_sponsor[sponsor] += 1
        sponsor.assigned_trees += 1

        if sponsor.trees_to_assign <= 0:
            sponsors.remove(sponsor)
            if not sponsors:
                return trees_per_sponsor
            sponsors_cycle = itertools.cycle(sponsors)

    return trees_per_sponsor


@transaction.atomic
def assign_trees(
    organization: PlantingOrganization, trees_per_sponsor: dict[Sponsor, int]
):
    for sponsor, count in trees_per_sponsor.items():
        tree_ids = (
            Tree.objects.only_awaiting_sponsor()
            .filter(planting_organization=organization)[:count]
            .values_list("id", flat=True)
        )
        Tree.objects.only_awaiting_sponsor().filter(id__in=tree_ids).update(
            sponsor=sponsor
        )
        sponsor.save(update_fields=["assigned_trees"])
