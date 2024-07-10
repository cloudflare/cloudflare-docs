---
pcx_content_type: concept
title: Redirects
weight: 5
---

# Redirects

URL forwarding, also known as URL redirection, navigates the user from a source URL to a target URL with a specific HTTP status code.

Use the following Cloudflare products to perform URL redirects, according to your use case:

- [**Single Redirects**](/rules/url-forwarding/single-redirects/): Allow you to create static or dynamic redirects at the zone level. Dynamic redirects are advanced URL redirects, such as redirects based on the source country of requests. Depending on your Cloudflare plan, you can use regular expressions to define the redirect URL.

- [**Bulk Redirects**](/rules/url-forwarding/bulk-redirects/): Allow you to define a large number of redirects at the account level. These URL redirects are essentially static — they do not support string replacement operations or regular expressions. However, you can configure parameters that affect the redirects' URL matching behavior and their runtime behavior.

- [**Snippets**](/rules/snippets/): Use short pieces of JavaScript code for a more flexible way to define complex redirect functionality. Consider a few [examples](/rules/snippets/examples/?operation=Redirect) to get started.

{{<render file="_rules-requirements.md" withParameters="Single Redirects and Bulk Redirects require">}}

## Availability

Single Redirects and Bulk Redirects are available on all Cloudflare plans. The exact quotas and features depend on your plan.

### Bulk redirects

{{<feature-table id="rules.bulk_redirects">}}

For *URL redirects across lists*, this table provides the default quota for the Enterprise plan. Bulk Redirects supports several million URL redirects — to get more redirects, contact your account team.

Bulk Redirects features and quotas are per account and they depend on the highest Cloudflare plan on your account.

### Single Redirects

{{<feature-table id="rules.single_redirects">}}

Single Redirects features and quotas are per zone and depend on the zone plan.

## Execution order

{{<render file="_product-execution-order.md">}}

{{<render file="_troubleshoot-rules-with-trace.md" withParameters="URL redirects">}}