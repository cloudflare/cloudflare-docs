---
title: Create ruleset
pcx-content-type: reference
type: overview
weight: 785
layout: list
---

# Create ruleset

Creates a ruleset of a given kind in the specified phase. Allows you to create phase entry point rulesets.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Create account ruleset][cr-account] | `POST /accounts/<ACCOUNT_ID>/rulesets` |
| [Create zone ruleset][cr-zone] | `POST /zones/<ZONE_ID>/rulesets` |

[cr-account]: https://api.cloudflare.com/#account-rulesets-create-account-ruleset

[cr-zone]: https://api.cloudflare.com/#zone-rulesets-create-zone-ruleset

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
            <li><em>custom</em> - creates a custom ruleset</li>
            <li><em>root</em> - creates a phase entry point ruleset at the account level</li>
            <li><em>zone</em> - creates a phase entry point ruleset at the zone level</li>
          </ul>
        </p></td>
    </tr>
    <tr>
      <td><code>phase</code></td>
      <td>The name of the phase where the ruleset will be created.</td>
      <td>String</td>
      <td>Check the specific Cloudflare product documentation for more information on the phases where you can create rulesets for that product.</td>
    </tr>
  </tbody>
</table>

Use the `rules` parameter to supply a list of rules for the ruleset. For an object definition, refer to [Rulesets API: JSON Object](/ruleset-engine/rulesets-api/json-object/).

## Example - Create a custom ruleset

The following example request creates a custom ruleset in the `http_request_firewall_custom` phase containing a single rule.

<details open>
<summary>Request</summary>
<div>

```json
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
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

</div>
</details>

<details>
<summary>Response</summary>
<div>

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

</div>
</details>

## Example - Create a zone-level phase entry point ruleset

The following example request creates a zone-level phase entry point ruleset at the `http_request_firewall_managed` phase with a single rule that executes a Managed Ruleset.

{{<Aside type="note">}}

You do not have to use this method to create a phase entry point ruleset — Cloudflare automatically creates the entry point ruleset when you add a rule to it, if it does not exist. Refer to [Add rules to phase entry point rulesets](/ruleset-engine/basic-operations/add-rule-phase-rulesets/) for more information.

{{</Aside>}}

<details open>
<summary>Request</summary>
<div>

```json
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "name": "Zone-level phase entry point",
  "kind": "zone",
  "description": "This ruleset executes a Managed Ruleset.",
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

</div>
</details>

<details>
<summary>Response</summary>
<div>

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone-level phase entry point",
    "description": "This ruleset executes a Managed Ruleset.",
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

</div>
</details>
