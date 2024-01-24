from model_bakery import baker
from rest_framework import status
from rest_framework.test import APIClient

from replant.models import User


def test_register_ok(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "username": "user",
        "phone_number": "+48888234567",
        "country": 2,
    }
    user = User.objects.get()
    assert user.username == "user"
    assert user.phone_number == "+48888234567"
    assert user.country is not None
    assert user.country.id == 2


def test_register_user_already_exists(api_client: APIClient):
    baker.make(User, username="user", phone_number="+48888234567")
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "username": ["A user with that username already exists."]
    }


def test_register_invalid_phone_number(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+488882345674",
        "password": "DifficultPassword8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "phone_number": ["The phone number entered is not valid."]
    }


def test_register_invalid_password_user_attribute_similar(api_client: APIClient):
    data = {
        "username": "myusername",
        "phone_number": "+48888234567",
        "password": "Myusername1@",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "password": ["The password is too similar to the username."]
    }


def test_register_invalid_password_too_short(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "Di8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "password": [
            "This password is too short. It must contain at least 8 characters.",
        ]
    }


def test_register_invalid_password_too_common(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "password123",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["password"][0] == "This password is too common."


def test_register_invalid_password_special_character_missing(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "password": [
            "This password must contain at least one of ('!', '@', '#', '$', '%', '^', '&', '*') special characters.",
        ]
    }


def test_register_invalid_password_digit_missing(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "password": [
            "This password must contain at least 1 digit.",
        ]
    }


def test_register_invalid_password_missing_uppercase(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "difficultpassword8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "password": [
            "This password must contain at least 1 uppercase character.",
        ]
    }


def test_register_invalid_password_missing_lowercase(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DIFFICULTPASSWORD8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "password": [
            "This password must contain at least 1 lowercase character.",
        ]
    }


def test_register_invalid_country(api_client: APIClient):
    data = {
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 2000,
    }

    response = api_client.post("/api/auth/register", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "country": ['Invalid pk "2000" - object does not exist.']
    }
