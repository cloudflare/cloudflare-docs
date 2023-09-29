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

The `{account_id}` argument is the [account ID](/fundamentals/setup/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

Operation | Verb + Endpoint
----------|----------------
Get Advanced DNS Protection configuration | `GET` `/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection`
Update Advanced DNS Protection configuration | `PATCH` `/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection`

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
    "sensitivity": "<SENSITIVITY>",
    "rate": <RATE>,
    "burst": <BURST>,
    "created_on": "2023-08-01T13:10:38.762503+01:00",
    "modified_on": "2023-08-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

For more information about the available configuration settings, refer to [Available settings](/ddos-protection/dns-protection/settings/).

### Update Advanced DNS Protection configuration

The following example updates the configuration of Advanced DNS Protection.

The request body can contain only the fields you want to update (from `mode`, `sensitivity`, `rate`, and `burst`).

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "mode": "<NEW_MODE>",
  "sensitivity": "<NEW_SENSITIVITY>",
  "rate": <NEW_RATE>,
  "burst": <NEW_BURST>
}'
```

```json
---
header: Example response
---
{
  "result": {
    "mode": "<NEW_MODE>",
    "sensitivity": "<NEW_SENSITIVITY>",
    "rate": <NEW_RATE>,
    "burst": <NEW_BURST>,
    "created_on": "2023-08-01T13:10:38.762503+01:00",
    "modified_on": "2023-08-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```