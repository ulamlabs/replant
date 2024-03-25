from model_bakery import baker
from pytest_mock import MockerFixture
from rest_framework import status
from rest_framework.test import APIClient

from replant.models import Sponsor, User


def test_register_sponsor_ok(api_client: APIClient, mocker: MockerFixture):
    mail_mock = mocker.patch("replant.integrations.sendgrid.send_email")
    data = {
        "type": "INDIVIDUAL",
        "name": "Jon Snow",
        "email": "jon.snow@example.com",
        "password": "DifficultPassword8*",
    }

    response = api_client.post("/api/auth/register-sponsor", data=data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {"email": "jon.snow@example.com"}

    new_user = User.objects.filter(email="jon.snow@example.com").first()
    assert new_user is not None
    assert new_user.role == User.Role.SPONSOR

    sponsor: Sponsor = new_user.sponsor
    assert sponsor is not None
    assert sponsor.type == Sponsor.Type.INDIVIDUAL
    assert sponsor.name == "Jon Snow"
    assert sponsor.contact_person_email == "jon.snow@example.com"

    mail_mock.assert_called_once_with(
        to="jon.snow@example.com",
        template_name="email_verification",
        subject="Confirm your email address",
        context=mocker.ANY,
    )


def test_register_sponsor_email_case_insensitive(
    api_client: APIClient, mocker: MockerFixture
):
    mocker.patch("replant.integrations.sendgrid.send_email")
    data = {
        "type": "INDIVIDUAL",
        "name": "Jon Snow",
        "email": "jon.SNOW@example.COM ",
        "password": "DifficultPassword8*",
    }

    response = api_client.post("/api/auth/register-sponsor", data=data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {"email": "jon.snow@example.com"}

    new_user = User.objects.filter(email="jon.snow@example.com").first()
    assert new_user is not None


def test_register_sponsor_user_already_exists(api_client: APIClient):
    baker.make(User, email="jon.snow@example.com")
    data = {
        "type": "INDIVIDUAL",
        "name": "Jon Snow",
        "email": "jon.snow@example.com",
        "password": "DifficultPassword8*",
    }

    response = api_client.post("/api/auth/register-sponsor", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"email": ["A user with that email already exists."]}


def test_register_sponsor_invalid_type(api_client: APIClient):
    data = {
        "type": "XXX",
        "name": "Jon Snow",
        "email": "jon.snow@example.com",
        "password": "DifficultPassword8*",
    }

    response = api_client.post("/api/auth/register-sponsor", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"type": ['"XXX" is not a valid choice.']}


def test_register_sponsor_invalid_email(api_client: APIClient):
    data = {
        "type": "INDIVIDUAL",
        "name": "Jon Snow",
        "email": "jon.snow",
        "password": "DifficultPassword8*",
    }

    response = api_client.post("/api/auth/register-sponsor", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"email": ["Enter a valid email address."]}


def test_register_sponsor_assert_password_validation_called(
    api_client: APIClient,
    mocker: MockerFixture,
):
    validate_password_mock = mocker.patch(
        "replant.api.utils.validate_password_in_serializer"
    )
    data = {
        "type": "INDIVIDUAL",
        "name": "Jon Snow",
        "email": "jon.snow@example.com",
        "password": "DifficultPassword8*",
    }

    response = api_client.post("/api/auth/register-sponsor", data=data)
    assert response.status_code == status.HTTP_201_CREATED
    validate_password_mock.assert_called_once_with("DifficultPassword8*", mocker.ANY)
    assert validate_password_mock.call_args.args[1].email == "jon.snow@example.com"
