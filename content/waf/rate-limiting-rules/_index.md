---
pcx_content_type: concept
title: Rate limiting rules
weight: 6
layout: list
---

# Rate limiting rules

{{<content-column>}}

Rate limiting rules allow you to define rate limits for requests matching an expression, and the action to perform when those rate limits are reached.

{{<Aside type="note">}}

Rate limiting rules is an unmetered feature available on all plans. Refer to [Availability](#availability) for details.

For guidance on the previous version of rate limiting rules (billed based on usage), refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

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

Rate limiting rules are available to all customers. The available features depend on the exact plan:

{{</content-column>}}

{{<table-wrap style="font-size: 87%">}}

Feature | Free | Pro | Business | Enterprise with WAF Essential | Enterprise with Advanced Rate Limiting |
---|---|---|---|---|---
Available fields<br/>in rule expression | Path, [Verified Bot](/ruleset-engine/rules-language/fields/#field-cf-bot_management-verified_bot) | Host, URI, Path, Full URI, Query, Verified Bot | Host, URI, Path, Full URI, Query, Method, Source IP, User Agent, Verified Bot | [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields), [dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) (including Verified Bot), other Bot Management fields<sup>1</sup> | [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields), [dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) (including Verified Bot), other Bot Management fields<sup>1</sup>, [request body fields](/ruleset-engine/rules-language/fields/#http-request-body-fields)<sup>2</sup>
Counting characteristics | IP | IP | IP | IP, IP with NAT support | IP, IP with NAT support, Query, Host, Headers, Cookie, ASN, Country, Path, JA3 Fingerprint<sup>1</sup>, JSON body field<sup>2</sup>, Body<sup>2</sup>
Available fields<br/>in counting expression | N/A | N/A | All rule expression fields, Response code, Response headers | All rule expression fields, Response code, Response headers | All rule expression fields, Response code, Response headers
Counting model | Number of requests | Number of requests | Number of requests | Number of requests | Number of requests,<br/>[complexity score](/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting)
Counting periods | 10 s | 10 s, 1 min | 10 s, 1 min, 10 min | 10 s, 1 min, 2 min, 5 min, 10 min | 10 s, 1 min, 2 min, 5 min, 10 min, 1 h
Timeout periods | 10 s | 10 s, 1 min, 1 h | 10 s, 1 min, 1 h, 1 day | 10 s, 1 min, 2 min, 5 min, 10 min, 1 h, 1 day | 10 s, 1 min, 2 min, 5 min, 10 min, 1 h, 1 day
Number of rules | 1 | 2 | 5 | 100 | 100

{{</table-wrap>}}

<sup>1</sup> _Only available to Enterprise customers who have purchased [Bot Management](/bots/plans/bm-subscription/)._<br>
<sup>2</sup> _Availability depends on your WAF plan._

{{<content-column>}}

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

For availability information related to the previous version of rate limiting rules, refer to [Rate Liming allowances per plan](/support/firewall/tools/configuring-cloudflare-rate-limiting/#rate-limiting-allowances-per-plan).

## Next steps

You can configure rate limiting rules at the zone level and at the account level, depending on your plan and product subscriptions.

To configure rate limiting rules in the Cloudflare dashboard, refer to the following resources:
* [Create rate limiting rules in the dashboard for a zone](/waf/rate-limiting-rules/create-zone-dashboard/)
* [Create rate limiting rules in the dashboard for an account](/waf/rate-limiting-rules/create-account-dashboard/)

You can also configure rate limiting rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create rate limiting rules via API](/waf/rate-limiting-rules/create-api/) for more information.

{{</content-column>}}
