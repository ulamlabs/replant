import logging

from admin_auto_filters.filters import AutocompleteFilterFactory
from django.contrib import admin, messages
from django.db import models
from django.http.request import HttpRequest

from replant.models import TreeToMint

from .tree import TreeAdmin

logger = logging.getLogger(__name__)


@admin.register(TreeToMint)
class TreeToMintAdmin(TreeAdmin):
    actions = ("mint_nfts",)

    list_filter = [
        AutocompleteFilterFactory(title="Sponsor", base_parameter_name="sponsor"),
        "minting_state",
    ]

    @admin.action(description="Mint NFTs")
    def mint_nfts(self, request: HttpRequest, queryset: models.QuerySet[TreeToMint]):
        queryset.update(minting_state=TreeToMint.MintingState.TO_BE_MINTED)
        messages.success(
            request, f"Marked {queryset.count()} trees to be minted as NFTs."
        )
