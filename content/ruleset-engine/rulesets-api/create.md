---
title: Create ruleset
pcx_content_type: reference
type: overview
weight: 5
layout: wide
---

# Create ruleset

Creates a ruleset of a given kind in the specified phase. Allows you to create phase entry point rulesets.

Use one of the following API endpoints:

| Operation                               | Method + Endpoint                      |
| --------------------------------------- | -------------------------------------- |
| [Create an account ruleset][cr-account] | `POST /accounts/{account_id}/rulesets` |
| [Create a zone ruleset][cr-zone]        | `POST /zones/{zone_id}/rulesets`       |

[cr-account]: /api/operations/createAccountRuleset
[cr-zone]: /api/operations/createZoneRuleset

The following parameters are required:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Value</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style='vertical-align:top'>
    <tr>
      <td><code>name</code></td>
      <td>A human-readable name for the ruleset.</td>
      <td>String</td>
      <td>The name is immutable. You cannot change it over the lifetime of the ruleset.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>Optional description for the ruleset.</td>
      <td>String</td>
      <td>You can change the description over the lifetime of the ruleset.</td>
    </tr>
    <tr>
      <td><code>kind</code></td>
      <td>The kind of ruleset the JSON object represents.</td>
      <td>String</td>
      <td><p>Allowed values:
          <ul>
            <li><code>custom</code>: Creates a custom ruleset</li>
            <li><code>root</code>: Creates a phase entry point ruleset at the account level</li>
            <li><code>zone</code>: Creates a phase entry point ruleset at the zone level</li>
          </ul>
        </p></td>
    </tr>
    <tr>
      <td><code>phase</code></td>
      <td>The name of the <a href="/ruleset-engine/about/phases/">phase</a> where the ruleset will be created.</td>
      <td>String</td>
      <td>Check the specific Cloudflare product documentation for more information on the phases where you can create rulesets for that product.</td>
    </tr>
  </tbody>
</table>

Use the `rules` parameter to supply a list of rules for the ruleset. For an object definition, refer to [Rulesets API: JSON Object](/ruleset-engine/rulesets-api/json-object/).

## Example - Create a custom ruleset

The following example request creates a custom ruleset in the `http_request_firewall_custom` phase containing a single rule.

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Example custom ruleset",
  "kind": "custom",
  "description": "Example ruleset description",
  "rules": [
    {
      "action": "log",
      "expression": "cf.zone.name eq \"example.com\""
    }
  ],
  "phase": "http_request_firewall_custom"
}'
```

{{</details>}}

{{<details header="Response">}}

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Example custom ruleset",
    "description": "Example ruleset description",
    "kind": "custom",
    "version": "1",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "log",
        "expression": "cf.zone.name eq \"example.com\"",
        "last_updated": "2021-03-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2021-03-17T15:42:37.917815Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

## Example - Create a zone-level phase entry point ruleset

The following example request creates a zone-level phase entry point ruleset at the `http_request_firewall_managed` phase with a single rule that executes a managed ruleset.

{{<Aside type="note">}}

You do not have to use this method to create a phase entry point ruleset — Cloudflare automatically creates the entry point ruleset when you add a rule to it, if it does not exist. Refer to [Add rules to phase entry point rulesets](/ruleset-engine/basic-operations/add-rule-phase-rulesets/) for more information.

{{</Aside>}}

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "name": "Zone-level phase entry point",
  "kind": "zone",
  "description": "This ruleset executes a managed ruleset.",
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>"
      }
    }
  ],
  "phase": "http_request_firewall_managed"
}'
```

{{</details>}}

{{<details header="Response">}}

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "This ruleset executes a managed ruleset.",
    "kind": "zone",
    "version": "1",
    "rules": [
      {
        "id": "<RULE_ID>",
        "version": "1",
        "action": "execute",
        "expression": "true",
        "action_parameters": {
          "id": "<MANAGED_RULESET_ID>"
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

{{</details>}}
