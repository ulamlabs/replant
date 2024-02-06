from datetime import timedelta
from decimal import Decimal as D
from uuid import UUID

from django.core.files.uploadedfile import SimpleUploadedFile
from model_bakery import baker
from pytest_mock import MockerFixture
from rest_framework import status
from rest_framework.test import APIClient
from time_machine import TimeMachineFixture

from replant.models import AssignedSpecies, Plant, Species, User


def test_list_plants_ok(
    user_client: APIClient,
    user: User,
    time: TimeMachineFixture,
):
    jackfruit = baker.make(
        Species,
        common_name="Jackfruit",
        botanical_name="Artocarpus heterophyllus",
    )
    baker.make(
        Plant,
        image="c8302c9252744cdc831c45fea17ce36b.jpeg",
        latitude="-1.422354",
        longitude="120.237897",
        planting_organization=user.planting_organization,
        country=user.country,
        species=jackfruit,
        created_by=user,
    )
    time.shift(timedelta(seconds=1))
    baker.make(
        Plant,
        image="bf5435a8b61946d78fbf8e5ef2f24859.jpeg",
        latitude="-2.422354",
        longitude="121.237897",
        planting_organization=user.planting_organization,
        country=user.country,
        species=jackfruit,
        created_by=user,
    )

    response = user_client.get("/api/plants")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "count": 2,
        "next": None,
        "previous": None,
        "results": [
            {
                "id": 2,
                "species": {
                    "common_name": "Jackfruit",
                    "botanical_name": "Artocarpus heterophyllus",
                },
                "review_state": "PENDING",
                "image": "http://testserver/django-files/bf5435a8b61946d78fbf8e5ef2f24859.jpeg",
                "latitude": "-2.422354",
                "longitude": "121.237897",
                "created_at": "2024-01-01T00:00:01Z",
            },
            {
                "id": 1,
                "species": {
                    "common_name": "Jackfruit",
                    "botanical_name": "Artocarpus heterophyllus",
                },
                "review_state": "PENDING",
                "image": "http://testserver/django-files/c8302c9252744cdc831c45fea17ce36b.jpeg",
                "latitude": "-1.422354",
                "longitude": "120.237897",
                "created_at": "2024-01-01T00:00:00Z",
            },
        ],
    }


def test_list_plants_empty(user_client: APIClient):
    response = user_client.get("/api/plants")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "count": 0,
        "next": None,
        "previous": None,
        "results": [],
    }


def test_list_plants_skip(user_client: APIClient, user: User):
    # Plants created by other users
    baker.make(Plant, 5)

    response = user_client.get("/api/plants")

    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "count": 0,
        "next": None,
        "previous": None,
        "results": [],
    }


def test_list_plants_unauthorized(api_client: APIClient):
    response = api_client.get("/api/plants")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


def test_create_plant_ok(
    user_client: APIClient,
    user: User,
    image: SimpleUploadedFile,
    mocker: MockerFixture,
):
    mocker.patch(
        "uuid.uuid4", return_value=UUID("bf5435a8-b619-46d7-8fbf-8e5ef2f24859")
    )
    jackfruit = baker.make(
        Species,
        common_name="Jackfruit",
        botanical_name="Artocarpus heterophyllus",
    )
    baker.make(
        AssignedSpecies,
        planting_organization=user.planting_organization,
        country=user.country,
        species=jackfruit,
        is_native=True,
        planting_cost_usd=D("1"),
    )
    data = {
        "assigned_species_id": 1,
        "image": image,
        "latitude": "-1.422354",
        "longitude": "120.237897",
    }

    response = user_client.post("/api/plants", data=data)

    assert response.status_code == status.HTTP_201_CREATED
    assert response.json() == {
        "id": 1,
        "species": {
            "common_name": "Jackfruit",
            "botanical_name": "Artocarpus heterophyllus",
        },
        "review_state": "PENDING",
        "image": "http://testserver/django-files/bf5435a8b61946d78fbf8e5ef2f24859.png",
        "latitude": "-1.422354",
        "longitude": "120.237897",
        "created_at": "2024-01-01T00:00:00Z",
    }

    new_plant = Plant.objects.get()
    assert new_plant.review_state == Plant.ReviewState.PENDING
    assert new_plant.image.name == "bf5435a8b61946d78fbf8e5ef2f24859.png"
    assert new_plant.latitude == D("-1.422354")
    assert new_plant.longitude == D("120.237897")
    assert new_plant.planting_organization == user.planting_organization
    assert new_plant.country == user.country
    assert new_plant.species == jackfruit
    assert new_plant.is_native
    assert new_plant.planting_cost_usd == D("1")


def test_create_plant_assigned_species_doesnt_exists(
    user_client: APIClient,
    image: SimpleUploadedFile,
):
    data = {
        "assigned_species_id": 1,
        "image": image,
        "latitude": "-1.422354",
        "longitude": "120.237897",
    }

    response = user_client.post("/api/plants", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "assigned_species_id": ["Assigned species with provided ID does not exist."]
    }


def test_create_plant_different_planting_organization(
    user_client: APIClient,
    user: User,
    image: SimpleUploadedFile,
):
    jackfruit = baker.make(
        Species,
        common_name="Jackfruit",
        botanical_name="Artocarpus heterophyllus",
    )
    baker.make(
        AssignedSpecies,
        country=user.country,
        species=jackfruit,
    )
    data = {
        "assigned_species_id": 1,
        "image": image,
        "latitude": "-1.422354",
        "longitude": "120.237897",
    }

    response = user_client.post("/api/plants", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "assigned_species_id": ["Assigned species with provided ID does not exist."]
    }


def test_create_plant_different_country(
    user_client: APIClient,
    user: User,
    image: SimpleUploadedFile,
):
    jackfruit = baker.make(
        Species,
        common_name="Jackfruit",
        botanical_name="Artocarpus heterophyllus",
    )
    baker.make(
        AssignedSpecies,
        planting_organization=user.planting_organization,
        country_id=2,
        species=jackfruit,
    )
    data = {
        "assigned_species_id": 1,
        "image": image,
        "latitude": "-1.422354",
        "longitude": "120.237897",
    }

    response = user_client.post("/api/plants", data=data)

    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "assigned_species_id": ["Assigned species with provided ID does not exist."]
    }


def test_create_plant_unauthorized(api_client: APIClient):
    response = api_client.post("/api/plants")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
