from django.contrib import auth
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, serializers, status
from rest_framework.request import Request
from rest_framework.response import Response


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        request = self.context["request"]
        username = attrs["username"]
        password = attrs["password"]

        user = auth.authenticate(request, username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Incorrect username or password.")

        attrs["user"] = user
        return attrs


@extend_schema_view(
    post=extend_schema(
        responses={
            status.HTTP_200_OK: LoginSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiTypes.OBJECT,
        }
    )
)
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        auth.login(request, user)
        return Response(serializer.data)
