---
title: Common API calls
pcx_content_type: configuration
weight: 2
---

# Common API calls

The following sections contain example cURL requests for common API calls. For a list of available API endpoints, refer to [Endpoints](/ddos-protection/tcp-protection/api/#endpoints).

## Get Advanced TCP Protection status

This example obtains the current status of Advanced TCP Protection (enabled or disabled).

```bash
---
header: cURL request
---
$ curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_protection_status" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": {
    "enabled": false
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Enable Advanced TCP Protection

This example enables Advanced TCP Protection.

```json
---
header: cURL request
---
$ curl -X PATCH \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_protection_status" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "enabled": true
}'
```

## Get existing prefixes

This example fetches all existing prefixes in Advanced TCP Protection.

```bash
---
header: cURL request
---
$ curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "prefix": "203.0.113/24",
      "comment": "My prefix",
      "excluded": false
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Add prefixes

This example adds two prefixes. The second prefix excludes a subset of the first prefix from Advanced TCP Protection.

```json
---
header: cURL request
---
$ curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes/bulk" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '[
  {
    "prefix": "192.0.2.0/24",
    "comment": "Game ranges",
    "excluded": false
  },
  {
    "prefix": "192.0.2.2/26",
    "comment": "Range for a specific game",
    "excluded": true
  }
]'
```

```json
---
header: Example response
---
{
  "result": [
    {
      "id": "<PREFIX_1_ID>",
      "prefix": "192.0.2.0/24",
      "excluded": false,
      "comment": "Game ranges",
      "created_on": "<TIMESTAMP>",
      "modified_on": "<TIMESTAMP>"
    },
    {
      "id": "<PREFIX_2_ID>",
      "prefix": "192.0.2.2/26",
      "excluded": true,
      "comment": "Range for a specific game",
      "created_on": "<TIMESTAMP>",
      "modified_on": "<TIMESTAMP>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Get all prefixes in allowlist

```bash
---
header: cURL request
---
$ curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist" \
-H "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "id": "<ALLOWLIST_PREFIX_ID>",
      "prefix": "192.0.2.127",
      "comment": "Single IP address in allowlist",
      "enabled": true,
      "created_on": "<TIMESTAMP>",
      "modified_on": "<TIMESTAMP>"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Add a prefix to the allowlist

This example adds a prefix to the allowlist of the account.

```json
---
header: cURL request
---
$ curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "prefix": "203.0.113.0/26",
  "comment": "Partner range",
  "enabled": true
}'
```

```json
---
header: Example response
---
{
  "result": {
    "id": "<ALLOWLIST_PREFIX_1_ID>",
    "prefix": "203.0.113.0/26",
    "comment": "Partner range",
    "enabled": true,
    "created_on": "<TIMESTAMP>",
    "modified_on": "<TIMESTAMP>"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Create a SYN flood rule

This example creates a SYN flood rule with a regional scope in monitoring mode.

```json
---
header: cURL request
---
$ curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "scope": "region",
  "name": "WEUR",
  "mode": "monitoring",
  "rate_sensitivity": "medium",
  "burst_sensitivity": "medium"
}'
```

```json
---
header: Example response
---
{
  "result": {
    "id": "<SYN_FLOOD_RULE_ID>",
    "scope": "region",
    "name": "WEUR",
    "mode": "monitoring",
    "rate_sensitivity": "medium",
    "burst_sensitivity": "medium",
    "created_on": "<TIMESTAMP>",
    "modified_on": "<TIMESTAMP>"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Refer to [JSON objects](/ddos-protection/tcp-protection/api/json-objects/) for more information on the fields in the JSON body.

## Create an out-of-state TCP rule

This example creates an out-of-state TCP rule in monitoring mode, with a regional scope, and with low rate and burst sensitivities.

```json
---
header: cURL request
---
$ curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "scope": "region",
  "name": "WEUR",
  "mode": "monitoring",
  "rate_sensitivity": "low",
  "burst_sensitivity": "low"
}'
```

```json
---
header: Example response
---
{
  "result": {
    "id": "<OOS_TCP_RULE_ID>",
    "scope": "region",
    "name": "WEUR",
    "mode": "monitoring",
    "rate_sensitivity": "low",
    "burst_sensitivity": "low",
    "created_on": "<TIMESTAMP>",
    "modified_on": "<TIMESTAMP>"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Refer to [JSON objects](/ddos-protection/tcp-protection/api/json-objects/) for more information on the fields in the JSON body.
