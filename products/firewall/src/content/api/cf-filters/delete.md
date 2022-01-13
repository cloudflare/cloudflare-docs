---
title: DELETE examples
pcx-content-type: reference
order: 475
---

# DELETE examples

- [Delete multiple filters](#delete-multiple-filters)
- [Delete a single filter](#delete-a-single-filter)

## Delete multiple filters

```bash
---
header: Request
---
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters?id=<FILTER_ID>" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>" 
```

```json
---
header: Response
---
{
  "result": [],
  "success": true,
  "errors": null,
  "messages": null
}
```

## Delete a single filter

This example deletes a single filter with ID `<FILTER_ID>`.

```bash
---
header: Request
---
curl -X DELETE \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters/<FILTER_ID>"
  -H "X-Auth-Email: <EMAIL>" 
  -H "X-Auth-Key: <API_KEY>" 
```

```json
---
header: Response
---
{
  "result": null,
  "success": true,
  "errors": null,
  "messages": null
}
```
