from decimal import Decimal as D
from enum import auto

from django.core.validators import MinValueValidator
from django.db import models

from .utils import TrackableModel


class Sponsor(TrackableModel):
    class Type(models.TextChoices):
        COMPANY = auto()
        INDIVIDUAL = auto()

    type = models.CharField(max_length=10, choices=Type.choices)
    name = models.CharField(max_length=100, unique=True)
    wallet_address = models.CharField(max_length=42, unique=True)
    contact_person_full_name = models.CharField(max_length=50)
    contact_person_email = models.EmailField()

    nft_ordered = models.PositiveIntegerField(verbose_name="NFT ordered")
    assigned_trees = models.PositiveIntegerField(default=0)

    nft_ordered_usd = models.DecimalField(
        verbose_name="NFT ordered [USD]",
        max_digits=12,
        decimal_places=2,
        default=D(0),
        validators=[MinValueValidator(0)],
        help_text="Uncapped when zero",
    )
    assigned_trees_usd = models.DecimalField(
        verbose_name="Assigned trees [USD]",
        max_digits=12,
        decimal_places=2,
        default=D(0),
        validators=[MinValueValidator(0)],
    )

    @property
    def trees_to_assign(self):
        return max(0, self.nft_ordered - self.assigned_trees)

    @property
    def trees_to_assign_usd(self):
        return max(0, self.nft_ordered_usd - self.assigned_trees_usd)

    @property
    def is_eligible_to_trees_assignment(self):
        if self.nft_ordered_usd and self.trees_to_assign_usd <= 0:
            return False
        return self.trees_to_assign > 0

    def __str__(self):
        return self.name
