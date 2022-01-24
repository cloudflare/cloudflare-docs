---
order: 2
pcx-content-type: reference
---

# Make your first API request

To make your first request to the Images API, you must obtain these pieces of information:

<details>
<summary>Your Cloudflare Account ID</summary>
<div>

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 
1. In the **Overview** app, scroll down to find your Account ID.

</div>
</details>

<details>
<summary>Your Global API Key or API Token</summary>
<div>

Refer to [API tokens](/cloudflare-images/upload-images/api-token).

</div>
</details>

Once you have this information, you are ready to upload your first image to Cloudflare Images using the API:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/:account_tag/images/v1 \
  --header 'Authorization: Bearer :token' \
  --form file=@./YOUR_IMAGE.jpeg
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