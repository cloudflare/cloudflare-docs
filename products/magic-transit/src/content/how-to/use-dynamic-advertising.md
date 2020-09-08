---
title: Use Magic Transit On Demand
alwaysopen: true
weight: 220
hidden: false
---


Customers with access to the Magic Transit on-demand option can enable or disable advertisement of their IP prefixes from either the Cloudflare dashboard or the API.

A common workflow is to enable prefix advertisement during an attack so that you can take advantage of Cloudflare protection and then disable advertisement once the incident is resolved.

For more details and a UI walkthrough, see the [Dynamic Advertisement](/byoip/api) docs. To use the dynamic advertisement API, check out [IP Address Management and Dynamic Advertisement](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties) in the [Cloudflare API documentation](https://api.cloudflare.com/).

<Aside type="info">

Once you have set up Magic Transit, all Cloudflare traffic to your prefixes uses GRE tunnels to reach your origin. This is true even when you disable dynamic advertising.

As a result, you may see traffic at the tunnel endpoint even when dynamic advertisement is disabled — traffic from other Cloudflare products that you or your end users are using, for example.

</Aside>
