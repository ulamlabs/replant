from typing import cast

from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated

from replant.models import AssignedSpecies, Species, User
from replant.permissions import IsPlanter


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


class AssignedSpeciesView(generics.ListAPIView):
    serializer_class = AssignedSpeciesSerializer
    permission_classes = [IsAuthenticated, IsPlanter]
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
