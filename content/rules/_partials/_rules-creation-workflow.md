---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: ruleName;;phaseName
---

Follow this workflow to create $1 for a given zone via API:

1. Use the [List zone rulesets](/api/operations/listZoneRulesets) operation to check if there is already a ruleset for the `$2` phase at the zone level.

2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](/api/operations/createZoneRuleset) operation. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `$2`

3. Use the [Update a zone ruleset](/api/operations/updateZoneRuleset) operation to add $1 to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](/api/operations/createZoneRuleset) request mentioned in the previous step.