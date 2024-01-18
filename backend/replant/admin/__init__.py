from django.conf.locale.en import formats as en_formats
from django.contrib import admin

from .user import UserAdmin

en_formats.DATE_FORMAT = "Y-m-d"
en_formats.DATETIME_FORMAT = "Y-m-d H:i"
