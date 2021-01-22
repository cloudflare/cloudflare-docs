---
title: Enable only selected rules
alwaysopen: true
order: 773
---

# Use rulesets and rule overrides to only enable selected rules

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.
</Aside>

Use a ruleset override and a rule override in your root ruleset to deploy selected rules in a managed ruleset.

1. [Create a root ruleset](/cf-rulesets/configure-root-ruleset/) if you do not already have one.
1. [Add a rule](/cf-rulesets/deploy-rulesets)  to your root ruleset to deploy a managed ruleset.
1. [Configure a ruleset override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that disables all rules in the ruleset.
1. [Configure a rule override](/cf-rulesets/managed-rulesets/override-managed-ruleset) to set an action for rules you want to deploy.

The PUT request below uses the [modify ruleset](/cf-rulesets/rulesets-api/put/) operation to deploy only two rules from the **Cloudflare Managed Ruleset**.

```json
curl -s -X PUT "https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{root-ruleset-id}"  
--data '
{
    "description": "My Root ruleset with ruleset and rule overrides",
    "rules": [
        {
            "action": "execute",
            "expression": "cf.zone.name eq \"example.com\"", "action_parameters": {
                "id": "{managed_Ruleset_id}",
                "overrides": {
                    "rulesets": [
                        {
                            "enabled": "false"
                        }],
                    "rules": [
                        {
                            "id": "{rule-id-1}",
                            "action": "block"
                        },
                        {
                            "id": "{rule-id-2}",
                            "action": "log"
                        }]
                }
            }
        }]
}'

```

* `"id": "{managed_ruleset_id}"` adds a rule to the root ruleset to apply the Cloudflare Managed Ruleset to requests for `example.com`.
* `"overrides": {"rulesets": {"enabled": false}}` defines an override at the ruleset level to disable all rules in the managed ruleset.
* `"overrides": {"rules": [{"id": "{rule-id-1}", "action": "block"}, {"id": "{rule-id-2}", "action": "block"}]}` defines a list of overrides at the rule level to enable two individual rules.