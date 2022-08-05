---
type: overview
pcx_content_type: reference
title: API configuration
weight: 5
layout: list
meta:
  title: Configuring Advanced TCP Protection via API
---

# Configuring Advanced TCP Protection via API

You can configure Advanced TCP Protection using the Advanced TCP Protection API.

The Advanced TCP Protection API only supports API token authentication. For more information on API authentication, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

For examples of API calls, refer to [Common API calls](#common-api-calls).

## Endpoints

To obtain the complete endpoint, append the Advanced TCP Protection API endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `<ACCOUNT_ID>` argument is the account ID (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following tables summarize the available operations.

### General operations

{{<table-wrap style="font-size:90%">}}

Operation | Method + Endpoint | Description
----------|-------------------|------------
Get Advanced TCP<br> Protection status | `GET accounts/<ACCOUNT_ID>/configs/tcp_protection_status` | Gets the global Advanced TCP Protection status (enabled or disabled).
Update Advanced<br> TCP Protection status | `PATCH accounts/<ACCOUNT_ID>/configs/tcp_protection_status` | Enables or disables Advanced TCP Protection.

{{</table-wrap>}}

### Prefix operations

{{<table-wrap style="font-size:90%">}}

Operation | Method + Endpoint | Description
----------|-------------------|------------
Get prefixes | `GET accounts/<ACCOUNT_ID>/configs/prefixes` | Fetches all Advanced TCP Protection prefixes in the account.
Add prefixes | `POST accounts/<ACCOUNT_ID>/configs/prefixes` | Adds one or more prefixes to the account.
Add prefixes in bulk | `POST accounts/<ACCOUNT_ID>/configs/prefixes/bulk` | Adds prefixes in bulk to the account (up to 300 prefixes per request).
Get a prefix | `GET accounts/<ACCOUNT_ID>/configs/prefixes/<PREFIX_ID>` | Fetches the details of an existing prefix.
Update a prefix | `PATCH accounts/<ACCOUNT_ID>/configs/prefixes/<PREFIX_ID>` | Updates an existing prefix.
Delete a prefix | `DELETE accounts/<ACCOUNT_ID>/configs/prefixes/<PREFIX_ID>` | Deletes an existing prefix.
Delete all prefixes | `DELETE accounts/<ACCOUNT_ID>/configs/prefixes` | Deletes all existing prefixes from the account.

{{</table-wrap>}}

### Allowlist operations

{{<table-wrap style="font-size:90%">}}

Operation | Method + Endpoint | Description
----------|-------------------|------------
Get allowlisted prefixes | `GET accounts/<ACCOUNT_ID>/configs/allowlist` | Fetches all prefixes in the account allowlist.
Add an allowlisted prefix | `POST accounts/<ACCOUNT_ID>/configs/allowlist` | Adds a prefix to the allowlist.
Get an allowlisted prefix | `GET accounts/<ACCOUNT_ID>/configs/allowlist/<ALLOWLIST_ID>` | Fetches the details of an existing prefix in the allowlist.
Update an allowlisted<br> prefix | `PATCH accounts/<ACCOUNT_ID>/configs/allowlist/<ALLOWLIST_ID>` | Updates an existing prefix in the allowlist.
Delete an allowlisted<br> prefix | `DELETE accounts/<ACCOUNT_ID>/configs/allowlist/<ALLOWLIST_ID>` | Deletes an existing prefix from the allowlist.
Delete all allowlisted<br> prefixes | `DELETE accounts/<ACCOUNT_ID>/configs/allowlist` | Deletes all existing prefixes from the allowlist.

{{</table-wrap>}}

### SYN Flood Protection operations

{{<table-wrap style="font-size:90%">}}

Operation | Method + Endpoint | Description
----------|-------------------|------------
Get SYN flood rules | `GET accounts/<ACCOUNT_ID>/configs/syn_protection/rules` | Fetches all SYN flood rules in the account.
Add a SYN flood rule | `POST accounts/<ACCOUNT_ID>/configs/syn_protection/rules` | Adds a SYN flood rule to the account.
Get a SYN flood rule | `GET accounts/<ACCOUNT_ID>/configs/syn_protection/rules/<RULE_ID>` | Fetches the details of an existing SYN flood rule in the account.
Update a SYN<br> flood rule | `PATCH accounts/<ACCOUNT_ID>/configs/syn_protection/rules/<RULE_ID>` | Updates an existing SYN flood rule in the account.
Delete a SYN<br> flood rule | `DELETE accounts/<ACCOUNT_ID>/configs/syn_protection/rules/<RULE_ID>` | Deletes an existing SYN flood rule from the account.
Delete all SYN<br> flood rules | `DELETE accounts/<ACCOUNT_ID>/configs/syn_protection/rules` | Deletes all existing SYN flood rules from the account.

{{</table-wrap>}}

### Out-of-state TCP Protection operations

{{<table-wrap style="font-size:90%">}}

Operation | Method + Endpoint | Description
----------|-------------------|------------
Get out-of-state TCP rules | `GET accounts/<ACCOUNT_ID>/configs/tcp_flow_protection/rules` | Fetches all out-of-state TCP rules in the account.
Add an out-of-state TCP rule | `POST accounts/<ACCOUNT_ID>/configs/tcp_flow_protection/rules` | Adds an out-of-state TCP rule to the account.
Get an out-of-state TCP rule | `GET accounts/<ACCOUNT_ID>/configs/tcp_flow_protection/rules/<RULE_ID>` | Fetches the details of an existing out-of-state TCP rule in the account.
Update an out-of-state<br> TCP rule | `PATCH accounts/<ACCOUNT_ID>/configs/tcp_flow_protection/rules/<RULE_ID>` | Updates an existing out-of-state TCP rule in the account.
Delete an out-of-state<br> TCP rule | `DELETE accounts/<ACCOUNT_ID>/configs/tcp_flow_protection/rules/<RULE_ID>` | Deletes an existing out-of-state TCP rule from the account.
Delete all out-of-state<br> TCP rules | `DELETE accounts/<ACCOUNT_ID>/configs/tcp_flow_protection/rules` | Deletes all existing out-of-state TCP rules from the account.

{{</table-wrap>}}

## Common API calls

### Get Advanced TCP Protection status

This example obtains the current status of Advanced TCP Protection (enabled or disabled).

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/configs/tcp_protection_status" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json"
```

```json
---
header: Response
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

### Enable Advanced TCP Protection

This example enables Advanced TCP Protection.

```json
---
header: Request
---
curl -X PATCH \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/configs/tcp_protection_status" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "enabled": true
}'
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
