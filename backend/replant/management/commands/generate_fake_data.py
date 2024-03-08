import logging
import os
import random

import djclick as click
from django.conf import settings
from django.db import models
from model_bakery import baker

from replant.models import (
    AssignedSpecies,
    Country,
    PlantingOrganization,
    Species,
    Sponsor,
    Tree,
    User,
)

logger = logging.getLogger(__name__)

TREES_BULK_SIZE = 5000


@click.command()
@click.option(
    "--users",
    type=int,
    default=0,
    help="Number of users to create",
)
@click.option(
    "--organizations",
    type=int,
    default=0,
    help="Number of organizations to create",
)
@click.option(
    "--sponsors",
    type=int,
    default=0,
    help="Number of sponsors to create",
)
@click.option(
    "--trees",
    type=int,
    default=0,
    help="Number of trees to create",
)
@click.option(
    "--review-state",
    type=click.Choice([v.name for v in Tree.ReviewState]),
    default=Tree.ReviewState.APPROVED,
    help="Review state of the trees",
)
@click.option(
    "--minting-state",
    type=click.Choice([v.name for v in Tree.MintingState]),
    default=Tree.MintingState.PENDING,
    help="Minting state of the trees",
)
@click.option(
    "--clear",
    is_flag=True,
    help="Clear the data before generating new data",
)
def generate_fake_data(
    organizations: int,
    sponsors: int,
    trees: int,
    users: int,
    review_state: str,
    minting_state: str,
    clear: bool,
):
    assert settings.DEBUG, "Can generate fake data only in debug mode"

    if clear:
        clear_data()

    create_users(users)
    create_organizations(organizations)
    create_sponsors(sponsors)
    create_trees(trees, review_state, minting_state)

    logger.info("Done.")


def clear_data():
    logger.info("Clearing data...")
    Tree.objects.all().delete()
    Sponsor.objects.all().delete()
    AssignedSpecies.objects.all().delete()
    User.objects.exclude(is_staff=True).delete()
    User.objects.filter(is_staff=True).update(planting_organization=None)
    PlantingOrganization.objects.all().delete()


def create_users(quantity: int):
    if not quantity:
        return
    logger.info(f"Creating {quantity} users...")
    baker.make(
        User, quantity, phone_number="+48-111-111-111", username=baker.seq("User")
    )


def create_organizations(quantity: int):
    if not quantity:
        return
    logger.info(f"Creating {quantity} planting organizations...")
    admin = User.objects.filter(is_superuser=True).first()
    baker.make(PlantingOrganization, quantity, created_by=admin, name=baker.seq("Org"))


def create_sponsors(quantity: int):
    if not quantity:
        return
    logger.info(f"Creating {quantity} sponsors...")
    admin = User.objects.filter(is_superuser=True).first()
    baker.make(Sponsor, quantity, created_by=admin, name=baker.seq("Sponsor"))


def create_trees(quantity: int, review_state: str, minting_state: str):
    logger.info(f"Creating {quantity} trees...")

    organization_ids = PlantingOrganization.objects.values_list("id", flat=True)
    sponsor_ids = Sponsor.objects.values_list("id", flat=True)
    users_ids = User.objects.exclude(is_staff=True).values_list("id", flat=True)
    countries_ids = Country.objects.values_list("id", flat=True)
    species_ids = Species.objects.values_list("id", flat=True)

    images = [
        file
        for file in os.listdir(settings.MEDIA_ROOT)
        if file.endswith("png") or file.endswith("jpeg")
    ]
    assert images, f"No images in {settings.MEDIA_ROOT}"

    nft_id: int | None = None
    if minting_state == Tree.MintingState.MINTED:
        nft_id = Tree.objects.aggregate(models.Max("nft_id"))["nft_id__max"] or 0

    trees: list[Tree] = []
    total_trees = 0
    saved_trees = 0
    for _ in range(quantity):
        if nft_id is not None:
            nft_id += 1

        tree = Tree(
            planting_organization_id=random.choice(organization_ids),
            review_state=review_state,
            minting_state=minting_state,
            image=random.choice(images),
            latitude=random_coordinate(),
            longitude=random_coordinate(),
            country_id=random.choice(countries_ids),
            species_id=random.choice(species_ids),
            is_native=False,
            planting_cost_usd=random.randrange(2, 25),
            created_by_id=random.choice(users_ids),
            nft_id=nft_id,
            sponsor_id=(
                random.choice(sponsor_ids)
                if minting_state == Tree.MintingState.MINTED
                else None
            ),
        )
        trees.append(tree)

        total_trees += 1
        if len(trees) >= TREES_BULK_SIZE or total_trees >= quantity:
            logger.info(f"Saving {saved_trees} - {total_trees} / {quantity}...")
            saved_trees += len(trees)
            Tree.objects.bulk_create(trees)
            trees = []


def random_coordinate():
    return random.randrange(-180 * 10**4, 180 * 10**4) / 10**4
