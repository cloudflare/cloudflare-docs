---
title: DELETE examples
order: 435
---

# DELETE examples

- [Delete multiple rules](#delete-multiple-rules)
- [Delete a single rule](#delete-a-single-rule)

## Delete multiple rules

```bash
DELETE zones/{zone_id}/firewall/rules
```

### Request

```bash
curl -X DELETE \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules?id=cbf4b7a5a2a24e59a03044d6d44ceb09"
```

<Aside type='note' header='Note'>

`DELETE` does not delete any filter related to the firewall rule. To delete the filter, it's necessary to call the `/filters` API.

</Aside>

### Response

```json
{
  "result": [],
  "success": true,
  "errors": null,
  "messages": null
}
```

## Delete a single rule

```bash
DELETE zones/{zone_id}/firewall/rules/{id}
```

### Request

```bash
curl -X DELETE \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules/cbf4b7a5a2a24e59a03044d6d44ceb09"
```

### Response

```bash
{
  "result": null,
  "success": true,
  "errors": null,
  "messages": null
}
```
