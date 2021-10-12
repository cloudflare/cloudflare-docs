---
pcx-content-type: how-to
order: 2
type: overview
---

# Create Custom Firewall rules via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api) to create a Custom Firewall rule via API.

You must deploy Custom Firewall rules to the `http_request_firewall_custom` phase entry point ruleset.

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

## Create a Custom Firewall rule

To create a Custom Firewall rule, add a rule to the `http_request_firewall_custom` phase entry point ruleset.

1. Invoke the [View ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view#view-a-specific-ruleset) method to obtain the list of rules already present in the `http_request_firewall_custom` phase entry point ruleset. If the entry point ruleset does not exist, proceed to step 2, since adding a rule to the entry point ruleset will create the ruleset if it does not exist.

1. Invoke the [Update ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update) method to update the list of rules in the phase entry point ruleset with a new rule. You must include the rule ID of all the rules you wish to keep in the ruleset (all other fields are optional).

<details>
<summary>Example: Add new Custom Firewall rule using the Update ruleset API method</summary>
<div>

```json
---
header: Request
---
curl -X PUT \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/phases/http_request_firewall_custom/entrypoint" \
-d '{
  "rules": [
    {
      "description": "My custom rule",
      "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
      "action": "challenge"
    }
  ]
}'
```

The response includes the complete ruleset definition.

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Default",
    "description": "",
    "kind": "zone",
    "version": "5",
    "rules": [
      {
        "id": "{rule-id}",
        "version": "1",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "action": "challenge",
        "description": "My custom rule",
        "last_updated": "2021-05-31T18:33:41.347Z",
        "ref": "{rule-ref-1}",
        "enabled": true
      }
    ],
    "last_updated": "2021-05-31T18:33:41.347Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>
