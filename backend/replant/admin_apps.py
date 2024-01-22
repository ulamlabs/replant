from django.contrib.admin import apps


class CustomAdminConfig(apps.AdminConfig):
    default_site = "replant.admin.CustomAdminSite"
