---
title: Configure via API
pcx_content_type: how-to
weight: 2
meta:
  title: Configure Advanced DNS Protection via API
---

# Configure via API

Use the [Cloudflare API](https://developers.cloudflare.com/api/) to configure Advanced DNS Protection via API.

## Endpoints

To obtain the complete endpoint, append the Advanced DNS Protection API endpoints listed below to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4
```

The `{account_id}` argument is the [account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

Operation | Verb + Endpoint
----------|----------------
Get Advanced DNS Protection configuration | `GET` `/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection`
Update Advanced DNS Protection configuration | `PATCH` `/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection`

## Parameter values

You must set the `policy` parameter to one of the following values:

* `drop_unprofiled_only`
* `drop_both`

For more information on the `mode` and `sensitivity` parameters and the supported values, refer to [Policy settings](/ddos-protection/dns-protection/settings/).

## Examples

### Get Advanced DNS Protection configuration

The following example retrieves the current configuration of Advanced DNS Protection.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": {
    "mode": "<MODE>",
    "policy": "<POLICY>",
    "sensitivity": "<SENSITIVITY>",
    "created_on": "2023-08-01T13:10:38.762503+01:00",
    "modified_on": "2023-08-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Update Advanced DNS Protection configuration

The following example updates the configuration of Advanced DNS Protection.

The request body can contain only the fields you want to update (from `mode`, `policy`, and `sensitivity`).

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "mode": "<NEW_MODE>",
  "policy": "<NEW_POLICY>",
  "sensitivity": "<NEW_SENSITIVITY>"
}'
```

```json
---
header: Example response
---
{
  "result": {
    "mode": "<NEW_MODE>",
    "policy": "<NEW_POLICY>",
    "sensitivity": "<NEW_SENSITIVITY>",
    "created_on": "2023-08-01T13:10:38.762503+01:00",
    "modified_on": "2023-08-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```