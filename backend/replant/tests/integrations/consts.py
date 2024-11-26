ETAG = "9877fb047b1ecf0f11ce8aed19d5383f"
CID = "QmaCXeB47QmjgcpoVV4PzfVZBTbL7jbZyfUdo6oSvTbTpr"
SUCCESS_FILEBASE_UPLOAD_RESPONE = {
    "ResponseMetadata": {
        "RequestId": "33c09fa0bcb31954115733cfe4f49222",
        "HostId": "ZmlsZWJhc2UtN2RiNGNjY2ZmNy10aHI4dw==",
        "HTTPStatusCode": 200,
        "HTTPHeaders": {
            "date": "Tue, 26 Nov 2024 11:04:19 GMT",
            "content-type": "image/png",
            "content-length": "0",
            "connection": "keep-alive",
            "etag": ETAG,
            "x-amz-meta-cid": CID,
            "x-amz-request-id": "33c09fa0bcb31954115733cfe4f49222",
            "x-amz-id-2": "ZmlsZWJhc2UtN2RiNGNjY2ZmNy10aHI4dw==",
            "strict-transport-security": "max-age=63072000; includeSubDomains",
            "server": "Filebase",
        },
        "RetryAttempts": 0,
    },
    "ETag": ETAG,
}

SUCCESS_LIST_OBJECTS_RESPONSE = {
    "ResponseMetadata": {
        "RequestId": "44bbb55335fe7a3f948c425618908d60",
        "HostId": "ZmlsZWJhc2UtN2RiNGNjY2ZmNy1iZDVyeg==",
        "HTTPStatusCode": 200,
        "HTTPHeaders": {
            "date": "Tue, 26 Nov 2024 12:02:34 GMT",
            "content-type": "application/xml; charset=utf-8",
            "content-length": "658",
            "connection": "keep-alive",
            "x-amz-bucket-region": "us-east-1",
            "etag": 'W/"78c5f07126e78bc55c0b40266fc1c575"',
            "x-amz-request-id": "44bbb55335fe7a3f948c425618908d60",
            "x-amz-id-2": "ZmlsZWJhc2UtN2RiNGNjY2ZmNy1iZDVyeg==",
            "strict-transport-security": "max-age=63072000; includeSubDomains",
            "server": "Filebase",
        },
        "RetryAttempts": 0,
    },
    "IsTruncated": False,
    "Marker": "",
    "Contents": [
        {
            "Key": "test_file.png",
            "ETag": ETAG,
            "Size": 2,
            "StorageClass": "STANDARD",
            "Owner": {
                "DisplayName": "support@replantworld.io",
                "ID": "62c00bc83428c4093c666c463048259aa6692383c97e4b5d1d8a96369ba12f3d",
            },
        }
    ],
    "Name": "replant",
    "Prefix": "",
    "MaxKeys": 1000,
    "EncodingType": "url",
}
