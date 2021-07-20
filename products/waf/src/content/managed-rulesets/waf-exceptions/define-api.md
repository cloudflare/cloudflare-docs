---
pcx-content-type: configuration
order: 2
---
# Define WAF exceptions via API

To define a WAF exception via API, create a `skip` rule in a phase entry point ruleset of the `http_request_firewall_managed` phase. You can define WAF exceptions at the account level and at the zone level.

To define an exception, add a rule to the entry point ruleset with `"action": "skip"` and define the `action_parameters` object according to the type of exception.

For more information on adding rules to entry point rulesets using the Rulesets API, refer to [Add rules to phase entry point rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/add-rule-phase-rulesets).

## Skip all remaining rules

To skip all the remaining rules in the entry point ruleset, add a `"ruleset": "current"` field to the `action_parameters` object:

```json
{
  "action": "skip",
  "action_parameters": {
    "ruleset": "current"
  }
}
```

<Aside type="note" header="Note">

Skipping all remaining rules only affects the rules in the current account or zone level context. For example, if you include a `skip` rule at the account-level phase entry point ruleset, the rules defined in the zone-level phase entry point ruleset will not be affected by this rule, and they will still be evaluated.

</Aside>

## Skip one or more WAF Managed Rulesets

To skip one or more WAF Managed Rulesets, add a `rulesets` field to the `action_parameters` object containing a list of WAF Managed Ruleset IDs you wish to skip:

```json
{
  "action": "skip",
  "action_parameters": {
    "rulesets": [
      "{waf-managed-ruleset-id-1}",
      "{waf-managed-ruleset-id-2}"
    ]
  }
}
```

The Managed Rulesets to skip must belong to the `http_request_firewall_managed` phase.

## Skip one or more rules of WAF Managed Rulesets

To skip one or more rules of WAF Managed Rulesets, add a `rules` object to the `action_parameters` object. The `rules` object must contain one or more Managed Ruleset IDs as keys, and a list of rules to skip in those Managed Rulesets as the value of each key.

The following example defines a `skip` rule that skips rules A and B of WAF Managed Ruleset 1, and rule X of WAF Managed Ruleset 2:

```json
{
  "action": "skip",
  "action_parameters": {
    "rules": {
      "{waf-managed-ruleset-id-1}": ["{rule-id-A}", "{rule-id-B}"],
      "{waf-managed-ruleset-id-2}": ["{rule-id-X}"]
    }
  }
}
```

The rules in the `rules` object must belong in the specified WAF Managed Rulesets, otherwise you will get an error.
