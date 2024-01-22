from django.contrib import admin
from django.http.request import HttpRequest

from replant.models import User

from .admin_site import custom_admin_site


@admin.register(User, site=custom_admin_site)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "date_joined",
    )
    search_fields = ("username",)
    fields = (
        "username",
        "date_joined",
        "last_login",
    )
    readonly_fields = (
        "username",
        "date_joined",
        "last_login",
    )

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

    def has_change_permission(
        self, request: HttpRequest, obj: User | None = None
    ) -> bool:
        return False

    def has_delete_permission(
        self, request: HttpRequest, obj: User | None = None
    ) -> bool:
        return False

    def get_form(self, *args, **kwargs):
        kwargs.update({"help_texts": {"username": None}})
        return super().get_form(*args, **kwargs)
