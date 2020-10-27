---
title: DELETE examples
order: 475
---

# DELETE examples

- [Delete multiple filters](#delete-multiple-filters)
- [Delete a single filter](#delete-a-single-filter)

## Delete multiple filters

```bash
DELETE zones/{zone_id}/filters
```

### Request

```bash
curl -X DELETE -H "X-Auth-Email: user@cloudflare.com" -H "X-Auth-Key: REDACTED" "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters?id=60ee852f9cbb4802978d15600c7f3110"
```

### Response

```json
{
  "result": [],
  "success": true,
  "errors": null,
  "messages": null
}
```

## Delete a single filter

```bash
DELETE zones/{zone_id}/filters/{id}
```

### Request

```bash
curl -X DELETE -H "X-Auth-Email: user@cloudflare.com" -H "X-Auth-Key: REDACTED" "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters/60ee852f9cbb4802978d15600c7f3110"
```

### Response

```json
{
  "result": null,
  "success": true,
  "errors": null,
  "messages": null
}
```
