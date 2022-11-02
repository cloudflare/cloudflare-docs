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

The following sections provide examples for the different skip rule scenarios available for custom rules.

Take the following into account regarding the provided examples:

*   The `<ZONE_ID>` value is the ID of the zone where you want to add the rule. To retrieve a list of zones you have access to, use the [List Zones](https://api.cloudflare.com/#zone-list-zones) operation.

*   The `<RULESET_ID>` value is the ID of the entry point ruleset of the `http_request_firewall_custom` phase. For details on obtaining this ruleset ID, refer to [List and view rulesets](/ruleset-engine/rulesets-api/view/). If you do not have such a ruleset yet, you can use the [Update a zone entry point ruleset](https://api.cloudflare.com/#zone-rulesets-update-zone-entry-point-ruleset) API operation to create the entry point ruleset with a skip rule in a single operation.

*   Although each example only includes one action parameter, you can use several skip options in the same rule by specifying the `ruleset`, `phases`, and `products` action parameters simultaneously.

## Skip the remaining rules in the current ruleset

This example uses the [Update a zone entry point ruleset](https://api.cloudflare.com/#zone-rulesets-update-zone-entry-point-ruleset) API operation to set all the rules in the entry point ruleset of the `http_request_firewall_custom` phase. The first rule, configured with the `skip` action, will skip all remaining rules in the current ruleset based on the request URI path:

```json
---
header: Example request
highlight: [7,8,9,10]
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_custom/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "action": "skip",
      "action_parameters": {
        "ruleset": "current"
      },
      "expression": "http.request.uri.path contains \"/skip-current-ruleset/\"",
      "description": ""
    },
    {
      "action": "managed_challenge",
      "expression": "ip.geoip.country eq \"GB\" and cf.threat_score > 40",
      "description": "Challenge UK requests with threat score over 40",
    }
  ]
}'
```

<details>
<summary>Example response</summary>
<div>

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "default",
    "description": "",
    "kind": "zone",
    "version": "4",
    "rules": [
      {
        "id": "<RULE_1_ID>",
        "version": "1",
        "action": "skip",
        "action_parameters": {
          "ruleset": "current"
        },
        "expression": "http.request.uri.path contains \"/skip-current-ruleset/\"",
        "description": "",
        "last_updated": "2022-05-08T08:48:50.171838Z",
        "ref": "<RULE_1_REF>",
        "enabled": true,
        "logging": {
          "enabled": true
        }
      },
      {
        "id": "<RULE_2_ID>",
        "version": "1",
        "action": "managed_challenge",
        "expression": "ip.geoip.country eq \"GB\" and cf.threat_score > 40",
        "description": "Challenge UK requests with threat score over 40",
        "last_updated": "2022-05-08T08:48:50.171838Z",
        "ref": "<RULE_2_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2022-05-08T08:48:50.171838Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

## Skip a phase

This example uses the [Create zone ruleset rule](https://api.cloudflare.com/#zone-rulesets-create-zone-ruleset-rule) API operation to add a rule that skips the `http_ratelimit` phase:

```json
---
header: Example request
highlight: [5,6,7,8,9,10]
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
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

This example uses the [Create zone ruleset rule](https://api.cloudflare.com/#zone-rulesets-create-zone-ruleset-rule) API operation to add a rule that:

* Skips the `http_ratelimit` phase
* Disables logging for requests matching this rule

```json
---
header: Example request
highlight: [5,6,7,8,9,10,11,12,13]
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
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

This example uses the [Create zone ruleset rule](https://api.cloudflare.com/#zone-rulesets-create-zone-ruleset-rule) API operation to add a rule that skips the Zone Lockdown and User Agent Blocking products:

```json
---
header: Example request
highlight: [5,6,7,8,9,10,11]
---
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
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
