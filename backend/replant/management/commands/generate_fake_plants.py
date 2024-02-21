import djclick as click
from django.conf import settings

from replant.models import Country, Plant, PlantingOrganization, Species, User


@click.command()
@click.option(
    "--organization-id",
    type=int,
    help="Id of PlantingOrganization to generate the plants for",
)
@click.option(
    "--quantity",
    type=int,
    help="Quantity of plants to generate",
)
@click.option(
    "--review-state",
    type=click.Choice([v.name for v in Plant.ReviewState]),
    default=Plant.ReviewState.APPROVED,
    help="Review state of the plants",
)
def generate_fake_plants(organization_id: int, quantity: int, review_state: str):
    assert settings.DEBUG

    organization = PlantingOrganization.objects.get(pk=organization_id)

    country = Country.objects.first()
    assert country

    species = Species.objects.first()
    assert species

    user = User.objects.first()
    assert user

    plants = [
        Plant(
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

    Plant.objects.bulk_create(plants)
