from django.contrib.auth.models import AbstractUser
from django.contrib.auth.tokens import default_token_generator
from django.db import models
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from phonenumber_field.modelfields import PhoneNumberField

import env
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

    def get_password_reset_link(self):
        uid = urlsafe_base64_encode(force_bytes(self.pk))
        token = default_token_generator.make_token(self)
        return f"{env.UPLOAD_APP_URL}/reset-password?uid={uid}&token={token}"
