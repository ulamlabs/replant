from django.contrib import admin
from django.http import HttpRequest

from replant.models import Sponsor

from .utils import TrackableModelAdmin


@admin.register(Sponsor)
class SponsorAdmin(TrackableModelAdmin):
    list_display = (
        "name",
        "type",
        "wallet_address",
        "contact_person_email",
        "nft_ordered",
        "created_at",
    )
    search_fields = (
        "name",
        "wallet_address",
        "contact_person_email",
    )
    ordering = ("name",)
    list_filter = ("type",)

    fields = (
        "type",
        "name",
        "wallet_address",
        "contact_person_full_name",
        "contact_person_email",
        "nft_ordered",
        "created_at",
        "updated_at",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
    )

    def has_delete_permission(
        self, request: HttpRequest, obj: Sponsor | None = None
    ) -> bool:
        return False
