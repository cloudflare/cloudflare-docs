---
title: Optimize analytics
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

Web analytics let you measure user behavior - pageviews, sessions, and custom events - on your application.

Cloudflare offers two ways to improve the privacy and performance of the way you gather these analytics.

## Cloudflare Web Analytics

If you want analytics without using third-party tools, check out [Cloudflare Web Analytics](/analytics/web-analytics/).

{{<render file="_web-analytics-definition.md" productFolder="analytics">}}

### Setup

So long as your traffic is [proxied through Cloudflare](/learning-paths/get-started-free/performance/default-improvements/), setting up Web Analytics only involves a few steps:

{{<render file="_web-analytics-proxied-setup.md" productFolder="analytics">}}

### Access

Once you have enabled Web Analytics, you can review analytics at any time:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select the **Analytics & Logs** drop-down and choose **Web Analytics**.
3. Select your zone.
4. Review the [various metrics](/analytics/web-analytics/understanding-web-analytics/core-web-vitals/) provided by Cloudflare.

### Notifications

{{<render file="_web-analytics-notifications.md" productFolder="analytics">}}

---

## Cloudflare Zaraz

If you already use third-party tools on your website, check out [Cloudflare Zaraz](/zaraz/).

{{<render file="_zaraz-definition.md" productFolder="zaraz">}}