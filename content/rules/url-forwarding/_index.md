---
pcx_content_type: concept
title: URL forwarding
weight: 5
layout: single
meta:
  title: URL forwarding / URL redirection
---

# URL forwarding

URL forwarding, also known as URL redirection, navigates the user from a source URL to a target URL with a specific HTTP status code.

Use the following Cloudflare products to perform URL redirects, according to your use case:

- [**Bulk Redirects**](/rules/url-forwarding/bulk-redirects/): Allow you to define a large number of redirects (thousands) at the account level. These URL redirects are essentially static — they do not support string replacement operations or regular expressions. However, you can configure parameters that affect the redirects' URL matching behavior and their runtime behavior.

- [**Dynamic Redirects**](/rules/url-forwarding/dynamic-redirects/): Allow you to create powerful URL redirects like redirects based on the source country of requests. Depending on your Cloudflare plan, you can use regular expressions to define the redirect URL.

## Availability

Bulk Redirects and Dynamic Redirects are available on all Cloudflare plans. The exact limits and features depend on your plan.

| Feature                                         | Free | Pro | Business | Enterprise |
|-------------------------------------------------|-----:|----:|---------:|-----------:|
| **Bulk Redirects**                              |      |     |          |            |
| Number of Bulk Redirect Rules                   |   15 |  15 |       15 |         50 |
| Number of Bulk Redirect Lists                   |    5 |   5 |        5 |         25 |
| Number of URL redirects across lists            |   20 | 500 |      500 |     10,000 |
| **Dynamic Redirects**                           |      |     |          |            |
| Number of Dynamic Redirect Rules                |   10 |  25 |       50 |        125 |
| Dynamic Redirect Rules with regular expressions |    — |   — |      Yes |        Yes |


The limits in the table are the default limits for each Cloudflare plan. If you need more URL redirects in Bulk Redirects, contact your account team.

When determining the available features and their limits, Cloudflare takes into consideration the highest plan on your account.
