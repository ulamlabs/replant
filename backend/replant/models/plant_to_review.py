from django.db import models

from .plant import Plant


class PlantToReviewManager(models.Manager):
    def get_queryset(self):
        return Plant.objects.filter(review_state=Plant.ReviewState.PENDING)


class PlantToReview(Plant):
    class Meta:
        proxy = True
        verbose_name_plural = "plants to review"

    objects: PlantToReviewManager = PlantToReviewManager()  # type: ignore
