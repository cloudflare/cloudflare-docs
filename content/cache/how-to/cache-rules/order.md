---
title: Order and priority
pcx_content_type: reference
weight: 7
meta:
  title: Order and priority
---

# Order and priority

Cache rules affect requests differently from Page Rules. This is how they are applied:

1. Cache Rules are stackable. This means that multiple matching rules can be combined and applied to the same request. For example, if multiple cache rules match the same URL, then the features set in those cache rules will all be applied in order. If several matching rules set a value for the same setting, the value in the last matching rule wins. For an example of a similar scenario where multiple rules match, refer to the [Origin Rules FAQ](/rules/origin-rules/faq/#what-happens-if-more-than-one-origin-rule-matches-the-current-request).

2. For conflicting settings (for example, bypass cache versus eligible for cache), the last matching rule wins. For example, if cache rule #1 is set to cache everything on `example.com/images` and cache rule #2 is set to bypass cache on `example.com`, then cache will be bypassed for all URLs that match `example.com`, since rule #2 is the last matching rule.

3. If you have Page Rules implemented for caching on the same path, Cache Rules will take precedence by design.

4. Cache rules take precedence over zone-wide rules in the configuration tab within the cache settings. This means that when configuring your cache settings, rules that are more specific take precedence over broader, zone-wide configurations. For example, the timeout duration for the entire zone `example.com` is set to 600 seconds. However, there is a rule specifically for the hostname `timeout.example.com` that sets it to 1200 seconds. In this case, `timeout.example.com` will use the longer timeout of 1200 seconds, overriding the zone-wide setting.

## Execution order of Rules products

{{<render file="_product_execution_order.md" productFolder="rules">}}