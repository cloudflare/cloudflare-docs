---
title: JSON object
alwaysopen: true
order: 781
---

# JSON object

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

## Ruleset object

A fully populated ruleset object has the following JSON structure.

```json
{
    "id": "ruleset_id",
    "name": "Example Ruleset",
    "description": Description of Example Ruleset",
    "kind": "managed",
    "version": "2",
    "rules": [
      {
        "id": "rule-id",
        "version": "2",
        "action": "block",
        "expression": "cf.zone.name eq \"example.com\"  ",
        "last_updated": "2020-07-20T10:44:29.124515Z"
      }
    ],
    "last_updated": "2020-07-20T10:44:29.124515Z",
  }
```

## Properties

The table lists the properties of a ruleset object

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
      <th>Value</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody style="vertical-align:top">
    <tr>
      <td><code>id</code></td>
      <td>Represents the unique Cloudflare-generated identifier for a given version of a ruleset</td>
      <td>32-character UUIDv4 string</td>
      <td>Unique, read-only</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>A human-readable name for the ruleset.</td>
      <td>String</td>
      <td>The name is immutable. You cannot change the name over the lifetime of the ruleset</td>
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
      <td>
        <p>There are three kinds of ruleset:
          <ul>
            <li><em>root</em></li>
            <li><em>managed</em></li>
            <li><em>custom</em></li>
          </ul>
        </p>
      </td>
      <td><code>kind</code> is immutable.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>The version of the ruleset</td>
      <td>An integer value that starts at <code>1</code> and increments by 1 each time the ruleset is modified</td>
      <td>Read-only</td>
    </tr>
    <tr>
      <td><code>rules</code></td>
      <td>A list of rules to include in the ruleset</td>
      <td>An array of JSON objects</td>
      <td></td>
    </tr>
    <tr>
      <td><code>last_updated</code></td>
      <td>The time (UTC) when the ruleset was last updated</td>
      <td>ISO 8601 timestamp in the format YYYY-MM-DDThh:mm:ss.TZD</td>
      <td>Read-only</td>
    </tr>
  </tbody>
</table>