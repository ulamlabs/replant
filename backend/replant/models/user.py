from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    phone_number = PhoneNumberField()
    country = models.ForeignKey("replant.Country", null=True, on_delete=models.PROTECT)
    planting_organization = models.ForeignKey(
        "replant.PlantingOrganization",
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        verbose_name="planting organization / community",
    )
