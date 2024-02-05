from django.contrib.admin import AdminSite


class CustomAdminSite(AdminSite):
    # Disable View on Site link on admin page
    site_url = ""


custom_admin_site = CustomAdminSite()
