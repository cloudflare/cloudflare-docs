---
pcx_content_type: how-to
title: Deploy a managed ruleset
weight: 2
---

# Deploy a managed ruleset

You can deploy a managed ruleset at the account level or at the zone level.

To deploy a managed ruleset to a phase, use the [Rulesets API](/ruleset-engine/rulesets-api/).

## Deploy a managed ruleset to a phase at the account level

Use the following workflow to deploy a managed ruleset to a phase at the account level.

1. Get your account ID.
2. Get the ID of the managed ruleset you wish to deploy. Refer to [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) for details.
3. Identify the phase where you want to deploy the managed ruleset. Ensure that the managed ruleset belongs to the same phase where you want to deploy it. To learn more about the available phases supported by each Cloudflare product, check the specific documentation for that product.
4. Add a rule to the account-level phase entry point ruleset that executes the managed ruleset. Regarding the rule expression, you must use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that it only applies to zones on an Enterprise plan.

### Example

The following example deploys a managed ruleset to the `http_request_firewall_managed` phase of your account (`<ACCOUNT_ID>`) by creating a rule that executes the managed ruleset. The rules in the managed ruleset are executed when the zone name matches one of `example.com` or `anotherexample.com`.

{{<Aside type="warning">}}
Managed rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"` or else the API operation will fail.
{{</Aside>}}

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "<CLOUDFLARE_MANAGED_RULESET_ID>"
      },
      "expression": "(cf.zone.name in {\"example.com\" \"anotherexample.com\"}) and cf.zone.plan eq \"ENT\"",
      "description": "Execute Cloudflare Managed Ruleset on my account-level phase entry point"
    }
  ]
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Account-level phase entry point",
    "description": "",
    "kind": "root",
    "version": "5",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "<CLOUDFLARE_MANAGED_RULESET_ID>",
          "version": "latest"
        },
        "expression": "(cf.zone.name in {\"example.com\" \"anotherexample.com\"}) and cf.zone.plan eq \"ENT\"",
        "description": "Execute Cloudflare Managed Ruleset on my account-level phase entry point",
        "last_updated": "2021-03-18T18:30:08.122758Z",
        "ref": "<RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-18T18:30:08.122758Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Deploy a managed ruleset to a phase at the zone level

Use the following workflow to deploy a managed ruleset to a phase at the zone level.

1.  Get your zone ID.
2.  Get the ID of the managed ruleset you wish to deploy. Refer to [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) for details.
3.  Identify the phase where you want to deploy the managed ruleset. Ensure that the managed ruleset belongs to the same phase where you want to deploy it. To learn more about the available phases supported by each Cloudflare product, check the specific documentation for that product.
4.  Add a rule to the zone-level phase entry point ruleset that executes the managed ruleset.

### Example

The following example deploys a managed ruleset to the `http_request_firewall_managed` phase of a given zone (`<ZONE_ID>`) by creating a rule that executes the managed ruleset.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "<CLOUDFLARE_MANAGED_RULESET_ID>"
      },
      "expression": "true",
      "description": "Execute Cloudflare Managed Ruleset on my zone-level phase entry point"
    }
  ]
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "<ZONE_PHASE_RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "<RULE_ID_1>",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "<CLOUDFLARE_MANAGED_RULESET_ID>",
          "version": "latest"
        },
        "expression": "true",
        "description": "Execute Cloudflare Managed Ruleset on my zone-level phase entry point",
        "last_updated": "2021-03-18T18:08:14.003361Z",
        "ref": "<RULE_REF_1>",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-18T18:08:14.003361Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

In these examples, the managed ruleset executes the behavior configured by Cloudflare. To customize the behavior of managed rulesets, refer to [Override a managed ruleset](/ruleset-engine/managed-rulesets/override-managed-ruleset/).
