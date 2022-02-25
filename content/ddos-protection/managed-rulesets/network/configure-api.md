---
title: Configure the Managed Ruleset via API
pcx-content-type: concept
weight: 3
meta:
  title: Configure Network-layer DDoS Attack Protection via API
---

# Configure Network-layer DDoS Attack Protection via API

Configure the Cloudflare Network-layer DDoS Attack Protection Managed Ruleset by defining overrides at the account level using the [Rulesets API](/ruleset-engine/rulesets-api).

Each account has the Network-layer DDoS Attack Protection Managed Ruleset enabled by default. This means that you do not need to deploy the Managed Ruleset to the `ddos_l4` phase entry point ruleset explicitly. You only have to create a rule in the phase entry point to deploy the Managed Ruleset if you need to configure overrides.

## Configure an override for the Network-layer DDoS Attack Protection Managed Ruleset

You can define overrides at the ruleset, tag, and rule level for all Managed Rulesets.

When configuring the Network-layer DDoS Attack Protection Managed Ruleset, use overrides to define a different **action** or **sensitivity** from the default values. For more information on these rule parameters and the allowed values, refer to [Managed Ruleset parameters](/ddos-protection/managed-rulesets/network/override-parameters/).

\<Aside type='warning' header='Important'>

The Network-layer DDoS Attack Protection Managed Ruleset is always enabled. You cannot disable its rules using an override with `"enabled": false`.

You can only define overrides for the Network-layer DDoS Attack Protection Managed Ruleset at the account level.

</Aside>

## Example

The following `PUT` example creates a new phase ruleset (or updates the existing one) for the `ddos_l4` phase at the account level. The request includes several overrides to adjust the default behavior of the Network-layer DDoS Attack Protection Managed Ruleset. These overrides are the following:

*   All rules of the Network-layer DDoS Attack Protection Managed Ruleset will have their sensitivity set to `medium`.
*   All rules tagged with the tag `{tag-name}` will have their sensitivity set to `low`.
*   The rule with ID `{rule-id}` will use the `block` action.

The overrides apply to all packets matching the rule expression: `ip.dst in { 1.1.1.0/24 }`.

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED"
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/ddos_l4/entrypoint" \
-d '{
  "description": "Define overrides for the Network-layer DDoS Attack Protection Managed Ruleset",
  "rules": [
    {
      "action": "execute",
      "expression": "ip.dst in { 1.1.1.0/24 }",
      "action_parameters": {
        "id": "{network-managed-ruleset-id}",
        "overrides": {
          "sensitivity_level": "medium",
          "categories": [
            {
              "category": "{tag-name}",
              "sensitivity_level": "low"
            }
          ],
          "rules": [
            {
              "id": "{rule-id}",
              "action": "block"
            }
          ]
        }
      }
    }
  ]
}'
```

The response returns the created (or updated) phase entry point ruleset.

```json
{
  "result": {
    "id": "{root-ruleset-id}",
    "name": "default",
    "description": "Define overrides for the Network-layer DDoS Attack Protection Managed Ruleset",
    "kind": "root",
    "version": "1",
    "rules": [
      {
        "id": "{entrypoint-rule-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{network-managed-ruleset-id}",
          "version": "latest",
          "overrides": {
            "categories": [
              {
                "category": "{tag-name}",
                "sensitivity_level": "low"
              }
            ],
            "rules": [
              {
                "id": "{rule-id}",
                "action": "block"
              }
            ],
            "sensitivity_level": "medium"
          }
        },
        "expression": "ip.dst in { 1.1.1.0/24 }",
        "last_updated": "2021-08-16T04:14:47.977741Z",
        "ref": "{overridden-rule-ref}",
        "enabled": true
      }
    ],
    "last_updated": "2021-08-16T04:14:47.977741Z",
    "phase": "ddos_l4"
  }
}
```

For more information on defining overrides for Managed Rulesets using the Rulesets API, check [Override a Managed Ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset).
