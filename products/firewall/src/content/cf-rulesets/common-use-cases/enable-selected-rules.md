---
title: Enable only selected rules
alwaysopen: true
order: 773
---

# Use rulesets and rule overrides to only enable selected rules

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use a ruleset override and a rule override in the ruleset of a phase to deploy selected rules in a Managed Ruleset.

1. [Add a rule](/cf-rulesets/deploy-rulesets) to the ruleset of a phase to deploy a Managed Ruleset.
1. [Configure a ruleset override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that disables all rules in the ruleset.
1. [Configure a rule override](/cf-rulesets/managed-rulesets/override-managed-ruleset) to set an action for the rules you want to deploy.

<details>
<summary>Example: Deploy ruleset and rule overrides at the zone level</summary>
<div>

The following `PUT` request uses the [Update ruleset](/cf-rulesets/rulesets-api/update/) operation at the zone level to deploy only two rules from a Managed Ruleset to the `http_request_firewall_managed` phase.

In this example:

* `"id": "{managed-ruleset-id}"` adds a rule to the phase to apply a Managed Ruleset to requests for the specified zone (`{zone-id}`).
* `"enabled": false` defines an override at the ruleset level to disable all rules in the Managed Ruleset.
* `"rules": [{"id": "{rule-id-1}", "action": "block", "enabled": true}, {"id": "{rule-id-2}", "action": "log", "enabled": true}]` defines a list of overrides at the rule level to enable two individual rules.

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true", 
      "action_parameters": {
        "id": "{managed-ruleset-id}",
        "overrides": {
          "enabled": false,          
          "rules": [
            {
              "id": "{rule-id-1}",
              "action": "block",
              "enabled": true
            },
            {
              "id": "{rule-id-2}",
              "action": "log",
              "enabled": true              
            }
          ]
        }
      }
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Example: Deploy ruleset and rule overrides at the account level</summary>
<div>

The following `PUT` request uses the [Update ruleset](/cf-rulesets/rulesets-api/update/) operation at the account level to deploy only two rules from a Managed Ruleset to the `http_request_firewall_managed` phase.

In this example:

* `"id": "{managed-ruleset-id}"` adds a rule to the phase to apply a Managed Ruleset to requests for `example.com`.
* `"enabled": false` defines an override at the ruleset level to disable all rules in the Managed Ruleset.
* `"rules": [{"id": "{rule-id-1}", "action": "block", "enabled": true}, {"id": "{rule-id-2}", "action": "log", "enabled": true}]` defines a list of overrides at the rule level to enable two individual rules.

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"", 
      "action_parameters": {
        "id": "{managed-ruleset-id}",
        "overrides": {
          "enabled": false,
          "rules": [
            {
              "id": "{rule-id-1}",
              "action": "block",
              "enabled": true
            },
            {
              "id": "{rule-id-2}",
              "action": "log",
              "enabled": true
            }
          ]
        }
      }
    }
  ]
}'
```

</div>
</details>