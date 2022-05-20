---
title: China DNS
pcx-content-type: concept
weight: 4
---

# China DNS

Cloudflare is able to deploy DNS service in mainland China to improve the Time to First Byte (TTFB) performance. With this deployment, the DNS query will be resolved in mainland China instead of global DNS servers, with over 70% improvement in DNS query time for visitors in China.

## When to use

Before you enable China DNS, you should identify that over 90% of the traffic is coming from China. After you enable China DNS, all the global DNS requests will be routed to Cloudflare's servers in China.

## General setup

After you [enable the Cloudflare China Network service](/china-network/get-started/), do the following:

1. Ensure that your domain is using a [full setup](/dns/zone-setups/full-setup/). Cloudflare needs to be your authoritative DNS provider to enable China DNS.
2. Update your domain registrar with the assigned in-China name servers. These name servers are displayed in the Cloudflare dashboard.
3. Test your configuration by checking if the domain resolves correctly.

For further assistance, contact your sales team.