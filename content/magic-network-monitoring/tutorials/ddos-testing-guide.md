---
title: DDoS testing guide
pcx_content_type: tutorial
weight: 2
meta:
  title: Magic Network Monitoring DDoS testing guide
updated: 2024-06-18
---

# Magic Network Monitoring DDoS testing guide

{{<tutorial-date-info>}}

Customers who want to effectively test Cloudflare’s Magic Network Monitoring (MNM) in a repeatable manner can devise a simulated DDoS attack. At a high level, you would need to:

1. Select and install a trusted and open source DDoS simulation tool.
2. Conduct a small DDoS test attack in a safe test environment.

If the property you intend to perform your tests on is hosted in Cloudflare, or if the Internet traffic itself goes through Cloudflare before reaching your property, you will need to contact Cloudflare to obtain permission to conduct a DDoS test. Enterprise customers also need to contact their Cloudflare Account Manager prior to starting their DDoS testing if Magic Network Monitoring is enabled, even if the property is not hosted in Cloudflare. Refer to [Simulating test DDoS attacks](/ddos-protection/reference/simulate-ddos-attack/) for more information.

If you need help conducting a simulated DDoS attack, [fill out this form](https://forms.gle/6tBZNu7shoaCmP9h6).