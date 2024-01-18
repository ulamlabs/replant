from django.contrib import admin

from replant.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    fields = ["username"]
