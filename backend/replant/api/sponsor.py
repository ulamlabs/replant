from django.db import models
from rest_framework import filters, mixins, serializers, viewsets

from replant.models import Nft, Sponsor


class SponsorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = ("id", "name")


class SponsorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsor
        fields = ("id", "name", "trees", "species", "total_trees_cost_usd")

    trees = serializers.SerializerMethodField()
    species = serializers.SerializerMethodField()
    total_trees_cost_usd = serializers.SerializerMethodField()

    def _get_nfts(self, obj: Sponsor):
        return Nft.objects.filter(sponsor=obj)

    def get_trees(self, obj: Sponsor):
        return self._get_nfts(obj).count()

    def get_species(self, obj: Sponsor):
        result = self._get_nfts(obj).aggregate(models.Count("species", distinct=True))
        return result["species__count"]

    def get_total_trees_cost_usd(self, obj: Sponsor):
        result = self._get_nfts(obj).aggregate(models.Sum("planting_cost_usd"))
        return result["planting_cost_usd__sum"] or 0


class SponsorView(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = Sponsor.objects.order_by("name")
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]

    def get_serializer_class(self):
        if self.action == "list":
            return SponsorListSerializer
        return SponsorSerializer
