---
pcx_content_type: how-to
type: overview
title: Create via API
weight: 3
meta:
  title: Create a custom rule via API
---

# Create a custom rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a custom rule via API.

You must deploy custom rules to the `http_request_firewall_custom` [phase entry point ruleset](/ruleset-engine/about/rulesets/#entry-point-ruleset).

## Create a custom rule

{{<render file="_api-generic-create-rule-procedure.md" withParameters="custom rule;;;;http_request_firewall_custom">}}

### Example A

This example request, which covers step 3 in the rule creation procedure, adds a rule to the `http_request_firewall_custom` phase entry point ruleset for the zone with ID `{zone_id}`. The entry point ruleset already exists, with ID `{ruleset_id}`.

The new rule, which will be the last rule in the ruleset, will challenge requests from the United Kingdom or France with a {{<glossary-tooltip term_id="threat score">}}threat score{{</glossary-tooltip>}} greater than `10`:

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "description": "My custom rule",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") and cf.threat_score > 10",
  "action": "challenge"
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}

### Example B

This example request, which covers step 3 in the rule creation procedure, adds a rule to the `http_request_firewall_custom` phase entry point ruleset for the zone with ID `{zone_id}`. The entry point ruleset already exists, with ID `{ruleset_id}`.

The new rule, which will be the last rule in the ruleset, includes the definition of a [custom response](/waf/custom-rules/create-dashboard/#configure-a-custom-response-for-blocked-requests) for blocked requests:

```bash
---
highlight: 9-13
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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

---

## Next steps

Use the different operations in the [Rulesets API](/ruleset-engine/rulesets-api/) to work with the rule you just created. The following table has a list of common tasks:

{{<render file="_rules-next-steps-table.md" withParameters="custom rules;;http_request_firewall_custom">}}
