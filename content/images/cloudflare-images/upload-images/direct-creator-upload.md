---
pcx-content-type: reference
title: Direct Creator Upload
weight: 2
---

# Direct Creator Upload

The Direct Creator Upload feature in Cloudflare Images lets your users upload pictures with a one-time upload URL. By using Direct Creator Upload, you can accept uploads without exposing your API key or token to the client. It also eliminates the need for an intermediary storage bucket and the storage/egress costs associated with it.

To request a one-time upload URL, call the [`direct_upload` endpoint](https://api.cloudflare.com/#cloudflare-images-create-authenticated-direct-upload-url-v2) in your back-end (or Worker script):

```bash
curl --request POST \
 --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v2/direct_upload \
 --header 'Authorization: Bearer :token' \
 --form 'requireSignedURLs=true' \
 --form 'metadata={"key":"value"}'
```

You will receive a response similar to this:

```json
{
  "result": {
    "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
    "uploadURL": "https://upload.imagedelivery.net/2cdc28f0-017a-49c4-9ed7-87056c83901"
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

In the example above, `id` is a future image identifier that will be uploaded by a creator.

{{<Aside type="note" header="Note">}}

Previously, in version 1 of the `direct_upload` endpoint, the ID was an identifier of a request, not an image. Therefore, there was no way to know if an image had been really uploaded.

{{</Aside>}}

With version 2 of `direct_upload`, a new draft image record is created when you invoke this endpoint. It will not appear on a [list of images](https://api.cloudflare.com/#cloudflare-images-list-images), but  it is possible to fetch an image record with the provided ID to check its current status. In the example below, `<Image_ID>` is the `id` received from the response when requesting a one-time upload URL with the `direct_upload` endpoint.

```bash
curl  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID> \
 --header 'Content-Type: application/json' \
 --header 'Authorization: Bearer :token'
```

You will receive a response similar to this:

```json
{
  "result": {
    "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
    "metadata": {
      "key": "value":
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