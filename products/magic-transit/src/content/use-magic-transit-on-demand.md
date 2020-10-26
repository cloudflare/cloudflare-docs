---
title: Use on demand
order: 5
---

# Use Magic Transit on demand

Customers with access to the Magic Transit on-demand option can [configure prefix advertisement](https://developers.cloudflare.com/byoip/dynamic-advertisement/configure-dynamic-advertisement) from the **IP Prefixes** page in their Cloudflare account home or via the [Cloudflare API](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties).

A common workflow is to enable prefix advertisement during an attack so that you can take advantage of Cloudflare protection and then disable advertisement once the incident is resolved.

To ensure smooth operation in general and simplify the advertisement process during an attack scenario, see [_Dynamic advertisement: Best practices_](https://developers.cloudflare.com/byoip/dynamic-advertisement/best-practices).

<Aside>

Once you have set up Magic Transit, all Cloudflare traffic to your prefixes uses GRE tunnels to reach your origin. This is true even when you disable dynamic advertising.

As a result, you may see traffic at the tunnel endpoint even when dynamic advertisement is disabled—traffic from other Cloudflare products that you or your end users are using, for example.

</Aside>
