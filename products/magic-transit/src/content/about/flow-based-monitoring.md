---
title: Flow-based monitoring
order:
pcx-content-type: how to
---

# Flow-based monitoring

Flow-based monitoring works with [on demand](/on-demand) to detect and notify you about attacks based on traffic flows from your data centers. You can configure your routers to continuously send NetFlow data to Cloudflare where the flow data is ingested and analyzed for volumetric DDoS attacks. When an attack is detected, Cloudflare automatically notifies you by email, webhook, or [PagerDuty](https://support.cloudflare.com/hc/en-us/articles/360047358211-Connecting-PagerDuty-to-Cloudflare) with information about the attack.

You can choose to activate IP advertisement via the Cloudflare dashboard, API, or automatically. After Magic Transit is activated and your traffic is flowing through Cloudflare, you only receive the clean traffic back to your network over your GRE tunnels.

To activate IP advertisement via the Cloudflare dashboard, refer to [​using the IP Prefixes page to configure dynamic advertisement](https://developers.cloudflare.com/byoip/dynamic-advertisement/configure-dynamic-advertisement#use-the-ip-prefixes-page-to-configure-dynamic-advertisement).

To activate IP advertisement via the API, refer to the [IP Address Management Dynamic Advertisement API](https://api.cloudflare.com/#ip-address-management-dynamic-advertisement-properties).

## Enable Flow-based monitoring alerts

1. Log in to your Cloudflare dashboard and select **Notifications**.
1. From **Notifications**, click **Add**.
1. Locate **Magic Transit** in the list and click **Select** to add a Flow-based Monitoring: Volumetric Attack notification.
1. Enter a name and description for the notification.
1. Add an email address for the person who should receive the notification.
1. Click **Create** when you are done.