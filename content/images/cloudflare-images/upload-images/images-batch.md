---
pcx_content_type: reference
title: Images batch API
---

# Images batch API

The Images batch API lets you make several requests in sequence while bypassing Cloudflare’s global API rate limits. 

To use the Images batch API, you will need to obtain a batch token and use the token to make several requests. The requests authorized by this batch token are made to a separate endpoint and do not count toward the global API rate limits.

To obtain a token, you can use the new `images/v1/batch_token` endpoint as shown in the example below.

```bash
$ curl -H "Authorization: Bearer <CLOUDFLARE_API_TOKEN>" \
  "https://api.cloudflare.com/client/v4/accounts/ACCOUNT_ID/images/v1/batch_token"

{
  "result": {
    "token": "<BATCH_TOKEN>",
    "expiresAt": "2023-08-09T15:33:56.273411222Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

After getting your token, you can use it to make requests for:

- [Upload an image](https://developers.cloudflare.com/api/operations/cloudflare-images-upload-an-image-via-url) - `POST /images/v1`
- [Image details](https://developers.cloudflare.com/api/operations/cloudflare-images-image-details) - `GET /images/v1/{identifier}`
- [Update image](https://developers.cloudflare.com/api/operations/cloudflare-images-update-image) - `PATCH /images/v1/{identifier}`
- [List images V2](https://developers.cloudflare.com/api/operations/cloudflare-images-list-images-v2) - `GET /images/v2`
- [Direct upload V2](https://developers.cloudflare.com/api/operations/cloudflare-images-create-authenticated-direct-upload-url-v-2) - `POST /images/v2/direct_upload`

These options use a different host and a different path with the same method, request, and response bodies. 

```bash
---
header: Request for list images V2 against api.cloudflare.com
---
$ curl -H "Authorization: Bearer <CLOUDFLARE_API_TOKEN>" \
  "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v2"
```

```bash
---
header: Example request using a batch token
---
$ curl -H "Authorization: Bearer <BATCH_TOKEN>" \
  "https://batch.imagedelivery.net/images/v2"
```
