---
title: Enable only Joomla rules
pcx-content-type: configuration
alwaysopen: true
order: 772
---

# Use category overrides to enable Joomla rules

Use the [Rulesets API](/rulesets-api) to configure the execution of a Managed Ruleset and override its behavior. By default, enabled rules perform the actions defined by the Managed Ruleset issuer. This example uses overrides to ensure that only rules with a specific tag are enabled.

Follow the steps below to configure the execution of a Managed Ruleset with two overrides for enabling only the rules tagged with `joomla`.

1. [Add a rule](/basic-operations/deploy-rulesets) to a phase entry point ruleset that executes a Managed Ruleset.
1. [Configure a ruleset override](/managed-rulesets/override-managed-ruleset) that disables all rules in the Managed Ruleset.
1. Configure a tag override that enables only the rules with a given tag.

Tag overrides take precedence over ruleset overrides. Only the rules with the specified tag are enabled, and all other rules are disabled.

The example below uses the [Update ruleset](/rulesets-api/update) endpoint to deploy the Cloudflare Managed Ruleset to a phase with only Joomla rules enabled. The `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

<details>
<summary>Example: Enable only Joomla rules using category overrides at the zone level</summary>
<div>

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
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

* `"id": "{managed-ruleset-id}"` adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for the specified zone (`{zone-id}`).
* `"enabled": false` defines an override at the ruleset level that disables all rules in the Managed Ruleset.
* `"categories": [{"category": "joomla", "action": "block", "enabled": true}]` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

</div>
</details>

<details>
<summary>Example: Enable only Joomla rules using category overrides at the account level</summary>
<div>

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
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

* `"id": "{managed-ruleset-id}"` adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for `example.com`.
* `"enabled": false` defines an override at the ruleset level that disables all rules in the Managed Ruleset.
* `"categories": [{"category": "joomla", "action": "block", "enabled": true}]` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

</div>
</details>

You can add more than one category override to a rule.

The example below uses a `PUT` request to add two overrides to the rule that executes a Managed Ruleset (`{managed-ruleset-id}`) in the `http_request_firewall_managed` phase. Note that the `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

<details>
<summary>Example: Add more than one category override at the zone level</summary>
<div>

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
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
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/account/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
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

The order of the overrides in the root ruleset affects whether rules in the deployed Managed Ruleset are enabled or disabled. Overrides placed later in the list take precedence over earlier overrides. Consider four rules from the Managed Ruleset in the code above that have different combinations of `category` tags.

The following table shows the status of the rules after the overrides.

<table>
  <thead>
    <tr>
      <th>Rule in Managed Ruleset</th>
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
