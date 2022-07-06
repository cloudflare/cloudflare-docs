---
title: Analytics
pcx-content-type: concept
weight: 3
---

# Analytics

Cloudflare provides analytics to display the performance benefits of Argo Smart Routing.

You can access Argo analytics for your domain on the Cloudflare Dashboard at **Analytics** > **Performance**. For information on all analytics in the Cloudflare Dashboard, refer to [Analytics](/analytics).

## How it works

Argo Analytics collect data based on the time-to-first-byte (TTFB) from your origin to the Cloudflare network. TTFB is the delay between when the Cloudflare network sends a request to your server and when it receives the first byte in response. Argo Smart Routing optimizes your server's network transit time to minimize this delay.

{{<Aside type="note">}}

Detailed performance data will only display if Argo has routed at least 500 origin requests within the last 48 hours.

{{</Aside>}}

## Types of analytics

The Dashboard displays two different views for performance data:

* **A histogram of origin response time.** The blue bars show TTFB before Argo, while the orange bars show TTFB after Argo. A shift to the left indicates performance improvement.

* **A map of Cloudflare data centers.** The nodes show performance improvements at each Cloudflare data center.
