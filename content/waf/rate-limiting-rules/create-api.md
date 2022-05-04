---
pcx-content-type: how-to
type: overview
title: Create rate limiting rules via API
weight: 16
---

# Create rate limiting rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a rate limiting rule via API.

{{<Aside type="note">}}

For API guidance on the previous version of rate limiting rules, refer to the [Cloudflare API documentation](https://api.cloudflare.com/#rate-limits-for-a-zone-properties).

{{</Aside>}}

A rate limiting rule is similar to a regular rule handled by the Ruleset Engine, but contains an additional `ratelimit` field with the rate limiting configuration. Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more information on this field and its parameters.

You must deploy rate limiting rules to the `http_ratelimit` phase.

## Create a rate limiting rule

To create a rate limiting rule, add a rule with a `ratelimit` field to the `http_ratelimit` phase entry point ruleset by issuing a `PUT` request (refer to the examples below).

Add any existing rules in the ruleset to the request by including their rule ID in the `rules` field of the request body. Rate limiting rules must appear at the end of the rules list.

### Example A - Rate limiting based on request properties

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

### Example B - Rate limiting with a custom response

This example request defines a custom plain text response for requests blocked due to rate limiting.

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

### Example C - Rate limiting ignoring cached assets

This example request creates a rate limiting rule that does not consider requests for cached assets when calculating the rate.

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

### Example D - Complexity-based rate limiting rule

{{<Aside type="note">}}
[Complexity-based rate limiting](/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting) is available in beta and can only be configured via API.
{{</Aside>}}

This example configures a complexity-based rate limiting rule that takes the `my-score` HTTP response header into account to calculate a total complexity score for the client. The counter with the total score is updated when there is a match for the rate limiting rule's counting expression (in this case, the same as the rule expression). When this total score becomes larger than `400` during a 60-second period, any later client requests will be blocked for a period of 600 seconds (10 minutes).

```json
---
header: Request
highlight: [17,18]
---
curl -X PUT \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/rulesets/phases/http_ratelimit/entrypoint" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "rules": [
    {
      "description": "My complexity-based rate limiting rule",
      "expression": "http.request.uri.path matches \"^/graphql/\"",
      "action": "block",
      "ratelimit": {
        "characteristics": [
          "cf.colo.id",
          "http.request.headers[\"x-api-key\"]"
        ],
        "period": 60,
        "score_per_period": 400,
        "score_response_header_name": "my-score",
        "mitigation_timeout": 600,
        "counting_expression": ""
      }
    }
  ]
}'
```