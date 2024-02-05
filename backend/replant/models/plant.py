import uuid
from enum import auto

from django.core.validators import MinValueValidator
from django.db import models
from django_fsm import FSMField

from .utils import TrackableModel


class Plant(TrackableModel):
    class ReviewState(models.TextChoices):
        PENDING = auto()
        APPROVED = auto()
        REJECTED = auto()

    def image_upload_to(self, filename: str) -> str:
        _, ext = filename.rsplit(".", 1)
        return f"{uuid.uuid4().hex}.{ext}"

    review_state = FSMField(choices=ReviewState.choices, default=ReviewState.PENDING)
    image = models.ImageField(upload_to=image_upload_to)  # type: ignore
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    planting_organization = models.ForeignKey(
        "replant.PlantingOrganization",
        on_delete=models.PROTECT,
        verbose_name="planting organization / community",
    )
    country = models.ForeignKey("replant.Country", on_delete=models.PROTECT)
    species = models.ForeignKey("replant.Species", on_delete=models.PROTECT)
    is_native = models.BooleanField()
    planting_cost_usd = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name="planting cost USD",
        validators=[MinValueValidator(0)],
    )

    def __str__(self):
        return str(self.pk)
