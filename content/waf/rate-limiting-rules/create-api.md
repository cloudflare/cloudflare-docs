---
pcx-content-type: how-to
type: overview
title: Create rate limiting rules via API
weight: 16
layout: list
---

# Create rate limiting rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a rate limiting rule via API.

{{<Aside type="note">}}

For API guidance on the previous version of rate limiting rules, refer to the [Cloudflare API documentation](https://api.cloudflare.com/#rate-limits-for-a-zone-properties).

{{</Aside>}}

A rate limiting rule is similar to a regular rule handled by the Ruleset Engine, but contains an additional `ratelimit` field with the rate limiting configuration. Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more information on this field and its parameters.

You must deploy rate limiting rules to the `http_ratelimit` phase.

## Create a rate limiting rule

To create a rate limiting rule, add a rule with a `ratelimit` field to the `http_ratelimit` phase entry point ruleset by issuing a `PUT` request (refer to the example below).

Add any existing rules in the ruleset to the request by including their rule ID in the `rules` field of the request body. Rate limiting rules must appear at the end of the rules list.

### Example A

This example defines a rate limiting rule based on three characteristics applied to URL paths starting with `/api/` and with action `block`.

```json
---
header: Request
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_ratelimit/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
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
        "mitigation_timeout": 600
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
    "id": "<RULESET_ID>",
    "name": "Default",
    "description": "",
    "kind": "zone",
    "version": "5",
    "rules": [
      {
        "id": "<RULE_ID>",
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
          "mitigation_timeout": 600
        },
        "expression": "(http.request.uri.path matches \"^/api/\")",
        "description": "My rate limiting rule",
        "last_updated": "2021-03-31T18:33:41.347Z",
        "ref": "<RULE_REF>",
        "enabled": true
      }
    ],
    "last_updated": "2021-03-31T18:33:41.347Z",
    "phase": "http_ratelimit"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Example B

This example request defines a custom response for requests blocked due to rate limiting.

```json
---
header: Request
highlight: [12,13,14,15,16]
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_ratelimit/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "description": "My rate limiting rule",
      "expression": "(http.request.uri.path matches \"^/api/\")",
      "action": "block",
      "action_parameters": {
        "response": {
          "status_code": 403,
          "content": "You have been rate limited.",
          "content_type": "text/plain"
        }
      },
      "ratelimit": {
        "characteristics": [
          "cf.colo.id",
          "ip.src",
          "http.request.headers[\"x-api-key\"]"
        ],
        "period": 60,
        "requests_per_period": 100,
        "mitigation_timeout": 600
      }
    }
  ]
}'
```

### Example C

This example request creates a rate limiting rule that does not consider requests for cached assets when calculating the request rate.

```json
---
header: Request
highlight: [20]
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_ratelimit/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
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
        "requests_to_origin": true
      }
    }
  ]
}'
```
