---
title: Flow-based monitoring
pcx-content-type: navigation
weight: 6
---

# Flow-based monitoring

Flow-based monitoring works with [Magic Transit on demand](/magic-transit/on-demand/) to detect and notify you about attacks based on traffic flows from your data centers. You can configure your routers to continuously send NetFlow data to Cloudflare where the flow data is ingested and analyzed for volumetric DDoS attacks, or you can choose to send data over [IPsec tunnels](/magic-wan/how-to/ipsec). When an attack is detected, Cloudflare automatically notifies you by email, [webhook](/fundamentals/notifications/create-notifications/configure-webhooks/), or [PagerDuty](/fundamentals/notifications/create-notifications/create-pagerduty/) with information about the attack.

You can choose to activate IP advertisement via the Cloudflare dashboard or API. After Magic Transit is activated and your traffic is flowing through Cloudflare, you only receive the clean traffic back to your network over your tunnels.

To activate IP advertisement via the Cloudflare dashboard, refer to [​using the IP Prefixes page to configure dynamic advertisement](/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-dashboard). To activate IP advertisement via the API, refer to the [IP Address Management Dynamic Advertisement API](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties).

To enable Flow-based monitoring alerts, refer to [Enable Flow-based monitoring alerts](/magic-transit/flow-based-monitoring/enable-flow-based-monitoring/).

To enable per-prefix thresholds with prefix auto advertisement, refer to [Enable per-prefix thresholds with prefix auto advertisement](/magic-transit/how-to/auto-advertise-prefixes/).