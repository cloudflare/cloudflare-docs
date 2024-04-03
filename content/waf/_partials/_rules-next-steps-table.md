---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: rulesName;;phaseName
---

{{<table-wrap>}}

Task        | Procedure
------------|--------------
List all rules in ruleset | <p>Use the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) operation with the `$2` phase name to obtain the list of configured $1 and their IDs.</p><p>For more information, refer to [View a specific ruleset](/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset).</p>
Update a rule | <p>Use the [Update a zone ruleset rule](/api/operations/updateZoneRulesetRule) operation.</p><p>You will need to provide the ruleset ID and the rule ID. To obtain these IDs, you can use the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) operation with the `$2` phase name.</p><p>For more information, refer to [Update a rule in a ruleset](/ruleset-engine/rulesets-api/update-rule/).</p>
Delete a rule | <p>Use the [Delete a zone ruleset rule](/api/operations/deleteZoneRulesetRule) operation.</p><p>You will need to provide the ruleset ID and the rule ID. To obtain these IDs, you can use the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) operation with the `$2` phase name.</p><p>For more information, refer to [Delete a rule in a ruleset](/ruleset-engine/rulesets-api/delete-rule/).</p>

{{</table-wrap>}}

These operations are covered in the Ruleset Engine documentation. The Ruleset Engine powers different Cloudflare products, including $1.
