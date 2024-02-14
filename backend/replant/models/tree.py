import uuid
from enum import auto
from typing import TYPE_CHECKING

from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import Count
from django_fsm import FSMField

from .utils import TrackableModel

if TYPE_CHECKING:
    from .user import User


class TreeManager(models.Manager):
    def get_review_state_count(self, user: "User"):
        return (
            self.get_queryset()
            .filter(created_by=user)
            .values("review_state")
            .annotate(review_state_count=Count("review_state"))
        )

    def only_awaiting_sponsor(self):
        return self.filter(
            review_state=Tree.ReviewState.APPROVED,
            sponsor__isnull=True,
        )


class Tree(TrackableModel):
    class ReviewState(models.TextChoices):
        PENDING = auto()
        APPROVED = auto()
        REJECTED = auto()

    class MintingState(models.TextChoices):
        PENDING = auto()
        TO_BE_MINTED = auto()
        MINTED = auto()
        FAILED = auto()

    class Meta:
        indexes = [
            models.Index(fields=["review_state"]),
            models.Index(fields=["minting_state"]),
        ]

    def image_upload_to(self, filename: str) -> str:
        _, ext = filename.rsplit(".", 1)
        return f"{uuid.uuid4().hex}.{ext}"

    review_state = FSMField(choices=ReviewState.choices, default=ReviewState.PENDING)
    rejection_reason = models.CharField(max_length=100, default="", blank=True)
    minting_state = FSMField(choices=MintingState.choices, default=MintingState.PENDING)
    image = models.ImageField(upload_to=image_upload_to)  # type: ignore
    image_cid = models.URLField(max_length=128, default="", blank=True)
    metadata_cid = models.URLField(max_length=128, default="", blank=True)
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
    sponsor = models.ForeignKey(
        "replant.Sponsor", null=True, blank=True, on_delete=models.PROTECT
    )

    nft_id = models.PositiveIntegerField(
        unique=True, null=True, blank=True, db_index=True
    )
    nft_mint_tx = models.CharField(max_length=64, default="", blank=True)

    objects: TreeManager = TreeManager()

    def __str__(self):
        return str(self.pk)

    @property
    def ipfs_image_url(self):
        return ipfs_url(self.image_cid, self.nft_id, "jpeg")

    @property
    def ipfs_metadata_url(self):
        return ipfs_url(self.metadata_cid, self.nft_id, "json")


def ipfs_url(cid: str, nft_id: int, extension: str) -> str:
    if cid:
        return f"https://{cid}.ipfs.nftstorage.link/{nft_id}.{extension}"
    return ""
