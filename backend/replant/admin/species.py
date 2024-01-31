from django.contrib import admin

from replant.models import Species

from .admin_site import custom_admin_site
from .utils import TrackableModelAdmin


@admin.register(Species, site=custom_admin_site)
class SpeciesAdmin(TrackableModelAdmin):
    list_display = (
        "common_name",
        "botanical_name",
    )
    ordering = ("common_name",)

    search_fields = ("common_name", "botanical_name")
    fields = (
        "common_name",
        "botanical_name",
        "created_at",
        "updated_at",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
    )
