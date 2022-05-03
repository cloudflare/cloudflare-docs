---
pcx-content-type: reference
title: URL upload
weight: 3
meta:
  title: Upload via URL
---

# Upload via URL

Sometimes it can be useful to use a URL of an image instead of uploading its data. To accommodate this need, Cloudflare Images provides an option to use a URL to migrate images to Cloudflare without fetching them first.

To learn more about the supported image formats you can upload, refer to [Supported image formats](/images/cloudflare-images/upload-images/supported-formats).

Below is an example of how to use the upload via URL feature:

```bash
curl --request POST \
 --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1 \
 --header 'Authorization: Bearer :token' \
 --form 'url=https://[user:password@]example.com/<PATH_TO_IMAGE>' \
 --form 'metadata={"key":"value"}' \
 --form 'requireSignedURLs=false' 
```

You will then receive a response similar to this:

```json
{
 "result": {
   "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
   "filename": "image.jpeg",
   "metadata": {
     "key": "value":
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

If your origin server returns an error while fetching the images, the API response will return a `4xx` error.

Refer to [Upload an image using a single HTTP request](https://api.cloudflare.com/#cloudflare-images-upload-an-image-using-a-single-http-request) for more information.

{{<Aside type="note" header="Note">}}

The `--form 'file='` and `--form 'url='` fields are mutually exclusive.

{{</Aside>}}