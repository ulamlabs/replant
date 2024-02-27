from model_bakery import baker
from rest_framework import status
from rest_framework.test import APIClient

from replant.models import Species, Sponsor, Tree, User


def test_sponsors_autocomplete(user_client: APIClient):
    sponsor_a = baker.make(Sponsor, name="Foo")
    sponsor_b = baker.make(Sponsor, name="Foobar")
    baker.make(Sponsor, 10)

    # Limit results to 10.
    response = user_client.get("/api/sponsors/autocomplete/")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 10

    response = user_client.get("/api/sponsors/autocomplete/", {"query": "foo"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {"id": sponsor_a.id, "name": "Foo"},
        {"id": sponsor_b.id, "name": "Foobar"},
    ]

    response = user_client.get("/api/sponsors/autocomplete/", {"query": "fooBAR"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == [
        {"id": sponsor_b.id, "name": "Foobar"},
    ]

    response = user_client.get("/api/sponsors/autocomplete/", {"query": "non-existing"})
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == []


def test_sponsors_retrieve_no_trees(
    user_client: APIClient,
    user: User,
):
    sponsor = baker.make(Sponsor, name="Foo")

    response = user_client.get(f"/api/sponsors/{sponsor.id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": sponsor.id,
        "name": "Foo",
        "species": 0,
        "total_trees_cost_usd": 0,
        "trees": 0,
    }


def test_sponsors_retrieve_with_trees(user_client: APIClient):
    sponsor = baker.make(Sponsor, name="Foo")
    other_sponsor = baker.make(Sponsor)
    species_a = baker.make(Species)
    species_b = baker.make(Species)

    # Should be ignored because not minted.
    baker.make(
        Tree,
        sponsor=sponsor,
        minting_state=Tree.MintingState.PENDING,
        species=species_a,
        planting_cost_usd=10,
    )

    # Should be ignored because other sponsor.
    baker.make(
        Tree,
        sponsor=other_sponsor,
        minting_state=Tree.MintingState.MINTED,
        species=species_a,
        planting_cost_usd=10,
    )

    # The following should be included.
    baker.make(
        Tree,
        sponsor=sponsor,
        minting_state=Tree.MintingState.MINTED,
        species=species_a,
        planting_cost_usd=10,
    )
    baker.make(
        Tree,
        sponsor=sponsor,
        minting_state=Tree.MintingState.MINTED,
        species=species_a,
        planting_cost_usd=15,
    )
    baker.make(
        Tree,
        sponsor=sponsor,
        minting_state=Tree.MintingState.MINTED,
        species=species_b,
        planting_cost_usd=5,
    )

    response = user_client.get(f"/api/sponsors/{sponsor.id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {
        "id": sponsor.id,
        "name": "Foo",
        "species": 2,
        "total_trees_cost_usd": 30,
        "trees": 3,
    }
