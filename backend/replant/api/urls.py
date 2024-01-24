from django.urls import path
from rest_framework import routers

from .auth import RegisterView
from .country import CountryView
from .status import StatusView

router = routers.SimpleRouter()

urlpatterns = [
    path("status", StatusView.as_view()),
    path("auth/register", RegisterView.as_view()),
    path("countries", CountryView.as_view()),
    *router.urls,
]
