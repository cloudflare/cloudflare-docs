---
pcx-content-type: how-to
type: overview
title: Create custom rules via API
weight: 3
layout: list
---

# Create custom rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a Custom Rule via API.

You must deploy custom rules to the `http_request_firewall_custom` phase entry point ruleset.

{{<Aside type="note">}}

This feature is only available for select customers on an Enterprise plan.

{{</Aside>}}

## Create a custom rule

To create a custom rule, add a rule to the `http_request_firewall_custom` phase entry point ruleset.

1.  Invoke the [View ruleset](/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset) method to obtain the list of rules already present in the `http_request_firewall_custom` phase entry point ruleset. If the entry point ruleset does not exist, proceed to step 2, since adding a rule to the entry point ruleset will create the ruleset if it does not exist.

2.  Invoke the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to update the list of rules in the phase entry point ruleset with a new rule. You must include the rule ID of all the rules you wish to keep in the ruleset (all other fields are optional).

### Example A

This example request replaces all rules in the `http_request_firewall_custom` phase for zone with ID `<ZONE_ID>`, defining a single custom rule that challenges requests from the United Kingdom or France with a threat score greater than `10`:

```json
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_custom/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
      "description": "My custom rule",
      "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and cf.threat_score > 10",
      "action": "challenge"
    }
  ]
}'
```

### Example B

This example request replaces all rules in the `http_request_firewall_custom` phase for zone with ID `<ZONE_ID>`, defining a single custom rule with a [custom response](/waf/custom-rules/create-dashboard/#configuring-a-custom-response-for-blocked-requests) for blocked requests:

```json
---
highlight: [10,11,12,13,14,15,16]
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_request_firewall_custom/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
  "rules": [
    {
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
    }
  ]
}'
```

