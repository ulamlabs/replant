from decimal import Decimal as D
from enum import auto

from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models

from replant import sdk

from .utils import TrackableModel


def validate_sei_address(address: str):
    try:
        sdk.validate_sei_address(address)
    except ValueError as e:
        raise ValidationError(str(e))


class Sponsor(TrackableModel):
    class Type(models.TextChoices):
        COMPANY = auto()
        INDIVIDUAL = auto()

    type = models.CharField(max_length=10, choices=Type.choices)
    name = models.CharField(max_length=100, unique=True)
    wallet_address = models.CharField(
        max_length=100, unique=True, validators=[validate_sei_address]
    )
    contact_person_full_name = models.CharField(max_length=50)
    contact_person_email = models.EmailField()
    additional_info = models.TextField(blank=True)

    nft_ordered = models.PositiveIntegerField(
        verbose_name="NFT ordered",
        null=True,
        blank=True,
        help_text="Uncapped when empty",
    )
    assigned_trees = models.PositiveIntegerField(default=0)

    nft_ordered_usd = models.DecimalField(
        verbose_name="NFT ordered [USD]",
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        help_text="Uncapped when empty",
    )
    assigned_trees_usd = models.DecimalField(
        verbose_name="Assigned trees [USD]",
        max_digits=12,
        decimal_places=2,
        default=D(0),
        validators=[MinValueValidator(0)],
    )

    def clean(self) -> None:
        if self.nft_ordered is not None and self.nft_ordered_usd is not None:
            message = "Cannot specify NFT quantity and USD value at the same time."
            raise ValidationError({"nft_ordered_usd": message, "nft_ordered": message})

    @property
    def trees_to_assign(self):
        return max(0, (self.nft_ordered or 0) - self.assigned_trees)

    @property
    def trees_to_assign_usd(self):
        return max(0, (self.nft_ordered_usd or D(0)) - self.assigned_trees_usd)

    @property
    def is_eligible_to_trees_assignment(self):
        return (self.nft_ordered and self.trees_to_assign > 0) or (
            self.nft_ordered_usd and self.trees_to_assign_usd > 0
        )

    def __str__(self):
        return self.name
