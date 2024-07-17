---
title: Configure via API
pcx_content_type: concept
weight: 3
meta:
  title: Configure HTTP DDoS Attack Protection via API
---

# Configure HTTP DDoS Attack Protection via API

Configure the HTTP DDoS Attack Protection managed ruleset by defining overrides using the [Rulesets API](/ruleset-engine/rulesets-api/).

Each zone has the HTTP DDoS Attack Protection managed ruleset enabled by default. This means that you do not need to deploy the managed ruleset to the `ddos_l7` phase ruleset explicitly. You only have to create a rule in the phase ruleset to deploy the managed ruleset if you need to configure overrides.

## Configure an override for the HTTP DDoS Attack Protection managed ruleset

Use overrides to configure the HTTP DDoS Attack Protection managed ruleset. Overrides allow you to define a different action or sensitivity level from the default values. For more information on the available action and sensitivity level values, refer to [Ruleset parameters](/ddos-protection/managed-rulesets/http/override-parameters/).

Overrides can have a ruleset, tag, or rule scope. Tag and rule configurations have greater priority than ruleset configurations.

You can create overrides at the zone level and at the account level. Account-level overrides allow you to apply the same override to several zones in your account with a single rule. For example, you can use an account-level override to lower the sensitivity of a specific managed ruleset rule or exclude an [IP list](/waf/tools/lists/custom-lists/#ip-lists) for multiple zones. However, if a given zone has overrides for the HTTP DDoS Attack Protection managed ruleset, the account-level overrides will not be evaluated for that zone.

{{<Aside type="warning" header="Important">}}

* The HTTP DDoS Attack Protection managed ruleset is always enabled — you cannot disable its rules using an override with `"enabled": false`.
* {{<render file="managed-rulesets/_read-only-rules-note.md">}}
* If you configure both account-level and zone-level overrides, only the zone-level overrides (the most specific ones) will be evaluated.
* Currently, account-level overrides for the HTTP DDoS Attack Protection managed ruleset are only available via API.

{{</Aside>}}

### Creating multiple rules

{{<Aside type="note">}}
Only available to Enterprise customers with the Advanced DDoS Protection subscription, which can create up to 10 rules.
{{</Aside>}}

Create multiple rules in the `ddos_l7` phase entry point ruleset to define different overrides for different sets of incoming requests. Set each rule expression according to the traffic whose HTTP DDoS protection you wish to customize.

Rules in the phase entry point ruleset, where you create overrides, are evaluated in order until there is a match for a rule expression and sensitivity level, and Cloudflare will apply the first rule that matches the request. Therefore, the rule order in the entry point ruleset is very important.

## Example API calls

### Zone-level configuration example

The following `PUT` example creates a new phase ruleset (or updates the existing one) for the `ddos_l7` phase at the zone level. The request includes several overrides to adjust the default behavior of the HTTP DDoS Attack Protection managed ruleset. These overrides are the following:

* All rules of the managed ruleset will use the `managed_challenge` action and have a sensitivity level of `medium`.
* All rules tagged with `<TAG_NAME>` will have a sensitivity level of `low`.
* The rule with ID `<MANAGED_RULESET_RULE_ID>` will use the `block` action.

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/ddos_l7/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "description": "Execute HTTP DDoS Attack Protection managed ruleset in the zone-level phase entry point ruleset",
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

{{<details header="Response">}}

```json
{
  "result": {
    "id": "<PHASE_ENTRY_POINT_RULESET_ID>",
    "name": "default",
    "description": "Execute HTTP DDoS Attack Protection managed ruleset in the zone-level phase entry point ruleset",
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

{{</details>}}

For more information on defining overrides for managed rulesets using the Rulesets API, refer to [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Ruleset Engine documentation.

### Account-level configuration example

The following `PUT` example creates a new phase ruleset (or updates the existing one) for the `ddos_l7` phase at the account level. The example defines a single rule override for requests coming from IP addresses in the `allowlisted_ips` [IP list](/waf/tools/lists/custom-lists/#ip-lists), with the following configuration:

* The rule with ID `<MANAGED_RULESET_RULE_ID>`, belonging to the HTTP DDoS Attack Protection managed ruleset (with ID `<MANAGED_RULESET_ID>`),  will have an `eoff` (_Essentially Off_) sensitivity level and it will perform a `log` action.

{{<Aside type="note">}}
Custom rule expressions (different from `"true"`) and the `log` action require an Enterprise plan with the Advanced DDoS Protection subscription.
{{</Aside>}}

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/phases/ddos_l7/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "description": "Disable a managed ruleset rule for allowlisted IP addresses",
  "rules": [
    {
      "expression": "ip.src in $allowlisted_ips",
      "action": "execute",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "rules": [
            {
              "id": "<MANAGED_RULESET_RULE_ID>",
              "action": "log",
              "sensitivity_level": "eoff"
            }
          ]
        }
      }
    }
  ]
}'
```

The response returns the created (or updated) phase entry point ruleset.

{{<details header="Response">}}

```json
{
  "result": {
    "id": "<PHASE_ENTRY_POINT_RULESET_ID>",
    "name": "default",
    "description": "Disable a managed ruleset rule for allowlisted IP addresses",
    "kind": "root",
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
            "rules": [
              {
                "id": "<MANAGED_RULESET_RULE_ID>",
                "action": "log",
                "sensitivity_level": "eoff"
              }
            ],
          }
        },
        "expression": "ip.src in $allowlisted_ips",
        "last_updated": "2022-10-16T04:14:47.977741Z",
        "ref": "<RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2022-10-16T04:14:47.977741Z",
    "phase": "ddos_l7"
  }
}
```

{{</details>}}

For more information on defining overrides for managed rulesets using the Rulesets API, refer to [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Ruleset Engine documentation.
