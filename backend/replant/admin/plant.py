from django.contrib import admin
from django.http.request import HttpRequest
from django.utils.html import format_html

from replant.models import Plant

from .admin_site import custom_admin_site
from .utils import TrackableModelAdmin


@admin.register(Plant, site=custom_admin_site)
class PlantAdmin(TrackableModelAdmin):
    list_display = (
        "id",
        "species",
        "review_state",
        "created_by",
        "created_at",
    )

    fields = (
        "id",
        "review_state",
        "image_tag",
        "image",
        "latitude",
        "longitude",
        "planting_organization",
        "country",
        "species",
        "is_native",
        "planting_cost_usd",
        "created_by",
        "created_at",
    )

    def image_tag(self, obj: Plant):
        return format_html(
            '<img style="max-height: 600px; max-width: 100vw; object-fit: contain;" src="{}" />'.format(
                obj.image.url
            )
        )

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

    def has_change_permission(
        self, request: HttpRequest, obj: Plant | None = None
    ) -> bool:
        return False

    def has_delete_permission(
        self, request: HttpRequest, obj: Plant | None = None
    ) -> bool:
        return False
