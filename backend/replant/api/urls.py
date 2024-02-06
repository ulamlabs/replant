from django.urls import path
from rest_framework import routers

from .assigned_species import AssignedSpeciesView
from .auth_login import LoginView
from .auth_logout import LogoutView
from .auth_register import RegisterView
from .auth_register_to_organization import RegisterToOrganizationView
from .country import CountryView
from .plant import PlantView
from .status import StatusView

router = routers.SimpleRouter()

urlpatterns = [
    path("assigned-species", AssignedSpeciesView.as_view()),
    path("auth/login", LoginView.as_view()),
    path("auth/logout", LogoutView.as_view()),
    path("auth/register", RegisterView.as_view()),
    path(
        "auth/register-to-organization/<uuid:code>",
        RegisterToOrganizationView.as_view(),
    ),
    path("countries", CountryView.as_view()),
    path("plants", PlantView.as_view()),
    path("status", StatusView.as_view()),
    *router.urls,
]
