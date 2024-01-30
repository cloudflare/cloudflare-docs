---
title: Cache
pcx_content_type: how-to
weight: 3
---

# Cache

In the following sections, we will give you some details about how to configure Cache with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for hostnames [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare and ensure that [eligible assets](/cache/concepts/default-cache-behavior/) are cached only in-region, follow these steps for the dashboard or API configuration:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select an account and zone.
2. Go to the **DNS** tab.
3. Follow these steps to [create a DNS record](/dns/manage-dns-records/how-to/create-dns-records/).
4. From the **Region** dropdown, select the region you would like to use on your domain.
5. Select **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. To create records with the API, use the [API POST](/api/operations/dns-records-for-a-zone-create-dns-record) command.
2. Run the [API POST](/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the hostname to create a `regional_hostnames` with a specific region.

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

Take into consideration that only [Generic Global Tiered Cache](/cache/how-to/tiered-cache/#generic-global-tiered-cache) and [Custom Tiered Cache](/cache/how-to/tiered-cache/#custom-tiered-cache) respect Regional Services. [Smart Tiered Cache](/cache/how-to/tiered-cache/#smart-tiered-cache) is incompatible with Regional Services.

{{</Aside>}}

## Customer Metadata Boundary

[Cache Analytics](/cache/performance-review/cache-analytics/), Generic Global Tiered Cache and Custom Tiered Cache are compatible with Customer Metadata Boundary. With Customer Metadata Boundary set to EU, the **Caching** > **Tiered Cache** tab in the zone dashboard will not be populated.

For more information on CDN and caching, refer to the [Cache documentation](/cache/).
