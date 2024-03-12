from django.db import models


class TreesCluster(models.Model):
    lon = models.FloatField()
    lat = models.FloatField()
    zoom = models.PositiveIntegerField()
    number_of_trees = models.PositiveIntegerField()
    tile_index = models.PositiveIntegerField()
