from django.db import models

from .utils import TrackableModel


class Species(TrackableModel):
    common_name = models.CharField(max_length=200, unique=True)
    botanical_name = models.CharField(max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "species"

    def __str__(self):
        return f"{self.common_name} ({self.botanical_name})"
