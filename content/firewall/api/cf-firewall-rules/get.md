---
title: GET examples
pcx_content_type: reference
weight: 4
---

# GET examples

## Get all rules

This example returns all the firewall rules in the zone with ID `<ZONE_ID>`.

```bash
---
header: Request
---
curl -X GET \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules" \
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
      "id": "<RULE_ID_1>",
      "paused": false,
      "description": "allow API traffic without challenge",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_1>",
        "expression": "http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "/api"
      }
    },
    {
      "id": "<RULE_ID_2>",
      "paused": false,
      "description": "do not challenge login from office",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_2>",
        "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login from office"
      }
    },
    {
      "id": "<RULE_ID_3>",
      "paused": false,
      "description": "challenge login",
      "action": "challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_3>",
        "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login"
      }
    },
    {
      "id": "<RULE_ID_4>",
      "paused": false,
      "description": "JS challenge site",
      "action": "js_challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_4>",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "not /api"
      }
    }
  ],
  "success": true,
  "errors": [],
  "messages": [],
  "result_info": {
    "page": 1,
    "per_page": 25,
    "count": 4,
    "total_count": 4,
    "total_pages": 1
  }
}
```

## Get rule by ID

This example returns the firewall rule with ID `<RULE_ID>`.

```bash
---
header: Request
---
curl -X GET \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules/<RULE_ID>" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": {
    "id": "<RULE_ID>",
    "paused": false,
    "description": "do not challenge login from office",
    "action": "allow",
    "priority": null,
    "filter": {
      "id": "<FILTER_ID>",
      "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
      "paused": false,
      "description": "Login from office"
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
