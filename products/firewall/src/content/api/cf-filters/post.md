---
title: POST example
pcx-content-type: reference
order: 460
---

# POST example

```txt
POST zones/<ZONE_ID>/filters
```

Creates one or more filters.

## Request

```json
curl -X POST \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '[
  { 
    "expression": "ip.src eq 93.184.216.0"
  },
  {
    "expression": "http.request.uri.path matches \"^/api/.*$\"", 
    "description": "/api"
  },
  {
    "expression": "not http.request.uri.path matches \"^/api/.*$\"", 
    "description": "not /api"
  },
  {
    "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")", 
    "description": "Login"
  },
  {
    "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")", 
    "description": "Login from office"
  }
]'
```

## Response

```json
{
  "result": [
    {
      "id": "<FILTER_ID_1>",
      "paused": false,
      "expression": "ip.src eq 93.184.216.0"
    },
    {
      "id": "<FILTER_ID_2>",
      "paused": false,
      "description": "/api",
      "expression": "http.request.uri.path matches \"^/api/.*$\""
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
      "description": "Login",
      "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    },
    {
      "id": "<FILTER_ID_5>",
      "paused": false,
      "description": "Login from office",
      "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    }
  ],
  "success": true,
  "errors": null,
  "messages": null
}
```
