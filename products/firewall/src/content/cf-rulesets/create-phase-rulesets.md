---
title: Create phase entry points
pcx-content-type: how-to
type: overview
order: 720
---

# Create phase entry points

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

A phase entry point behaves like a ruleset. You must create the phase entry point to be able to add rules and execute rulesets on it.

Use the [Rulesets API](/cf-rulesets/rulesets-api) to create a phase entry point. You can create a phase entry point at the account level or at the zone level.

You can specify the rules to execute in the entry point creating it — that is, in the same API request. Alternatively, you can define the set of rules later, in a separate request, using the [Update ruleset](/cf-rulesets/rulesets-api/update) operation.

In the `data` field, include the following parameters.

* `name`: The name of the phase entry point. You cannot change the name of a phase entry point after creating it.
* `kind`: Indicates the ruleset kind. The kind must be `root` for phase entry points at the account level and `zone` for phase entry points at the zone level. You cannot edit the `kind` value later.
* `phase`: Indicates the phase where you want to create the entry point.
* `description`: Optional. You can update this field when editing the phase entry point.

## Examples

<details>
<summary>Example: Create phase entry point at the zone level</summary>
<div>

The following example creates a phase entry point at the zone level for the `http_request_firewall_managed` phase. It also defines a single rule that executes a Managed Ruleset for incoming requests.

Note the `kind`, `phase`, and `expression` field values:

* `kind` is set to `zone` because this is a zone-level phase entry point.
* `phase` is set to `http_request_firewall_managed` which is the name of the desired phase.
* `expression` is set to `true` since the entry point rules will apply to all traffic in the specified zone (`{zone-id}`).

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets" \
-d '{
  "name": "Zone-level phase entry point",
  "kind": "zone",
  "description": "Executes a Managed Ruleset.",
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
    "name": "Zone-level phase entry point",
    "description": "Executes a Managed Ruleset.",
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
<summary>Example: Create phase entry point at the account level</summary>
<div>

The following example creates a phase entry point at the account level for the `http_request_firewall_managed` phase. It also defines a single rule in the entry point that executes a Managed Ruleset for incoming requests addressed at `example.com` or `anotherexample.com`.

Note the `kind` and `phase` field values:

* `kind` is set to `root` because this is an account-level phase entry point.
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
  "name": "Account-level phase entry point",
  "kind": "root",
  "description": "Executes a Managed Ruleset for example.com and anotherexample.com.",
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
    "name": "Account-level phase entry point",
    "description": "Executes a Managed Ruleset for example.com and anotherexample.com.",
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

To add a rule that executes a ruleset, refer to [Execute rulesets](/cf-rulesets/execute-rulesets).
