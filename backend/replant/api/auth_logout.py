from django.contrib import auth
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from . import utils


@extend_schema_view(
    post=extend_schema(
        request=None,
        responses={
            status.HTTP_204_NO_CONTENT: None,
            **utils.AUTH_REQUIRED_RESPONSES,
        },
    )
)
class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, *args, **kwargs) -> Response:
        auth.logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)
