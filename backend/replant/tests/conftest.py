import pytest
from model_bakery import baker
from rest_framework.test import APIClient
from time_machine import travel

from replant.models import Country, PlantingOrganization, User


@pytest.fixture(autouse=True)
def _always_use_db(db):
    """To avoid having to use the db fixture in every test."""


@pytest.fixture(autouse=True)
def time():
    with travel("2024-01-01", tick=False) as ft:
        yield ft


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def country():
    return Country.objects.filter(id=1, name="Aruba").first()


@pytest.fixture
def planting_organization(country: Country):
    return baker.make(
        PlantingOrganization,
        name="Green World",
        countries=[country],
    )


@pytest.fixture
def user(country: Country, planting_organization: PlantingOrganization):
    return baker.make(
        User,
        planting_organization=planting_organization,
        country=country,
        phone_number="+48888234567",
    )


@pytest.fixture
def user_client(user: User, api_client: APIClient):
    api_client.force_login(user)
    return api_client
