---
pcx_content_type: configuration
title: Shopify
meta:
    title: Shopify | Provider guides
    description: Learn how to configure your Enterprise zone with Shopify.
---

# Shopify

{{<render file="_provider-guide-intro" withParameters="Shopify">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="WP Shopify">}}
<br/>

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

You can only enable O2O on the Cloudflare Enterprise plan.

To enable O2O on your account, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` DNS record.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_SHOP_DOMAIN>` | `shops.myshopify.com`

{{<Aside type="note">}}

For questions about Shopify setup, refer to their [support guide](https://help.shopify.com/en/manual/domains/add-a-domain/connecting-domains/connect-domain-manual).

{{</Aside>}}

## Product compatibility

For a full list of compatible products and potential limitations, refer to [Product compatibility](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/product-compatibility/).

## Additional support

{{<render file="_provider-guide-help" withParameters="Shopify">}}

### DNS CAA records

Shopify issues SSL/TLS certificates for merchant domains using Let’s Encrypt. If you add any DNS CAA records, you must select Let’s Encrypt as the Certificate Authority (CA) or HTTPS connections may fail.

For more details, refer to [CAA records](/ssl/edge-certificates/caa-records/#caa-records-added-by-cloudflare).