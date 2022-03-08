---
pcx-content-type: concept
title: Rate Limiting rules
weight: 3
---

# Rate Limiting Rules

Rate Limiting Rules allow you to define rate limits for incoming requests matching an expression, as well as actions to take when those rate limits are reached.

{{<Aside type="note">}}

This feature is only available for select customers on an Enterprise plan. Contact your account team to get access.

For guidance on the previous version of Cloudflare Rate Limiting, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

{{</Aside>}}

## Rule parameters

Like other rules evaluated by Cloudflare's Ruleset Engine, Rate Limiting Rules have an associated **expression** and an **action**.

The **expression** specifies the criteria you are matching traffic on using the [Rules language](/ruleset-engine/rules-language). The **action** specifies what to perform when there is a match for the rule and any additional conditions are met. In the case of Rate Limiting Rules, the action occurs when the request rate reaches the specified limit.

Besides these two parameters, Rate Limiting Rules require the following additional parameters:

*   **Characteristics** — The set of parameters that define how Cloudflare tracks the request rate for this rule.
*   **Period** — The period of time to consider (in seconds) when evaluating the request rate.
*   **Requests per period** — The number of requests over the period of time that will trigger the Rate Limiting Rule.
*   **Mitigation timeout** — Once the request rate is reached, the Rate Limiting Rule blocks further requests for the period of time defined in this field.

Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more details on these parameters.

Refer to [Determining the request rate](/waf/rate-limiting-rules/request-rate/) to learn how Cloudflare uses the parameters above when determining the rate of incoming requests.

***

## Next steps

To configure Rate Limiting Rules using the Cloudflare dashboard, use the **Rate Limiting Rules** tab in **Security** > **WAF**. For more information, refer to [Create Rate Limiting Rules in the dashboard](/waf/rate-limiting-rules/create-dashboard/).

You can also configure Rate Limiting Rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create Rate Limiting Rules via API](/waf/rate-limiting-rules/create-api/) for more information.
