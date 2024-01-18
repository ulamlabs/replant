from django.urls import path
from rest_framework import routers

from .status import StatusView

router = routers.SimpleRouter()

urlpatterns = [path("status", StatusView.as_view()), *router.urls]
