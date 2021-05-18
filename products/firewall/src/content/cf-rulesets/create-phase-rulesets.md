---
title: Create phase rulesets
pcx-content-type: how-to
type: overview
order: 720
---

# Create phase rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

A phase behaves like a ruleset. You must create the ruleset for a phase to be able to add rules and deploy rulesets to it.

Use the [Rulesets API](/cf-rulesets/rulesets-api) to create a phase ruleset. You can create a phase ruleset at the account level or at the zone level.

You can specify the rules of the ruleset when creating the ruleset — that is, in the same API request. Alternatively, you can define the set of rules later, in a separate request, using the [Update ruleset](/cf-rulesets/rulesets-api/update) operation.

In the `data` field, include the following parameters.

* `name` - The name for your ruleset. You cannot change the name after creating the phase ruleset.
* `kind` - Indicates the ruleset kind. The kind must be `root` for phase rulesets at the account level and `zone` for phase rulesets at the zone level. You cannot edit the `kind` value later.
* `phase` - Indicates the phase where you want to create the ruleset.
* `description` - Optional. You can update this field when editing your phase ruleset.

## Examples

<details>
<summary>Example: Create phase ruleset at the zone level</summary>
<div>

The following example creates a phase ruleset at the zone level for the `http_request_firewall_managed` phase. It also defines a single rule in the ruleset that runs a Managed Ruleset for incoming requests.

Note the `kind`, `phase`, and `expression` field values:

* `kind` is set to `zone` because this is a zone-level phase ruleset.
* `phase` is set to `http_request_firewall_managed` which is the name of the desired phase.
* `expression` is set to `true` because the endpoint already sets the context for a specific zone (`{zone-id}`).

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets" \
-d '{
  "name": "Zone-level phase ruleset",
  "kind": "zone",
  "description": "This ruleset deploys a Managed Ruleset.",
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{managed-ruleset-id}"
      },
      "expression": "true"
    }
  ],
  "phase": "http_request_firewall_managed"
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone-level phase ruleset",
    "description": "This ruleset deploys a Managed Ruleset.",
    "kind": "zone",
    "version": "1",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "{managed-ruleset-id}"
        },
        "last_updated": "2021-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Create phase ruleset at the account level</summary>
<div>

The following example creates a phase ruleset at the account level for the `http_request_firewall_managed` phase. It also defines a single rule in the ruleset that runs a Managed Ruleset for incoming requests addressed at `example.com` or `anotherexample.com`.

Note the `kind` and `phase` field values:

* `kind` is set to `root` because this is an account-level phase ruleset.
* `phase` is set to `http_request_firewall_managed` which is the name of the desired phase.

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" \
-d '{
  "name": "Account-level phase ruleset",
  "kind": "root",
  "description": "This ruleset deploys a Managed Ruleset for example.com and anotherexample.com.",
  "rules": [
    {
      "action": "execute",
      "action_parameters": {
        "id": "{managed-ruleset-id}"
      },
      "expression": "cf.zone.name in {\"example.com\" \"anotherexample.com\"}"
    }
  ],
  "phase": "http_request_firewall_managed"
}'
```

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Account-level phase ruleset",
    "description": "This ruleset deploys a Managed Ruleset for example.com and anotherexample.com.",
    "kind": "root",
    "version": "1",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "action": "execute",
        "expression": "cf.zone.name in {\"example.com\" \"anotherexample.com\"}",
        "action_parameters": {
          "id": "{managed-ruleset-id}"
        },
        "last_updated": "2021-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_managed"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

To add a rule that deploys a ruleset, refer to [Deploy rulesets](/cf-rulesets/deploy-rulesets).
