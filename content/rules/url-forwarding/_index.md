---
pcx_content_type: concept
title: URL forwarding
weight: 5
layout: single
---

# URL forwarding

URL forwarding, also known as URL redirection, navigates the user from a source URL to a target URL with a specific HTTP status code.

Use the following Cloudflare products to perform URL redirects, according to your use case:

- [**Single Redirects**](/rules/url-forwarding/single-redirects/): Allow you to create static or dynamic redirects at the zone level. Dynamic redirects are powerful URL redirects, such as redirects based on the source country of requests. Depending on your Cloudflare plan, you can use regular expressions to define the redirect URL.

- [**Bulk Redirects**](/rules/url-forwarding/bulk-redirects/): Allow you to define a large number of redirects at the account level. These URL redirects are essentially static — they do not support string replacement operations or regular expressions. However, you can configure parameters that affect the redirects' URL matching behavior and their runtime behavior.

## Availability

Single Redirects and Bulk Redirects are available on all Cloudflare plans. The exact quotas and features depend on your plan.

| Feature                                         | Free | Pro | Business |     Enterprise     |
|-------------------------------------------------|-----:|----:|---------:|-------------------:|
| **Single Redirects**                            |      |     |          |                    |
| Number of redirect rules                        |   10 |  25 |       50 |                125 |
| Redirect rules with regular expressions         |    — |   — |      Yes |                Yes |
| **Bulk Redirects**                              |      |     |          |                    |
| Number of Bulk Redirect Rules                   |   15 |  15 |       15 |                 50 |
| Number of Bulk Redirect Lists                   |    5 |   5 |        5 |                 25 |
| Number of URL redirects across lists            |   20 | 500 |      500 | 10,000<sup>1</sup> |

<sup>1</sup> _Default quota for the Enterprise plan. Bulk Redirects supports several million URL redirects — to get more redirects, contact your account team._

Single Redirects features and quotas are per zone and depend on the zone plan.

Bulk Redirects features and quotas are per account and they depend on the highest Cloudflare plan on your account.