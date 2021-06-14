---
pcx-content-type: how-to
order: 2
type: overview
---

# Create Custom Firewall rules via API

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

Use the [Rulesets API](/cf-rulesets/rulesets-api) to create a Custom Firewall rule via API.

You must deploy Custom Firewall rules to the `http_request_firewall_custom` phase ruleset.

## Create a Custom Firewall rule

To create a Custom Firewall rule, add a rule to the `http_request_firewall_custom` phase ruleset using one of the following API methods:

* Invoke the [Update ruleset](/cf-rulesets/rulesets-api/update) method to update the list of rules in the ruleset with a new rule. Include the rule ID of all the rules you would like to keep in the ruleset.

* Invoke the [Update rule in ruleset](/cf-rulesets/rulesets-api/update-rule) method to add a single Custom Firewall rule to the phase ruleset.

[TODO - Review if PATCH can be used here]

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
      "description": "Example rule",
      "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
      "action": "challenge"
    }
  ]
}'
```

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
        "description": "Example rule",
        "last_updated": "2021-03-31T18:33:41.347Z",
        "ref": "{rule-ref-1}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-31T18:33:41.347Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Example: Add new Custom Firewall rule using the Update rule in ruleset API method</summary>
<div>

```json
---
header: Request
---
curl -X PATCH \
-H "X-Auth-Email: user@cloudflare.com" \
-H "X-Auth-Key: REDACTED" \
"https://api.cloudflare.com/client/v4/accounts/{account-id}/rulesets/{ruleset-id}/rules/{rule-id-1}" \
-d '{
  "action": "js_challenge",
  "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
  "description": "challenge GB and FR or based on IP Reputation"
}'
```

The response includes the complete ruleset after updating the rule.

```json
---
header: Response
---
{
  "result": {
    "id": "{ruleset-id}",
    "name": "Custom Ruleset 1",
    "description": "My first custom ruleset",
    "kind": "custom",
    "version": "11",
    "rules": [
      {
        "id": "{rule-id-1}",
        "version": "2",
        "action": "js_challenge",
        "expression": "(ip.geoip.country eq \"GB\" or ip.geoip.country eq \"FR\") or cf.threat_score > 0",
        "description": "challenge GB and FR or based on IP Reputation",
        "last_updated": "2021-03-22T12:54:58.144683Z",
        "ref": "rule-ref-1",
        "enabled": true
      },
      {
        "id": "{rule-id-2}",
        "version": "1",
        "action": "challenge",
        "expression": "not http.request.uri.path matches \"^/api/.*$\"",
        "last_updated": "2020-11-23T11:36:24.192361Z",
        "ref": "{rule-ref-2}",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-22T12:54:58.144683Z",
    "phase": "http_request_firewall_custom"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>