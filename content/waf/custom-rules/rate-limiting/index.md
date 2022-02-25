---
pcx-content-type: concept
title: Rate Limiting rules
weight: 3
---

# Rate Limiting rules

Rate Limiting rules allow you to define rate limits for incoming requests matching an expression, as well as actions to take when those rate limits are reached.

<Aside type='warning'>

This feature is only available for selected customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager if you want to get access.

For guidance on the previous version of Rate Limiting rules, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

</Aside>

## Rule parameters

Like other rules evaluated by Cloudflare's Ruleset Engine, Rate Limiting rules have an associated **expression** and an **action**.

The **expression** specifies the criteria you are matching traffic on using the [Rules language](/ruleset-engine/rules-language). The **action** specifies what to perform when there is a match for the rule and any additional conditions are met. In the case of Rate Limiting rules, the action occurs when the request rate reaches the specified limit.

Besides these two parameters, Rate Limiting rules require the following additional parameters:

*   **Characteristics** — The set of parameters that define how Cloudflare tracks the request rate for this rule.
*   **Period** — The period of time to consider (in seconds) when evaluating the request rate.
*   **Requests per period** — The number of requests over the period of time that will trigger the Rate Limiting rule.
*   **Mitigation timeout** — Once the request rate is reached, the Rate Limiting rule blocks further requests for the period of time defined in this field.

Refer to [Rate limiting parameters](/waf/custom-rules/rate-limiting/parameters/) for more details on these parameters.

Refer to [Determining the request rate](/waf/custom-rules/rate-limiting/request-rate/) to learn how Cloudflare uses the parameters above when determining the rate of incoming requests.

***

## Getting started

To configure Rate Limiting rules using the Cloudflare dashboard, use the **Custom Rules** tab in the **Firewall** app. For more information, refer to [Create Rate Limiting rules in the dashboard](/waf/custom-rules/rate-limiting/create-dashboard/).

You can also configure Rate Limiting rules using the [Rulesets API](/ruleset-engine/rulesets-api). Refer to [Create Rate Limiting rules via API](/waf/custom-rules/rate-limiting/create-api/) for more information.
