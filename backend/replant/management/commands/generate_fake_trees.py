import djclick as click
from django.conf import settings
from django.db import models

from replant.models import Country, PlantingOrganization, Species, Sponsor, Tree, User


@click.command()
@click.option(
    "--organization-id",
    type=int,
    help="Id of PlantingOrganization to generate the trees for",
)
@click.option(
    "--quantity",
    type=int,
    help="Quantity of trees to generate",
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
def generate_fake_trees(
    organization_id: int, quantity: int, review_state: str, minting_state: str
):
    assert settings.DEBUG

    organization = PlantingOrganization.objects.get(pk=organization_id)

    country = Country.objects.first()
    assert country

    species = Species.objects.first()
    assert species

    user = User.objects.first()
    assert user

    nft_id: int | None = None
    sponsor: Sponsor | None = None
    if minting_state == Tree.MintingState.MINTED:
        nft_id = Tree.objects.aggregate(models.Max("nft_id"))["nft_id__max"] or 0
        sponsor = Sponsor.objects.first()

    trees: list[Tree] = []
    for _ in range(quantity):
        if nft_id is not None:
            nft_id += 1

        tree = Tree(
            planting_organization=organization,
            review_state=review_state,
            minting_state=minting_state,
            image="",
            latitude=0,
            longitude=0,
            country=country,
            species=species,
            is_native=False,
            planting_cost_usd=10,
            created_by=user,
            nft_id=nft_id,
            sponsor=sponsor,  # type:ignore
        )
        trees.append(tree)

    Tree.objects.bulk_create(trees)
