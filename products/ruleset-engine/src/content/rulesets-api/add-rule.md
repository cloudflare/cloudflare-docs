---
pcx-content-type: reference
alwaysopen: true
order: 786
---

# Add rule to ruleset

Adds a single rule to an existing ruleset. Use this endpoint to add a rule without having to include all the existing ruleset rules in the request.

Use one of the following API endpoints to add a rule to a ruleset:

```bash
---
header: Account-level endpoint
---
POST /accounts/{account-id}/rulesets/{ruleset-id}/rules
```

```bash
---
header: Zone-level endpoint
---
POST /zones/{zone-id}/rulesets/{ruleset-id}/rules
```

Invoking this method creates a new version of the ruleset.

Include the rule definition in the request body. The rule will be added to the end of the existing list of rules in the ruleset.

## Example

The following example adds a rule to ruleset `{ruleset-id}` of zone `{zone-id}`. The ruleset ID was previously obtained using the [List rulesets](/rulesets-api/view#list-existing-rulesets) method, and corresponds to the entry point ruleset for the `http_request_firewall_custom` phase.

```json
---
header: Request
---
curl -X POST \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}/rules" \
-d '{
  "action": "js_challenge",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
  "description": "challenge GB and FR or based on IP Reputation"
}'
```

The response includes the complete ruleset after adding the rule.

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Zone Ruleset 1",
    "description": "My phase entry point ruleset at the zone level",
    "kind": "zone",
    "version": "11",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "last_updated": "2020-11-23T11:36:24.192361Z",
        "ref": "{rule-ref-1}",
        "enabled": true
      },
      {
        "id": "{new-rule-id}",
        "version": "1",
        "action": "js_challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-06-22T12:35:58.144683Z",
        "ref": "{new-rule-ref}",
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
