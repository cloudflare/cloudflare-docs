---
title: Network analytics
pcx_content_type: overview
weight: 3
meta:
  title: Cloudflare Network Analytics
---

# Cloudflare Network Analytics

Cloudflare Network Analytics (version 2) provides near real-time visibility into network and transport-layer traffic patterns and DDoS attacks. Network Analytics visualizes packet and bit-level data, the same data available via the Network Analytics dataset of the GraphQL Analytics API.

{{<render file="_network-analytics-requirements.md">}}

For a technical deep-dive into Network Analytics, refer to our [blog post](https://blog.cloudflare.com/building-network-analytics-v2/).

## Remarks

* The Network Analytics logs refer to IP traffic of Magic Transit customer prefixes/leased IP addresses or Spectrum applications. These logs are not directly associated with the [zones](/fundamentals/setup/accounts-and-zones/#zones) in your Cloudflare account.

* The data retention for Network Analytics is 16 weeks. Additionally, data older than eight weeks might have lower resolution when using narrow time frames.

## Related resources

* [Cloudflare GraphQL API](/analytics/graphql-api/)
* [Cloudflare Logpush](/logs/about/)
* [Video tutorial: Send Network Analytics Logs to Splunk via Logpush](/analytics/analytics-integrations/splunk/#video-tutorial-send-network-analytics-logs-to-splunk)
* [Migrating from Network Analytics v1 to Network Analytics v2](/analytics/graphql-api/migration-guides/network-analytics-v2/)
* [Cloudflare Network Analytics v1](/analytics/network-analytics/reference/network-analytics-v1/) {{<inline-pill style="deprecated">}}
