from rest_framework import serializers, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from replant.models import PlantingOrganization, User

from .country import CountrySerializer


class PlantingOrganizationSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlantingOrganization
        fields = ("name",)


class UserSerializer(serializers.ModelSerializer):
    country = CountrySerializer()
    planting_organization = PlantingOrganizationSimpleSerializer()

    class Meta:
        model = User
        fields = (
            "username",
            "phone_number",
            "country",
            "planting_organization",
        )


class UserView(views.APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
