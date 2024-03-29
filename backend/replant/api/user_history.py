from django.db import transaction
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from replant.models import UserHistory


class UserHistoryLogSerializer(serializers.ListSerializer):
    @transaction.atomic
    def create(self, validated_data):
        user = self.context["request"].user
        user_history = [
            UserHistory(user=user, **history_log) for history_log in validated_data
        ]
        return UserHistory.objects.bulk_create(user_history, batch_size=100)


class UserHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHistory
        fields = (
            "event_type",
            "user_agent",
            "os",
            "os_version",
            "browser",
            "browser_version",
            "device",
            "error_name",
            "error_message",
            "accuracy",
            "created_at",
        )
        list_serializer_class = UserHistoryLogSerializer


@extend_schema_view(
    post=extend_schema(
        request=UserHistorySerializer(many=True),
        responses={status.HTTP_204_NO_CONTENT: None},
    )
)
class UserHistoryView(generics.CreateAPIView):
    serializer_class = UserHistorySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(status=status.HTTP_204_NO_CONTENT)
