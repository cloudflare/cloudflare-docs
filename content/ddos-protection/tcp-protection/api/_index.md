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

The Advanced TCP Protection API only supports API token authentication. For more information on API authentication, refer to [Getting Started: Requests](/fundamentals/api/) in the Cloudflare API documentation.

For examples of API calls, refer to [Common API calls](/ddos-protection/tcp-protection/api/examples/).

## Endpoints

To obtain the complete endpoint, append the Advanced TCP Protection API endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `<ACCOUNT_ID>` argument is the account ID (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The tables in the following sections summarize the available operations.

### General operations

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
Get Advanced TCP<br> Protection status | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_protection_status`<br>Gets the global Advanced TCP Protection status (enabled or disabled).
Update Advanced<br> TCP Protection status | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_protection_status`<br>Enables or disables Advanced TCP Protection.

{{</table-wrap>}}

### Prefix operations

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
List prefixes | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes`<br>Fetches all Advanced TCP Protection prefixes in the account.
Add prefixes in bulk | `POST accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes/bulk`<br>Adds prefixes in bulk to the account (up to 300 prefixes per request).
Get a prefix | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes/<PREFIX_ID>`<br>Fetches the details of an existing prefix.
Update a prefix | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes/<PREFIX_ID>`<br>Updates an existing prefix.
Delete a prefix | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes/<PREFIX_ID>`<br>Deletes an existing prefix.
Delete all prefixes | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/prefixes`<br>Deletes all existing prefixes from the account.

{{</table-wrap>}}

### Allowlist operations

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
List allowlisted prefixes | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist`<br>Fetches all prefixes in the account allowlist.
Add an allowlisted prefix | `POST accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist`<br>Adds a prefix to the allowlist.
Get an allowlisted prefix | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist/<ALLOWLIST_ID>`<br>Fetches the details of an existing prefix in the allowlist.
Update an allowlisted prefix | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist/<ALLOWLIST_ID>`<br>Updates an existing prefix in the allowlist.
Delete an allowlisted prefix | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist/<ALLOWLIST_ID>`<br>Deletes an existing prefix from the allowlist.
Delete all allowlisted prefixes | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/allowlist`<br>Deletes all existing prefixes from the allowlist.

{{</table-wrap>}}

### SYN Flood Protection operations

#### Rules

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
List SYN flood rules | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules`<br>Fetches all SYN flood rules in the account.
Add a SYN flood rule | `POST accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules`<br>Adds a SYN flood rule to the account.
Get a SYN flood rule | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules/<RULE_ID>`<br>Fetches the details of an existing SYN flood rule in the account.
Update a SYN flood rule | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules/<RULE_ID>`<br>Updates an existing SYN flood rule in the account.
Delete a SYN flood rule | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules/<RULE_ID>`<br>Deletes an existing SYN flood rule from the account.
Delete all SYN flood rules | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/rules`<br>Deletes all existing SYN flood rules from the account.

{{</table-wrap>}}

#### Filters

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
List SYN flood filters | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/filters`<br>Fetches all SYN flood filters in the account.
Add a SYN flood filter | `POST accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/filters`<br>Adds a SYN flood filter to the account.
Get a SYN flood filter | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/filters/<FILTER_ID>`<br>Fetches the details of an existing SYN flood filter in the account.
Update a SYN flood filter | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/filters/<FILTER_ID>`<br>Updates an existing SYN flood filter in the account.
Delete a SYN flood filter | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/filters/<FILTER_ID>`<br>Deletes an existing SYN flood filter from the account.
Delete all SYN flood filters | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/syn_protection/filters`<br>Deletes all existing SYN flood filters from the account.

{{</table-wrap>}}

### Out-of-state TCP Protection operations

#### Rules

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
List out-of-state TCP rules | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`<br>Fetches all out-of-state TCP rules in the account.
Add an out-of-state TCP rule | `POST accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`<br>Adds an out-of-state TCP rule to the account.
Get an out-of-state TCP rule | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/<RULE_ID>`<br>Fetches the details of an existing out-of-state TCP rule in the account.
Update an out-of-state TCP rule | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/<RULE_ID>`<br>Updates an existing out-of-state TCP rule in the account.
Delete an out-of-state TCP rule | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/<RULE_ID>`<br>Deletes an existing out-of-state TCP rule from the account.
Delete all out-of-state TCP rules | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules`<br>Deletes all existing out-of-state TCP rules from the account.

{{</table-wrap>}}

#### Filters

{{<table-wrap>}}

Operation | Method and endpoint / Description
----------|----------------------------------
List out-of-state TCP filters | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`<br>Fetches all out-of-state TCP filters in the account.
Add an out-of-state TCP filter | `POST accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`<br>Adds an out-of-state TCP filter to the account.
Get an out-of-state TCP filter | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/<FILTER_ID>`<br>Fetches the details of an existing out-of-state TCP filter in the account.
Update an out-of-state TCP filter | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/<FILTER_ID>`<br>Updates an existing out-of-state TCP filter in the account.
Delete an out-of-state TCP filter | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/<FILTER_ID>`<br>Deletes an existing out-of-state TCP filter from the account.
Delete all out-of-state TCP filters | `DELETE accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters`<br>Deletes all existing out-of-state TCP filters from the account.

{{</table-wrap>}}

## Pagination

The API operations that return a list of items use pagination. For more information on the available pagination query parameters, refer to [Requests: Pagination](/fundamentals/api/) in the API documentation.
