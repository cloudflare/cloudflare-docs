---
pcx-content-type: reference
title: Make your first API request
weight: 3
---

# Make your first API request

To make your first request to the Images API, you must obtain these pieces of information:

<details>
<summary>Your Cloudflare Account ID</summary>
<div>

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your
account and website.
2. In **Overview**, scroll down to find your Account ID.

</div>
</details>

<details>
<summary>Your Global API Key or API Token</summary>
<div>

Refer to [Creating API tokens](/api/tokens/create/#getting-started) to learn how to create a custom token.

</div>
</details>

Once you have this information, you are ready to upload your first image to Cloudflare Images using the API. In the following example, the `-F` flag is used to upload images from your local computer:

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1" \
  -H "Authorization: Bearer <API_TOKEN>" \
  -F file=@./<YOUR_IMAGE.IMG>
```

Refer to [Upload images](/images/cloudflare-images/upload-images/) for a complete overview of the different options to upload images with the API.

After uploading your images, a successful response will look similar to this:

```json
{
  "result": {
    "id": "<IMAGE_ID>",
    "filename": "<IMAGE.IMG>",
    "uploaded": "2021-09-14T05:52:14.767Z",
    "requireSignedURLs": false,
    "variants": [
      "https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>"
    ]
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

The response has details regarding the image you uploaded, such as its ID as well as the default `public` variant URL. In the above example, the `public` variant would show as `https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/public`.

After you [set up other variants](/images/cloudflare-images/resize-images/) in your account, the `"variants"` property in the response will show the URLs for them:

```json
{
  "result": {
    "id": "<IMAGE_ID>",
    "filename": "<IMAGE.IMG>",
    "uploaded": "2021-09-14T05:52:14.767Z",
    "requireSignedURLs": false,
    "variants": [
      "https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/public",
      "https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME_1>",
      "https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME_2>"
    ]
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

You can use the URLs in the `"variants"` property of the response to [serve images](/images/cloudflare-images/serve-images/) from your Cloudflare Images account.