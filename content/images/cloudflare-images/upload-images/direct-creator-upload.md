---
pcx_content_type: reference
title: Direct Creator Upload
weight: 2
---

# Direct Creator Upload

The Direct Creator Upload feature in Cloudflare Images lets your users upload images with a one-time upload URL. By using Direct Creator Upload, you can accept uploads without exposing [your API key or token](/images/cloudflare-images/api-request/) to the client. It also eliminates the need for an intermediary storage bucket and the storage/egress costs associated with it.

To request a one-time upload URL, call the [`v2/direct_upload` endpoint](/api/operations/cloudflare-images-create-authenticated-direct-upload-url-v-2) in your back-end (or Worker script):

```bash
curl --request POST \
 --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v2/direct_upload \
 --header 'Authorization: Bearer <API_TOKEN>' \
 --form 'requireSignedURLs=true' \
 --form 'metadata={"key":"value"}'
```

You will receive a response similar to this:

```json
{
  "result": {
    "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
    "uploadURL": "https://upload.imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901"
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

In the example above, `id` is a future image identifier that will be uploaded by a creator.

A new draft image record is created when you invoke this endpoint. It will not appear on a [list of images](/api/operations/cloudflare-images-list-images), but  it is possible to fetch an image record with the provided ID to check its current status. In the example below, `<IMAGE_ID>` is the `id` received from the response when requesting a one-time upload URL with the `direct_upload` endpoint.

```bash
curl  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID> \
 --header 'Content-Type: application/json' \
 --header 'Authorization: Bearer <API_TOKEN>'
```

You will receive a response similar to this:

```json
{
  "result": {
    "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
    "metadata": {
      "key": "value"
    },
    "uploaded": "2022-01-31T16:39:28.458Z",
    "requireSignedURLs": true,
    "variants": [
      "https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/public",
      "https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/thumbnail" 
    ],
    "draft": true
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Once the image data is uploaded, the `draft` property will change to `false` and will not be part of the response anymore.

Your back-end endpoint should return the `uploadURL` property to the client, enabling it to upload the image without needing to pass any authentication information with it. Here is an example of a simple HTML page that takes a one-time upload URL and uploads any image the user selects:

```html
<html>
 <body>
   <form
     action="INSERT_UPLOAD_URL_HERE"
     method="post"
     enctype="multipart/form-data"
   >
     <input type="file" id="myFile" name="file" />
     <input type="submit" />
   </form>
 </body>
</html>
```

By default, the `uploadURL` will expire after 30 minutes if unused.

To override this option, add the following argument to the cURL command:

```bash
--data '{"expiry":"2021-09-14T16:00:00Z"}'
```

The expiry value must be a minimum of two minutes and maximum of six hours in the future.

## Direct Creator Upload with Custom ID

You can specify a [custom ID](/images/cloudflare-images/upload-images/custom-id/) when first requesting a one-time upload URL, instead of using the automatically generated ID for your image.

To do so, pass a form field of name `id` with the corresponding custom ID value to the cURL command:

```bash
--form 'id=this/is/my-customid'
```

Note that images with a [custom ID](/images/cloudflare-images/upload-images/custom-id/) cannot be made private with the [signed URL tokens](/images/cloudflare-images/serve-images/serve-private-images-using-signed-url-tokens/) feature (`--requireSignedURLs=true`).
