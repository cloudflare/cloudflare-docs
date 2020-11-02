---
order: 430
---

# PUT examples

- [Update multiple rules](#update-multiple-rules)
- [Update a single rule](#update-a-single-rule)

## Update multiple rules

```bash
PUT zones/{zone_id}/firewall/rules
```

You can include up to 25 rules in the JSON object array (_-d_ flag) to update as a batch. The batch is handled as a transaction.

### Request

```bash
curl -X PUT \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '[
  {
    "id": "52161eb6af4241bb9d4b32394be72fdf",
    "paused": false,
    "description": "challenge site",
    "action": "challenge",
    "priority": null,
    "filter": {
      "id": "f2a64520581a4209aab12187a0081364",
      "expression": "not http.request.uri.path matches \"^/api/.*$\"",
      "paused": false,
      "description": "not /api"
    }
  }
]' "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules"
```

<Aside type='note' header='Note'>

`PUT` does not update the filter specified. It only looks at the _filter id_ to update the rule with a new filter.

To update the filter, it is necessary to use the [Filters API](/api/cf-filters/).

</Aside>

### Response

```json
{
  "result": [
    {
      "id": "52161eb6af4241bb9d4b32394be72fdf",
      "paused": false,
      "description": "challenge site",
      "action": "challenge",
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
  "messages": null
}
```

## Update a single rule

```bash
PUT zones/{zone_id}/firewall/rules/{id}
```

These fields are required:

- _id_
- _action_
- _filter.id_

All other fields are optional.

<Aside type='note' header='Note'>

`PUT` overwrites fields that aren't explicitly passed in the request.

For example, if the request omits `description`, any previously existing `description` value will be erased.

To preserve existing values, issue a `GET` request and based on the response, determine which fields (and respective values) to include in your `PUT` request and avoid undesired overwrites.

</Aside>

### Request

```bash
curl -X PUT \
     -H "X-Auth-Email: user@cloudflare.com" \
     -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '{
  "id": "f2d427378e7542acb295380d352e2ebd",
  "paused": false,
  "description": "do not challenge login from office IPv6",
  "action": "allow",
  "priority": null,
  "filter": {
    "id": "b7ff25282d394be7b945e23c7106ce8a",
    "expression": "ip.src in {2400:cb00::/32 2405:8100::/32 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
    "paused": false,
    "description": "Login from office"
  }
}' "https://api.cloudflare.com/client/v4/zones/d56084adb405e0b7e32c52321bf07be6/firewall/rules/f2d427378e7542acb295380d352e2ebd"
```

### Response

```json
{
  "result": {
    "id": "f2d427378e7542acb295380d352e2ebd",
    "paused": false,
    "description": "do not challenge login from office IPv6",
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
