---
order: 15
---

# Manage Rate Limiting Rules via API

<Aside type='warning' header='Important'>

This feature is only available for selected customers in the Enterprise plan.

</Aside>
Use the [Rulesets API](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api) to create a Rate Limiting Rule via API. A Rate Limiting Rule is similar to a regular rule handled by the Ruleset Engine, but contains an additional `ratelimit` field with the rate limiting configuration. See [Rate limiting parameters](/custom-rules/rate-limiting/parameters) for more information on this field and its parameters.

You must deploy Rate Limiting Rules to the `http_request_firewall_custom` Phase ruleset. For more information on Phases, check the [Ruleset Engine](https://developers.cloudflare.com/firewall/cf-rulesets) documentation.

## Create a Rate Limiting Rule

Follow these steps to create a Rate Limiting Rule:

1. Use the [List existing rulesets](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/view#list-existing-rulesets) method to check if the ruleset for the `http_request_firewall_custom` Phase already exists.
1. [Create the Phase ruleset](https://developers.cloudflare.com/firewall/cf-rulesets/rulesets-api/create) for the `http_request_firewall_custom` Phase, if it does not exist yet. 
1. Add a rule to the Phase ruleset by issuing a `PUT` request (see example below). Remember to add any existing rules in the ruleset to the `rules` field in the request.

The following example adds a Rate Limiting Rule to an existing Phase ruleset (`{ruleset-id}`). It keeps the existing rule by including the rule ID (`{existing-rule-1}`) in the request body.

```json
---
header: Request
---
curl -X PUT \
  -H "X-Auth-Email: user@cloudflare.com" \
  -H "X-Auth-Key: REDACTED" \
  "https://api.cloudflare.com/client/v4/zones/{zone-id}/rulesets/{ruleset-id}" \
-d '{
  "rules": [
    {
      "id": "{existing-rule-1}",
    },
    {
      "description": "My rate limiting rule",
      "expression": "(http.request.uri.path matches \"^/api/\")",
      "action": "block",
      "ratelimit": {
        "characteristics": [
          "cf.colo.id",
          "ip.src",
          "http.request.headers[\"X-API-Key\"]"
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
          "id": "{existing-rule-1}",
          // (...)
      },
      {
        "id": "{rate-limiting-rule-id}",
        "version": "1",
        "action": "block",
        "ratelimit": {
          "characteristics": [
            "cf.colo.id",
            "http.request.headers[\"X-API-Key\"]",
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
