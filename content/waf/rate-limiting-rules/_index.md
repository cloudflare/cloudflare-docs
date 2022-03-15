---
pcx-content-type: concept
title: Rate limiting rules
weight: 5
---

# Rate limiting rules

Rate limiting rules allow you to define rate limits for requests matching an expression, and which action to take when those rate limits are reached.

{{<Aside type="note">}}

For guidance on the previous version of rate limiting rules, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

{{</Aside>}}

## Rule parameters

Like other rules evaluated by Cloudflare's Ruleset Engine, rate limiting rules have an associated **expression** and an **action**.

The **expression** specifies the criteria you are matching traffic on using the [Rules language](/ruleset-engine/rules-language). The **action** specifies what to perform when there is a match for the rule and any additional conditions are met. In the case of rate limiting rules, the action occurs when the request rate reaches the specified limit.

Besides these two parameters, rate limiting rules require the following additional parameters:

*   **Characteristics** — The set of parameters that define how Cloudflare tracks the request rate for this rule.
*   **Period** — The period of time to consider (in seconds) when evaluating the request rate.
*   **Requests per period** — The number of requests over the period of time that will trigger the rate limiting rule.
*   **Mitigation timeout** — Once the request rate is reached, the rate limiting rule blocks further requests for the period of time defined in this field.

Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more details on these parameters.

Refer to [Determining the request rate](/waf/rate-limiting-rules/request-rate/) to learn how Cloudflare uses the parameters above when determining the rate of incoming requests.

---

## Availability

{{<table-wrap style="font-size:90%">}}

Feature | Free | Pro | Business | Enterprise Core | Enterprise Advanced |
---|---|---|---|---|---
Available fields<br/>in expression | URL | URL | URL, Method, Request headers, Source IP | URL, Method, Request headers, Source IP | [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields), [body fields](/ruleset-engine/rules-language/fields/#http-request-body-fields), [dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) (including Bot Management fields*)
Counting characteristics | IP | IP | IP | IP | IP, IP with NAT support, Query, Headers, Cookie, ASN, Country, JA3*
Counting expression | — | — | Yes | Yes | Yes
Available fields<br/>in counting expression | — | — | URL, Method, Request headers, Source IP, Response code, Response headers | URL, Method, Request headers, Source IP, Response code, Response headers | URL, Method, Request headers, Source IP, Response code, Response headers
Maximum sampling period | 1&nbsp;minute | 1 minute | 5 minutes | 10 minutes | 1 hour
Available Timeout | 60, 3600 | 60, 3600 | 60, 3600, 86400 | 30–86400 | 30–86400
Custom response | — | — | Yes | Yes | Yes
Max. number of rules | 1 | 10 | 15 | 100 | 100
Available actions | Block | Block, Log, Managed Challenge | Block, Log, Managed Challenge | Block, Log, Managed Challenge | Block, Log, Managed Challenge, JS Challenge, Legacy CAPTCHA

{{</table-wrap>}}

\* Only available to Enterprise customers who have purchased [Bot Management](/bots/plans/bm-subscription/).


## Next steps

To configure rate limiting rules in the Cloudflare dashboard, go to **Security** > **WAF** > **Rate limiting rules**. For more information, refer to [Create rate limiting rules in the dashboard](/waf/rate-limiting-rules/create-dashboard/).

You can also configure rate limiting rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create rate limiting rules via API](/waf/rate-limiting-rules/create-api/) for more information.
