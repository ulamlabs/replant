from unittest import mock

import boto3
import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from model_bakery import baker

import env
from replant.models.sponsor import Sponsor
from replant.models.tree import Tree
from replant.nft import _upload_images as upload_images
from replant.nft import _upload_metadatas as upload_metadatas
from replant.tests.integrations.consts import (
    IMAGE_CID,
    METADATA_CID,
    SUCCESS_FILEBASE_UPLOAD_IMAGE_RESPONSE,
    SUCCESS_FILEBASE_UPLOAD_METADATA_RESPONSE,
)


@mock.patch("boto3.client")
def test_upload_images(
    mock_boto_client: mock.MagicMock, simple_uploaded_file: SimpleUploadedFile
) -> None:
    # mocks
    mock_s3 = mock.MagicMock()
    mock_boto_client.return_value = mock_s3
    mock_s3.put_object.return_value = SUCCESS_FILEBASE_UPLOAD_IMAGE_RESPONSE

    # given
    tree_to_upload = baker.make(
        Tree,
        nft_id=1,
        image_cid="",
        image=simple_uploaded_file,
        minting_state=Tree.MintingState.TO_BE_MINTED,
    )

    # when
    upload_images(trees=[tree_to_upload])

    # then
    tree_to_upload.refresh_from_db()
    assert tree_to_upload.image_cid == IMAGE_CID


@mock.patch("boto3.client")
def test_upload_metadata(
    mock_boto_client: mock.MagicMock, simple_uploaded_file: SimpleUploadedFile
) -> None:
    # mocks
    mock_s3 = mock.MagicMock()
    mock_boto_client.return_value = mock_s3
    mock_s3.put_object.return_value = SUCCESS_FILEBASE_UPLOAD_METADATA_RESPONSE

    # given
    sponsor = baker.make(Sponsor)
    tree_to_upload = baker.make(
        Tree,
        sponsor=sponsor,
        nft_id=1,
        image_cid="",
        metadata_cid="",
        image=simple_uploaded_file,
        minting_state=Tree.MintingState.TO_BE_MINTED,
    )
    tree_to_upload.refresh_from_db()

    # when
    upload_metadatas(trees=[tree_to_upload])

    # then
    tree_to_upload.refresh_from_db()
    assert tree_to_upload.metadata_cid == METADATA_CID


@pytest.mark.live_request
def test_upload_live(simple_uploaded_file: SimpleUploadedFile) -> None:
    # given
    sponsor = baker.make(Sponsor)
    tree_to_upload = baker.make(
        Tree,
        sponsor=sponsor,
        nft_id=1,
        image_cid="",
        metadata_cid="",
        image=simple_uploaded_file,
        minting_state=Tree.MintingState.TO_BE_MINTED,
    )
    tree_to_upload.refresh_from_db()

    # when & then
    upload_images(trees=[tree_to_upload])
    assert tree_to_upload.image_cid

    upload_metadatas(trees=[tree_to_upload])
    assert tree_to_upload.metadata_cid

    # cleanup
    s3 = boto3.client(
        service_name="s3",
        endpoint_url=env.NFT_STORAGE_API_URL,
        aws_access_key_id=env.NFT_STORAGE_ACCESS_KEY,
        aws_secret_access_key=env.NFT_STORAGE_SECRET_ACCESS_KEY,
    )
    s3.delete_object(
        Bucket=env.NFT_STORAGE_BUCKET_NAME, Key=f"{tree_to_upload.nft_id}.png"
    )
    s3.delete_object(
        Bucket=env.NFT_STORAGE_BUCKET_NAME, Key=f"{tree_to_upload.nft_id}.json"
    )
