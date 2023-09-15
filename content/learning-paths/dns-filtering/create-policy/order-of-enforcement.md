---
title: Order of enforcement
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

{{<render file="gateway/_order-of-precedence.md" withParameters=" " productFolder="cloudflare-one">}}

For example, suppose you have a list of DNS policies:

{{<render file="gateway/_order-of-precedence-dns.md" productFolder="cloudflare-one">}}

When a user navigates to `https://test.example.com`, Gateway evaluates the policies in the following order:

{{<render file="gateway/_order-of-precedence-dns-order.md" productFolder="cloudflare-one">}}