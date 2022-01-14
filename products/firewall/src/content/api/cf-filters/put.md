---
title: PUT examples
pcx-content-type: reference
order: 470
---

# PUT examples

- [Update multiple filters](#update-multiple-filters)
- [Update a single filter](#update-a-single-filter)

## Update multiple filters

```txt
PUT zones/<ZONE_ID>/filters
```

### Request

```json
curl -X PUT \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '[
  {
    "id": "<FILTER_ID>",
    "paused": false,
    "expression": "ip.src eq 93.184.216.0",
    "description": "IP of example.org"
  }
]'
```

### Response

```json
{
  "result": [
    {
      "id": "<FILTER_ID>",
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

```txt
PUT zones/<ZONE_ID>/filters/<FILTER_ID>
```

### Request

```json
curl -X PUT \
  "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/filters/<FILTER_ID>" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-Key: <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
  "id": "<FILTER_ID>",
  "paused": false,
  "description": "Login from office",
  "expression": "ip.src in {2400:cb00::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
}' 
```

### Response

```json
{
  "result": {
    "id": "<FILTER_ID>",
    "paused": false,
    "description": "Login from office",
    "expression": "ip.src in {2400:cb00::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")"
  },
  "success": true,
  "errors": null,
  "messages": null
}
```
