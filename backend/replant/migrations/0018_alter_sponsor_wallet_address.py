# Generated by Django 5.0.2 on 2024-03-11 08:40

import replant.models.sponsor
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0017_species_iucn_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sponsor",
            name="wallet_address",
            field=models.CharField(
                max_length=100,
                unique=True,
                validators=[replant.models.sponsor.validate_sei_address],
            ),
        ),
    ]
