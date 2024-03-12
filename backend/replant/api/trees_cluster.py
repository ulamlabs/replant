from django.db import models
from rest_framework import exceptions, generics, serializers

from replant.models import TreesCluster


class TreesClusterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreesCluster
        fields = (
            "id",
            "latitude",
            "longitude",
            "number_of_trees",
            "zoom",
        )


class TreesClustersView(generics.ListAPIView):
    serializer_class = TreesClusterSerializer
    queryset = TreesCluster.objects.all()
    pagination_class = None

    def filter_queryset(self, queryset: models.QuerySet[TreesCluster]):
        try:
            zoom = int(self.request.query_params["zoom"])
            index = int(self.request.query_params["index"])
        except (KeyError, ValueError):
            raise exceptions.ValidationError("zoom and index params must be provided")
        return queryset.filter(zoom=zoom, tile_index=index)
