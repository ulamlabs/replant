import djclick as click
from django.conf import settings

from replant.models import Country, PlantingOrganization, Species, Tree, User


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
def generate_fake_trees(organization_id: int, quantity: int, review_state: str):
    assert settings.DEBUG

    organization = PlantingOrganization.objects.get(pk=organization_id)

    country = Country.objects.first()
    assert country

    species = Species.objects.first()
    assert species

    user = User.objects.first()
    assert user

    trees = [
        Tree(
            planting_organization=organization,
            review_state=review_state,
            image="",
            latitude=0,
            longitude=0,
            country=country,
            species=species,
            is_native=False,
            planting_cost_usd=10,
            created_by=user,
        )
        for i in range(quantity)
    ]

    Tree.objects.bulk_create(trees)
