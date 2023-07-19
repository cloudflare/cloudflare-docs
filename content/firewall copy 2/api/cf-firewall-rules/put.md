---
pcx_content_type: reference
title: PUT examples
weight: 5
---

# PUT examples

## Update multiple rules

This example updates several firewall rules using a single API call.

You can include up to 25 rules in the JSON object array (`-d` flag) to update as a batch. The batch is handled as a transaction.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \
-d '[
  {
    "id": "<RULE_ID>",
    "paused": false,
    "description": "Challenge site",
    "action": "challenge",
    "priority": null,
    "filter": {
      "id": "<FILTER_ID>",
      "expression": "not http.request.uri.path matches \"^/api/.*$\"",
      "paused": false,
      "description": "not /api"
    }
  }
]'
```

{{<Aside type="note" header="Note">}}

`PUT` does not update the filter specified. It only looks at the filter ID (`<FILTER_ID>`) to update the rule with a new filter.

To update the filter, use the [Filters API](/firewall/api/cf-filters/).

{{</Aside>}}

```json
---
header: Response
---
{
  "result": [
    {
      "id": "<RULE_ID>",
      "paused": false,
      "description": "Challenge site",
      "action": "challenge",
      "priority": null,
      "filter": {
        "id": "<FILTER_ID>",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "paused": false,
        "description": "not /api"
      }
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Update a single rule

This example updates the firewall rule with ID `<RULE_ID>`.

You must include the following fields in the request body:

*   `id`
*   `action`
*   `filter.id`

All other fields are optional.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules/<RULE_ID>" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
-H "Content-Type: application/json" \
-d '{
  "id": "<RULE_ID>",
  "paused": false,
  "description": "Do not challenge login from office IPv6",
  "action": "allow",
  "priority": null,
  "filter": {
    "id": "<FILTER_ID>",
    "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
    "paused": false,
    "description": "Login from office"
  }
}' 
```

```json
---
header: Response
---
{
  "result": {
    "id": "<RULE_ID>",
    "paused": false,
    "description": "Do not challenge login from office IPv6",
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

{{<Aside type="note" header="Note">}}

`PUT` overwrites fields that are not explicitly passed in the request.

For example, if the request omits `description`, any previously existing `description` value will be erased.

To preserve existing values, issue a `GET` request and based on the response, determine which fields (and respective values) to include in your `PUT` request.

{{</Aside>}}
