from django.db import models

from .country import Country
from .utils import TrackableModel


class PlantingOrganization(TrackableModel):
    name = models.CharField(max_length=100, unique=True)
    contact_person_full_name = models.CharField(max_length=50)
    contact_person_email = models.EmailField()

    countries = models.ManyToManyField(Country)

    def __str__(self):
        return self.name
