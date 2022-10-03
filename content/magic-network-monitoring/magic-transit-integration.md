---
title: Magic Transit integration
pcx_content_type: overview
weight: 6
---

#  Magic Transit integration

[Magic Transit On Demand](/magic-transit/on-demand/) customers need to know when they should activate Magic Transit to mitigate DDoS attacks, and Magic Network Monitoring solves this problem by analyzing traffic flow from your data centers and detecting DDoS attacks.

If an attack is detected, you can choose to automatically activate IP advertisement and enable Magic Transit to protect the impacted IP prefixes from DDoS attacks. This feature is refer to as auto-advertisement, and you can enable it for individual Magic Network Monitoring rules. After Magic Transit is activated and your traffic is flowing through Cloudflare, you only receive the clean traffic back to your network over your tunnels.

To activate IP advertisement via the Cloudflare dashboard, refer to [​using the IP Prefixes page to configure dynamic advertisement](https://developers.cloudflare.com/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-dashboard). 

To activate IP advertisement via the API, refer to the [IP Address Management Dynamic Advertisement API](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties).

To enable per-prefix thresholds with prefix auto advertisement, refer to [Enable per-prefix thresholds with prefix auto advertisement](/magic-transit/how-to/auto-advertise-prefixes/).