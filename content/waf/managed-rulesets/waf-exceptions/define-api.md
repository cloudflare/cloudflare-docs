---
pcx-content-type: configuration
title: Define WAF exceptions via API
weight: 3
---

# Define WAF exceptions via API

To define a WAF exception via API, create a rule with `skip` action in a [phase entry point ruleset](/ruleset-engine/about#phases) of the `http_request_firewall_managed` phase. You can define WAF exceptions at the account level and at the zone level.

To configure the WAF exception, define the `action_parameters` object according to the [exception type](/waf/managed-rulesets/waf-exceptions/#types-of-waf-exceptions).

Refer to [Add rules to phase entry point rulesets](/ruleset-engine/basic-operations/add-rule-phase-rulesets) for more information on adding rules using the [Rulesets API](/ruleset-engine/rulesets-api).

{{<Aside type="note" header="Rule execution order">}}

Rules with `skip` action only apply to rules with `execute` action listed **after** them. If you add a rule with `skip` action at the end of the rules list of a phase entry point ruleset, nothing will be skipped.

{{</Aside>}}

## Skip all remaining rules

To skip all the remaining rules in the entry point ruleset, create a rule with `skip` action and include `"ruleset": "current"` in the `action_parameters` object.

Example of rule definition:

```json
{
  "expression": "<RULE_EXPRESSION>",
  "action": "skip",
  "action_parameters": {
    "ruleset": "current"
  }
}
```

Skipping all remaining rules only affects the rules in the current context (account or zone). For example, adding a rule with `skip` action to the account-level phase entry point ruleset has no impact on the rules defined in the zone-level phase entry point ruleset — these zone-level rules will still be evaluated.

## Skip one or more WAF Managed Rulesets

To skip one or more WAF Managed Rulesets, create a rule with `skip` action containing a `rulesets` field in the `action_parameters` object. The `rulesets` field must contain a list of WAF Managed Ruleset IDs you wish to skip.

Example of rule definition:

```json
{
  "expression": "<RULE_EXPRESSION>",
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

To skip one or more rules of WAF Managed Rulesets, create a rule with `skip` action containing a `rules` object in the `action_parameters` object. The `rules` object must contain one or more Managed Ruleset IDs as keys, and a list of rules to skip in those Managed Rulesets as the value of each key.

The following example defines a rule with `skip` action that will skip rules `A` and `B` of WAF Managed Ruleset `1`, and rule `X` of WAF Managed Ruleset `2`:

```json
{
  "expression": "<RULE_EXPRESSION>",
  "action": "skip",
  "action_parameters": {
    "rules": {
      "{waf-managed-ruleset-id-1}": ["{rule-id-A}", "{rule-id-B}"],
      "{waf-managed-ruleset-id-2}": ["{rule-id-X}"]
    }
  }
}
```

The rules in the `rules` object must belong to the specified WAF Managed Rulesets, otherwise you will get an error.
