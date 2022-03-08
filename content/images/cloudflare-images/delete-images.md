---
pcx-content-type: reference
title: Delete images
weight: 7
---

# Delete images

You can delete an image from the Cloudflare Images storage using the dashboard or the API.

## Delete an image using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Click **Images**.
3. Find the image you want to remove and click **Delete**.

## Delete an image using the API

For detailed information on using the API, refer to the [API endpoint](https://api.cloudflare.com/#cloudflare-images-delete-image) documentation.

Here is an example of how to delete an image through an API call:

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID> \
--header 'Authorization: Bearer :token'
```

AUTH METHOD DIFFERS FROM https://api.cloudflare.com/#cloudflare-images-properties X-Auth-Key X-Auth-Email, which one is the right one?

You will receive a response similar to this:

```json
{
  "result": {},
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```
