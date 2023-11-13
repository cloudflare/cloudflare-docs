---
pcx_content_type: concept
title: Redirects
weight: 4
---

# Redirects

Cloudflare offers a variety of ways to perform {{<glossary-tooltip term_id="redirect">}}URL redirects{{</glossary-tooltip>}}, which tell a visitor's browser that the location of a page has been changed.

Use the following table to determine when to use each option.

| Option | Use when |
| --- | --- | --- |
| [Bulk redirects](/rules/url-forwarding/bulk-redirects/) | As a default option. These URL redirects are essentially static, meaning they do not support string replacement operations or regular expressions. |
| [Single redirects](/rules/url-forwarding/single-redirects/) | When you need dynamic behavior or advanced features like string replacement operations and regular expressions. |
| [Pages redirects](/pages/platforms/redirects/) | If you have a Pages project, use as a default option. |
| [Workers redirect](/workers/examples/redirect/) | When you need more advanced functionality than **Single Redirects**. |
| [Page Rules](/support/page-rules/configuring-url-forwarding-or-redirects-with-page-rules/) | Though technically possible, Page Rules [are being replaced](https://blog.cloudflare.com/future-of-page-rules/) by other products. |