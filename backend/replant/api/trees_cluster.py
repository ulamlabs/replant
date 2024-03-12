from django.db import models
from rest_framework import generics, serializers

from replant.models import TreesCluster


class TreesClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreesCluster
        fields = (
            "id",
            "lon",
            "lat",
            "number_of_trees",
            "zoom",
        )


class TreesClusterView(generics.ListAPIView):
    serializer_class = TreesClusterSerializer
    queryset = TreesCluster.objects.all()
    pagination_class = None

    def filter_queryset(self, queryset: models.QuerySet[TreesCluster]):
        zoom = int(self.request.query_params["zoom"])
        x = int(self.request.query_params["x"])
        y = int(self.request.query_params["y"])

        grid_size = int(4 ** (max(0, zoom - 1)))
        tile_index = y * grid_size + x

        return (
            super()
            .filter_queryset(queryset)
            .filter(
                zoom=zoom,
                tile_index=tile_index,
            )
        )
