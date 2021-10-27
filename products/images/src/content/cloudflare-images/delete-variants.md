---
order: 5
pcx-content-type: reference
---

# Delete variants

You can delete variants via API with a simple cURL command. 

<Aside type="warning" header="Warning">

Deleting a variant is a global action that will affect other images that contain that variant.

</Aside>


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