import pytest
from rest_framework.test import APIClient
from time_machine import travel


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
