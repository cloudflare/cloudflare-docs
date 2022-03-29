---
pcx-content-type: concept
type: overview
title: Determining the request rate
weight: 12
layout: list
---

# Determining the request rate

Cloudflare keeps separate request counters for rate limiting rules for each value combination of the rule characteristics.

Consider a rule configured with the following characteristics:

- IP address
- HTTP header `x-api-key`

In this case, two incoming requests with the **same** value for the HTTP header `X-API-Key` with **different** IP addresses are counted separately, since the value combination is different. Additionally, counters are not shared across data centers.

{{<Aside type="warning" header="Important">}}

* The Cloudflare **data center ID** is a mandatory characteristic of every rate limiting rule. This characteristic does not appear in the rule configuration in the dashboard, but you must include it when [creating rate limiting rules via API](/waf/rate-limiting-rules/create-api/).

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

**With the same** (characteristics):

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP_
- _Headers_ > `x-api-key`

{{</example>}}

The following diagram shows how Cloudflare handles four incoming requests in the context of the above rate limiting rule.

![Rate limiting rule example diagram](/waf/static/custom-rules/rate-limiting-example.png)

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

**With the same** (characteristics):

- _Data center ID_ (included by default when creating the rule in the dashboard)
- _IP_
- _Headers_ > `x-api-key`

**Increment counter when**:
`http.request.uri.path eq "/form" and http.response.code eq 400`

{{</example>}}

The following diagram shows how Cloudflare handles these four incoming requests received during a 10-second period in the context of the above rate limiting rule.

![Example of a rate limiting rule using a response field in the counting expression](/waf/static/custom-rules/rate-limiting-example-response-field.png)

Since request 1 matches the rule expression, the rate limiting rule is evaluated. The request is sent to the origin, skipping any cached content, because the rate limiting rule includes a response field (`http.response.code`) in the counting expression. The origin responds with a `400` status code. Since there is a match for the counting expression, Cloudflare creates a request counter for the values of the characteristics in the context of the rate limiting rule, and sets this counter to `1`.

Request 2 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The request counter for the characteristics values is still within the maximum number of requests defined in **Requests**. The origin responds with a `200` status code. Since the response does not match the counting expression, the counter is not incremented, keeping its value (`1`).

Request 3 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The request is still within the maximum number of requests defined in **Requests**. The origin responds with a `400` status code. There is a match for the counting expression, which sets the counter to `2`.

Request 4 matches the rule expression and therefore Cloudflare evaluates the rate limiting rule. The request is no longer within the maximum number of requests defined in **Requests** (the counter has the value `2` and the maximum number of requests is `1`). Cloudflare applies the action defined in the rate limiting rule configuration, blocking request 4 and any later requests that match the rate limiting rule for ten minutes.
