import io
from unittest import mock

import pytest
from PIL import Image

from replant.integrations import nft_storage
from replant.tests.integrations.consts import (
    SUCCESS_FILEBASE_UPLOAD_RESPONE,
    SUCCESS_LIST_OBJECTS_RESPONSE,
)


@pytest.fixture
def image() -> io.BytesIO:
    size = (800, 600)
    storage = io.BytesIO()
    img = Image.new("RGB", size)
    img.save(storage, "PNG")
    storage.seek(0)
    return storage


class TestFilebaseUpload:
    @mock.patch("boto3.client")
    def test_filebase_upload_success(
        self, mock_boto_client: mock.MagicMock, image: io.BytesIO
    ) -> None:
        # mocks
        mock_s3 = mock.MagicMock()
        mock_boto_client.return_value = mock_s3
        mock_s3.put_object.return_value = SUCCESS_FILEBASE_UPLOAD_RESPONE

        # when
        responses = nft_storage.filebase_upload(files={"test_file.png": image})

        # then
        assert responses == [
            nft_storage.UploadResponse.model_validate(SUCCESS_FILEBASE_UPLOAD_RESPONE)
        ]

    @mock.patch("boto3.client")
    def test_list_objects(self, mock_boto_client: mock.MagicMock) -> None:
        # mocks
        mock_s3 = mock.MagicMock()
        mock_boto_client.return_value = mock_s3
        mock_s3.list_objects.return_value = SUCCESS_LIST_OBJECTS_RESPONSE

        # when
        list_response = nft_storage.list_objects()

        # then
        assert list_response == nft_storage.ListObjectsResponse.model_validate(
            SUCCESS_LIST_OBJECTS_RESPONSE
        )
