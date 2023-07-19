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

1. Get your [account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).
2. Invoke the [List account rulesets](/api/operations/listAccountRulesets) operation to obtain the available rulesets. Find the ruleset ID of the managed ruleset you wish to deploy.
3. Identify the [phase](/ruleset-engine/about/phases/) where you want to deploy the managed ruleset. Ensure that the managed ruleset belongs to the same phase where you want to deploy it. To learn more about the available phases supported by each Cloudflare product, refer to the specific documentation for that product, or the [Phases list](/ruleset-engine/reference/phases-list/).
4. Add a rule to the account-level phase entry point ruleset that executes the managed ruleset. Use parentheses to enclose any custom conditions in the rule expression and end your expression with `and cf.zone.plan eq "ENT"` so that it only applies to zones on an Enterprise plan.

### Example

The following example deploys a managed ruleset to the `http_request_firewall_managed` phase of your account (`{account_id}`) by creating a rule that executes the managed ruleset. The rules in the managed ruleset are executed when the zone name matches one of `example.com` or `anotherexample.com`.

{{<Aside type="warning">}}
Managed rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"` or else the operation will fail.
{{</Aside>}}

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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

1.  Get your [zone ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).
2.  Invoke the [List account rulesets](/api/operations/listAccountRulesets) operation to obtain the available rulesets. Managed rulesets exist at the account level, but you can deploy them to a zone. Find the ruleset ID of the managed ruleset you wish to deploy.
3.  Identify the [phase](/ruleset-engine/about/phases/) where you want to deploy the managed ruleset. Ensure that the managed ruleset belongs to the same phase where you want to deploy it. To learn more about the available phases supported by each Cloudflare product, refer to the specific documentation for that product, or the [Phases list](/ruleset-engine/reference/phases-list/).
4.  Add a rule to the zone-level phase entry point ruleset that executes the managed ruleset.

### Example

The following example deploys a managed ruleset to the `http_request_firewall_managed` phase of a given zone (`{zone_id}`) by creating a rule that executes the managed ruleset.

```bash
---
header: Request
---
curl --request PUT \
https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_request_firewall_managed/entrypoint \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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
