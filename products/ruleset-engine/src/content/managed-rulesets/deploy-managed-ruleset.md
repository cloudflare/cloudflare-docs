---
pcx-content-type: how-to
alwaysopen: true
order: 751
---

# Deploy a Managed Ruleset

To deploy a Managed Ruleset to a phase, use the [Rulesets API](/rulesets-api).

## Deploy a Managed Ruleset to a phase at the account level

Use the following workflow to deploy a Managed Ruleset to a phase at the account level.

1. Get your account ID.
1. Get the ID of the Managed Ruleset you wish to deploy. See [List existing rulesets](/rulesets-api/view#list-existing-rulesets).
1. Identify the phase where you want to deploy the Managed Ruleset. Ensure that the Managed Ruleset belongs to the same phase where you want to deploy it. To learn more about the available phases supported by each Cloudflare product, check the specific documentation for that product.
1. Add a rule to the account-level phase entry point ruleset that executes the Managed Ruleset.

### Example

The following example deploys a Managed Ruleset to the `http_request_firewall_managed` phase of your account (`{account-id}`) by creating a rule that executes the Managed Ruleset. The rules in the Managed Ruleset are executed when the zone name matches one of `example.com` or `anotherexample.com`.

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
    "id": "{ruleset-id}",
    "name": "Account-level phase entry point",
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
        "description": "Execute Cloudflare Managed Ruleset on my account-level phase entry point",
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

## Deploy a Managed Ruleset to a phase at the zone level

Use the following workflow to deploy a Managed Ruleset to a phase at the zone level.

1. Get your zone ID.
1. Get the ID of the Managed Ruleset you wish to deploy. See [List existing rulesets](/rulesets-api/view#list-existing-rulesets).
1. Identify the phase where you want to deploy the Managed Ruleset. Ensure that the Managed Ruleset belongs to the same phase where you want to deploy it. To learn more about the available phases supported by each Cloudflare product, check the specific documentation for that product.
1. Add a rule to the zone-level phase entry point ruleset that executes the Managed Ruleset.

### Example

The following example deploys a Managed Ruleset to the `http_request_firewall_managed` phase of a given zone (`{zone-id}`) by creating a rule that executes the Managed Ruleset.

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
    "id": "{zone-level-phase-ruleset-id}",
    "name": "Zone-level phase entry point",
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
        "description": "Execute Cloudflare Managed Ruleset on my zone-level phase entry point",
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

In these examples, the Managed Ruleset executes the behavior configured by Cloudflare. To customize the behavior of Managed Rulesets, see [Override a Managed Ruleset](/managed-rulesets/override-managed-ruleset).
