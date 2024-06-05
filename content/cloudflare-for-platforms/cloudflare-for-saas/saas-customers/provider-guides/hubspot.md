---
pcx_content_type: configuration
title: HubSpot
meta:
    title: HubSpot | Provider guides
    description: Learn how to configure your zone with HubSpot.
---

# HubSpot

{{<render file="_provider-guide-intro" withParameters="HubSpot">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="HubSpot">}}

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

O2O is enabled per hostname, so to enable O2O for a specific hostname within your Cloudflare zone, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a Proxied `CNAME` DNS record with a target of your corresponding HubSpot CNAME. Which HubSpot CNAME is targeted will depend on your current [HubSpot proxy settings](https://developers.hubspot.com/docs/cms/developer-reference/reverse-proxy-support#configure-the-proxy).

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `<HUBID>.sites-proxy.hscoscdn<##>.net` | Proxied |

{{<Aside type="note">}}

For questions about your HubSpot setup, refer to [HubSpot's reverse proxy support guide](https://developers.hubspot.com/docs/cms/developer-reference/reverse-proxy-support).

{{</Aside>}}

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="HubSpot">}}
