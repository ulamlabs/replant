# Generated by Django 5.0.2 on 2024-02-09 16:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0009_planttoreview_plant_rejection_reason"),
    ]

    operations = [
        migrations.CreateModel(
            name="Sponsor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "type",
                    models.CharField(
                        choices=[("COMPANY", "Company"), ("INDIVIDUAL", "Individual")],
                        max_length=10,
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("wallet_address", models.CharField(max_length=42, unique=True)),
                ("contact_person_full_name", models.CharField(max_length=50)),
                ("contact_person_email", models.EmailField(max_length=254)),
                (
                    "nft_ordered",
                    models.PositiveIntegerField(verbose_name="NFT ordered"),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="%(class)s_created_by",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="%(class)s_updated_by",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]