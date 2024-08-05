---
title: China Authoritative DNS
pcx_content_type: concept
weight: 4
---

# China Authoritative DNS

Cloudflare is able to deploy DNS service in mainland China to improve the Time to First Byte (TTFB) performance. With this deployment, the DNS query will be resolved in mainland China instead of global DNS servers.

## When to use

Before you enable China Authoritative DNS, you should confirm that majority (over 90%) of the traffic is coming from China. After you enable China Authoritative DNS, all the global DNS requests will be routed to JD Cloud data centers in China instead of the nearest data centers. 


## General setup

After you [enable the Cloudflare China Network service](/china-network/get-started/), do the following:

1. Contact your account team to enable the feature. Currently, you cannot enable China Authoritative DNS in the Cloudflare dashboard.

    The Cloudflare China Network currently supports domains using a [full setup](/dns/zone-setups/full-setup/) or a [partial setup](/dns/zone-setups/partial-setup/). 
2. Update your domain registrar with the assigned in-China nameservers. These nameservers are displayed in the Cloudflare dashboard.
3. Test your configuration by checking if the domain resolves correctly.

For further assistance, contact your account team.
