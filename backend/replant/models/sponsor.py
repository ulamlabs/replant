from enum import auto

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

    def __str__(self):
        return self.name