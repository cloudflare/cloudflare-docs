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
  "id": "ruleset-id",
  "name": "Example Ruleset",
  "description": "Description of Example Ruleset",
  "kind": "custom",
  "version": "2",
  "phase": "http_request_firewall_custom", 
  "rules": [
    {
      "id": "rule-id",
      "version": "2",
      "action": "block",
      "expression": "cf.zone.name eq \"example.com\" ",
      "last_updated": "2020-07-20T10:44:29.124515Z"
    }
  ],
  "last_updated": "2020-07-20T10:44:29.124515Z"
}
```

### Properties

The table lists the properties of a ruleset object.

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
      <td>Represents the unique Cloudflare-generated identifier for a given version of a ruleset.</td>
      <td>32-character UUIDv4 string</td>
      <td>Unique, read-only</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>A human-readable name for the ruleset.</td>
      <td>String</td>
      <td>The name is immutable. You cannot change the name over the lifetime of the ruleset.</td>
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
        <p>There are four kinds of rulesets:
          <ul>
            <li><em>root</em></li>
            <li><em>zone</em></li>            
            <li><em>managed</em></li>
            <li><em>custom</em></li>
          </ul>
        </p>
      </td>
      <td><code>kind</code> is immutable.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>The version of the ruleset.</td>
      <td>Integer value starting at <code>1</code> and incremented by <code>1</code> each time the ruleset is modified</td>
      <td>Read-only</td>
    </tr>
    <tr>
      <td><code>phase</code></td>
      <td>The Phase to which the ruleset belongs.</td>
      <td>String</td>
      <td><code>phase</code> is immutable.</td>
    </tr>
    <tr>
      <td><code>rules</code></td>
      <td>A list of rules to include in the ruleset.</td>
      <td>Array of JSON objects (see <a href="#rule-object-structure-and-properties">rule JSON object</a>)</td>
      <td></td>
    </tr>
    <tr>
      <td><code>last_updated</code></td>
      <td>The time (UTC) when the ruleset was last updated.</td>
      <td>ISO 8601 timestamp in the format YYYY-MM-DDThh:mm:ss.TZD</td>
      <td>Read-only</td>
    </tr>
  </tbody>
</table>

## Rule object structure and properties

A fully populated rule JSON object has the following structure:

```json
{
  "id": "rule-id",
  "version": "2",
  "action": "block",
  "categories": [
    "wordpress"
  ],
  "expression": "cf.zone.name eq \"example.com\"",
  "last_updated": "2020-07-20T10:44:29.124515Z",
  "enabled": true    
}
```

The JSON object properties for a rule are defined as follows:

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
      <td>Represents the unique Cloudflare-generated identifier for a given version of a rule.</td>
      <td>32-character UUIDv4 string</td>
      <td>Unique, read-only</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>The version of the rule.</td>
      <td>Integer value starting at <code>1</code> and incremented by <code>1</code> each time the ruleset is modified</td>
      <td>Read-only. Changing the order of a rule in a ruleset does not change its version.</td>
    </tr>
    <tr>
      <td><code>action</code></td>
      <td>Defines what happens when there’s a match for the rule expression.</td>
      <td>String</td>
      <td>The available actions depend on the Phase where the rule's ruleset is deployed.</td>
    </tr>
    <tr>
      <td><code>categories</code></td>
      <td>Tags associated with the current rule. You can define overrides that affect rules with a given tag.</td>
      <td>Array of strings</td>
      <td>Read-only. Only available in rules of Managed Rulesets.</td>
    </tr>
    <tr>
      <td><code>expression</code></td>
      <td>Criteria defining when there is a match for the current rule.</td>
      <td>String</td>
      <td>The fields and functions you can use in a rule expression depend on the Phase where the rule's ruleset is deployed.</td>
    </tr>
    <tr>
      <td><code>last_updated</code></td>
      <td>The time (UTC) when the rule was last updated.</td>
      <td>ISO 8601 timestamp in the format YYYY-MM-DDThh:mm:ss.TZD</td>
      <td>Read-only</td>
    </tr>
    <tr>
      <td><code>enabled</code></td>
      <td>When set to <code>true</code>, the current rule is enabled.</td>
      <td>Boolean</td>
      <td></td>
    </tr>
  </tbody>
</table>
