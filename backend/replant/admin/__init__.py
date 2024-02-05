from django.conf.locale.en import formats as en_formats

from .admin_site import CustomAdminSite, custom_admin_site
from .assigned_species import AssignedSpecies
from .country import CountryAdmin
from .plant import PlantAdmin
from .planting_organization import PLantingOrganizationAdmin
from .species import SpeciesAdmin
from .user import UserAdmin

en_formats.DATE_FORMAT = "Y-m-d"
en_formats.DATETIME_FORMAT = "Y-m-d H:i"
