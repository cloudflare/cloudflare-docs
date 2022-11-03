---
pcx_content_type: concept
title: Bulk Redirects
layout: single
weight: 2
meta:
  title: Bulk Redirects (beta)
---

{{<beta>}} Bulk Redirects {{</beta>}}

Bulk Redirects allow you to define a large number of URL redirects at the account level. These redirects navigate the user from a source URL to a target URL using a given HTTP status code. URL redirection is also known as URL forwarding.

Unlike dynamic URL redirects created in [Single Redirects](/rules/url-forwarding/single-redirects/), Bulk Redirects are essentially static — they do not support string replacement operations or regular expressions. However, you can configure URL redirect parameters that affect their URL matching behavior and their runtime behavior.

---

Refer to [Availability](/rules/url-forwarding/#availability) for more information on the quotas and features per Cloudflare plan.
