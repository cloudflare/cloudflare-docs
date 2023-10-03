---
pcx_content_type: reference
title: Device information
weight: 3
---

# Magic WAN Connector device information

Magic WAN Connector software is certified for use on the [Dell Networking Virtual Edge Platform](https://www.dell.com/support/home/en-us/product-support/product/dell-emc-networking-vep1445-vep1485/docs). It can be purchased with software pre-installed through our partner network for plug-and-play connectivity to Cloudflare One.

## Security and other information

- Cloudflare ensures the Magic WAN Connector device is secure and is not altered via TPM/Secure boot.
- Connectivity to the Cloudflare global network is secure and all traffic is encrypted through IPsec tunneling.
- The Magic WAN Connector does not support fail open.
- Customers have the ability to layer on additional security features/policies that are enforced at the Cloudflare network.

## Heartbeat

Magic WAN Connector communicates periodically with Cloudflare. This is also known as a heartbeat, and lets Cloudflare know that the Connector in question is connected to the Internet and reachable.

### Access a Connector's heartbeat

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Magic WAN** > **Configuration** > **Connectors**.
3. Find your Connector. Move your mouse over to the `i` icon right after the **Status** column. This will show a timestamp with the last time that specific Connector successfuly contacted Cloudflare.