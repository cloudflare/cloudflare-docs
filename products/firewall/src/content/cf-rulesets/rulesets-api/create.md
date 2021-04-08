---
title: Create ruleset
alwaysopen: true
order: 784
---

# Create ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Creates a ruleset of a given kind in the specified Phase. 

Use one of the following endpoints when creating a ruleset:

```bash
---
header: Account-level endpoint
---
POST accounts/{account-id}/rulesets
```

```bash
---
header: Zone-level endpoint
---
POST zones/{zone-id}/rulesets
```

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
            <li><em>root</em> - creates a Phase ruleset at the account level</li>
            <li><em>zone</em> - creates a Phase ruleset at the zone level</li>
            <li><em>custom</em> - creates a custom ruleset</li>
          </ul>
        </p></td>
    </tr>
    <tr>
      <td><code>phase</code></td>
      <td>The name of the Phase where the ruleset will be created.</td>
      <td>String</td>
      <td>Check the specific Cloudflare product documentation for more information on the Phases where you can create custom rulesets.</td>
    </tr>
  </tbody>
</table>

Use the `rules` parameter to supply a list of rules that define the ruleset. For an object definition, see [Rulesets API: JSON Object](/cf-rulesets/rulesets-api/json-object).

## Example - Create a zone-level Phase ruleset

This example creates a zone-level Phase ruleset at the `http_request_firewall_managed` Phase with a single rule that deploys a Managed Ruleset.

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets" \
-d '{
  "name": "Zone-level Phase ruleset",
  "kind": "zone",
  "description": "This ruleset deploys a Managed Ruleset.",
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "{managed-ruleset-id}"
      }
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
    "name": "Zone-level Phase ruleset",
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

## Example - Create a custom ruleset

This example creates a custom ruleset in the `http_request_firewall_custom` Phase with a single rule.

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets" \
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

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Example custom ruleset",
    "description": "Example ruleset description",
    "kind": "custom",
    "version": "1",
    "rules": [
      {
        "id": "{rule-id}",
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