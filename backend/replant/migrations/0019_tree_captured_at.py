# Generated by Django 5.0.2 on 2024-03-14 11:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0018_alter_sponsor_wallet_address"),
    ]

    operations = [
        migrations.AddField(
            model_name="tree",
            name="captured_at",
            field=models.DateTimeField(null=True),
        ),
    ]
