---
title: Pages
pcx_content_type: how-to
weight: 2
---

# Pages

In the following sections, we will give you some details about how to configure Pages with Regional Services and Customer Metadata Boundary.

## Regional Services

To configure Regional Services for hostnames [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare and ensure that processing of a Pages project occurs only in-region, follow these steps for the dashboard or API configuration:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select an account.
2. Go to the **Workers & Pages** tab.
3. Select your Pages project.
4. Follow these steps to [create a Custom Domain](/pages/configuration/custom-domains/).
5. Go to the **DNS** of the zone you configured the Custom Domain for.
6. From the **Region** dropdown, select the region you would like to use on your domain.
7. Select **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

1. Use the [API POST](/api/operations/pages-domains-add-domain) command to add a Custom Domain to a Pages project.
2. Run the [API POST](/data-localization/regional-services/get-started/#configure-regional-services-via-api) command on the Pages Custom Domain to create a `regional_hostnames` with a specific Region.

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

Regional Services only applies to the Custom Domain configured for a Pages project.

{{</Aside>}}

## Customer Metadata Boundary

Customer Metadata Boundary applies to the Custom Domain configured, as well as the [*.pages.dev](/pages/configuration/preview-deployments/) subdomain. You also have the option to disable access to the [`.dev` domain](/pages/configuration/custom-domains/#disable-access-to-pagesdev-subdomain).

For information on available Analytics and Metrics, review the [Cloudflare product compatibility](/data-localization/compatibility/) page.

It is recommended not to store any Personally Identifiable Information (PII) in the Pages project's static assets.

{{<Aside type="note">}}

Page [Functions](/pages/functions/) are implemented as Cloudflare Workers. Refer to the Workers section for more information.

{{</Aside>}}

Refer to the [Pages documentation](/pages) for more information.
