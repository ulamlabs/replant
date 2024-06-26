# Generated by Django 5.0.2 on 2024-03-25 15:49

from django.db import migrations


def set_planters_role_and_empty_email(apps, schema_editor):
    User = apps.get_model("replant", "User")

    User.objects.filter(is_staff=False).update(role="PLANTER")
    User.objects.filter(email="").update(email=None)


def set_empty_email(apps, schema_editor):
    User = apps.get_model("replant", "User")

    User.objects.filter(email=None).update(email="")


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0022_alter_user_managers_and_more"),
    ]

    operations = [
        migrations.RunPython(set_planters_role_and_empty_email, set_empty_email)
    ]
