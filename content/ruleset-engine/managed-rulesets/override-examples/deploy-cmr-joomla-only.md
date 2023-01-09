---
title: Enable only Joomla rules
pcx_content_type: configuration
weight: 3
meta:
  title: Use category overrides to enable Joomla rules
---

# Use category overrides to enable Joomla rules

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to configure the execution of a managed ruleset and override its behavior. By default, enabled rules perform the actions defined by the managed ruleset issuer. This example uses overrides to ensure that only rules with a specific tag are enabled.

Follow the steps below to configure the execution of a managed ruleset with two overrides for enabling only the rules tagged with `joomla`.

1.  [Add a rule](/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2.  [Configure a ruleset override](/ruleset-engine/managed-rulesets/override-managed-ruleset/) that disables all rules in the managed ruleset.
3.  Configure a tag override that enables only the rules with a given tag.

Tag overrides take precedence over ruleset overrides. Only the rules with the specified tag are enabled, and all other rules are disabled.

## Example 1

This example uses the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation to deploy the Cloudflare Managed Ruleset to a phase with only Joomla rules enabled. The `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

<details>
<summary>Example: Enable only Joomla rules using category overrides at the zone level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "enabled": false,
          "categories": [
            {
              "category": "joomla",
              "action": "block",
              "enabled": true
            }
          ]
        }
      }
    }
  ]
}'
```

*   `"id": "<MANAGED_RULESET_ID>"` adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for the specified zone (`<ZONE_ID>`).
*   `"enabled": false` defines an override at the ruleset level that disables all rules in the managed ruleset.
*   `"categories": [{"category": "joomla", "action": "block", "enabled": true}]` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

</div>
</details>

<details>
<summary>Example: Enable only Joomla rules using category overrides at the account level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "enabled": false,
          "categories": [
            {
              "category": "joomla",
              "action": "block",
              "enabled": true
            }
          ]
        }
      }
    }
  ]
}'
```

*   `"id": "<MANAGED_RULESET_ID>"` adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for `example.com`.
*   `"enabled": false` defines an override at the ruleset level that disables all rules in the managed ruleset.
*   `"categories": [{"category": "joomla", "action": "block", "enabled": true}]` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

</div>
</details>

You can add more than one category override to a rule.

## Example 2

This example uses a `PUT` request to add two overrides to the rule that executes a managed ruleset (`<MANAGED_RULESET_ID>`) in the `http_request_firewall_managed` phase. Note that the `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

<details>
<summary>Example: Add more than one category override at the zone level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "enabled": false,
          "categories": [
            {
              "category": "joomla",
              "action": "log",
              "enabled": true
            },
            {
              "category": "wordpress",
              "enabled": false
            }
          ]
        }
      }
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Example: Add more than one category override at the account level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/account/<ACCOUNT_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "enabled": false,
          "categories": [
            {
              "category": "joomla",
              "action": "log",
              "enabled": true
            },
            {
              "category": "wordpress",
              "enabled": false
            }
          ]
        }
      }
    }
  ]
}'
```

</div>
</details>

The order of the overrides in the root ruleset affects whether rules in the deployed managed ruleset are enabled or disabled. Overrides placed later in the list take precedence over earlier overrides. Consider four rules from the managed ruleset in the code above that have different combinations of `category` tags.

The following table shows the status of the rules after the overrides.

<table>
  <thead>
    <tr>
      <th>Rule in managed ruleset</th>
      <th>Tags</th>
      <th>Rule status after overrides</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ManagedRule1</td>
      <td>drupal, dos</td>
      <td>disabled</td>
    </tr>
    <tr>
      <td>ManagedRule2</td>
      <td>drupal, dos, joomla</td>
       <td>enabled</td>
    </tr>
    <tr>
      <td>ManagedRule3</td>
      <td>dos, joomla, wordpress</td>
      <td>disabled</td>
    </tr>
    <tr>
      <td>ManagedRule4</td>
      <td>drupal, wordpress</td>
      <td>disabled</td>
    </tr>
    <tr>
      <td>ManagedRule5</td>
      <td>(no tags)</td>
      <td>disabled</td>
    </tr>
  </tbody>
</table>
