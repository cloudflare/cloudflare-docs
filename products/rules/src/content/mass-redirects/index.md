---
pcx-content-type: concept
order: 4
---

# Mass Redirects

Mass Redirects allow you to define a large number of redirects at the account level. These redirects navigate the user from a source URL to a target URL using a given HTTP status code.

These redirects are essentially static — they do not support any string replacement operations. However, you can configure the exact behavior of each URL Redirect by setting its options.

## Availability

|                                              | Free | Pro | Business | Enterprise |
|----------------------------------------------|-----:|----:|---------:|-----------:|
| Number of Edge Rules<br/>(includes Mass Redirect Rules) | 15 |  15 |  15 |     50 |
| Number of URL Redirect Lists                            |  5 |   5 |   5 |     25 |
| Number of URL redirects across lists                    | 20 | 500 | 500 | 10,000 |

When determining the available Mass Redirect features and their limits, Cloudflare takes into account the highest plan on your account.
