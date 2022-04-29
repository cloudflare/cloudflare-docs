---
pcx-content-type: concept
title: Rate limiting rules
weight: 5
---

# Rate limiting rules

Rate limiting rules allow you to define rate limits for requests matching an expression, and the action to perform when those rate limits are reached.

{{<Aside type="note">}}

This feature is only available for customers on an Enterprise plan. Refer to [Availability](#availability) for details.

For guidance on the previous version of rate limiting rules, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

{{</Aside>}}

## Rule parameters

Like other rules evaluated by Cloudflare's Ruleset Engine, rate limiting rules have an associated **expression** and an **action**.

The **expression** specifies the criteria you are matching traffic on using the [Rules language](/ruleset-engine/rules-language/). The **action** specifies what to perform when there is a match for the rule and any additional conditions are met. In the case of rate limiting rules, the action occurs when the rate reaches the specified limit.

Besides these two parameters, rate limiting rules require the following additional parameters:

*   **Characteristics** — The set of parameters that define how Cloudflare tracks the rate for this rule.
*   **Period** — The period of time to consider (in seconds) when evaluating the rate.
*   **Requests per period** — The number of requests over the period of time that will trigger the rate limiting rule.
*   **Mitigation timeout** — Once the rate is reached, the rate limiting rule blocks further requests for the period of time defined in this field.

Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more information on mandatory and optional parameters.

Refer to [Determining the rate](/waf/rate-limiting-rules/request-rate/) to learn how Cloudflare uses the parameters above when determining the rate of incoming requests.

## Important remarks

Applying rate limiting rules to verified bots might affect Search Engine Optimization (SEO). For more information, refer to [Improve SEO](/fundamentals/get-started/task-guides/improve-seo/).

---

## Availability

Rate limiting rules are available to Enterprise customers on the Core or Advanced plan. The available features depend on the exact plan:

{{<table-wrap>}}

Feature | Enterprise Core | Enterprise Advanced |
---|---|---
Available fields<br/>in rule expression | URL, Method, Headers, Source IP | [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields), [body fields](/ruleset-engine/rules-language/fields/#http-request-body-fields), [dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) (including Bot Management fields*)
Counting characteristics | IP | IP, IP with NAT support, Query, Headers, Cookie, ASN, Country, JA3 Fingerprint*
Available fields<br/>in counting expression | URL, Method, Request headers, Source IP, Response code, Response headers | URL, Method, Request headers, Source IP, Response code, Response headers
Counting model | Number of requests | Number of requests<br/>[Complexity score](/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting)
Maximum sampling period | 10 minutes | 1 hour

{{</table-wrap>}}

\* Only available to Enterprise customers who have purchased [Bot Management](/bots/plans/bm-subscription/).


## Next steps

To configure rate limiting rules in the Cloudflare dashboard, go to **Security** > **WAF** > **Rate limiting rules**. For more information, refer to [Create rate limiting rules in the dashboard](/waf/rate-limiting-rules/create-dashboard/).

You can also configure rate limiting rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create rate limiting rules via API](/waf/rate-limiting-rules/create-api/) for more information.
