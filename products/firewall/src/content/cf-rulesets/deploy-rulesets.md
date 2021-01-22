---
title: Deploy rulesets
order: 740
---

# Deploy rulesets from your root ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

To deploy a managed ruleset from your root ruleset, use the [Rulesets API](/cf-rulesets/rulesets-api).

## Before you begin

* [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not already have one.
* [Fetch](/cf-rulesets/view-rulesets/) the `id` parameters for your root ruleset and the rulesets  you want to deploy.

## Add a rule to the root ruleset

To deploy a managed or custom ruleset, use the [update ruleset](/cf-rulesets/rulesets-api/put) operation to add a rule to your root ruleset. This rule executes the ruleset. Use a separate rule for each managed ruleset you want to deploy.

Each rule in the root ruleset consists of the ID for the managed ruleset, an expression, and an action.

* The expression specifies the hosts the ruleset applies to.
  * Fields: `cf.zone.name` is the only valid field for rule expressions in the root ruleset.
  * Operators: The following operators are valid: `equals`, `not equals`, `contains`, `does not contain`, `is in`, `is not in`.
* The `execute` action deploys the managed ruleset when a request satisfies the expression.
* The ID of the ruleset you want to deploy.

The following request adds a rule to a root ruleset. The rule executes a managed ruleset for requests where `cf.zone.name` matches `example.com`.

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

Refer to [work with custom rulesets](/cf-rulesets/custom-rulesets) and [work with managed rulesets](/cf-rulesets/managed-rulesets) for more information on working with custom and managed rulesets.

For examples of deploying rulesets, see [workflow examples](/cf-rulesets/common-use-cases).