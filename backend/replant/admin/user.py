from django.contrib import admin
from django.http.request import HttpRequest

from replant.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "planting_organization",
        "date_joined",
    )
    search_fields = ("username", "planting_organization")
    fields = (
        "username",
        "phone_number",
        "planting_organization",
        "country",
        "date_joined",
        "last_login",
    )
    readonly_fields = (
        "username",
        "phone_number",
        "date_joined",
        "last_login",
    )

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False

    def has_delete_permission(
        self, request: HttpRequest, obj: User | None = None
    ) -> bool:
        return False

    def get_form(self, *args, **kwargs):
        kwargs.update({"help_texts": {"username": None}})
        return super().get_form(*args, **kwargs)
