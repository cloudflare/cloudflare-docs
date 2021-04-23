---
title: Accessing the data Cloudflare collects
order: 12
---

# Accessing the data Cloudflare collects

Access your Cloudflare data through analytics on Cloudflare dashboard, through Logs, or through the GraphQL APIs.

## Analytics

Access the following analytics from the Cloudflare Dashboard:

* Site Analytics
  * **Analytics** application - Aggregated traffic, security, and performance metrics for each orange-clouded domain
  * In-product - The analytics available within each product on the dash, like the Events summary, Events by service, and Top events by source data in Firewall
* Network Analytics - Visualized packet and bit-level data that provides near real-time visibility into network and transport-layer traffic patterns and DDoS attacks. This data is also available via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api) for Enterprise customers.
* [Web Analytics](https://developers.cloudflare.com/analytics/web-analytics) - Privacy-first analytics for your website that doesn't require changing your DNS or using Cloudflare’s proxy

## Logs
Access Cloudflare Logs in one of two ways:

* Via [Logpush](https://developers.cloudflare.com/logs/logpush) (recommended) - Push request or event logs from Cloudflare to your cloud service provider using the Logpush service, which can be configured via the Cloudflare dashboard or the [Logpush API](https://api.cloudflare.com/#logpush-jobs).
* Via [Logpull](https://developers.cloudflare.com/logs/logpull-api) - Download only HTTP request logs using the [Logpull API](https://api.cloudflare.com/#logs-received-properties).

## GraphQL APIs
If you'd like more control over how you visualize the analytic and log information available on the Cloudflare dashboard, use the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api) to build customized views.

## Deprecated ways of accessing your Cloudflare data:
* [Analytics APIs](https://api.cloudflare.com/#zone-analytics-properties)
