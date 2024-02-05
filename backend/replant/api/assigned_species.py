from typing import cast

from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated

from replant.models import AssignedSpecies, Species, User

from .utils import AUTH_REQUIRED_RESPONSES


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = (
            "common_name",
            "botanical_name",
        )


class AssignedSpeciesSerializer(serializers.ModelSerializer):
    species = SpeciesSerializer()

    class Meta:
        model = AssignedSpecies
        fields = (
            "id",
            "species",
        )


@extend_schema_view(
    get=extend_schema(
        responses={
            status.HTTP_200_OK: AssignedSpeciesSerializer,
            **AUTH_REQUIRED_RESPONSES,
        }
    )
)
class AssignedSpeciesView(generics.ListAPIView):
    serializer_class = AssignedSpeciesSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        user = cast(User, self.request.user)
        return (
            AssignedSpecies.objects.filter(
                planting_organization=user.planting_organization,
                country=user.country,
            )
            .select_related("species")
            .order_by("species__common_name")
        )
