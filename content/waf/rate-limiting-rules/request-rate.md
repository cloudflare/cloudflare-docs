---
pcx_content_type: concept
type: overview
title: Determining the rate
weight: 12
---

# Determining the rate

Cloudflare keeps separate rate counters for rate limiting rules for each value combination of the rule characteristics.

Consider a rule configured with the following characteristics:

- IP address
- HTTP header `x-api-key`

In this case, two incoming requests with the **same** value for the HTTP header `X-API-Key` with **different** IP addresses are counted separately, since the value combination is different. Additionally, counters are not shared across data centers.

The counting model of this rate limiting rule is based on the number of incoming requests. Enterprise customers with Advanced Rate Limiting can also configure rules whose counting model is based on the complexity of serving incoming requests. Refer to [Complexity-based rate limiting](#complexity-based-rate-limiting) for more information.

{{<Aside type="warning" header="Important">}}

* The Cloudflare data center ID (`cf.colo.id`) is a mandatory characteristic of every rate limiting rule to ensure that counters are not shared across data centers. This characteristic does not appear in the rule configuration in the dashboard, but you must include it when [creating rate limiting rules via API](/waf/rate-limiting-rules/create-api/).

* The available characteristics depend on your Cloudflare plan. Refer to [Availability](/waf/rate-limiting-rules/#availability) for more information.

{{</Aside>}}

## Example A

Consider the following configuration for a rate limiting rule:

{{<example>}}

_**Rate limiting rule #1**_

**If incoming requests match**:<br/>
`http.request.uri.path eq "/form" and any(http.request.headers["content-type"][*] eq "application/x-www-form-urlencoded")`

**Choose action**: _Block_

**Duration** (mitigation timeout): _10 minutes_

**Requests**: `1`

**Period**: _10 seconds_

**With the same value of** (characteristics):

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP_
- _Headers_ > `x-api-key`

{{</example>}}

The following diagram shows how Cloudflare handles four incoming requests in the context of the above rate limiting rule.

![Rate limiting example with four requests where one of the requests is being rate limited. For details, keep reading.](/waf/static/custom-rules/rate-limiting-example.png)

Since request 1 matches the rule expression, the rate limiting rule is evaluated. Cloudflare defines a request counter for the values of the characteristics in the context of the rate limiting rule and sets the counter to `1`. Since the counter value is within the established limits in **Requests**, the request is allowed.

Request 2 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The values of the characteristics do not match any existing counter (the value of the `X-API-Key` header is different). Therefore, Cloudflare defines a separate counter in the context of this rule and sets it to `1`. The counter value is within the request limit established in **Requests**, and so this request is allowed.

Request 3 matches the rule expression and the same values for rule characteristics. Therefore, Cloudflare increases the value of the existing counter, setting it to `2`. The counter value is now above the limit defined in **Requests**, and so request 2 gets blocked.

Request 4 does not match the rule expression, since the value for the `Content-Type` header does not match the value in the expression. Therefore, Cloudflare does not create a new rule counter for this request. Request 4 is not evaluated in the context of this rate limiting rule and is passed on to subsequent rules in the request evaluation workflow.


## Example B

Consider the following configuration for a rate limiting rule. The rule counting expression defines that the counter will increase by one when the response HTTP status code is `400`:

{{<example>}}

_**Rate limiting rule #2**_

**If incoming requests match**:<br/>
`http.request.uri.path eq "/form"`

**Choose action**: _Block_

**Duration** (mitigation timeout): _10 minutes_

**Requests**: `1`

**Period**: _10 seconds_

**With the same value of** (characteristics):

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP_
- _Headers_ > `x-api-key`

**Increment counter when**:
`http.request.uri.path eq "/form" and http.response.code eq 400`

{{</example>}}

The following diagram shows how Cloudflare handles these four incoming requests received during a 10-second period in the context of the above rate limiting rule.

![Rate limiting example with four requests where the rate limiting rule uses a response field (the HTTP response code) in the counting expression. For details, keep reading.](/waf/static/custom-rules/rate-limiting-example-response-field.png)

Since request 1 matches the rule expression, the rate limiting rule is evaluated. The request is sent to the origin, skipping any cached content, because the rate limiting rule includes a response field (`http.response.code`) in the counting expression. The origin responds with a `400` status code. Since there is a match for the counting expression, Cloudflare creates a request counter for the values of the characteristics in the context of the rate limiting rule, and sets this counter to `1`.

Request 2 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The request counter for the characteristics values is still within the maximum number of requests defined in **Requests**. The origin responds with a `200` status code. Since the response does not match the counting expression, the counter is not incremented, keeping its value (`1`).

Request 3 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The request is still within the maximum number of requests defined in **Requests**. The origin responds with a `400` status code. There is a match for the counting expression, which sets the counter to `2`.

Request 4 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The request is no longer within the maximum number of requests defined in **Requests** (the counter has the value `2` and the maximum number of requests is `1`). Cloudflare applies the action defined in the rate limiting rule configuration, blocking request 4 and any later requests that match the rate limiting rule for ten minutes.

## Complexity-based rate limiting

{{<Aside type="note">}}
Complexity-based rate limiting is available in beta to Enterprise customers with Advanced Rate Limiting, and can only be configured via API.
{{</Aside>}}

A complexity-based rate limiting rule performs rate limiting based on the complexity or cost of handling requests during a given period, instead of the number of requests in the same period.

A common use case is to score each request with an estimate of the cost (or complexity) required to serve that request. The rate limiting rule can then enforce a maximum limit on the total complexity that each client can put on the application over a given period, regardless of the total number of requests sent by that client.

When you configure a complexity-based rate limiting rule, the origin server must include an HTTP header in the response with its complexity score.

Complexity-based rate limiting rules must contain the following properties:

* **Score** (API field: `score_per_period`): Maximum score per period. When this value is exceeded, the rule action will execute.
* **Score response header name** (API field: `score_response_header_name`): Name of HTTP header in the response, set by the origin server, with the score for the current request. The score corresponds to the complexity (or cost) of serving the current request. The score value must be between 1 and 500.

Cloudflare keeps counters with the total score of all requests with the same values for the rule characteristics that match the rule expression. The score increases by the value provided by the origin in the response when there is a match for the counting expression (by default, it is the same as the rule expression). When the total score is larger than the configured maximum score per period, the rule action is applied.

If the origin server does not provide the HTTP response header with a score value, the corresponding rate limiting counter will not be updated.

For an example of a complexity-based rate limiting rule, refer to [Create rate limiting rules via API](/waf/rate-limiting-rules/create-api/#example-d---complexity-based-rate-limiting-rule).