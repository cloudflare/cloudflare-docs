---
title: Deploy a managed ruleset
alwaysopen: true
order: 761
---

# Deploy a managed ruleset

<Aside type='note' header='Note'>

This feature is part of an early access experience for selected customers.

</Aside>

To deploy a managed ruleset from your root ruleset, use the [Rulesets API](/cf-rulesets/rulesets-api).

## Before you begin

* [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not already have one.
* [Fetch](/cf-rulesets/view-rulesets/) the `id` parameters for your root ruleset and the managed ruleset that you want to deploy.

## Add a managed ruleset rule to the root ruleset

Use the [Update Ruleset](/cf-rulesets/rulesets-api/put/) operation to add rules to your root ruleset. This rule executes the managed ruleset. Use a separate rule for each managed ruleset you want to deploy.

The following request adds a rule to a root ruleset. The rule executes a managed ruleset for requests where `cf.zone.name` matches `example.com`

```json

curl -X PUT \
     "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}"
--data {
  "rules": [{
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\""
      "action_parameters": {
        "id": "{managed-ruleset-id}"
      }
    }]
}
```

In this example, the ruleset executes the behavior configured by the managed rule issuer. To customize the behavior for deployed managed rulesets, see [override a managed ruleset](/cf-rulesets/managed-rulesets/override-managed-ruleset).