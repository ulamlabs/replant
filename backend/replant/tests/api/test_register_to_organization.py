from model_bakery import baker
from pytest_mock import MockerFixture
from rest_framework import status
from rest_framework.test import APIClient
from time_machine import TimeMachineFixture

from replant.models import PlantingOrganization, User


def test_register_to_organization_ok(
    api_client: APIClient,
    planting_organization: PlantingOrganization,
    user: User,
):
    passcode = planting_organization.passcodes.generate(by=user)
    data = {
        "code": passcode.code,
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 1,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "username": "user",
        "phone_number": "+48888234567",
        "country": 1,
    }
    new_user = User.objects.filter(username="user").first()
    assert new_user is not None
    assert new_user.planting_organization == planting_organization
    assert new_user.phone_number == "+48888234567"
    assert new_user.country is not None
    assert new_user.country.id == 1


def test_register_to_organization_user_already_exists(
    api_client: APIClient,
    planting_organization: PlantingOrganization,
    user: User,
):
    passcode = planting_organization.passcodes.generate(by=user)
    baker.make(User, username="user", phone_number="+48888234567")
    data = {
        "code": passcode.code,
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 1,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "username": ["A user with that username already exists."]
    }


def test_register_to_organization_invalid_phone_number(
    api_client: APIClient,
    planting_organization: PlantingOrganization,
    user: User,
):
    passcode = planting_organization.passcodes.generate(by=user)
    data = {
        "code": passcode.code,
        "username": "user",
        "phone_number": "+488882345674",
        "password": "DifficultPassword8*",
        "country": 1,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "phone_number": ["The phone number entered is not valid."]
    }


def test_register_to_organization_invalid_passcode(api_client: APIClient):
    data = {
        "code": "651268ff-39ac-499d-8c62-7b0dd6cc386e",
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 1,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"code": ["The code is not valid."]}


def test_register_to_organization_expired_passcode(
    api_client: APIClient,
    planting_organization: PlantingOrganization,
    user: User,
    time: TimeMachineFixture,
):
    passcode = planting_organization.passcodes.generate(by=user)
    time.move_to(passcode.expires_at)
    data = {
        "code": passcode.code,
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 1,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"code": ["The code has expired."]}


def test_register_to_organization_invalid_country(
    api_client: APIClient,
    planting_organization: PlantingOrganization,
    user: User,
):
    passcode = planting_organization.passcodes.generate(by=user)
    data = {
        "code": passcode.code,
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 2,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "country": ["Only organization's countries can be selected."]
    }


def test_register_to_organization_assert_password_validation_called(
    api_client: APIClient,
    mocker: MockerFixture,
    planting_organization: PlantingOrganization,
    user: User,
):
    validate_password_mock = mocker.patch(
        "replant.api.utils.validate_password_in_serializer"
    )
    passcode = planting_organization.passcodes.generate(by=user)
    data = {
        "code": passcode.code,
        "username": "user",
        "phone_number": "+48888234567",
        "password": "DifficultPassword8*",
        "country": 1,
    }

    response = api_client.post("/api/auth/register-to-organization", data=data)
    assert response.status_code == status.HTTP_201_CREATED
    validate_password_mock.assert_called_once_with("DifficultPassword8*", mocker.ANY)
    assert validate_password_mock.call_args.args[1].username == "user"
