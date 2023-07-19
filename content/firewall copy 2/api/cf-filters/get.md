---
title: GET examples
pcx_content_type: reference
weight: 5
---

# GET examples

## Get all filters

This example returns all filters in zone with ID `<ZONE_ID>`.

```bash
---
header: Request
---
curl -X GET \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters" \
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
      "id": "<FILTER_ID_1>",
      "paused": false,
      "description": "Login from office",
      "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    },
    {
      "id": "<FILTER_ID_2>",
      "paused": false,
      "description": "Login",
      "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    },
    {
      "id": "<FILTER_ID_3>",
      "paused": false,
      "description": "not /api",
      "expression": "not http.request.uri.path matches \"^/api/.*$\""
    },
    {
      "id": "<FILTER_ID_4>",
      "paused": false,
      "description": "/api",
      "expression": "http.request.uri.path matches \"^/api/.*$\""
    },
    {
      "id": "<FILTER_ID_5>",
      "paused": false,
      "expression": "ip.src eq 93.184.216.0"
    }
  ],
  "success": true,
  "errors": [],
  "messages": [],
  "result_info": {
    "page": 1,
    "per_page": 25,
    "count": 5,
    "total_count": 5,
    "total_pages": 1
  }
}
```

## Get by filter ID

This example returns the filter with ID `<FILTER_ID>`.

```bash
---
header: Request
---
curl -X GET \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters/<FILTER_ID>" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": {
    "id": "<FILTER_ID>",
    "paused": false,
    "description": "Login from office",
    "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
