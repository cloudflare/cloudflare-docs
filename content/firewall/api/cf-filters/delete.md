---
title: DELETE examples
pcx-content-type: reference
weight: 476
---

# DELETE examples

## Delete multiple filters

This example deletes filters with IDs `<FILTER_ID_1>` and `<FILTER_ID_2>`.

```bash
---
header: Request
---
curl -X DELETE \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters?id=<FILTER_ID_1>&id=<FILTER_ID_2>" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": [
    {
      "id": "<FILTER_ID_1>"
    },
    {
      "id": "<FILTER_ID_2>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
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
  "result": [
    {
      "id": "<FILTER_ID>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```
