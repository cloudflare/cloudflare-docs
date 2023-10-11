---
title: Enable only selected rules
pcx_content_type: configuration
weight: 4
meta:
  title: Use rulesets and rule overrides to only enable selected rules
---

# Use rulesets and rule overrides to only enable selected rules

Use a ruleset override and a rule override in a phase entry point ruleset to execute only selected rules in a managed ruleset.

1. [Add a rule](/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2. [Configure a ruleset override](/ruleset-engine/managed-rulesets/override-managed-ruleset/) that disables all rules in the managed ruleset.
3. [Configure a rule override](/ruleset-engine/managed-rulesets/override-managed-ruleset/) to set an action for the rules you want to execute.

{{<details header="Example: Configure ruleset and rule overrides at the zone level">}}

The following `PUT` request uses the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation at the zone level to execute only two rules from a managed ruleset in the `http_request_firewall_managed` phase.

In this example:

* `"id": "<MANAGED_RULESET_ID>"` adds a rule to the phase entry point ruleset to execute a managed ruleset for requests in the specified zone (`{zone_id}`).
* `"enabled": false` defines an override at the ruleset level to disable all rules in the managed ruleset.
* `"rules": [{"id": "<RULE_ID_1>", "action": "block", "enabled": true}, {"id": "<RULE_ID_2>", "action": "log", "enabled": true}]` defines a list of overrides at the rule level to enable two individual rules.

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "enabled": false,
          "rules": [
            {
              "id": "<RULE_ID_1>",
              "action": "block",
              "enabled": true
            },
            {
              "id": "<RULE_ID_2>",
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

{{<details header="Example: Configure ruleset and rule overrides at the account level">}}

The following `PUT` request uses the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation at the account level to execute only two rules from a managed ruleset in the `http_request_firewall_managed` phase.

In this example:

* `"id": "<MANAGED_RULESET_ID>"` adds a rule to the phase entry point ruleset to execute a managed ruleset for requests addressed to `example.com`.
* `"enabled": false` defines an override at the ruleset level to disable all rules in the managed ruleset.
* `"rules": [{"id": "<RULE_ID_1>", "action": "block", "enabled": true}, {"id": "<RULE_ID_2>", "action": "log", "enabled": true}]` defines a list of overrides at the rule level to enable two individual rules.

```bash
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\" and cf.zone.plan eq \"ENT\"",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "enabled": false,
          "rules": [
            {
              "id": "<RULE_ID_1>",
              "action": "block",
              "enabled": true
            },
            {
              "id": "<RULE_ID_2>",
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
