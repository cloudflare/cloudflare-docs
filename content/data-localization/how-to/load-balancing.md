---
title: Load Balancing 
pcx_content_type: how-to
weight: 4
---

# Load Balancing

In the following sections, we will give you some details about how to configure Load Balancing with Regional Services and Customer Metadata Boundary.

## Regional Services

You can load balance traffic at different levels of the networking stack depending on the [proxy mode](/load-balancing/understand-basics/proxy-modes/): Layer 7 (`HTTP/S`) and Layer 4 (`TCP`) are supported; however, `DNS-only` is not supported, as it is not [proxied](/dns/manage-dns-records/reference/proxied-dns-records/).

To configure Regional Services for hostnames [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare and ensure that the Load Balancer is available only in-region, follow these steps for the dashboard or API configuration:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select an account and zone.
2. Go to the **Load Balancing** tab.
3. Follow the steps to [create a load balancer](/load-balancing/load-balancers/create-load-balancer/#create-a-load-balancer).
4. From the **Data Localization** dropdown, select the region you would like to use on your domain.
5. Select **Next** and continue with the regular setup.
6. Select **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. Follow the instructions outlined to [create a load balancer](/load-balancing/load-balancers/create-load-balancer/#create-a-load-balancer) via API.
2. Run the [API POST](/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the Load Balancer hostname to create a `regional_hostnames` with a specific region.

{{</tab>}}
{{</tabs>}}

## Customer Metadata Boundary

[Load Balancing Analytics](/load-balancing/reference/load-balancing-analytics/) are not available outside the US region when using Customer Metadata Boundary. 

With Customer Metadata Boundary set to `EU`, **Traffic** > **Load Balancing Analytics** > **Overview and Latency** tab in the zone dashboard will not be populated.

Refer to the [Load Balancing documentation](/load-balancing/) for more information.
