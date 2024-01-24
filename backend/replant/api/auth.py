from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.db import transaction
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, serializers, status

from replant.models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "phone_number", "country", "password")
        extra_kwargs = {
            "password": {"write_only": True},
            "country": {"required": True, "allow_null": False},
        }

    def validate(self, attrs):
        # UserAttributeSimilarityValidator requires user object to validate password
        user = User(**attrs)
        password = attrs["password"]

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({"password": e.messages})

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            phone_number=validated_data["phone_number"],
            country=validated_data["country"],
            password=validated_data["password"],
        )


@extend_schema_view(
    post=extend_schema(
        responses={
            status.HTTP_201_CREATED: RegisterSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiTypes.OBJECT,
        }
    )
)
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
