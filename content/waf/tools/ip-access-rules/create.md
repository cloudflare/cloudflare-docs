---
title: Create a rule
pcx_content_type: how-to
weight: 2
meta:
  title: Create an IP Access rule
---

# Create an IP Access rule

You can create IP Access rules in the Cloudflare dashboard or via API.

## Using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** > **Tools**.
3. Under **IP Access Rules**, enter the following details:

    1. For **Value**, enter an IP address, IP range, country code/name, or Autonomous System Number (ASN). For details, refer to [Parameters](/waf/tools/ip-access-rules/parameters/).
    2. Select an [action](/waf/tools/ip-access-rules/actions/).
    3. For **Zone**, select whether the rule applies to the current website only or to all websites in the account.
    4. (Optional) Enter a note for the rule (for example, `Payment Gateway`).

4. Select **Add**.

## Using the API

Use the Cloudflare API to programmatically create IP Access rules. For more information, refer to [Get IP Access rules](/api/operations/ip-access-rules-for-a-user-list-ip-access-rules).

