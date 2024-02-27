from django.db import models
from rest_framework import mixins, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from replant.models import Nft, Sponsor


class SponsorAutocompleteSerializer(serializers.ModelSerializer):
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
        return self._get_nfts(obj).distinct("species").count()

    def get_total_trees_cost_usd(self, obj: Sponsor):
        result = self._get_nfts(obj).aggregate(models.Sum("planting_cost_usd"))
        return result["planting_cost_usd__sum"] or 0


class SponsorView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = SponsorSerializer
    queryset = Sponsor.objects.all()

    @action(["GET"], detail=False)
    def autocomplete(self, request: Request):
        query = request.query_params.get("query", "")
        organizations = Sponsor.objects.filter(name__icontains=query)[:10]

        data = SponsorAutocompleteSerializer(organizations, many=True).data
        return Response(data=data)
