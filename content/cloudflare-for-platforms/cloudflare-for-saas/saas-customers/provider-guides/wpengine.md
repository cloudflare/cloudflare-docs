---
pcx_content_type: configuration
title: WP Engine
meta:
    title: WP Engine | Provider guides
    description: Learn how to configure your Enterprise zone with WP Engine.
---

# WP Engine

{{<render file="_provider-guide-intro" withParameters="WP Engine">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="WP Engine">}}

## How it works

For more details about how O2O is different than other Cloudflare setups, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

You can only enable O2O on the Cloudflare Enterprise plan.

To enable O2O on your account, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a `CNAME` DNS record.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `xx.wpewaf.com` (Global Edge Security)<br/>OR<br/>`xx.wpenginepowered.com` (Advanced Network) | Proxied |

{{<Aside type="note">}}

For questions about WP Engine setup, refer to their [support guide](https://wpengine.com/support/wordpress-best-practice-configuring-dns-for-wp-engine/#Point_DNS_Using_CNAME_Flattening).

{{</Aside>}}

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="WP Engine">}}

### Resolving SSL errors

If you encounter SSL errors, check if you have a `CAA` record.

If you do have a `CAA` record, check that it permits SSL certificates to be issued by `digicert.com` and `letsencrypt.org`.

For more details, refer to [CAA records](/ssl/edge-certificates/troubleshooting/caa-records/#what-caa-records-are-added-by-cloudflare).