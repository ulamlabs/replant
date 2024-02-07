from typing import cast

from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import serializers, status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response

from replant.models import Plant, User


class PlantSummarySeralizer(serializers.Serializer):
    added_count = serializers.IntegerField()
    pending_review_count = serializers.IntegerField()
    approved_count = serializers.IntegerField()
    rejected_count = serializers.IntegerField()


@extend_schema_view(
    get=extend_schema(responses={status.HTTP_200_OK: PlantSummarySeralizer}),
)
class PlantSummaryView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kwargs) -> Response:
        user = cast(User, request.user)
        queryset = Plant.objects.get_review_state_count(user=user)

        data = {
            "added_count": 0,
            "pending_review_count": 0,
            "approved_count": 0,
            "rejected_count": 0,
        }

        for item in queryset:
            review_state = item["review_state"]
            review_state_count = item["review_state_count"]

            data["added_count"] += review_state_count

            match review_state:
                case Plant.ReviewState.PENDING:
                    data["pending_review_count"] += review_state_count
                case Plant.ReviewState.APPROVED:
                    data["approved_count"] += review_state_count
                case Plant.ReviewState.REJECTED:
                    data["rejected_count"] += review_state_count

        serializer = PlantSummarySeralizer(data)
        return Response(serializer.data)
