---
pcx_content_type: concept
title: URL forwarding
weight: 5
layout: single
---

# URL forwarding

URL forwarding, also known as URL redirection, navigates the user from a source URL to a target URL with a specific HTTP status code.

Use the following Cloudflare products to perform URL redirects, according to your use case:

- [**Bulk Redirects**](/rules/url-forwarding/bulk-redirects/): Allow you to define a large number of redirects at the account level. These URL redirects are essentially static — they do not support string replacement operations or regular expressions. However, you can configure parameters that affect the redirects' URL matching behavior and their runtime behavior.

- [**Dynamic Redirects**](/rules/url-forwarding/dynamic-redirects/): Allow you to create powerful URL redirects, such as redirects based on the source country of requests. Depending on your Cloudflare plan, you can use regular expressions to define the redirect URL.

## Availability

Bulk Redirects and Dynamic Redirects are available on all Cloudflare plans. The exact quotas and features depend on your plan.         |

| Feature                                         | Free | Pro | Business |     Enterprise     |
|-------------------------------------------------|-----:|----:|---------:|-------------------:|
| **Bulk Redirects**                              |      |     |          |                    |
| Number of Bulk Redirect Rules                   |   {{<plan-info id="rules.bulk_redirects.rules.free">}} |  {{<plan-info id="rules.bulk_redirects.rules.pro">}} |       {{<plan-info id="rules.bulk_redirects.rules.biz">}} |                 {{<plan-info id="rules.bulk_redirects.rules.ent">}} |
| Number of Bulk Redirect Lists                   |   {{<plan-info id="rules.bulk_redirects.lists.free">}} |  {{<plan-info id="rules.bulk_redirects.lists.pro">}} |       {{<plan-info id="rules.bulk_redirects.lists.biz">}} |                 {{<plan-info id="rules.bulk_redirects.lists.ent">}} |
| Number of URL redirects across lists            |   {{<plan-info id="rules.bulk_redirects.url_redirects.free">}} |  {{<plan-info id="rules.bulk_redirects.url_redirects.pro">}} |       {{<plan-info id="rules.bulk_redirects.url_redirects.biz">}} |                 {{<plan-info id="rules.bulk_redirects.url_redirects.ent">}}[^1] |
| **Dynamic Redirects**                           |      |     |          |                    |
| Number of Dynamic Redirect Rules                |   {{<plan-info id="rules.dynamic_redirects.rules.free">}} |  {{<plan-info id="rules.dynamic_redirects.rules.pro">}} |       {{<plan-info id="rules.dynamic_redirects.rules.biz">}} |                 {{<plan-info id="rules.dynamic_redirects.rules.ent">}} |
| Dynamic Redirect Rules with regular expressions |   {{<plan-info id="rules.dynamic_redirects.regex_support.free">}} |  {{<plan-info id="rules.dynamic_redirects.regex_support.pro">}} |       {{<plan-info id="rules.dynamic_redirects.regex_support.biz">}} |                 {{<plan-info id="rules.dynamic_redirects.regex_support.ent">}} |

[^1]: Default quota for the Enterprise plan. Bulk Redirects supports several million URL redirects — to get more redirects, contact your account team.

Bulk Redirects features and quotas are per account and they depend on the highest Cloudflare plan on your account.

Dynamic Redirects features and quotas are per zone and depend on the zone plan.
