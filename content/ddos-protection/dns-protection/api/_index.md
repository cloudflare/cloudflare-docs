---
title: API configuration
pcx_content_type: how-to
weight: 2
meta:
  title: Configure Advanced DNS Protection via API
---

# Configure via API

Use the [Cloudflare API](https://developers.cloudflare.com/api/) to configure Advanced DNS Protection via API.

For examples of API calls, refer to [Common API calls](/ddos-protection/dns-protection/api/examples/).

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
