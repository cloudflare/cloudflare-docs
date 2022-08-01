---
pcx_content_type: reference
type: overview
title: Add rule to ruleset
weight: 7
layout: list
---

# Add rule to ruleset

Adds a single rule to an existing ruleset. Use this endpoint to add a rule without having to include all the existing ruleset rules in the request.

Use one of the following API endpoints:

| Operation | Method + Endpoint |
|-----------|-------------------|
| [Add an individual rule][ar-account] (account) | `POST /accounts/<ACCOUNT_ID>/rulesets/<RULESET_ID>/rules` |
| Add an individual rule (zone) | `POST /zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules` |

[ar-account]: https://api.cloudflare.com/#account-rulesets-add-an-individual-rule

Invoking this method creates a new version of the ruleset.

Include the rule definition in the request body. The rule will be added to the end of the existing list of rules in the ruleset.

## Example

The following example adds a rule to ruleset `<RULESET_ID>` of zone `<ZONE_ID>`. The ruleset ID was previously obtained using the [List rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) operation, and corresponds to the entry point ruleset for the `http_request_firewall_custom` phase.

<details open>
<summary>Request</summary>
<div>

```json
curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/<RULESET_ID>/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "action": "js_challenge",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
  "description": "challenge GB and FR or based on IP Reputation"
}'
```

</div>
</details>

The response includes the complete ruleset after adding the rule.

<details>
<summary>Response</summary>
<div>

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

</div>
</details>
