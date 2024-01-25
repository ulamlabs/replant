from django.db import transaction
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, serializers, status

from replant.models import Country, Passcode, PlantingOrganization, User

from . import utils


class RegisterToOrganizationSerializer(serializers.ModelSerializer):
    code = serializers.UUIDField(write_only=True)

    class Meta:
        model = User
        fields = ("code", "username", "phone_number", "country", "password")
        extra_kwargs = {
            "password": {"write_only": True},
            "country": {"required": True, "allow_null": False},
        }

    def _validate_passcode(self, code: str) -> Passcode:
        passcode = Passcode.objects.filter(code=code).first()
        if passcode is None:
            raise serializers.ValidationError({"code": ["Invalid code."]})

        if not passcode.is_valid:
            raise serializers.ValidationError({"code": ["Code has expired."]})

        return passcode

    def _validate_country(
        self, planting_organization: PlantingOrganization, country: Country
    ):
        if country not in planting_organization.countries.all():
            raise serializers.ValidationError(
                {"country": ["Only organization's countries can be selected."]}
            )

    def validate(self, attrs):
        code = attrs["code"]
        username = attrs["username"]
        password = attrs["password"]
        country = attrs["country"]

        passcode = self._validate_passcode(code)
        planting_organization = passcode.planting_organization
        self._validate_country(planting_organization, country)

        # UserAttributeSimilarityValidator requires user object to validate password
        user = User(username=username)
        utils.validate_password_in_serializer(password, user)

        attrs["planting_organization"] = planting_organization
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        return User.objects.create_user(
            planting_organization=validated_data["planting_organization"],
            username=validated_data["username"],
            phone_number=validated_data["phone_number"],
            country=validated_data["country"],
            password=validated_data["password"],
        )


@extend_schema_view(
    post=extend_schema(
        responses={
            status.HTTP_201_CREATED: RegisterToOrganizationSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiTypes.OBJECT,
        }
    )
)
class RegisterToOrganizationView(generics.CreateAPIView):
    serializer_class = RegisterToOrganizationSerializer
