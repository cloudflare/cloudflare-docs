---
pcx_content_type: configuration
title: Kinsta
meta:
    title: Kinsta | Provider guides
    description: Learn how to configure your Enterprise zone with Kinsta.
---

# Kinsta

{{<render file="_provider-guide-intro" withParameters="Kinsta">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="Kinsta">}}

## How it works

For additional detail about how traffic routes when O2O is enabled, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

Kinsta customers can enable O2O on any Cloudflare zone plan.

To enable O2O for a specific hostname within a Cloudflare zone, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a Proxied `CNAME` DNS record with your Kinsta site name as the target. Kinsta’s domain addition setup will walk you through other validation steps.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `sitename.hosting.kinsta.cloud` | Proxied |

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="Kinsta">}}

### Resolving SSL errors using Cloudflare Managed Certificates

If you encounter SSL errors when attempting to activate a Cloudflare Managed Certificate, verify if you have a `CAA` record on your domain name with command `dig +short example.com CAA`.

If you do have a `CAA` record, verify that it permits SSL certificates to be issued by the [certificate authorities supported by Cloudflare](/ssl/reference/certificate-authorities/).
