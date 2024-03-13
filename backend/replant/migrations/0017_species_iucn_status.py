# Generated by Django 5.0.2 on 2024-03-11 12:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0016_history"),
    ]

    operations = [
        migrations.AddField(
            model_name="species",
            name="iucn_status",
            field=models.CharField(
                choices=[
                    ("CR", "Critically Endangered"),
                    ("EN", "Endangered"),
                    ("VU", "Vulnerable"),
                    ("NT", "Near Threatened"),
                    ("LC", "Least Concern"),
                    ("DD", "Data Deficient"),
                ],
                default="DD",
                max_length=2,
            ),
            preserve_default=False,
        ),
    ]