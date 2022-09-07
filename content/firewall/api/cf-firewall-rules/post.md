---
title: POST example
pcx_content_type: reference
weight: 3
---

# POST example

This example creates several firewall rules using a single API call.

{{<Aside type="note">}}

To create a firewall rule you need a [filter](/firewall/api/cf-filters/what-is-a-filter/) identifier (`id`). If you have not created a filter yet, refer to the [Cloudflare Filters API documentation](/firewall/api/cf-filters/).

{{</Aside>}}

```json
---
header: Request
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \
-d '[
  {
    "filter": {
      "id": "<FILTER_ID_1>"
    },
    "action": "allow",
    "description": "Do not challenge login from office"
  },
  {
    "filter": {
      "id": "<FILTER_ID_2>"
    },
    "action": "challenge",
    "description": "Challenge login"
  },
  {
    "filter": {
      "id": "<FILTER_ID_3>"
    },
    "action": "js_challenge",
    "description": "JS challenge site"
  },
  {
    "filter": {
      "id": "<FILTER_ID_4>"
    },
    "action": "allow",
    "description": "Allow API traffic without challenge"
  }
]'
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
      "description": "Do not challenge login from office",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_1>",
        "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login from office"
      }
    },
    {
      "id": "<RULE_ID_2>",
      "paused": false,
      "description": "Challenge login",
      "action": "challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_2>",
        "expression": "(http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
        "paused": false,
        "description": "Login"
      }
    },
    {
      "id": "<RULE_ID_3>",
      "paused": false,
      "description": "JS challenge site",
      "action": "js_challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_3>",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "not /api"
      }
    },
    {
      "id": "<RULE_ID_4>",
      "paused": false,
      "description": "Allow API traffic without challenge",
      "action": "allow",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID_4>",
        "expression": "http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "/api"
      }
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```
