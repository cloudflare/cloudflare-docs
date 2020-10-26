---
title: GET examples
order: 425
---

# GET examples

- [Get all rules](#get-all-rules)
- [Get rule by ID](#get-by-rule-id)

## Get all rules

```bash
GET zones/{zone_id}/firewall/rules
```

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules"
```

### Response

```json
{
  "result": [
    {
      "id": "4ae338944d6143378c3cf05a7c77d983",
      "paused": false,
      "description": "allow API traffic without challenge",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "14217d7bd5ab435e84b1bd468bf4fb9f",
        "expression": "http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "/api"
      }
    },
    {
      "id": "f2d427378e7542acb295380d352e2ebd",
      "paused": false,
      "description": "do not challenge login from office",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "b7ff25282d394be7b945e23c7106ce8a",
        "expression": "ip.src in {2400:cb00::/32 2405:8100::/32 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login from office"
      }
    },
    {
      "id": "cbf4b7a5a2a24e59a03044d6d44ceb09",
      "paused": false,
      "description": "challenge login",
      "action": "challenge",
      "priority": null,
      "filter": {
        "id": "c218c536b2bd406f958f278cf0fa8c0f",
        "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login"
      }
    },
    {
      "id": "52161eb6af4241bb9d4b32394be72fdf",
      "paused": false,
      "description": "JS challenge site",
      "action": "js_challenge",
      "priority": null,
      "filter": {
        "id": "f2a64520581a4209aab12187a0081364",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "not /api"
      }
    }
  ],
  "success": true,
  "errors": null,
  "messages": null,
  "result_info": {
    "page": 1,
    "per_page": 25,
    "count": 4,
    "total_count": 4,
    "total_pages": 1
  }
}
```

## Get by rule ID

```bash
GET zones/{zone_id}/firewall/rules/{id}
```

### Request

```bash
curl -X GET \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules/f2d427378e7542acb295380d352e2ebd"
```

### Response

```json
{
  "result": {
    "id": "f2d427378e7542acb295380d352e2ebd",
    "paused": false,
    "description": "do not challenge login from office",
    "action": "allow",
    "priority": null,
    "filter": {
      "id": "b7ff25282d394be7b945e23c7106ce8a",
      "expression": "ip.src in {2400:cb00::/32 2405:8100::/32 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
      "paused": false,
      "description": "Login from office"
    }
  },
  "success": true,
  "errors": null,
  "messages": null
}
```
