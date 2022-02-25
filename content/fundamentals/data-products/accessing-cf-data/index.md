---
order: 12
pcx-content-type: reference
---

# Accessing the data Cloudflare collects

Access metadata about the Cloudflare network through analytics on Cloudflare dashboard, through Logs, or through the GraphQL APIs.

## Analytics

Access the following analytics from the Cloudflare Dashboard:

*   Zone Analytics - Analytics gathered by each Cloudflare product, which are available within the **Analytics** application and within individual product applications
    *   **Analytics** application - Aggregated traffic, security, and performance metrics for each orange-clouded domain. Data available on the **Analytics** application includes:
        *   Traffic - Requests, Data transfer, Page views, Visits, and [API requests](https://developers.cloudflare.com/api-security/products/api-discovery#api-requests)
        *   Security - Total Threats, Top Crawlers/Bots, Rate Limiting, Total Threats Stopped
        *   Performance - Origin Performance, Bandwidth Saved
        *   DNS - DNS Queries by Response Code, Record Type, and Cloudflare Data Center
        *   Workers - Workers per zone, Workers KV per account
    *   In-product - The analytics available within each product on the dash, like the Events summary, Events by service, and Top events by source data in Firewall. Data available in-product includes:
        *   Firewall Events, [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics) within the **Firewall** application
        *   Browser Insights within the **Speed** application
        *   Cache Performance within the **Caching** application
        *   Load Balancing Analytics and Health Check Analytics within the **Traffic** application
*   Account Analytics - Sum of traffic to all your sites
*   Network Analytics - Analytics that provide visibility into network and transport-layer traffic patterns and DDoS attacks. Only available for customers on an Enterprise plan who use [Spectrum](https://developers.cloudflare.com/spectrum/), [Magic Transit](https://developers.cloudflare.com/magic-transit/), or [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/).
*   [Web Analytics](https://developers.cloudflare.com/analytics/web-analytics) - Privacy-first analytics for your website that doesn't require changing your DNS or using Cloudflare’s proxy

## Logs

Access Cloudflare Logs in one of two ways:

*   Via [Logpush](https://developers.cloudflare.com/logs/logpush) (recommended) - Push request or event logs from Cloudflare to your cloud service provider.
*   Via [Logpull](https://developers.cloudflare.com/logs/logpull-api) - Download only HTTP request logs using the [Logpull API](https://api.cloudflare.com/#logs-received-properties).

## GraphQL APIs

If you'd like more control over how you visualize the analytic and log information available on the Cloudflare dashboard, use the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api) to build customized views.
