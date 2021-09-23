---
order: 4  
---

# Deleting Images

If you want to remove an image from the Cloudflare Images storage, you have two options:

* Delete from the [dashboard](https://dash.cloudflare.com?to=/:account/images/images)
* Call the [API endpoint](https://api.cloudflare.com/#cloudflare-images-delete-image)

To delete an image through the API simply make a call like so:

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/account/:account_id/images/v1/:image_id \
--header 'Authorization: Bearer :token'
```

You will receive a response similar to this:

```json
{
  "result": {},
  "success": true,
  "errors": [],
  "messages": []
}
``` 
 
