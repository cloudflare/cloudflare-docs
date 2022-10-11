---
title: Configure via API
pcx_content_type: concept
weight: 3
meta:
  title: Configure HTTP DDoS Attack Protection via API
---

# Configure HTTP DDoS Attack Protection via API

Configure the HTTP DDoS Attack Protection Managed Ruleset by defining overrides using the [Rulesets API](/ruleset-engine/rulesets-api/).

Each zone has the HTTP DDoS Attack Protection Managed Ruleset enabled by default. This means that you do not need to deploy the Managed Ruleset to the `ddos_l7` phase ruleset explicitly. You only have to create a rule in the phase ruleset to deploy the Managed Ruleset if you need to configure overrides.

## Configure an override for the HTTP DDoS Attack Protection Managed Ruleset

You can define overrides at the ruleset, tag, and rule level for all Managed Rulesets.

When configuring the HTTP DDoS Attack Protection Managed Ruleset, use overrides to define a different **action** or **sensitivity level** from the default values. For more information on these rule parameters and the allowed values, see [Managed Ruleset override parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

{{<Aside type="warning" header="Important">}}

The HTTP DDoS Attack Protection Managed Ruleset is always enabled — you cannot disable its rules using an override with `"enabled": false`. Additionally, you must set the override `"expression"` field to `"true"`.

{{</Aside>}}

## Example

The following `PUT` example creates a new phase ruleset (or updates the existing one) for the `ddos_l7` phase at the zone level. The request includes several overrides to adjust the default behavior of the HTTP DDoS Attack Protection Managed Ruleset. These overrides are the following:

* All rules of the Managed Ruleset will use the `managed_challenge` action and have a sensitivity level of `medium`.
* All rules tagged with `<TAG_NAME>` will have a sensitivity level of `low`.
* The rule with ID `<MANAGED_RULESET_RULE_ID>` will use the `block` action.

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/ddos_l7/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "description": "Execute HTTP DDoS Attack Protection Managed Ruleset in the zone-level phase entry point ruleset",
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "sensitivity_level": "medium",
          "action": "managed_challenge",
          "categories": [
            {
              "category": "<TAG_NAME>",
              "sensitivity_level": "low"
            }
          ],
          "rules": [
            {
              "id": "<MANAGED_RULESET_RULE_ID>",
              "action": "block"
            }
          ]
        }
      },
      "expression": "true"
    }
  ]
}'
```

The response returns the created (or updated) phase entry point ruleset.

```json
{
  "result": {
    "id": "<PHASE_ENTRY_POINT_RULESET_ID>",
    "name": "default",
    "description": "Execute HTTP DDoS Attack Protection Managed Ruleset in the zone-level phase entry point ruleset",
    "kind": "zone",
    "version": "1",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "<MANAGED_RULESET_ID>",
          "version": "latest",
          "overrides": {
            "action": "managed_challenge",
            "categories": [
              {
                "category": "<TAG_NAME>",
                "sensitivity_level": "low"
              }
            ],
            "rules": [
              {
                "id": "<MANAGED_RULESET_RULE_ID>",
                "action": "block"
              }
            ],
            "sensitivity_level": "medium"
          }
        },
        "expression": "true",
        "last_updated": "2021-06-16T04:14:47.977741Z",
        "ref": "<RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2021-06-16T04:14:47.977741Z",
    "phase": "ddos_l7"
  }
}
```

For more information on defining overrides for Managed Rulesets using the Rulesets API, refer to [Override a Managed Ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Ruleset Engine documentation.
