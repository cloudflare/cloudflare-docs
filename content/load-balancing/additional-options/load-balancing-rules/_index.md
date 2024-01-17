---
title: Custom load balancing rules
pcx_content_type: concept
weight: 18
meta:
  title: Custom rules
---

# Custom rules

{{<render file="_custom-rules-definition.md">}}

## How custom rules work

As with [WAF custom rules](/waf/custom-rules/), each load balancing custom rule is a combination of two elements: an [expression](/load-balancing/additional-options/load-balancing-rules/expressions/) and an [action](/load-balancing/additional-options/load-balancing-rules/actions/). Expressions define the criteria for an HTTP request to trigger an action. The action tells Cloudflare how to handle the request.

You can [create Load Balancing rules](/load-balancing/additional-options/load-balancing-rules/create-rules/) whenever you create or edit a load balancer in **Traffic** > **Load Balancing**.

When building expressions for Load Balancing rules, refer to [Supported fields and operators](/load-balancing/additional-options/load-balancing-rules/reference/) for definitions and usage.

## Availability

By default, non-Enterprise customers have **one** Load Balancing rule **per load balancer hostname**. For more rules, upgrade to [Enterprise](https://www.cloudflare.com/enterprise/).

## Limitations

At the moment, you cannot use Load Balancing rules with [Cloudflare Spectrum](/spectrum/about/load-balancer/).
