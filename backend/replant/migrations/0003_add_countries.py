# Generated by Django 5.0.1 on 2024-01-19 17:46

from django.db import migrations
import pycountry


def add_countries(apps, schema_editor):
    Country = apps.get_model("replant", "Country")

    countries = []
    for country in pycountry.countries:
        countries.append(Country(name=country.name))

    Country.objects.bulk_create(countries)


def delete_countries(apps, schema_editor):
    Country = apps.get_model("replant", "Country")

    Country.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0002_country_plantingorganization"),
    ]

    operations = [
        migrations.RunPython(add_countries, delete_countries)
    ]
