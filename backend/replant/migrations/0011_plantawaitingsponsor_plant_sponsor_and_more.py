# Generated by Django 5.0.2 on 2024-02-19 14:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0010_sponsor"),
    ]

    operations = [
        migrations.AddField(
            model_name="plant",
            name="sponsor",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="replant.sponsor",
            ),
        ),
        migrations.AddField(
            model_name="sponsor",
            name="assigned_plants",
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddIndex(
            model_name="plant",
            index=models.Index(
                fields=["review_state"], name="replant_pla_review__59281e_idx"
            ),
        ),
    ]
