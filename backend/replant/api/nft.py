from django.db import models
from rest_framework import generics, serializers

import env
from replant.models import Nft
from replant.pagination import LimitOffsetPagination


class NftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nft
        fields = (
            "common_name",
            "botanical_name",
            "image",
            "country",
            "planting_cost_usd",
            "planter",
            "planting_organization",
            "latitude",
            "longitude",
            "sponsor",
            "nft_collection",
            "nft_id",
            "created_at",
        )

    common_name = serializers.CharField(source="species.common_name")
    botanical_name = serializers.CharField(source="species.botanical_name")
    country = serializers.CharField(source="country.name")
    planter = serializers.CharField(source="created_by.username")
    planting_organization = serializers.CharField(source="planting_organization.name")
    sponsor = serializers.CharField(source="sponsor.name")
    nft_collection = serializers.SerializerMethodField()
    created_at = serializers.SerializerMethodField()

    def get_nft_collection(self, obj: Nft):
        return env.SEI_NFT_ADDRESS

    def get_created_at(self, obj: Nft):
        return obj.created_at.date()


class NftView(generics.ListAPIView):
    serializer_class = NftSerializer
    queryset = Nft.objects.select_related(
        "species",
        "country",
        "created_by",
        "planting_organization",
        "sponsor",
    )
    pagination_class = LimitOffsetPagination

    def filter_queryset(self, queryset: models.QuerySet[Nft]):
        queryset = super().filter_queryset(queryset)
        sponsor_id = self.request.query_params.get("sponsor", "")
        if sponsor_id:
            queryset = queryset.filter(sponsor_id=sponsor_id)
        return queryset
