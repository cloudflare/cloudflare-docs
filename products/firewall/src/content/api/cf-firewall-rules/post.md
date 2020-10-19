---
title: POST example
order: 420
---

# POST example

```bash
POST zones/{zone_id}/firewall/rules
```

Creates one or more firewall rules.

## Request

```bash
curl -X POST \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '[
  {
    "filter": {
      "id": "b7ff25282d394be7b945e23c7106ce8a"
    },
    "action": "allow",
    "description": "do not challenge login from office"
  },
  {
    "filter": {
      "id": "c218c536b2bd406f958f278cf0fa8c0f"
    },
    "action": "challenge",
    "description": "challenge login"
  },
  {
    "filter": {
      "id": "f2a64520581a4209aab12187a0081364"
    },
    "action": "js_challenge",
    "description": "JS challenge site"
  },
  {
    "filter": {
      "id": "14217d7bd5ab435e84b1bd468bf4fb9f"
    },
    "action": "allow",
    "description": "allow API traffic without challenge"
  }
]' "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules"
```

## Response

```json
{
  "result": [
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
    },
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
    }
  ],
  "success": true,
  "errors": null,
  "messages": null
}
```
