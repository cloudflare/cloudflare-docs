---
pcx_content_type: concept
title: Redirects
weight: 4
layout: wide
---

# Redirects

Cloudflare offers a variety of ways to perform {{<glossary-tooltip term_id="redirect">}}URL redirects{{</glossary-tooltip>}}, which tell a visitor's browser that the location of a page has been changed.

Use the following table to determine when to use each option.

| Option | Use when |
| --- | --- |
| [Single redirects](/rules/url-forwarding/single-redirects/) | As a default option. |
| [Bulk redirects](/rules/url-forwarding/bulk-redirects/) | When you have a large number of static redirects. |
| [Pages redirects](/pages/configuration/redirects/) | If you have a Pages project. |
| [Workers redirect](/workers/examples/redirect/) | When the other redirects do not meet your needs. |
| [Page Rules](/rules/page-rules/how-to/url-forwarding/) | As an option of last resort, since Page Rules [are being replaced](https://blog.cloudflare.com/future-of-page-rules/). |