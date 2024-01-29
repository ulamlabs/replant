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
def planting_organization():
    countries = Country.objects.filter(id=1)
    return baker.make(PlantingOrganization, countries=countries)


@pytest.fixture
def user():
    return baker.make(User, phone_number="+48888234567")
