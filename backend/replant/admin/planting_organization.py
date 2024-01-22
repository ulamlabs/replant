from django.contrib import admin
from django.http.request import HttpRequest

from replant.models import PlantingOrganization

from .admin_site import custom_admin_site


@admin.register(PlantingOrganization, site=custom_admin_site)
class PLantingOrganizationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "contact_person_email",
        "created_at",
    )
    search_fields = (
        "name",
        "contact_person_email",
    )
    filter_horizontal = ("countries",)
    readonly_fields = (
        "created_at",
        "created_by",
        "updated_at",
        "updated_by",
    )

    def has_delete_permission(
        self, request: HttpRequest, obj: PlantingOrganization | None = None
    ) -> bool:
        return False

    def save_model(self, request, obj, form, change):
        if obj.id is None:
            obj.created_by = request.user
        obj.updated_by = request.user
        obj.save()
