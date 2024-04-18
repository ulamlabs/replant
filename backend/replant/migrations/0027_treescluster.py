# Generated by Django 5.0.2 on 2024-04-09 09:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("replant", "0026_sponsor_bio_sponsor_logo"),
    ]

    operations = [
        migrations.AddField(
            model_name="tree",
            name="tile_index",
            field=models.PositiveIntegerField(db_index=True, default=0),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="TreesCluster",
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
                ("longitude", models.FloatField()),
                ("latitude", models.FloatField()),
                ("zoom", models.PositiveIntegerField()),
                ("tile_index", models.PositiveIntegerField()),
                ("number_of_trees", models.PositiveIntegerField()),
            ],
            options={
                "indexes": [
                    models.Index(
                        fields=["tile_index", "zoom"],
                        name="replant_tre_tile_in_13eb87_idx",
                    )
                ],
            },
        ),
    ]
