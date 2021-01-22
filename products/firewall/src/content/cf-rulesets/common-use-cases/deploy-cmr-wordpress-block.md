---
title: Set WordPress rules to Block
alwaysopen: true
order: 771
---

# Use category overrides to set WordPress rules to Block

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Follow the steps below to deploy a managed ruleset and override rules for a specific category.

1. [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not already have one.
1. [Add a rule](/cf-rulesets/deploy-rulesets) to your root ruleset that deploys a managed ruleset.
1. [Configure a category override](/cf-rulesets/managed-rulesets/override-managed-ruleset)  that sets a specified action for all rules in a category.

The example below uses the [create ruleset](/cf-rulesets/rulesets-api/post/) operation to execute the steps in a single POST request. If you already have a root ruleset, use a PUT request to update the setup.

* Create a  root ruleset.
* Add a rule to the root ruleset that applies the **Cloudflare Managed Ruleset** to requests for `example.com`.
* Override rules in the WordPress category to set the action to `block`.

The example below uses the [Rulesets API](/cf-rulesets/rulesets-api) to deploy a managed ruleset and override its behavior. This ensures rules in a specific category deploy a specific action. All other rules deploy with the defaults provided by the ruleset issuer.


```json
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" -d '
{
    "name": "My root ruleset",
    "description": "Root ruleset for my account",
    "kind": "root",
    "rules": [{
        "action": "execute",
        "expression": "cf.zone.name eq \"example.com\"",
        "action_parameters": {
                "id": "{managed_Ruleset_ID}",
                "overrides": {
                    "categories": [
                    {
                        "category": "wordpress",
                        "action": "block"
                    }]
                }
        }
    }],
}'
```