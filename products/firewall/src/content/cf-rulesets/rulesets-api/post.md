---
title: POST example
alwaysopen: true
order: 784
---

# POST example

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

## Create Ruleset

```bash
POST accounts/{account_id}/rulesets
```

Creates a new ruleset.

The following parameters are required.

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
      <td>The kind of ruleset the JSON object represents</td>
      <td>String</td>
      <td><p>Allowed values:
          <ul>
            <li><em>root</em></li>
            <li><em>custom</em></li>
          </ul>
        </p><p>You can only create one root ruleset for your account.</p></td>
    </tr>
  </tbody>
</table>

Use the `rules` parameter to supply a list of rules that define the ruleset. For an object definition, see [Rulesets API: JSON Objects](/cf-rulesets/rulesets-api/json-object).

### Request

```bash
curl -X POST \
"https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets" --data '
{
  "name": "Example ruleset",
  "kind": "root",
  "description": "Example ruleset description",
  "rules": [
    {
    "action": "log",
    "expression": "cf.zone.name eq \"example.com\""
    }]
}'

```

### Response

```json
{
  "result": {
    "id": "{ruleset_id}",
    "name": "Example ruleset",
    "description": "Example ruleset description",
    "kind": "root",
    "version": "1",
    "rules": [
      {
        "id": "{rule_id}",
        "version": "1",
        "action": "log",
        "expression": "cf.zone.name eq \"example.com\"",
        "last_updated": "2020-07-17T15:42:37.917815Z"
      }
    ],
    "last_updated": "2020-07-17T15:42:37.917815Z",
  },
  "success": true,
  "errors": [],
  "messages": []
}
```