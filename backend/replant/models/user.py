from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from replant.time_zones import TIME_ZONES


class User(AbstractUser):
    TIME_ZONES = TIME_ZONES

    phone_number = PhoneNumberField()
    country = models.ForeignKey("replant.Country", null=True, on_delete=models.PROTECT)
    planting_organization = models.ForeignKey(
        "replant.PlantingOrganization",
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        verbose_name="planting organization / community",
    )
    time_zone = models.CharField(max_length=40, choices=TIME_ZONES, default="UTC")
