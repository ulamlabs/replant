import io
from dataclasses import dataclass

import boto3
from pydantic import BaseModel, Field
from retry import retry

import env


class UploadResponseHeaders(BaseModel):
    etag: str
    cid: str = Field(alias="x-amz-meta-cid")


class UploadResponseMetadata(BaseModel):
    status_code: int = Field(alias="HTTPStatusCode")
    headers: UploadResponseHeaders = Field(alias="HTTPHeaders")


class UploadResponse(BaseModel):
    metadata: UploadResponseMetadata = Field(alias="ResponseMetadata")


@dataclass
class FileDto:
    file_name: str
    content: io.BytesIO


@retry(delay=1, backoff=2, tries=3)
def filebase_upload(file: FileDto) -> UploadResponse:
    s3 = boto3.client(
        service_name="s3",
        endpoint_url=env.NFT_STORAGE_API_URL,
        aws_access_key_id=env.NFT_STORAGE_ACCESS_KEY,
        aws_secret_access_key=env.NFT_STORAGE_SECRET_ACCESS_KEY,
    )
    upload_resposne = s3.put_object(
        Body=file.content, Bucket=env.NFT_STORAGE_BUCKET_NAME, Key=file.file_name
    )
    return UploadResponse.model_validate(upload_resposne)
