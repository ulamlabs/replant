# Generated by Django 5.0.2 on 2024-03-06 09:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0014_sponsor_additional_info_sponsor_assigned_trees_usd_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="time_zone",
            field=models.CharField(default="UTC", max_length=40),
        ),
    ]
