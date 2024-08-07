---
pcx_content_type: concept
title: Bulk Redirects
weight: 3
meta:
  title: Bulk Redirects
---

# Bulk Redirects

Bulk Redirects allow you to define a large number of URL redirects at the account level. These redirects navigate the user from a source URL to a target URL using a given HTTP status code. URL redirection is also known as URL forwarding.

Unlike dynamic URL redirects created in [Single Redirects](/rules/url-forwarding/single-redirects/), Bulk Redirects are essentially static — they do not support string replacement operations or regular expressions. However, you can configure URL redirect parameters that affect their URL matching behavior and their runtime behavior.

{{<render file="_snippets-alternative.md" withParameters="and customized redirect logic">}}<br />

---

## Related resources

* [Availability](/rules/url-forwarding/#availability): Information on the Bulk Redirects quotas and features per Cloudflare plan.
* [Execution order](/rules/url-forwarding/#execution-order): Execution order of the different Rules products.
* [Trace a request](/fundamentals/basic-tasks/trace-request/): Use Cloudflare Trace to determine if a bulk redirect rule is triggering for a specific URL.
