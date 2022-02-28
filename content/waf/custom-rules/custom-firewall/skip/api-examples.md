---
title: API examples
pcx-content-type: configuration
weight: 3
meta:
  title: API examples of Custom Rules with the Skip action
---

# API examples of Custom Rules with the Skip action

Use the [Rulesets API](/ruleset-engine/rulesets-api) to configure Custom Rules via API.

The `skip` action supports different [skip options](/waf/custom-rules/custom-firewall/skip/options/), according to the security features or products that you wish to skip.

The following sections provide examples for the different skip rule scenarios available for Custom Firewall rules.

Take the following into account regarding the provided examples:

*   The `<ZONE_ID>` value is the ID of the zone where you want to add the rule. To retrieve a list of zones you have access to, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation.

*   The `<RULESET_ID>` value is the ID of the entry point ruleset of the `http_request_firewall_custom` phase. For details on obtaining this ruleset ID, refer to [List and view rulesets](/ruleset-engine/rulesets-api/view). If you do not have such a ruleset yet, you can use the [Update zone entry point ruleset](/ruleset-engine/rulesets-api/update) API operation to create the entry point ruleset with a skip rule in a single operation.

*   The examples in this page add a new rule at the zone level with the `skip` action. If you wish to edit an existing rule, refer to [Update a rule in a ruleset](/ruleset-engine/rulesets-api/update-rule) for more information.

*   Although each example only includes one action parameter, you can use several skip options in the same rule by specifying the `ruleset`, `phases`, and `products` action parameters simultaneously.

## Skip the remaining rules in the current ruleset

This example uses the [Add individual rule](/ruleset-engine/rulesets-api/add-rule) API operation to add a rule that skips the remaining rules in the current ruleset:

```json
---
header: Request
highlight: [6,7,8,9]
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
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

This example uses the [Add individual rule](/ruleset-engine/rulesets-api/add-rule) API operation to add a rule that skips the `http_ratelimit` phase:

```json
---
header: Request
highlight: [6,7,8,9,10,11]
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
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

Refer to [Available skip options](/waf/custom-rules/custom-firewall/skip/options/) for the list of phases you can skip.

## Skip security products

This example uses the [Add individual rule](/ruleset-engine/rulesets-api/add-rule) API operation to add a rule that skips the Zone Lockdown and User Agent Blocking products:

```json
---
header: Request
highlight: [6,7,8,9,10,11,12]
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <API_KEY>" \
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

Refer to [Available skip options](/waf/custom-rules/custom-firewall/skip/options/) for the list of products you can skip.
