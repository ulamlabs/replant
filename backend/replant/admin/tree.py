from admin_auto_filters.filters import AutocompleteFilterFactory
from django.contrib import admin
from django.http.request import HttpRequest
from django.utils.html import format_html

from replant.models import Tree

from .utils import TrackableModelAdmin


@admin.register(Tree)
class TreeAdmin(TrackableModelAdmin):
    list_display = (
        "id",
        "species",
        "review_state",
        "sponsor",
        "created_by",
        "created_at",
    )

    fields = (
        "id",
        "review_state",
        "rejection_reason",
        "image_tag",
        "image",
        "latitude",
        "longitude",
        "planting_organization",
        "country",
        "species",
        "is_native",
        "planting_cost_usd",
        "sponsor",
        "created_by",
        "created_at",
    )

    list_filter = [
        AutocompleteFilterFactory(title="Sponsor", base_parameter_name="sponsor"),
        "review_state",
    ]

    def image_tag(self, obj: Tree):
        return format_html(
            '<img style="max-height: 600px; max-width: 100vw; object-fit: contain;" src="{}" />'.format(
                obj.image.url
            )
        )

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

    def has_change_permission(
        self, request: HttpRequest, obj: Tree | None = None
    ) -> bool:
        return False

    def has_delete_permission(
        self, request: HttpRequest, obj: Tree | None = None
    ) -> bool:
        return False
