---
title: Override a managed ruleset
alwaysopen: true
order: 762
---

# Override a managed ruleset

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

You cannot edit managed rulesets, but you can customize its behavior by overriding it at deployment. When you override a ruleset, you specify changes to be executed on top of the default configuration. These changes take precedence over the ruleset's default behavior.

For example, if you want to test a ruleset before enforcing it, you may want to run a managed ruleset with all rules set to the `log` action instead of their default actions. To accomplish this, override the configured behavior of the managed ruleset so each rule uses the _Log_ action.

## Working with overrides

You can override a ruleset at three levels.

* **Ruleset overrides** are for all rules in the specified rulesets.
* **Category overrides** are for all rules tagged with a specific category. For example, use a category override to customize the Cloudflare Managed Ruleset so all rules in the _WordPress_ category are set to _Block_.
If multiple categories have overrides and if a given rule is in more than one of these categories, the category overrides order determines the behavior. For rules tagged with multiple overridden categories, the last category's overrides apply.
* **Rule overrides** are for specific rules in a managed ruleset, referenced by their Rule ID.

To apply an override for a managed ruleset, execute the [Update Ruleset](/cf-rulesets/rulesets-api/put/) operation on your root ruleset and specify the `overrides` in the `action-parameters` of the rule that executes your managed ruleset.

```json
"overrides": {
    "rulesets": [
    {
      "property-to-modify": "value",
      "property-to-modify": "value"
    }],
    "catgegories": [
    {
      "property-to-modify": "value",
      "property-to-modify": "value"
    }],
    "rules": [
    {
      "property-to-modify": "value",
      "property-to-modify": "value"
    }]}
```

Specific overrides take precedence over more general ones, and rule overrides take precedence over category overrides, which take precedence over ruleset overrides.

You can override the following rule properties:

* action (block, challenge, log)
* enabled (true|false)

## Example

The following PUT request deploys a managed ruleset from the root ruleset and adds a ruleset override to deploy the _Log_ action for all rules in the managed ruleset.

```json
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{root-ruleset-id}" --data '
{
    "description": "Managed rule behavior set to log action",
    "rules": [{
        "action": "execute",
        "expression": "cf.zone.name eq \"example.com\"",
        "action_parameters": {
            "id": "{managedRulesetID}",
            "overrides": {
                "rulesets": [
                    {
                        "action": "log",
                        "enabled": "true"
                    }]
            }
        }
    }]
}'

```

For additional examples of configuring overrides, see [workflow examples](/cf-rulesets/common-use-cases).