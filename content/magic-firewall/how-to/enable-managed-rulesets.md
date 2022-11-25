---
title: Enable Managed Rulesets
pcx_content_type: how-to
---

# Enable Managed Rulesets

With [Managed Rulesets](/ruleset-engine/managed-rulesets/), you can quickly deploy rules maintained by Cloudflare, and you can use Magic Firewall to control which rules are enabled.

{{<Aside type="note" header="Note:">}}

Before you can begin using Managed Rulesets with Magic Firewall, your account must first be entitled to use Managed Rulesets. Contact your account team for access.

{{</Aside>}}

To enable or disable a rule, you can specify which properties should be overriden. The overrides occur in the Managed phase, root kind ruleset. Currently, you can only have one rule in the root ruleset, but a single rule can contain multiple overrides. 

You have multiple options for enabling rules:

- Select an individual rule and enable it.
- Enable multiple rules by enabling by category in the `magic-transit-phase`.
- Enable an entire ruleset.

## 1. Create a Managed phase Managed kind ruleset

To create a Managed Ruleset, you must first build a request with the following:

- `managed_ruleset_id`: The ID of the Managed phase Managed kind ruleset that contains the rule you want to enable.
- `managed_rule_id`: The ID of the rule you want to enable.

Additionally, you need the properties you want to override. The properties you can override include:

- `enabled`: This value can be set to `true` or `false`. When set to `true`, the rule matches packets and applies the rule's default action if the action is not overriden. When set to `false`, the rule is disabled and does not match any packets.
- `action`: The value can be set to `log` so the rule only produces logs instead of applying the rule's default action.

The `enabled` and `action` properties for a rule are set in the Managed phase Managed kind ruleset. All rules in the Managed phase are currently disabled by default.

The example below contains a request for a Managed phase Managed Kind ruleset.

```bash
---
header: Example request - Create a Managed phase Managed Kind ruleset
---
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets"
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
-H "Content-Type:application/json" \
--data '{
  "name": "execute ruleset",
  "description": "Ruleset containing execute rules",
  "kind": "root",
  "phase": "magic_transit_managed",
  "rules": [
    {
      "expression": "true",
      "action": "execute",
      "description": "Enable one rule ",
      "action_parameters": {
          "id": "<MANAGED_RULESET_ID>",
          "version": "latest",
          "overrides": {
            "rules": [
              {
                "id": "<MANAGED_RULE_ID>",
                "enabled": true,
                "action": "log"
              }
            ]
          }
        }
    }
  ]
}'
```

## 2. Patch a Managed phase Managed kind ruleset

To ensure a root kind ruleset only contains one rule, patch the rule to enable new managed rules.

Building off the example from the previous step, the example below enables a category to select multiple rules instead of a single rule. The category will be set to `log` mode, which means the rule can produce logs but will not accept or drop packets.

```bash
---
header: Example request - Patch a Managed phase Managed kind ruleset
---
curl -X PATCH "https://api.staging.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<ROOT_KIND_RULESET>/rules/<ROOT_KIND_RULE>" \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
-H "Content-Type:application/json" \
--data ' {
  "expression": "true",
  "action": "execute",
  "action_parameters": {
    "id": "<MANAGED_RULESET_ID>",
    "version": "latest",
    "overrides": {
      "rules": [
              {
                "id": "<MANAGED_RULE_ID>",
                "enabled": true
              }
        ],
        "categories": [
        {
           "category": "simple",
           "enabled": true
        }
      ]
    }
  }
}'
```

## 3. Enable all rules

To enable the complete ruleset or enable all rules, send the request below.

```bash
---
header: Example request to enable all rules
---
curl -X PATCH "https://api.staging.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/<ROOT_KIND_RULESET>/rules/<ROOT_KIND_RULE>" \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
-H "Content-Type:application/json" \
--data ' {
  "expression": "true",
  "action": "execute",
  "action_parameters": {
    "id": "<MANAGED_RULESET_ID>",
    "version": "latest",
    "overrides": {
      "enabled": true
    }
  }
}'
```

## Delete a ruleset

To delete a ruleset, refer to [Delete a rule in a ruleset](/ruleset-engine/rulesets-api/delete-rule/).
