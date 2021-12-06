---
order: 1
pcx-content-type: reference
---

# Cloudflare Images

Cloudflare Images lets you set up an image pipeline in minutes. Build a scalable image pipeline to store, resize, optimize and deliver images in a fast and secure manner.

To get started with Cloudflare Images, visit the Images dashboard in your Cloudflare account or [sign up](https://dash.cloudflare.com/sign-up/images).

Images you upload to Cloudflare Images are not attached to any domain in your Cloudflare account and you do not need a domain on Cloudflare to use the Cloudflare Images product.

## Making your first API request

Once you have an Images subscription, to make your first request to the Images API, you must obtain these pieces of information:

- Your Cloudflare Account ID.
- Your Global API Key or API Token.

Once you have this information, you are ready to upload your first image to Cloudflare Images using the API:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/:account_tag/images/v1 \
  --header 'Authorization: Bearer :token' \
  --form file=@./triceratops.jpeg
```

A successful response will look similar to this:

```json
{
  "result": {
    "id": "083eb7b2-5392-4565-b69e-aff66acddd00",
    "filename": "triceratops.jpeg",
    "uploaded": "2021-09-14T05:52:14.767Z",
    "requireSignedURLs": false,
    "variants": [
      "https://imagedelivery.net/ZWd9g1K7eljCn_KDTu_MWA/083eb7b2-5392-4565-b69e-aff66acddd00/test",
      "https://imagedelivery.net/ZWd9g1K7eljCn_KDTu_MWA/083eb7b2-5392-4565-b69e-aff66acddd00/public"
    ]
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```