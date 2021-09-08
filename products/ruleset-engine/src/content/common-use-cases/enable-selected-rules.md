---
title: Enable only selected rules
pcx-content-type: configuration
alwaysopen: true
order: 773
---

# Use rulesets and rule overrides to only enable selected rules

Use a ruleset override and a rule override in a phase entry point ruleset to execute only selected rules in a Managed Ruleset.

1. [Add a rule](/basic-operations/deploy-rulesets) to a phase entry point ruleset that executes a Managed Ruleset.
1. [Configure a ruleset override](/managed-rulesets/override-managed-ruleset) that disables all rules in the Managed Ruleset.
1. [Configure a rule override](/managed-rulesets/override-managed-ruleset) to set an action for the rules you want to execute.

<details>
<summary>Example: Configure ruleset and rule overrides at the zone level</summary>
<div>

The following `PUT` request uses the [Update ruleset](/rulesets-api/update) operation at the zone level to execute only two rules from a Managed Ruleset in the `http_request_firewall_managed` phase.

In this example:

* `"id": "{managed-ruleset-id}"` adds a rule to the phase entry point ruleset to execute a Managed Ruleset for requests in the specified zone (`{zone-id}`).
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
<summary>Example: Configure ruleset and rule overrides at the account level</summary>
<div>

The following `PUT` request uses the [Update ruleset](/rulesets-api/update) operation at the account level to execute only two rules from a Managed Ruleset in the `http_request_firewall_managed` phase.

In this example:

* `"id": "{managed-ruleset-id}"` adds a rule to the phase entry point ruleset to execute a Managed Ruleset for requests addressed to `example.com`.
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