---
title: Deploy a Managed Ruleset
alwaysopen: true
order: 751
---

# Deploy a Managed Ruleset

<Aside type='note' header='Note'>

This feature is part of an early access experience for selected customers.

</Aside>

To deploy a Managed Ruleset to a Phase at the account level or at the zone level, use the [Rulesets API](/cf-rulesets/rulesets-api).

## Deploy a Managed Ruleset to a Phase at the account level

Use the following workflow to deploy a managed ruleset to a Phase at the account level.

1. Get your account ID.
1. Get the ID of the Managed Ruleset you wish to deploy. See [List existing rulesets](/cf-rulesets/rulesets-api/view#list-existing-rulesets).
1. Identify the Phase where you want to deploy the Managed Ruleset. Ensure that the Managed Ruleset belongs to the same Phase where you want to deploy it. To learn more about the available Phases supported by each Cloudflare product, check the specific documentation for that product.
1. Add a rule to the account-level Phase to deploy the Managed Ruleset.

### Example

The following example deploys a Managed Ruleset to the `http_request_firewall_managed` Phase of your account (`{account-id}`). The rules in the Managed Ruleset are executed when the zone name matches one of `example.com` or `anotherexample.com`.

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{cloudflare-managed-ruleset-id}"
      },
      "expression": "cf.zone.name in {\"example.com\" \"anotherexample.com\"}",
      "description": "Execute Cloudflare Managed Ruleset on my account-level Phase ruleset"
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
    "id": "{ruleset-id}",
    "name": "http_request_firewall_managed Account-level Ruleset",
    "description": "",
    "kind": "root",
    "version": "5",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{cloudflare-managed-ruleset-id}",
          "version": "latest"
        },
        "expression": "cf.zone.name in {\"example.com\" \"anotherexample.com\"}",
        "description": "Execute Cloudflare Managed Ruleset on my account-level Phase ruleset",
        "last_updated": "2021-03-18T18:30:08.122758Z",
        "ref": "{rule-ref}",
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

## Deploy a Managed Ruleset to a Phase at the zone level

Use the following workflow to deploy a managed ruleset to a Phase at the zone level.

1. Get your zone ID.
1. Get the ID of the Managed Ruleset you wish to deploy. See [List existing rulesets](/cf-rulesets/rulesets-api/view#list-existing-rulesets).
1. Identify the Phase where you want to deploy the Managed Ruleset. Ensure that the Managed Ruleset belongs to the same Phase where you want to deploy it. To learn more about the available Phases supported by each Cloudflare product, check the specific documentation for that product.
1. Add a rule to the zone-level Phase to deploy the Managed Ruleset.

<Aside type='warning' header='Important'>

When deploying to a zone-level Phase, you must set the rule `expression` to `true`, since the zone scope is already defined in the endpoint.

</Aside>

### Example

The following example deploys a Managed Ruleset to the `http_request_firewall_managed` Phase of a given zone (`{zone-id}`).

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{cloudflare-managed-ruleset-id}"
      },
      "expression": "true",
      "description": "Execute Cloudflare Managed Ruleset on my zone ruleset"
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
    "id": "{zone-level-phase-ruleset-id}",
    "name": "Zone-level Ruleset 1",
    "description": "",
    "kind": "zone",
    "version": "3",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "1",
        "action": "execute",
        "action_parameters": {
          "id": "{cloudflare-managed-ruleset-id}",
          "version": "latest"
        },
        "expression": "true",
        "description": "Execute Cloudflare Managed Ruleset on my zone ruleset",
        "last_updated": "2021-03-18T18:08:14.003361Z",
        "ref": "{ruleset-ref-1}",
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

In these examples, the Managed Ruleset executes the behavior configured by Cloudflare. To customize the behavior of  Managed Rulesets, see [Override a Managed Ruleset](/cf-rulesets/managed-rulesets/override-managed-ruleset).
