import io

import boto3
import requests
import urllib3
from pydantic import BaseModel, Field
from retry import retry

import env


@retry(delay=1, backoff=2, tries=3)
def upload(files: dict[str, io.StringIO | io.BytesIO], content_type: str):
    # TODO: to be removed
    boundary = urllib3.filepost.choose_boundary()

    headers = {
        "Authorization": f"Bearer {env.NFT_STORAGE_ACCESS_KEY}",
        "Content-Type": f"multipart/form-data; boundary={boundary}",
    }

    # Requests default multipart files handling doesn't work for nft.storage. Building the body manually.
    boundary_line = f"--{boundary}".encode()
    lines: list[bytes] = []
    for filename, file in files.items():
        lines.append(boundary_line)
        lines.append(
            f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode()
        )
        lines.append(f"Content-Type: {content_type}".encode())
        lines.append(b"")
        file_data = file.read()
        if isinstance(file_data, str):
            file_data = file_data.encode()
        lines.append(file_data)
    lines.append(f"--{boundary}--".encode())
    data = b"\n".join(lines)

    response = requests.post(
        f"{env.NFT_STORAGE_API_URL}/upload", headers=headers, data=data
    )

    if response.status_code != 200:
        raise ValueError(f"Upload failed - {response.status_code} {response.text}")

    response_data = response.json()
    return response_data["value"]["cid"]


class UploadResponseHeaders(BaseModel):
    etag: str
    cid: str = Field(alias="x-amz-meta-cid")


class UploadResponseMetadata(BaseModel):
    status_code: int = Field(alias="HTTPStatusCode")
    headers: UploadResponseHeaders = Field(alias="HTTPHeaders")


class UploadResponse(BaseModel):
    metadata: UploadResponseMetadata = Field(alias="ResponseMetadata")


@retry(delay=1, backoff=2, tries=3)
def filebase_upload(files: dict[str, io.StringIO | io.BytesIO]) -> list[UploadResponse]:
    s3 = boto3.client(
        service_name="s3",
        endpoint_url=env.NFT_STORAGE_API_URL,
        aws_access_key_id=env.NFT_STORAGE_ACCESS_KEY,
        aws_secret_access_key=env.NFT_STORAGE_SECRET_ACCESS_KEY,
    )
    responses: list[UploadResponse] = []
    for filename, file in files.items():
        upload_resposne = s3.put_object(
            Body=file, Bucket=env.NFT_STORAGE_BUCKET_NAME, Key=filename
        )
        responses.append(UploadResponse.model_validate(upload_resposne))
    return responses


class ObjectContent(BaseModel):
    etag: str = Field(alias="ETag")
    key: str = Field(alias="Key")


class ListObjectsResponse(BaseModel):
    contents: list[ObjectContent] = Field(alias="Contents")


def list_objects() -> ListObjectsResponse:
    s3 = boto3.client(
        service_name="s3",
        endpoint_url=env.NFT_STORAGE_API_URL,
        aws_access_key_id=env.NFT_STORAGE_ACCESS_KEY,
        aws_secret_access_key=env.NFT_STORAGE_SECRET_ACCESS_KEY,
    )
    list_response = s3.list_objects(Bucket=env.NFT_STORAGE_BUCKET_NAME)
    return ListObjectsResponse.model_validate(list_response)
