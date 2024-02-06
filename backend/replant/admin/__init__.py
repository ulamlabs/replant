from django.conf.locale.en import formats as en_formats
from django.contrib import admin
from django.contrib.auth.models import Group

from .assigned_species import AssignedSpecies
from .country import CountryAdmin
from .plant import PlantAdmin
from .planting_organization import PLantingOrganizationAdmin
from .species import SpeciesAdmin
from .user import UserAdmin

admin.site.unregister(Group)
admin.site.site_url = ""

en_formats.DATE_FORMAT = "Y-m-d"
en_formats.DATETIME_FORMAT = "Y-m-d H:i"
