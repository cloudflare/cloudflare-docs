---
title: POST example
order: 460
---

# POST example

```bash
POST zones/{zone_id}/filters
```

Creates one or more filters.

## Request

```bash
curl -X POST \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '[
{"expression": "ip.src eq 93.184.216.0"},
{"expression": "http.request.uri.path matches \"^/api/.*$\"", "description":"/api"},
{"expression": "not http.request.uri.path matches \"^/api/.*$\"", "description":"not /api"},
{"expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")", "description":"Login"},
{"expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")", "description":"Login from office"}
]' "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters"
```

## Response

```json
{
  "result": [
    {
      "id": "60ee852f9cbb4802978d15600c7f3110",
      "paused": false,
      "expression": "ip.src eq 93.184.216.0"
    },
    {
      "id": "14217d7bd5ab435e84b1bd468bf4fb9f",
      "paused": false,
      "description": "/api",
      "expression": "http.request.uri.path matches \"^/api/.*$\""
    },
    {
      "id": "f2a64520581a4209aab12187a0081364",
      "paused": false,
      "description": "not /api",
      "expression": "not http.request.uri.path matches \"^/api/.*$\""
    },
    {
      "id": "c218c536b2bd406f958f278cf0fa8c0f",
      "paused": false,
      "description": "Login",
      "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    },
    {
      "id": "b7ff25282d394be7b945e23c7106ce8a",
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
