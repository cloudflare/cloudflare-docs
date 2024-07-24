---
pcx_content_type: concept
title: Single Redirects
weight: 2
meta:
  title: Single Redirects
---

# Single Redirects

Single Redirects allow you to create static or dynamic URL {{<glossary-tooltip term_id="redirect">}}redirects{{</glossary-tooltip>}}. Dynamic URL redirects support advanced features such as string replacement operations, [wildcards](/ruleset-engine/rules-language/operators/#wildcard-matching), and [regular expressions](/ruleset-engine/rules-language/values/#string-values-and-regular-expressions) (depending on your Cloudflare plan).

{{<render file="_snippets-alternative.md" withParameters="and customized redirect logic">}}<br />

---

## Related resources

* [Availability](/rules/url-forwarding/#availability): Information on the Single Redirects quotas and features per Cloudflare plan.
* [Execution order](/rules/url-forwarding/#execution-order): Execution order of the different Rules products.
* [Trace a request](/fundamentals/basic-tasks/trace-request/): Use Cloudflare Trace to determine if a redirect rule is triggering for a specific URL.