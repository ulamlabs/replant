# Generated by Django 5.0.2 on 2024-03-25 16:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0023_set_planters_role_end_empty_email"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
    ]
