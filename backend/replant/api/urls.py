from django.urls import path
from rest_framework import routers

from .assigned_species import AssignedSpeciesView
from .auth_login import LoginView
from .auth_logout import LogoutView
from .auth_register import RegisterView
from .auth_register_to_organization import RegisterToOrganizationView
from .country import CountryView
from .status import StatusView
from .tree import TreeView
from .tree_summary import TreeSummaryView
from .user import UserView

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
    path("trees", TreeView.as_view()),
    path("trees/summary", TreeSummaryView.as_view()),
    path("status", StatusView.as_view()),
    path("user", UserView.as_view()),
    *router.urls,
]
