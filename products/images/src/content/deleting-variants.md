---
title: Deleting Variants
order: 5 
---

# Deleting Variants

You can delete variants via API by using a simple cURL command. 

**Please note;** Deleting a variant is a global action that will afect other images that contain that vartiant.

```bash
curl -X DELETE api.cloudflare.com/client/v4/account/:account_id/images/v1/variants/:variant_name
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


 
