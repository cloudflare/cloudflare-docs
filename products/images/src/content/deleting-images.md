---
title: Deleting Images
order: 4  
---

# Deleting Images

If you want to remove an image from your Cloudflare storage that is associated with your account, you have two options:

- API to delete an image
- API to delete a variant

To delete an image simply make a call via API:

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
 
To delete a variant you need to make the call via API and specify the name of the variant at the end of the api URL. See below:

```bash
curl -X DELETE api.cloudflare.com/client/v4/account/<account_tag>/images/v1/variants/mobile
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
