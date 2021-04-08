---
title: Override a Managed Ruleset
alwaysopen: true
order: 752
---

# Override a Managed Ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

You cannot edit a Managed Ruleset, but you can customize its behavior by overriding it at deployment. When you override a ruleset, specify changes to be executed on top of the default configuration. These changes take precedence over the ruleset's default behavior.

For example, if you want to test a ruleset before enforcing it, you may want to execute a Managed Ruleset with all rules set to `log` instead of their default actions. To accomplish this, override the configured behavior of the Managed Ruleset at the ruleset level so each rule uses the _Log_ action.

## Working with overrides

You can override a ruleset at three levels.

* **Ruleset overrides** are for all rules in the specified rulesets.
* **Tag overrides** are for all rules with a specific tag. For example, use a tag override to customize the Cloudflare Managed Ruleset so all rules with the `wordpress` tag are set to _Block_. If multiple tags have overrides and if a given rule has more than one of these tags, the tag overrides order determines the behavior. For rules tagged with multiple overridden tags, the last tag's overrides apply.
* **Rule overrides** are for specific rules in a Managed Ruleset, referenced by their Rule ID.

To apply an override for a Managed Ruleset, execute the [Update ruleset](/cf-rulesets/rulesets-api/update/) operation on your root ruleset and specify the `overrides` in the `action_parameters` of the rule that executes your Managed Ruleset.

```json
"overrides": {
  "rulesets": [
    {
      "property-to-modify": "value",
      "property-to-modify": "value"
    }
  ],
  "categories": [
    {
      "property-to-modify": "value",
      "property-to-modify": "value"
    }
  ],
  "rules": [
    {
      "property-to-modify": "value",
      "property-to-modify": "value"
    }
  ]
}
```

Specific overrides take precedence over more general ones, and rule overrides take precedence over tag overrides, which take precedence over ruleset overrides.

You can override the following rule properties:

* `action` (block, challenge, log)
* `enabled` (true, false)

## Examples

The following request deploys a Managed Ruleset to the `http_request_firewall_managed` Phase and defines a ruleset override to deploy the `log` action for all rules in that ruleset.

<details>
<summary>Example: Deploy a Managed Ruleset to a Phase at the zone level</summary>
<div>

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "description": "Managed rule behavior set to log action",
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
        "overrides": {
          "rulesets": [
            {
              "action": "log",
              "enabled": "true"
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
<summary>Example: Deploy a Managed Ruleset to a Phase at the account level</summary>
<div>

```json
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/phases/http_request_firewall_managed/entrypoint" \
-d '{
  "description": "Managed rule behavior set to log action",
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "{managed-ruleset-id}",
        "overrides": {
          "rulesets": [
            {
              "action": "log",
              "enabled": "true"
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

For additional examples of configuring overrides, see [Workflow examples](/cf-rulesets/common-use-cases).
