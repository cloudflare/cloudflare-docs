---
pcx-content-type: concept
title: Bulk Redirects (beta)
weight: 5
---

# Bulk Redirects (beta)

Bulk Redirects allow you to define a large number of redirects at the account level. These redirects navigate the user from a source URL to a target URL using a given HTTP status code.

Bulk Redirects are essentially static — they do not support any string replacement operations or regular expressions. However, you can configure URL Redirect parameters that affect their URL matching behavior and their runtime behavior.

## Availability

{{<table-wrap>}}

|                                              | Free | Pro | Business | Enterprise |
|----------------------------------------------|-----:|----:|---------:|-----------:|
| Number of Edge Rules<br/>(includes Bulk Redirect Rules) | 15 |  15 |  15 |     50 |
| Number of Bulk Redirect Lists                           |  5 |   5 |   5 |     25 |
| Number of URL Redirects across lists                    | 20 | 500 | 500 | 10,000 |

{{</table-wrap>}}

When determining the available Bulk Redirect features and their limits, Cloudflare takes into account the highest plan on your account.
