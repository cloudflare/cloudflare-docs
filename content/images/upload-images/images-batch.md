---
pcx_content_type: reference
title: Upload via batch API
---

# Upload via batch API

The Images batch API lets you make several requests in sequence while bypassing Cloudflare’s global API rate limits.

To use the Images batch API, you will need to obtain a batch token and use the token to make several requests. The requests authorized by this batch token are made to a separate endpoint and do not count toward the global API rate limits. Each token is subject to a rate limit of 200 requests per second. You can use multiple tokens if you require higher throughput to the Cloudflare Images API.

To obtain a token, you can use the new `images/v1/batch_token` endpoint as shown in the example below.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/batch_token" \
--header "Authorization: Bearer <API_TOKEN>"

# Response:
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
- [Delete an image](https://developers.cloudflare.com/api/operations/cloudflare-images-delete-image) - `DELETE /images/v1/{identifier}`
- [Image details](https://developers.cloudflare.com/api/operations/cloudflare-images-image-details) - `GET /images/v1/{identifier}`
- [Update image](https://developers.cloudflare.com/api/operations/cloudflare-images-update-image) - `PATCH /images/v1/{identifier}`
- [List images V2](https://developers.cloudflare.com/api/operations/cloudflare-images-list-images-v2) - `GET /images/v2`
- [Direct upload V2](https://developers.cloudflare.com/api/operations/cloudflare-images-create-authenticated-direct-upload-url-v-2) - `POST /images/v2/direct_upload`

These options use a different host and a different path with the same method, request, and response bodies.

```bash
---
header: Request for list images V2 against api.cloudflare.com
---
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v2" \
--header "Authorization: Bearer <API_TOKEN>"
```

```bash
---
header: Example request using a batch token
---
curl "https://batch.imagedelivery.net/images/v2" \
--header "Authorization: Bearer <BATCH_TOKEN>"
```
