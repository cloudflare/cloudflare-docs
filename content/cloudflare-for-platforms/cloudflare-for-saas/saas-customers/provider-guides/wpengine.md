---
pcx_content_type: configuration
title: WP Engine
meta:
    title: WP Engine | Provider guides
    description: Learn how to configure your zone with WP Engine.
---

# WP Engine

{{<render file="_provider-guide-intro" withParameters="WP Engine">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="WP Engine">}}

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

WP Engine customers can enable O2O on any Cloudflare zone plan.

To enable O2O for a specific hostname within a Cloudflare zone, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a Proxied `CNAME` DNS record with a target of one of the following WP Engine CNAMEs. Which WP Engine CNAME is used will depend on your current [WP Engine network type](https://wpengine.com/support/network/).

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `wp.wpewaf.com` (Global Edge Security)<br/>or<br/>`wp.wpenginepowered.com` (Advanced Network) | Proxied |

{{<Aside type="note">}}

For questions about WP Engine setup, refer to their [support guide](https://wpengine.com/support/wordpress-best-practice-configuring-dns-for-wp-engine/#Point_DNS_Using_CNAME_Flattening).

If you cannot activate your domain using [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/), reach out to your account team.

{{</Aside>}}

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="WP Engine">}}

### Resolving SSL errors

If you encounter SSL errors, check if you have a `CAA` record.

If you do have a `CAA` record, check that it permits SSL certificates to be issued by `digicert.com` and `letsencrypt.org`.

For more details, refer to [CAA records](/ssl/edge-certificates/troubleshooting/caa-records/#what-caa-records-are-added-by-cloudflare).
