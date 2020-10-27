---
title: PUT examples
order: 470
---

# PUT examples

- [Update multiple filters](#update-multiple-filters)
- [Update a single filter](#update-a-single-filter)

## Update multiple filters

```bash
PUT zones/{zone_id}/filters
```

### Request

```bash
curl -X PUT \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '[
{
   "id": "60ee852f9cbb4802978d15600c7f3110",
   "paused": false,
   "expression": "ip.src eq 93.184.216.0",
   "description": "IP of example.org"
}
]' "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters"
```

### Response

```json
{
  "result": [
    {
      "id": "60ee852f9cbb4802978d15600c7f3110",
      "paused": false,
      "description": "IP of example.org",
      "expression": "ip.src eq 93.184.216.0"
    }
  ],
  "success": true,
  "errors": null,
  "messages": null
}
```

## Update a single filter

```bash
PUT zones/{zone_id}/filters/{id}
```

### Request

```bash
curl -X PUT \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '{
    "id": "b7ff25282d394be7b945e23c7106ce8a",
    "paused": false,
    "description": "Login from office",
    "expression": "ip.src in {2400:cb00::/32 2405:8100::/32 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
}' "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/filters/b7ff25282d394be7b945e23c7106ce8a"
```

### Response

```json
{
  "result": {
    "id": "b7ff25282d394be7b945e23c7106ce8a",
    "paused": false,
    "description": "Login from office",
    "expression": "ip.src in {2400:cb00::/32 2405:8100::/32 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
  },
  "success": true,
  "errors": null,
  "messages": null
}
```
