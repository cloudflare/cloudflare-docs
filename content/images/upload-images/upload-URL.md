---
pcx_content_type: how-to
title: Upload via URL
weight: 3
---

# Upload via URL

Before you upload an image, check the list of [supported formats and dimensions](/images/upload-images/#supported-image-formats) to confirm your image will be accepted.

You can use the Images API to use a URL of an image instead of uploading the data. 

Make a `POST` request using the example below as reference. Keep in mind that the `--form 'file=<FILE>'` and `--form 'url=<URL>'` fields are mutually exclusive.

```bash
curl --request POST \
--url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1 \
--header 'Authorization: Bearer <API_TOKEN>' \
--form 'url=https://[user:password@]example.com/<PATH_TO_IMAGE>' \
--form 'metadata={"key":"value"}' \
--form 'requireSignedURLs=false'
```

After successfully uploading the image, you will receive a response similar to the example below.

```json
{
    "result": {
        "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
        "filename": "image.jpeg",
        "metadata": {
            "key": "value"
        },
        "uploaded": "2022-01-31T16:39:28.458Z",
        "requireSignedURLs": false,
        "variants": [
                "https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/public","https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/thumbnail"
        ]
    },
    "success": true,
    "errors": [],
    "messages": []
}
```

If your origin server returns an error while fetching the images, the API response will return a 4xx error.
