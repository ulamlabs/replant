from model_bakery import baker
from rest_framework import status
from rest_framework.test import APIClient

from replant.models import Country, PlantingOrganization, User


def test_get_user_ok(
    api_client: APIClient,
    country: Country,
    planting_organization: PlantingOrganization,
):
    user = baker.make(
        User,
        username="user",
        phone_number="+48888234567",
        planting_organization=planting_organization,
        country=country,
    )
    api_client.force_login(user)

    response = api_client.get("/api/user")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "username": "user",
        "phone_number": "+48888234567",
        "country": {"id": 1, "name": "Aruba"},
        "planting_organization": {"name": "Green World"},
    }


def test_get_user_unauthorized(api_client: APIClient):
    response = api_client.get("/api/user")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
