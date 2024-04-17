---
title: Cache Rules
pcx_content_type: concept
---

# Cache Rules

Use Cache Rules to customize cache settings on Cloudflare. Cache Rules allows you to make adjustments to what is eligible to cache, how long it should be cached and where, as well as trigger specific interactions with Cloudflare’s cache and other Rules products for matching requests.

Cache Rules can be created in the [dashboard](/cache/how-to/cache-rules/create-dashboard/), via [API](/cache/how-to/cache-rules/create-api/) or [Terraform](/cache/how-to/cache-rules/terraform-example/).

## Availability

The following table describes Cache Rules availability per plan.

{{<feature-table id="cache.cache_rules">}}

{{<render file="_troubleshoot-rules-with-trace.md" productFolder="rules" withParameters="cache rules">}}