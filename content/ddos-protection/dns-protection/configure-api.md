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
List DNS protection rules | <p>`GET accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules`</p>Fetches all DNS protection rules in the account.
Add a DNS protection rule | <p>`POST accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules`</p>Adds a DNS protection rule to the account.
Get a DNS protection rule | <p>`GET accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}`</p>Fetches the details of an existing DNS protection rule in the account.
Update a DNS protection rule | <p>`PATCH accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}`</p>Updates an existing DNS protection rule in the account.
Delete a DNS protection rule | <p>`DELETE accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}`</p>Deletes an existing DNS protection rule from the account.
Delete all DNS protection rules | <p>`DELETE accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules`</p>Deletes all existing DNS protection rules from the account.

## Examples

### Get all DNS protection rules

The following example retrieves the currently configured rules for Advanced DNS Protection.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "id": "<RULE_ID>",
      "scope": "<SCOPE>",
      "name": "<NAME>",
      "mode": "<MODE>",
      "profile_sensitivity": "<SENSITIVITY>",
      "rate_sensitivity": "<RATE>",
      "burst_sensitivity": "<BURST>",
      "created_on": "2023-08-01T13:10:38.762503+01:00",
      "modified_on": "2023-08-01T13:10:38.762503+01:00",
      }
    ],
  "success": true,
  "errors": [],
  "messages": []
}
```

For more information about the available configuration settings, refer to [Available settings](/ddos-protection/dns-protection/settings/).

### Create DNS protection rule

The following example creates an Advanced DNS Protection rule with a global scope.

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "scope": "global",
  "name": "global",
  "mode": "<MODE>",
  "profile_sensitivity": "<SENSITIVITY>",
  "rate_sensitivity": "<RATE>",
  "burst_sensitivity": "<BURST>"
}'
```

```json
---
header: Example response
---
{
  "result": {
    "id": "<RULE_ID>",
    "scope": "global",
    "name": "global",
    "mode": "<MODE>",
    "profile_sensitivity": "<SENSITIVITY>",
    "rate_sensitivity": "<RATE>",
    "burst_sensitivity": "<BURST>",
    "created_on": "2023-08-01T13:10:38.762503+01:00",
    "modified_on": "2023-08-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```


### Update DNS protection rule

The following example updates an existing DNS protection rule with ID `{rule_id}`.

The request body can contain only the fields you want to update (from `mode`, `profile_sensitivity`, `rate_sensitivity`, and `burst_sensitivity`).

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}" \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{
  "mode": "<NEW_MODE>",
  "profile_sensitivity": "<NEW_SENSITIVITY>",
  "rate_sensitivity": "<NEW_RATE>",
  "burst_sensitivity": "<NEW_BURST>"
}'
```

```json
---
header: Example response
---
{
  "result": {
    "id": "<RULE_ID>",
    "scope": "<SCOPE>",
    "name": "<NAME>",
    "mode": "<NEW_MODE>",
    "profile_sensitivity": "<NEW_SENSITIVITY>",
    "rate_sensitivity": "<NEW_RATE>",
    "burst_sensitivity": "<NEW_BURST>",
    "created_on": "2023-08-01T13:10:38.762503+01:00",
    "modified_on": "2023-08-01T13:10:38.762503+01:00",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```