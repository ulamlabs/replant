# Generated by Django 5.0.1 on 2024-02-08 10:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0008_plant"),
    ]

    operations = [
        migrations.CreateModel(
            name="PlantToReview",
            fields=[],
            options={
                "verbose_name_plural": "plants to review",
                "proxy": True,
                "indexes": [],
                "constraints": [],
            },
            bases=("replant.plant",),
        ),
        migrations.AddField(
            model_name="plant",
            name="rejection_reason",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
    ]
