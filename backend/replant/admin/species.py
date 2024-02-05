from django.contrib import admin

from replant.models import Species

from .utils import TrackableModelAdmin


@admin.register(Species)
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
