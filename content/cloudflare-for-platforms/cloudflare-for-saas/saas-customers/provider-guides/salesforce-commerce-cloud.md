---
pcx_content_type: configuration
title: Salesforce Commerce Cloud
meta:
    title: Salesforce Commerce Cloud | Provider guides
    description: Learn how to configure your Enterprise zone with Salesforce Commerce Cloud.
---

# Salesforce Commerce Cloud (SFCC)

{{<render file="_provider-guide-intro" withParameters="Salesforce Commerce Cloud">}}

## Benefits

{{<render file="_provider-guide-benefits" withParameters="Salesforce Commerce Cloud">}}

## How it works

For additional detail about how traffic routes when O2O is enabled, refer to [How O2O works](/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/).

## Enable

You can only enable O2O on the Cloudflare Enterprise plan.

To enable O2O for a specific hostname within a Cloudflare Zone, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a Proxied `CNAME` DNS record with a target of the `CNAME` provided by SFCC Business Manager, which is the dashboard used by SFCC customers to configure their storefront environment.

The `CNAME` provided by SFCC Business Manager will resemble `commcloud.prod-abcd-example-com.cc-ecdn.net` and contains 3 distinct parts. For each hostname routing traffic through SFCC, be sure to update each part of the example `CNAME` to match your configuration:

1. **Environment**: `prod` should be changed to `prod` or `dev` or `stg`.
2. **Realm**: `abcd` should be changed to the Realm ID assigned to you by SFCC.
3. **Domain Name**: `example-com` should be changed to match your domain name in a hyphenated format.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `<YOUR_HOSTNAME>` | `commcloud.prod-abcd-example-com.cc-ecdn.net` | Proxied |

## Product compatibility

{{<render file="_provider-guide-compatibility">}}

## Additional support

{{<render file="_provider-guide-help" withParameters="Salesforce Commerce Cloud">}}

### Resolving SSL errors using Cloudflare Managed Certificates

If you encounter SSL errors when attempting to activate a Cloudflare Managed Certificate, verify if you have a `CAA` record on your domain name with command `dig +short example.com CAA`.

If you do have a `CAA` record, verify that it permits SSL certificates to be issued by the [certificate authorities supported by Cloudflare](/ssl/reference/certificate-authorities/).
