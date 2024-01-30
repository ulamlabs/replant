from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from drf_spectacular.utils import OpenApiResponse
from rest_framework import serializers, status


def validate_password_in_serializer(password, user):
    try:
        validate_password(password, user)
    except exceptions.ValidationError as e:
        raise serializers.ValidationError({"password": e.messages})


class Message(serializers.Serializer):
    detail = serializers.CharField()


AUTH_REQUIRED_RESPONSES = {
    status.HTTP_401_UNAUTHORIZED: OpenApiResponse(Message),
    status.HTTP_403_FORBIDDEN: OpenApiResponse(Message),
}
