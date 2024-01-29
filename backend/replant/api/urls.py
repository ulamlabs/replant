from django.urls import path
from rest_framework import routers

from .country import CountryView
from .register import RegisterView
from .register_to_organization import RegisterToOrganizationView
from .status import StatusView

router = routers.SimpleRouter()

urlpatterns = [
    path("status", StatusView.as_view()),
    path("auth/register", RegisterView.as_view()),
    path(
        "auth/register-to-organization/<uuid:code>",
        RegisterToOrganizationView.as_view(),
    ),
    path("countries", CountryView.as_view()),
    *router.urls,
]
