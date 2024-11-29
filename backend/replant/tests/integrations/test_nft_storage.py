import io
from unittest import mock

import pytest
from PIL import Image

from replant.integrations import nft_storage
from replant.tests.integrations.consts import SUCCESS_FILEBASE_UPLOAD_IMAGE_RESPONSE


@pytest.fixture
def image_to_upload() -> io.BytesIO:
    size = (800, 600)
    storage = io.BytesIO()
    img = Image.new("RGB", size)
    img.save(storage, "PNG")
    storage.seek(0)
    return storage


@mock.patch("boto3.client")
def test_filebase_upload(
    mock_boto_client: mock.MagicMock,
    image_to_upload: io.BytesIO,
) -> None:
    # mocks
    mock_s3 = mock.MagicMock()
    mock_boto_client.return_value = mock_s3
    mock_s3.put_object.return_value = SUCCESS_FILEBASE_UPLOAD_IMAGE_RESPONSE

    # when
    response = nft_storage.filebase_upload(
        file=nft_storage.FileDto(file_name="red.png", content=image_to_upload)
    )

    # then
    assert response == nft_storage.UploadResponse.model_validate(
        SUCCESS_FILEBASE_UPLOAD_IMAGE_RESPONSE
    )
