from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers


def validate_password_in_serializer(password, user):
    try:
        validate_password(password, user)
    except exceptions.ValidationError as e:
        raise serializers.ValidationError({"password": e.messages})
