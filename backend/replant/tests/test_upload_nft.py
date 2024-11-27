from unittest import mock

from django.core.files.uploadedfile import SimpleUploadedFile
from model_bakery import baker

from replant.models.tree import Tree
from replant.nft import _upload_images as upload_images
from replant.tests.integrations.consts import CID, SUCCESS_FILEBASE_UPLOAD_RESPONE


@mock.patch("boto3.client")
def test_upload_images(
    mock_boto_client: mock.MagicMock, simple_uploaded_file: SimpleUploadedFile
) -> None:
    # mocks
    mock_s3 = mock.MagicMock()
    mock_boto_client.return_value = mock_s3
    mock_s3.put_object.return_value = SUCCESS_FILEBASE_UPLOAD_RESPONE

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
    assert tree_to_upload.image_cid == CID
