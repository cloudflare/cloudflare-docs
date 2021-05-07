---
order: 23
---

# Deploy rulesets via API

Use the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api) to deploy and configure rulesets at the account level or at the zone level.

## Deploying Managed Rulesets

You can deploy Managed Rulesets to the `http_request_firewall_managed` Phase supported by the Cloudflare WAF, both at the account level and at the zone level. You can also define overrides to customize the behavior of the rules included in a Managed Ruleset.

<Aside type='warning' header='Important'>

There are a few requirements when deploying Managed Rulesets to the `http_request_firewall_managed` Phase at the **zone** level:

* The zone-level Phase can only have two `execute` rules deploying Managed Rulesets: one rule for deploying the OWASP Managed Ruleset and another rule for deploying the Cloudflare Managed Rules.

* You must set the `expression` field to `true` in these two rules, which means that they apply to all zone requests.

</Aside>

To learn more about deploying Managed Rulesets and configuring overrides using the Rulesets API, see [Work with Managed Rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets).

## Deploying custom rulesets

You can create custom rulesets in the `http_request_firewall_custom` Phase at the account level. After creating a custom ruleset, you can deploy it to a Phase at the account level by creating an `execute` rule in the Phase. 

<Aside type='warning' header='Important'>

Currently, you can only deploy custom rulesets to a Phase at the account level.

</Aside>

To learn more about creating and deploying custom rulesets using the Rulesets API, see [Work with custom rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/custom-rulesets).
