---
title: Configure the Managed Ruleset via API
pcx-content-type: concept
order: 2
---

# Configure the HTTP L3/4 Managed Ruleset via API

Configure the Cloudflare HTTP L3/4 Managed Ruleset by defining overrides at the account level using the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api).

Each account has the Cloudflare HTTP L3/4 Managed Ruleset enabled by default. This means that you do not need to deploy the Managed Ruleset to the `ddos_l4` phase ruleset explicitly. You only have to create a rule in the phase ruleset to deploy the Managed Ruleset if you need to configure overrides.

## Configure an override for the HTTP L3/4 Managed Ruleset

You can define overrides at the ruleset, tag, and rule level for all Managed Rulesets.

When configuring the Cloudflare HTTP L3/4 Managed Ruleset, use overrides to define a different **action** or **sensitivity** from the default values. For more information on these rule parameters and the allowed values, refer to [Managed Ruleset parameters](/ddos-l34-mitigation/override-parameters).

<Aside type='warning' header='Important'>

The Cloudflare HTTP L3/4 Managed Ruleset is always enabled. You cannot disable its rules using an override with `"enabled": false`.

</Aside>

## Example

The following `PUT` example creates a new phase ruleset (or updates the existing one) for the `ddos_l4` phase at the account level. The request includes several overrides to adjust the default behavior of the HTTP L3/4 Managed Ruleset. These overrides are the following:

* All rules of the L3/4 Managed Ruleset will have their sensitivity set to `medium`.
* All rules tagged with the tag `{tag-name}` will have their sensitivity set to `low`.
* The rule with ID `{rule-id}` will use the `block` action.

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED"
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/ddos_l4/entrypoint" \
-d '{
  "description": "Execute Cloudflare HTTP L3/4 Managed Ruleset on my account-level phase entry point ruleset",
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{l34-managed-ruleset-id}",
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
      },
      "expression": "true",
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
    "description": "Execute Cloudflare HTTP L3/4 Managed Ruleset on my account-level phase entry point ruleset",
    "kind": "root",
    "version": "1",
    "rules": [
      {
        "id": "{entrypoint-rule-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{l34-managed-ruleset-id}",
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
        "expression": "true",
        "last_updated": "2021-06-16T04:14:47.977741Z",
        "ref": "{overridden-rule-ref}",
        "enabled": true
      }
    ],
    "last_updated": "2021-06-16T04:14:47.977741Z",
    "phase": "ddos_l7"
  }
}
```

For more information on defining overrides for Managed Rulesets using the Rulesets API, check [Override a Managed Ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/managed-rulesets/override-managed-ruleset).
