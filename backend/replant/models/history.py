from enum import auto

from django.db import models


class History(models.Model):
    class Meta:
        verbose_name = "History log"
        verbose_name_plural = "History"

    class EventType(models.TextChoices):
        MINTING_SUCCEED = auto()
        MINTING_FAILED = auto()

    event_type = models.CharField(max_length=32, choices=EventType.choices)

    created_at = models.DateTimeField(auto_now_add=True)

    message = models.TextField(blank=True)

    details = models.TextField(blank=True)
