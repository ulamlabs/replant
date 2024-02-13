from typing import cast

from drf_extra_fields.fields import Base64ImageField
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated

from replant.models import AssignedSpecies, Plant, User

from .assigned_species import SpeciesSerializer


class PlantSerializer(serializers.ModelSerializer):
    assigned_species_id = serializers.IntegerField(write_only=True)
    species = SpeciesSerializer(read_only=True)
    image = Base64ImageField()

    class Meta:
        model = Plant
        fields = (
            "id",
            "assigned_species_id",
            "species",
            "review_state",
            "rejection_reason",
            "image",
            "latitude",
            "longitude",
            "created_at",
        )
        read_only_fields = ("id", "review_state", "rejection_reason", "created_at")

    def _validate_assigned_species(self, assigned_species_id: int, user: User):
        assigned_species = AssignedSpecies.objects.filter(
            id=assigned_species_id,
            planting_organization=user.planting_organization,
            country=user.country,
        ).first()

        if assigned_species is None:
            raise serializers.ValidationError(
                {
                    "assigned_species_id": [
                        "Assigned species with provided ID does not exist."
                    ]
                }
            )
        return assigned_species

    def validate(self, attrs: dict):
        assigned_species_id = attrs["assigned_species_id"]
        user = cast(User, self.context["request"].user)

        assigned_species = self._validate_assigned_species(assigned_species_id, user)

        attrs["assigned_species"] = assigned_species
        attrs["user"] = user
        return attrs

    def create(self, validated_data: dict):
        assigned_species: AssignedSpecies = validated_data["assigned_species"]

        return Plant.objects.create(
            image=validated_data["image"],
            latitude=validated_data["latitude"],
            longitude=validated_data["longitude"],
            planting_organization=assigned_species.planting_organization,
            country=assigned_species.country,
            species=assigned_species.species,
            is_native=assigned_species.is_native,
            planting_cost_usd=assigned_species.planting_cost_usd,
            created_by=validated_data["user"],
        )


class PlantView(generics.ListCreateAPIView):
    serializer_class = PlantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = cast(User, self.request.user)
        return (
            Plant.objects.filter(
                created_by=user,
            )
            .select_related("species")
            .order_by("-created_at")
        )
