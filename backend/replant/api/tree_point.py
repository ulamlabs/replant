from django.db import models
from rest_framework import exceptions, generics, serializers

from replant.models import Nft


class TreesPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nft
        fields = (
            "nft_id",
            "latitude",
            "longitude",
        )

    latitude = serializers.FloatField()
    longitude = serializers.FloatField()


class TreePointsView(generics.ListAPIView):
    serializer_class = TreesPointSerializer
    queryset = Nft.objects.all()
    pagination_class = None

    def filter_queryset(self, queryset: models.QuerySet[Nft]):
        try:
            index = int(self.request.query_params["index"])
        except (KeyError, ValueError):
            raise exceptions.ValidationError("index param must be provided")

        return queryset.filter(tile_index=index)
