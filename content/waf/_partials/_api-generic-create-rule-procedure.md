---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: ruleName;;extraObject;;phase
---

To create a $1 for a zone, add a rule $2 to the `$3` phase entry point ruleset.

1. Invoke the [List zone rulesets](/api/operations/listZoneRulesets) method to obtain the list of rulesets in your zone. You will need the [zone ID](/fundamentals/setup/find-account-and-zone-ids/) for this operation.

2. Search for an entry point ruleset for the `$3` phase in the response. Such a ruleset would have the following properties: `"kind": "zone"` and `"phase": "$3"`. If you find the ruleset, take note of its ID for the next step.

3. If the entry point ruleset already exists, invoke the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation to add a $1 to the existing ruleset. By default, the rule will be added at the end of the list of rules already in the ruleset. Refer to the examples below for details.

    If the entry point ruleset does not exist, invoke the [Create a zone ruleset](/api/operations/createZoneRuleset) operation to create the entry point ruleset with the new $1. Refer to [Create ruleset](/ruleset-engine/rulesets-api/create/#example---create-a-zone-level-phase-entry-point-ruleset) for an example.