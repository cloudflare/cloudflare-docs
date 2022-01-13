---
title: DELETE examples
pcx-content-type: reference
order: 475
---

# DELETE examples

- [Delete multiple filters](#delete-multiple-filters)
- [Delete a single filter](#delete-a-single-filter)

## Delete multiple filters

```txt
DELETE zones/<ZONE_ID>/filters
```

### Request

```bash
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters?id=<FILTER_ID>" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>" 
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

```txt
DELETE zones/<ZONE_ID>/filters/<FILTER_ID>
```

### Request

```bash
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters/<FILTER_ID>"
  -H "X-Auth-Email: <EMAIL>" 
  -H "X-Auth-Key: <API_KEY>" 
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
