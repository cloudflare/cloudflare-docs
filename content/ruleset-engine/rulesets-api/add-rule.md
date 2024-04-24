---
pcx_content_type: reference
type: overview
title: Add rule to ruleset
weight: 7
layout: wide
---

# Add rule to ruleset

Adds a single rule to an existing ruleset. Use this endpoint to add a rule without having to include all the existing ruleset rules in the request.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Create an account ruleset rule][ar-account] | `POST /accounts/{account_id}/rulesets/{ruleset_id}/rules` |
| [Create a zone ruleset rule][ar-zone] | `POST /zones/{zone_id}/rulesets/{ruleset_id}/rules` |

[ar-account]: /api/operations/createAccountRulesetRule
[ar-zone]: /api/operations/createZoneRulesetRule

Include the rule definition in the request body.

By default, the rule will be added to the end of the existing list of rules in the ruleset. To define a specific position for the rule, include a `position` object in the request body according to the guidelines in [Change the order of a rule in a ruleset](/ruleset-engine/rulesets-api/update-rule/#change-the-order-of-a-rule-in-a-ruleset).

Invoking this method creates a new version of the ruleset.

## Example

The following example adds a rule to ruleset `{ruleset_id}` of zone `{zone_id}`. The ruleset ID was previously obtained using the [List zone rulesets](/api/operations/listZoneRulesets) operation, and corresponds to the entry point ruleset for the `http_request_firewall_custom` phase.

{{<details header="Request" open="true">}}

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "action": "js_challenge",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
  "description": "challenge GB and FR or based on IP Reputation"
}'
```

{{</details>}}

The response includes the complete ruleset after adding the rule.

{{<details header="Response" open="false">}}

```json
{
  "result": {
    "id": "<RULESET_ID>",
    "name": "Zone Ruleset 1",
    "description": "My phase entry point ruleset at the zone level",
    "kind": "zone",
    "version": "11",
    "rules": [
      {
        "id": "<RULE_ID_1>",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "last_updated": "2020-11-23T11:36:24.192361Z",
        "ref": "<RULE_REF_1>",
        "enabled": true
      },
      {
        "id": "<NEW_RULE_ID>",
        "version": "1",
        "action": "js_challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-06-22T12:35:58.144683Z",
        "ref": "<NEW_RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2021-06-22T12:35:58.144683Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

{{</details>}}

## Define the rule position in the ruleset

To define the position of the new rule in the ruleset, include a `position` object in the request, containing one of the following:

{{<render file="_rule-position-values.md">}}

For examples of using a `position` object, refer to [Update a rule in a ruleset](/ruleset-engine/rulesets-api/update-rule/#examples).
