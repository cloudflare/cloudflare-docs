---
title: Load Balancing rules
order: 17
pcx-content-type: concept
---

# Rules for Cloudflare Load Balancing

Use Load Balancing rules to customize the behavior of your [load balancer](/understand-basics/load-balancers). For example, create a Load Balancing rule that selects an [origin pool](/understand-basics/pools) based on the URI path of an HTTP request.

## More details

You can [create Load Balancing rules](/understand-basics/load-balancing-rules/create-rules) whenever you create or edit a load balancer in **Traffic** > **Load Balancing**.

As with Cloudflare [Firewall rules](https://developers.cloudflare.com/firewall/cf-firewall-rules), each Load Balancing rule is a combination of two elements: an [expression](/understand-basics/load-balancing-rules/expressions) and an [action](/understand-basics/load-balancing-rules/actions). Expressions define the criteria for an HTTP request to trigger an action. The action tells Cloudflare how to handle the request.

When building expressions for Load Balancing rules, refer to [Supported fields and operators](/understand-basics/load-balancing-rules/reference) for definitions and usage.

## Availability

By default, non-Enterprise customers have **one** Load Balancing rule **per domain**. For more rules, upgrade to [Enterprise](https://www.cloudflare.com/enterprise/).