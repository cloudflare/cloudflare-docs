---
order: 4
pcx-content-type: reference
---

# Delete images

If you want to remove an image from the Cloudflare Images storage, you have two options:

* Delete the image from the [dashboard](https://dash.cloudflare.com?to=/:account/images/images).
* Call the [API endpoint](https://api.cloudflare.com/#cloudflare-images-delete-image) to delete it.

Here is an example of how to delete an image through an API call:

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/:account_id/images/v1/:image_id \
--header 'Authorization: Bearer :token'
```

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