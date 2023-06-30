---
title: On-demand
pcx_content_type: concept
weight: 9
meta:
  title: Magic Transit on-demand
---

# Magic Transit on-demand

Customers with access to the Magic Transit on-demand option can [configure prefix advertisement](/byoip/how-to/configure-dynamic-advertisement/) from the **IP Prefixes** page in their Cloudflare account home or via the [Cloudflare API](/api/operations/ip-address-management-dynamic-advertisement-get-advertisement-status). 

A common workflow is to enable prefix advertisement during an attack so that you can take advantage of Cloudflare protection and then disable advertisement once the incident is resolved. Prefixes using BGP-controlled advertisements cannot be used in conjunction with on-demand auto-advertisement. You must use dynamic advertisement.

To ensure smooth operation in general and simplify the advertisement process during an attack scenario, refer to [Dynamic advertisement: Best practices](/byoip/best-practices/dynamic-advertisement/).

{{<Aside type="note">}}

Magic Transit on-demand cannot be used with Cloudflare leased IPs.

{{</Aside>}}