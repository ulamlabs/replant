import io
import itertools
import json
import logging
import time
from typing import Callable, Sequence

from cosmpy.aerial.wallet import LocalWallet
from django.db import models
from PIL import Image

import env
from replant.integrations import nft_storage
from replant.models import Tree
from replant.sdk import CW721Client, MintInfo, get_sei_client

logger = logging.getLogger(__name__)


GENERATE_ID_BATCH_SIZE = 500

FILE_UPLOAD_BATCH_SIZE = 100

MINT_BATCH_SIZE = 500

THUMBNAIL_SIZE = (512, 1024)

client = get_sei_client(env.SEI_CHAIN_ID, env.SEI_RPC)
cw721 = CW721Client(client, env.SEI_NFT_ADDRESS)
admin = LocalWallet.from_mnemonic(env.SEI_ADMIN_MNEMONIC, "sei")


def mint_scheduled_nfts():
    trees = list(
        Tree.objects.filter(
            minting_state=Tree.MintingState.TO_BE_MINTED
        ).select_related(
            "species",
            "planting_organization",
            "country",
            "created_by",
            "sponsor",
        )
    )

    if len(trees) == 0:
        return

    logger.info(f"Found {len(trees)} NFTs to be minted")

    logger.info("Generating NFT ids...")
    _batch_operation(
        func=_generate_nft_id,
        trees_to_batch=trees,
        batch_size=GENERATE_ID_BATCH_SIZE,
    )

    # Upload images.
    trees_no_image_cid = [tree for tree in trees if not tree.image_cid]
    logger.info(f"{len(trees_no_image_cid)} NFTs need image upload")
    _batch_operation(
        func=_upload_images,
        trees_to_batch=trees_no_image_cid,
        all_trees=trees,
        batch_size=FILE_UPLOAD_BATCH_SIZE,
    )

    # Upload metadata.
    trees_no_metadata_cid = [tree for tree in trees if not tree.metadata_cid]
    logger.info(f"{len(trees_no_metadata_cid)} NFTs need metadata upload")
    _batch_operation(
        func=_upload_metadatas,
        trees_to_batch=trees_no_metadata_cid,
        all_trees=trees,
        batch_size=FILE_UPLOAD_BATCH_SIZE,
    )

    # Mint tokens.
    logger.info(f"{len(trees)} NFTs need minting")
    trees_by_sponsor = itertools.groupby(trees, lambda tree: tree.sponsor)
    for sponsor, sponsor_trees in trees_by_sponsor:
        logger.info(f"Minting for sponsor {sponsor.name}...")
        _batch_operation(
            func=_mint_nfts,
            trees_to_batch=list(sponsor_trees),
            batch_size=MINT_BATCH_SIZE,
        )


def _batch_operation(
    func: Callable[[Sequence[Tree]], None],
    trees_to_batch: Sequence[Tree],
    batch_size: int,
    all_trees: list[Tree] | None = None,
):
    for i in range(0, len(trees_to_batch), batch_size):
        trees_page = trees_to_batch[i : i + batch_size]  # noqa:E203
        logger.info(
            f"Batch {i + 1} - {min(i + batch_size, len(trees_to_batch))} / {len(trees_to_batch)}..."
        )
        try:
            func(trees_page)
        except Exception as err:
            logger.exception(err)
            tree_ids = [p.id for p in trees_page]
            Tree.objects.filter(id__in=tree_ids).update(
                minting_state=Tree.MintingState.FAILED
            )
            if all_trees:
                # Exclude failed trees from further processing.
                for tree in trees_page:
                    all_trees.remove(tree)


def _generate_nft_id(trees: Sequence[Tree]):
    last_id = Tree.objects.aggregate(models.Max("nft_id"))["nft_id__max"] or 0

    to_update: list[Tree] = []
    for tree in trees:
        if tree.nft_id:
            continue
        last_id += 1
        tree.nft_id = last_id
        to_update.append(tree)

    Tree.objects.bulk_update(to_update, ["nft_id"])


def _upload_images(trees: Sequence[Tree]):
    streams: dict[str, io.BytesIO | io.StringIO] = {}

    for tree in trees:
        assert tree.nft_id
        assert tree.image.file
        original_stream = io.BytesIO(tree.image.file.read())
        image = Image.open(original_stream)
        image.thumbnail(THUMBNAIL_SIZE)

        stream = io.BytesIO()
        image.save(stream, "JPEG")
        stream.seek(0)

        streams[f"{tree.nft_id}.jpeg"] = stream

    cid = nft_storage.upload(streams, content_type="image/jpeg")

    for tree in trees:
        tree.image_cid = cid

    Tree.objects.bulk_update(trees, ["image_cid"])


def _upload_metadatas(trees: Sequence[Tree]):
    streams: dict[str, io.BytesIO | io.StringIO] = {}

    for tree in trees:
        assert tree.nft_id
        metadata = _get_nft_metadata(tree)
        stream = io.StringIO(json.dumps(metadata))
        streams[f"{tree.nft_id}.json"] = stream

    cid = nft_storage.upload(streams, content_type="application/json")

    for tree in trees:
        tree.metadata_cid = cid

    Tree.objects.bulk_update(trees, ["metadata_cid"])


def _get_nft_metadata(tree: Tree):
    return {
        "edition": 1,
        "symbol": "RPLNT",
        "collection": "Replant World",
        "name": tree.species.common_name,
        "description": "https://replantworld.io",
        "image": tree.ipfs_image_url,
        "attributes": [
            {"trait_type": "Botanical Name", "value": tree.species.botanical_name},
            {"trait_type": "Country", "value": tree.country.name},
            {"trait_type": "Longitude", "value": str(tree.longitude)},
            {"trait_type": "Latitude", "value": str(tree.latitude)},
            {
                "trait_type": "Is Native",
                "value": "Yes" if tree.is_native else "No",
            },
            {
                "trait_type": "Org/Community",
                "value": tree.planting_organization.name,
            },
            {"trait_type": "planter", "value": tree.created_by.get_username()},
            {"trait_type": "Date planted", "value": str(tree.created_at.date())},
            {"trait_type": "Sponsor", "value": tree.sponsor.name},
            {
                "trait_type": "planting Cost",
                "value": f"${tree.planting_cost_usd}",
            },
        ],
    }


def _mint_nfts(trees: Sequence[Tree]):
    # Can only set 1 owner when using multi-mint.
    assert len(set(tree.sponsor for tree in trees)) == 1

    tokens: list[MintInfo] = []
    for tree in trees:
        assert tree.nft_id
        assert tree.ipfs_metadata_url
        tokens.append(
            {
                "token_id": str(tree.nft_id),
                "token_uri": tree.ipfs_metadata_url,
            }
        )

    tx = cw721.multi_mint(
        admin=admin,
        owner=tree.sponsor.wallet_address,
        tokens=tokens,
    )
    logger.info(f"NFTs minted. TX: {tx.tx_hash}")

    tree_ids = [tree.pk for tree in trees]
    Tree.objects.filter(id__in=tree_ids).update(
        minting_state=Tree.MintingState.MINTED,
        nft_mint_tx=tx.tx_hash,
    )

    # Wait for account sequence to update.
    time.sleep(1)
