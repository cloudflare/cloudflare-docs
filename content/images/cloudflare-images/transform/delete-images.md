---
pcx_content_type: reference
title: Delete images
weight: 5
---

# Delete images

You can delete an image from the Cloudflare Images storage using the dashboard or the API.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Select **Images**.
3. Find the image you want to remove and select **Delete**.
4. (Optional) If you want to delete more than one image, select the checkbox next to the images you want to delete and then **Delete selected**.

Your image(s) will be deleted from your account.

{{</tab>}}
{{<tab label="api" no-code="true">}}

For detailed information on using the API, refer to the [API endpoint](/api/operations/cloudflare-images-delete-image) documentation.

Here is an example of how to delete an image through an API call:

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1/<IMAGE_ID> \
--header 'Authorization: Bearer <API_TOKEN>'
```

`<IMAGE_ID>` must be fully URL encoded in the API call URL.

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

{{</tab>}}
{{</tabs>}}