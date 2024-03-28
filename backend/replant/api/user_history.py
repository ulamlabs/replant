from django.db import transaction
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated

from replant.models import UserHistory


class UserHistoryLogSerializer(serializers.ModelSerializer):
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


class UserHistorySerializer(serializers.Serializer):
    history = UserHistoryLogSerializer(many=True, write_only=True)

    @transaction.atomic
    def create(self, validated_data):
        history = validated_data["history"]
        user = self.context["request"].user
        new_user_history = []
        for history_log in history:
            user_history_log = UserHistory(user=user, **history_log)
            new_user_history.append(user_history_log)
        UserHistory.objects.bulk_create(new_user_history, batch_size=100)


class UserHistoryView(generics.CreateAPIView):
    serializer_class = UserHistorySerializer
    permissions = [IsAuthenticated]
