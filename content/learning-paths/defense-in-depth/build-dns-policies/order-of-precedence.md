---
title: Order of precedence
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

{{<render file="gateway/_order-of-precedence.md" withParameters=" " productFolder="cloudflare-one">}}

For example, suppose you have a list of DNS policies:

{{<render file="gateway/_order-of-precedence-dns.md" productFolder="cloudflare-one">}}

When a user navigates to `https://test.example.com`, Gateway evaluates the policies in the following order:

{{<render file="gateway/_order-of-precedence-dns-order.md" productFolder="cloudflare-one">}}

Now that you understand how to create DNS policies and what order Gateway evaluates them in, you can begin creating recommended DNS policies for you organization.
