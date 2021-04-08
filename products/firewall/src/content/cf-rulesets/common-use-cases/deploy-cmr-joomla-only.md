---
title: Enable only Joomla rules
alwaysopen: true
order: 772
---

# Use category overrides to enable Joomla rules

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Use the [Rulesets API](/cf-rulesets/rulesets-api) to deploy Managed Rulesets and override their behavior. This ensures that **only rules with a specific tag are enabled**. By default, enabled rules run with actions set by the ruleset issuer in the Managed Ruleset.

Follow the steps below to deploy Managed Rulesets that enable rules tagged with `joomla`.

1. [Add a rule](/cf-rulesets/deploy-rulesets) to the ruleset of a Phase that deploys a Managed Ruleset.
1. [Configure a ruleset override](/cf-rulesets/managed-rulesets/override-managed-ruleset) that disables all rules in the Managed Ruleset.
1. Configure a tag override that enables only the rules with a given tag.

Tag overrides take precedence over ruleset overrides. Only the rules with the specified tag are enabled, and all other rules are disabled.

The example below uses the [Update ruleset](/cf-rulesets/rulesets-api/update/) endpoint to deploy the Cloudflare Managed Ruleset to a Phase with only Joomla rules enabled. Note that the `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

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
          "rulesets": [
            {
              "enabled": "false"
            }
          ],
          "categories": [
            {
              "category": "joomla",
              "action": "block"
            }
          ]
        }
      }
    }
  ]
}'
```

* `"id": "{managed-ruleset-id}"` adds a rule to the ruleset of a Phase that will apply the Cloudflare Managed Ruleset to requests for the specified zone (`{zone-id}`).
* `"overrides": {"rulesets": {"enabled": false}}` defines an override at the ruleset level that disables all rules in the Managed Ruleset.
* `"overrides": {"category": joomla", "action": "block"}` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

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
          "rulesets": [
            {
              "enabled": "false"
            }
          ],
          "categories": [
            {
              "category": "joomla",
              "action": "block"
            }
          ]
        }
      }
    }
  ]
}'
```

* `"id": "{managed-ruleset-id}"` adds a rule to the ruleset of a Phase that will apply the Cloudflare Managed Ruleset to requests for `example.com`.
* `"overrides": {"rulesets": {"enabled": false}}` defines an override at the ruleset level that disables all rules in the Managed Ruleset.
* `"overrides": {"category": joomla", "action": "block"}` defines an override at the tag level that enables the Joomla rules and sets their action to `block`.

</div>
</details>

You can add more than one category override to a rule.

The example below uses a `PUT` request to add two overrides to the deployment of a Managed Ruleset (`{managed-ruleset-id}`) in the `http_request_firewall_managed` Phase. Note that the `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

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
          "rulesets": [
            {
              "enabled": false
            }
          ],
          "categories": [
            {
              "category": "joomla",
              "enabled": true,
              "action": "log"
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
          "rulesets": [
            {
              "enabled": false
            }
          ],
          "categories": [
            {
              "category": "joomla",
              "enabled": true,
              "action": "log"
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
