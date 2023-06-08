---
pcx_content_type: configuration
title: BigCommerce
meta:
    title: BigCommerce | Provider guides
    description: Learn how to configure your Enterprise zone with BigCommerce.
---

# BigCommerce

{{<render file="_provider-guide-intro" withParameters="BigCommerce">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="BigCommerce">}}

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

You can only enable O2O on the Cloudflare Enterprise plan.

To enable O2O on your account, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` DNS record.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `shops.mybigcommerce.com` | Proxied |

{{<Aside type="note">}}

For more details about a BigCommerce setup, refer to their [support guide](https://support.bigcommerce.com/s/article/Cloudflare-for-Performance-and-Security?language=en_US#orange-to-orange).

{{</Aside>}}

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="BigCommerce">}}