---
pcx_content_type: how-to
type: overview
title: Create custom rules via API
weight: 3
layout: list
---

# Create custom rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a Custom Rule via API.

You must deploy custom rules to the `http_request_firewall_custom` [phase entry point ruleset](/ruleset-engine/about/phases/#phase-entry-point-ruleset).

## Create a custom rule

To create a custom rule for a zone, add a rule to the `http_request_firewall_custom` phase entry point ruleset:

1. Invoke the [List zone rulesets](/api/operations/listZoneRulesets) method to obtain the list of rulesets in your zone. You will need the [zone ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) for this operation.

2. Search for an entry point ruleset for the `http_request_firewall_custom` phase in the response. Such a ruleset would have the following properties: `"kind": "zone"` and `"phase": "http_request_firewall_custom"`. If you find the ruleset, take note of its ID for the next step.

3. If the entry point ruleset already exists, invoke the [Create a zone ruleset rule](/api/operations/createZoneRulesetRule) API operation to add a rule to the existing ruleset. By default, the rule will be added at the end of the list of rules already in the ruleset. Refer to the examples below for details.

    If the entry point ruleset does not exist, invoke the [Create a zone ruleset](/api/operations/createZoneRuleset) API operation to create the entry point ruleset with the new custom rule.

### Example A

This example request, which covers step 3 in the rule creation procedure, adds a rule to the `http_request_firewall_custom` phase entry point ruleset for the zone with ID `{zone_id}`. The entry point ruleset already exists, with ID `{ruleset_id}`. The new rule, which will be the last rule in the ruleset, will challenge requests from the United Kingdom or France with a threat score greater than `10`:

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "description": "My custom rule",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and cf.threat_score > 10",
  "action": "challenge"
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}

### Example B

This example request, which covers step 3 in the rule creation procedure, adds a rule to the `http_request_firewall_custom` phase entry point ruleset for the zone with ID `{zone_id}`. The entry point ruleset already exists, with ID `{ruleset_id}`. The new rule, which will be the last rule in the ruleset, includes the definition of a [custom response](/waf/custom-rules/create-dashboard/#configuring-a-custom-response-for-blocked-requests) for blocked requests:

```bash
---
highlight: 8-12
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "description": "My custom rule with plain text response",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and cf.threat_score > 50",
  "action": "block",
  "action_parameters": {
    "response": {
      "status_code": 403,
      "content": "Your request was blocked.",
      "content_type": "text/plain"
    }
  }
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}