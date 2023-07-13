---
title: API examples
pcx_content_type: configuration
weight: 3
meta:
  title: API examples of custom rules with the Skip action
---

# API examples of custom rules with the Skip action

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to configure custom rules via API.

The `skip` action supports different [skip options](/waf/custom-rules/skip/options/), according to the security features or products that you wish to skip.

## Before you continue

This page contains examples of different skip rule scenarios for custom rules. Take the following into account:

* The `{zone_id}` value is the [ID of the zone](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) where you want to add the rule.

* The `{ruleset_id}` value is the ID of the [entry point ruleset](/ruleset-engine/about/phases/#phase-entry-point-ruleset) of the `http_request_firewall_custom` phase. For details on obtaining this ruleset ID, refer to [List and view rulesets](/ruleset-engine/rulesets-api/view/). The API examples in this page add a skip rule to an existing ruleset using the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation.

    However, the entry point ruleset may not exist yet. In this case, invoke the [Create a zone ruleset](/api/operations/createZoneRuleset) operationcreate the entry point ruleset with a skip rule. Refer to [Create ruleset](/ruleset-engine/rulesets-api/create/#example---create-a-zone-level-phase-entry-point-ruleset) for an example.

* Although each example only includes one action parameter, you can use several skip options in the same rule by specifying the `ruleset`, `phases`, and `products` action parameters simultaneously.

## Skip the remaining rules in the current ruleset

This example invokes the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation to add a skip rule to the existing `http_request_firewall_custom` phase entry point ruleset with ID `{ruleset_id}`. The rule will skip all remaining rules in the current ruleset for requests matching the rule expression:

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "action": "skip",
  "action_parameters": {
    "ruleset": "current"
  },
  "expression": "http.request.uri.path contains \"/skip-current-ruleset/\"",
  "description": ""
}'
```

## Skip a phase

This example invokes the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation to add a rule to the existing `http_request_firewall_custom` phase entry point ruleset with ID `{ruleset_id}`. The rule will skip the `http_ratelimit` phase for requests matching the rule expression:

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "action": "skip",
  "action_parameters": {
    "phases": [
      "http_ratelimit"
    ]
  },
  "expression": "http.request.uri.path contains \"/skip-phase/\"",
  "description": ""
}'
```

Refer to [Available skip options](/waf/custom-rules/skip/options/) for the list of phases you can skip.


## Skip a phase and do not log matching requests

This example invokes the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation to add a rule that:

* Skips the `http_ratelimit` phase
* Disables event logging for the current rule

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "action": "skip",
  "action_parameters": {
    "phases": [
      "http_ratelimit"
    ]
  },
  "logging": {
    "enabled": false
  },
  "expression": "http.request.uri.path contains \"/disable-logging/\"",
  "description": ""
}'
```

Refer to [Available skip options: Logging](/waf/custom-rules/skip/options/#logging) for more information on disabling logging for requests that match a skip rule.

## Skip security products

This example uses the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) operation to add a rule that skips the [Zone Lockdown](/waf/tools/zone-lockdown/) and [User Agent Blocking](/waf/tools/user-agent-blocking/) products for requests matching the rule expression:

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "action": "skip",
  "action_parameters": {
    "products": [
      "zoneLockdown",
      "uaBlock"
    ]
  },
  "expression": "http.request.uri.path contains \"/skip-products/\"",
  "description": ""
}'
```

Refer to [Available skip options](/waf/custom-rules/skip/options/) for the list of products you can skip.
