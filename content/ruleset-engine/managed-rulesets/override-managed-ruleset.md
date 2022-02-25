---
title: Override a Managed Ruleset
pcx-content-type: how-to
alwaysopen: true
weight: 753
---

# Override a Managed Ruleset

You cannot add or remove rules from a Managed Ruleset, but you can customize its behavior by overriding it at deployment. When you override a ruleset you specify changes to be executed on top of the default configuration. These changes take precedence over the ruleset's default behavior.

For example, if you want to test a ruleset before enforcing it, you may want to execute a Managed Ruleset with all rules set to `log` instead of their default actions. To accomplish this, override the configured behavior of the Managed Ruleset at the ruleset level, so that each rule uses the *Log* action.

## Working with overrides

You can override a ruleset at three levels:

*   **Ruleset overrides** apply to all rules in the executed ruleset.
*   **Tag overrides** apply to all rules with a specific tag. For example, use a tag override to customize the Cloudflare Managed Ruleset so all rules with the `wordpress` tag are set to *Block*. If multiple tags have overrides and if a given rule has more than one of these tags, the tag overrides order determines the behavior. For rules tagged with multiple overridden tags, the last tag's overrides apply.
*   **Rule overrides** apply to specific rules in a Managed Ruleset, referenced by their Rule ID.

To apply an override for a Managed Ruleset:

*   Call the [Update ruleset](/ruleset-engine/rulesets-api/update/) method on your account-level phase entry point.
*   Specify the `overrides` in the `action_parameters` of the rule that executes your Managed Ruleset.

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

Specific overrides take precedence over more general ones, and rule overrides take precedence over tag overrides, which take precedence over ruleset overrides.

You can override the following rule properties:

*   `"action"` (`"block"`, `"challenge"`, `"log"`)
*   `"enabled"` (`true`, `false`)

<Aside type="note" header="Note">

Some Managed Rulesets may have additional override requirements, or they may allow you to override other rule properties. Check each Cloudflare product’s documentation for details.

</Aside>

## Examples

The following request adds a rule that executes a Managed Ruleset in the `http_request_firewall_managed` phase and defines a ruleset override to execute the `log` action for all rules in that ruleset.

<details>
<summary>Example: Execute a Managed Ruleset with overrides in a phase at the zone level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "description": "Managed rule behavior set to log action",
  "rules": [
    {
      "action": "execute",
      "expression": "true",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "action": "log",
          "enabled": true
        }
      }
    }
  ]
}'
```

</div>
</details>

<details>
<summary>Example: Execute a Managed Ruleset with overrides in a phase at the account level</summary>
<div>

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/rulesets/phases/http_request_firewall_managed/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "description": "Managed rule behavior set to log action",
  "rules": [
    {
      "action": "execute",
      "expression": "cf.zone.name eq \"example.com\"",
      "action_parameters": {
        "id": "<MANAGED_RULESET_ID>",
        "overrides": {
          "action": "log",
          "enabled": true
        }
      }
    }
  ]
}'
```

</div>
</details>

For additional examples of configuring overrides, see [Workflow examples](/ruleset-engine/common-use-cases/).
