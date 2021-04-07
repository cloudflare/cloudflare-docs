---
order: 15
type: overview
---

# Manage Rate Limiting Rules via API

<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

Use the [Rulesets API](/cf-rulesets/rulesets-api) to create a Rate Limiting Rule via API. A Rate Limiting Rule is similar to a regular rule handled by the ruleset engine, but contains an additional `ratelimit` field with the rate limiting configuration. See [Rate limiting parameters](/cf-rulesets/custom-rules/rate-limiting/parameters) for more information on this field and its parameters.

You must deploy Rate Limiting Rules to the `http_request_firewall_custom` Phase ruleset.

## Create a Rate Limiting Rule

To create a Rate Limiting Rule, add a rule with a `ratelimit` field to the `http_request_firewall_custom` Phase ruleset by issuing a `PUT` request (see example below). 

Add any existing rules in the ruleset to the request by including their rule ID in the `rules` field of the request body. Rate limiting rules must appear at the end of the rules list.

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
      "description": "My rate limiting rule",
      "expression": "(http.request.uri.path matches \"^/api/\")",
      "action": "block",
      "ratelimit": {
        "characteristics": [
          "cf.colo.id",
          "ip.src",
          "http.request.headers[\"x-api-key\"]"
        ],
        "period": 60,
        "requests_per_period": 100,
        "mitigation_timeout": 600,
        "mitigation_expression": ""
      }
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
        "id": "{rate-limiting-rule-id}",
        "version": "1",
        "action": "block",
        "ratelimit": {
          "characteristics": [
            "cf.colo.id",
            "http.request.headers[\"x-api-key\"]",
            "ip.src"
          ],
          "period": 60,
          "requests_per_period": 100,
          "mitigation_timeout": 600,
          "mitigation_expression": ""
        },
        "expression": "(http.request.uri.path matches \"^/api/\")",
        "description": "My rate limiting rule",
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
