---
title: Analytics
pcx_content_type: concept
weight: 3
---

# Analytics

Cloudflare provides analytics to show the performance benefits of Argo Smart Routing.

You can access Argo analytics for your domain in the [Cloudflare dashboard](https://dash.cloudflare.com/) at **Analytics** > **Performance**. For information on all analytics in the dashboard, refer to [Analytics](/analytics/).

## How it works

Analytics collects data based on the time-to-first-byte (TTFB) from your origin to the Cloudflare network. TTFB is the delay between when Cloudflare sends a request to your server and when it receives the first byte in response. Argo Smart Routing optimizes your server's network transit time to minimize this delay.

{{<Aside type="note">}}

Detailed performance data within **Origin Performance (Argo)** will only display if Argo has routed at least 500 origin requests within the last 48 hours.

{{</Aside>}}

## Types of analytics

The dashboard displays two different views for performance data:

* **Origin Response Time**: A histogram shows response time from your origin to the Cloudflare network. The blue bars show TTFB without Argo, while the orange bars show TTFB where Argo found a Smart Route.

* **Geography**: A map shows the improvement in response time at each Cloudflare data center.
