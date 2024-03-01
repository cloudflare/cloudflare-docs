---
pcx_content_type: concept
title: Analytics
weight: 4
---

# GraphQL DNS analytics

With advanced nameservers, new analytics accessible by [GraphQL](/analytics/graphql-api/) become available.

Once you [enable advanced nameservers](/dns/foundation-dns/setup/), update your registrar or parent zone, and wait for the time-to-live (TTL) of the previous nameservers to expire, you will have the following options.

## View on the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **DNS** > **Analytics**.

## Explore with API

Refer to the GraphQL Analytics API documentation for a guidance on how to [get started](/analytics/graphql-api/getting-started/).

The DNS analytics has two [schemas](/analytics/graphql-api/getting-started/explore-graphql-schema/):

- `dnsAnalyticsAdaptive`: retrieves information about individual DNS queries.
- `dnsAnalyticsAdaptiveGroups`: reports aggregate information only.

## Time limits

You can configure a maximum time frame over which analytics can be queried of up to 32 days, and can look into analytics data that are up to 93 days old.