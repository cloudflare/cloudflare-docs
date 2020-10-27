---
title: GET examples
order: 465
---

# GET examples

- [Get all filters](#get-all-filters)
- [Get rule by ID](#get-by-filter-id)

## Get all filters

```bash
GET zones/{zone_id}/filters
```

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters"
```

### Response

```json
{
  "result": [
    {
      "id": "b7ff25282d394be7b945e23c7106ce8a",
      "paused": false,
      "description": "Login from office",
      "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    },
    {
      "id": "c218c536b2bd406f958f278cf0fa8c0f",
      "paused": false,
      "description": "Login",
      "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
    },
    {
      "id": "f2a64520581a4209aab12187a0081364",
      "paused": false,
      "description": "not /api",
      "expression": "not http.request.uri.path matches \"^/api/.*$\""
    },
    {
      "id": "14217d7bd5ab435e84b1bd468bf4fb9f",
      "paused": false,
      "description": "/api",
      "expression": "http.request.uri.path matches \"^/api/.*$\""
    },
    {
      "id": "60ee852f9cbb4802978d15600c7f3110",
      "paused": false,
      "expression": "ip.src eq 93.184.216.0"
    }
  ],
  "success": true,
  "errors": null,
  "messages": null,
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

```bash
GET zones/{zone_id}/filters/{id}
```

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters/b7ff25282d394be7b945e23c7106ce8a"
```

### Response

```json
{
  "result": {
    "id": "b7ff25282d394be7b945e23c7106ce8a",
    "paused": false,
    "description": "Login from office",
    "expression": "ip.src eq 93.184.216.0 and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
  },
  "success": true,
  "errors": null,
  "messages": null
}
```
