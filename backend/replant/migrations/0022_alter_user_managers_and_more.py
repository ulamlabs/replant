# Generated by Django 5.0.2 on 2024-03-25 14:11

import django.contrib.auth.validators
import django.db.models.deletion
import phonenumber_field.modelfields
import replant.models.sponsor
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0021_alter_tree_captured_at"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="user",
            managers=[],
        ),
        migrations.RemoveField(
            model_name="sponsor",
            name="contact_person_full_name",
        ),
        migrations.AddField(
            model_name="user",
            name="is_email_verified",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="user",
            name="role",
            field=models.CharField(
                choices=[
                    ("PLANTER", "Planter"),
                    ("SPONSOR", "Sponsor"),
                    ("PLANTING_ORGANIZATION", "Planting Organization"),
                ],
                max_length=25,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="sponsor",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="replant.sponsor",
            ),
        ),
        migrations.AlterField(
            model_name="sponsor",
            name="contact_person_email",
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name="sponsor",
            name="name",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="sponsor",
            name="wallet_address",
            field=models.CharField(
                max_length=100,
                null=True,
                unique=True,
                validators=[replant.models.sponsor.validate_sei_address],
            ),
        ),
        migrations.RemoveField(
            model_name="sponsor",
            name="created_at",
        ),
        migrations.RemoveField(
            model_name="sponsor",
            name="created_by",
        ),
        migrations.RemoveField(
            model_name="sponsor",
            name="updated_at",
        ),
        migrations.RemoveField(
            model_name="sponsor",
            name="updated_by",
        ),
        migrations.AlterField(
            model_name="user",
            name="country",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="replant.country",
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(
                blank=True, max_length=128, region=None
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(
                blank=True,
                error_messages={"unique": "A user with that username already exists."},
                max_length=150,
                null=True,
                unique=True,
                validators=[django.contrib.auth.validators.UnicodeUsernameValidator()],
            ),
        ),
    ]