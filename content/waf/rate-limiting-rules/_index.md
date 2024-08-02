---
pcx_content_type: concept
title: Rate limiting rules
weight: 6
layout: wide
---

# Rate limiting rules

{{<content-column>}}

Rate limiting rules allow you to define rate limits for requests matching an expression, and the action to perform when those rate limits are reached.

## Rule parameters

Like other rules evaluated by Cloudflare's [Ruleset Engine](/ruleset-engine/), rate limiting rules have the following basic parameters:

{{<render file="_rate-limiting-rule-parameters.md" productFolder="waf" >}}

Refer to [Rate limiting parameters](/waf/rate-limiting-rules/parameters/) for more information on mandatory and optional parameters.

Refer to [How Cloudflare determines the request rate](/waf/rate-limiting-rules/request-rate/) to learn how Cloudflare uses the parameters above when determining the rate of incoming requests.

## Important remarks

* Rate limiting rules are evaluated in order, and some actions like _Block_ will stop the evaluation of other rules. For more details on actions and their behavior, refer to the [actions reference](/ruleset-engine/rules-language/actions/).

* Rate limiting rules are not designed to allow a precise number of requests to reach the origin server. In some situations, there may be a delay (up to a few seconds) between detecting a request and updating internal counters. Due to this delay, excess requests could still reach the origin server before Cloudflare enforces a mitigation action (such as blocking or challenging) in our global network.

* Applying rate limiting rules to verified bots might affect Search Engine Optimization (SEO). For more information, refer to [Improve SEO](/fundamentals/basic-tasks/improve-seo/).

---

## Availability

{{</content-column>}}

{{<render file="_rate-limiting-availability-by-plan.md" productFolder="waf" >}}

{{<content-column>}}

{{<render file="_non-contract-enablement.md" productFolder="fundamentals" >}}

## Next steps

You can configure rate limiting rules at the zone level and at the account level, depending on your plan and product subscriptions.

To configure rate limiting rules in the Cloudflare dashboard, refer to the following resources:
* [Create rate limiting rules in the dashboard for a zone](/waf/rate-limiting-rules/create-zone-dashboard/)
* [Create rate limiting rules in the dashboard for an account](/waf/rate-limiting-rules/create-account-dashboard/)

You can also configure rate limiting rules using the [Rulesets API](/ruleset-engine/rulesets-api/). Refer to [Create rate limiting rules via API](/waf/rate-limiting-rules/create-api/) for more information.

---

## Related resources

For guidance on the previous version of rate limiting rules (billed based on usage and now deprecated), refer to [Cloudflare Rate Limiting (previous version)](/waf/reference/legacy/old-rate-limiting/).

{{</content-column>}}
