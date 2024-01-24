from rest_framework import filters, generics, serializers

from replant.models import Country


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = (
            "id",
            "name",
        )


class CountryView(generics.ListAPIView):
    serializer_class = CountrySerializer
    queryset = Country.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]
