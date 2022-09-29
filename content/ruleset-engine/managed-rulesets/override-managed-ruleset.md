---
title: Override a Managed Ruleset
pcx_content_type: how-to
weight: 3
---

# Override a Managed Ruleset

To customize the behavior of a Managed Ruleset, override the ruleset at deployment. When you override a ruleset you specify changes to be executed on top of the default configuration. These changes take precedence over the ruleset's default behavior.

For example, to test a Managed Ruleset before enforcing it, consider executing the ruleset with all rules set to `log` instead of their default actions. To do this, override the configured behavior of the Managed Ruleset at the ruleset level, so that each rule uses the `log` action.

To define overrides in the Cloudflare dashboard, edit the configuration of the Managed Ruleset you previously deployed to a zone or to an account.

## Working with overrides

You can override a ruleset at three levels:

* **Ruleset overrides** apply to all rules in the executed ruleset.
* **Tag overrides** apply to all rules with a specific tag. For example, use a tag override to customize the Cloudflare Managed Ruleset so all rules with the `wordpress` tag are set to *Block*. If multiple tags have overrides and if a given rule has more than one of these tags, the tag overrides order determines the behavior. For rules tagged with multiple overridden tags, the last tag's overrides apply.
* **Rule overrides** apply to specific rules in a Managed Ruleset, referenced by their Rule ID.

Specific overrides take precedence over more general ones, and rule overrides take precedence over tag overrides, which take precedence over ruleset overrides.

{{<Aside type="warning" header="Important">}}

Ruleset overrides and tag overrides apply to both existing and **future** rules in the Managed Ruleset. If you wish to override existing rules only, you must use rule overrides.

{{</Aside>}}

To apply an override for a Managed Ruleset:

* Call the [Update ruleset](/ruleset-engine/rulesets-api/update/) operation on your account-level phase entry point.
* Specify the `overrides` in the `action_parameters` of the rule that executes your Managed Ruleset.

```json
"action_parameters": {
  "id": "<RULESET_ID>",
  "overrides": {
    // ruleset overrides
    "property-to-modify": "value",
    "property-to-modify": "value",
    // tag overrides
    "categories": [
      {
        "category": "<TAG_NAME>",
        "property-to-modify": "value",
        "property-to-modify": "value"
      }
    ],
    // rule overrides
    "rules": [
      {
        "id": "<RULE_ID>",
        "property-to-modify": "value",
        "property-to-modify": "value"
      }
    ]
  }
}
```

You can override the following rule properties:

* `"action"`
* `"enabled"`

Some Managed Rulesets may have additional override requirements, or they may allow you to override other rule properties. Check each Cloudflare product’s documentation for details.

{{<Aside type="warning" header="Important">}}

It is **not recommended** that you enable all the rules in a Managed Ruleset at the account level using an override, since this change could affect all the zones in your account. Some rules are disabled by default, since they could eventually affect legitimate traffic, and should not be enabled across zones without previous consideration.

{{</Aside>}}

## Examples

The following request adds a rule that executes a Managed Ruleset in the `http_request_firewall_managed` phase, and defines a rule override to enable rule `<RULE_ID>` and set its action to `log`.

<details>
<summary>Example: Execute a Managed Ruleset with overrides in a phase at the zone level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "description": "Deploy Managed Ruleset, enabling a specific rule with log action",
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "rules": [
            {
              "id": "<RULE_ID>",
              "enabled": true,
              "action": "log"
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

The following request adds a rule that executes a Managed Ruleset in the `http_request_firewall_managed` phase, and defines a ruleset override that sets the action to `log` for all (enabled) rules.

<details>
<summary>Example: Execute a Managed Ruleset with overrides in a phase at the account level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "description": "Deploy Managed Ruleset for example.com, overriding the rules action to log",
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\" AND zone.level eq \"ENT\"",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "action": "log"
        }
      }
    }
  ]
}'
```

</div>
</details>

For additional examples of configuring overrides, refer to [Managed Ruleset override examples](/ruleset-engine/managed-rulesets/override-examples/).
