import io

import requests
import urllib3
from retry import retry

import env


@retry(delay=1, backoff=2, tries=3)
def upload(files: dict[str, io.StringIO | io.BytesIO], content_type: str):
    boundary = urllib3.filepost.choose_boundary()

    headers = {
        "Authorization": f"Bearer {env.NFT_STORAGE_API_KEY}",
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
