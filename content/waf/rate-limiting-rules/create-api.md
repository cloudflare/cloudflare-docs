---
pcx_content_type: how-to
type: overview
title: Create via API
weight: 16
meta:
  title: Create rate limiting rules via API
---

# Create rate limiting rules via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a rate limiting rule via API.

A rate limiting rule is similar to a regular rule handled by the Ruleset Engine, but contains an additional `ratelimit` object with the rate limiting configuration. Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more information on this field and its parameters.

You must deploy rate limiting rules to the `http_ratelimit` [phase entry point ruleset](/ruleset-engine/about/rulesets/#entry-point-ruleset).

Rate limiting rules must appear at the end of the rules list.

## Create a rate limiting rule

{{<render file="_api-generic-create-rule-procedure.md" withParameters="rate limiting rule;;with a `ratelimit` object;;http_ratelimit">}}

### Example A - Rate limiting based on request properties

This example adds a rate limiting rule to the `http_ratelimit` phase entry point ruleset for the zone with ID `{zone_id}`. The phase entry point ruleset already exists, with ID `{ruleset_id}`.

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}

### Example B - Rate limiting with a custom response

This example adds a rate limiting rule to the `http_ratelimit` phase entry point ruleset for the zone with ID `{zone_id}`. The phase entry point ruleset already exists, with ID `{ruleset_id}`.

The new rule defines a [custom response](/waf/rate-limiting-rules/create-zone-dashboard/#configuring-a-custom-response-for-blocked-requests) for requests blocked due to rate limiting.

```bash
---
highlight: 9-13
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}

### Example C - Rate limiting ignoring cached assets

This example adds a rate limiting rule to the `http_ratelimit` phase entry point ruleset for the zone with ID `{zone_id}`. The phase entry point ruleset already exists, with ID `{ruleset_id}`.

The new rule does not consider requests for cached assets when calculating the rate.

```bash
---
highlight: 17
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}

### Example D - Complexity-based rate limiting rule

{{<Aside type="note">}}
[Complexity-based rate limiting](/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting) is available in beta and can only be configured via API.
{{</Aside>}}


This example adds a rate limiting rule to the `http_ratelimit` phase entry point ruleset for the zone with ID `{zone_id}`. The phase entry point ruleset already exists, with ID `{ruleset_id}`.

The new rule is a complexity-based rate limiting rule that takes the `my-score` HTTP response header into account to calculate a total complexity score for the client. The counter with the total score is updated when there is a match for the rate limiting rule's counting expression (in this case, the same as the rule expression). When this total score becomes larger than `400` during a 60-second period, any later client requests will be blocked for a period of 600 seconds (10 minutes).

```bash
---
highlight: 14-15
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/{ruleset_id}/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
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
}'
```

{{<render file="_api-create-ruleset-with-rule.md">}}

---

## Next steps

Use the different operations in the [Rulesets API](/ruleset-engine/rulesets-api/) to work with the rule you just created. The following table has a list of common tasks for working with rate limiting rules at the zone level:

{{<render file="_rules-next-steps-table.md" withParameters="rate limiting rules;;http_ratelimit">}}
