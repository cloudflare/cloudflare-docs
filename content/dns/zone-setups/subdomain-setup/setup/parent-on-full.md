---
pcx_content_type: how-to
title: Parent domain on full setup
weight: 2
meta:
    title: Set up a child domain in Cloudflare with parent on full setup
---

# Parent domain on full setup

When the parent domain is using a [full setup](/dns/zone-setups/full-setup/)[^1], the steps to set up your child domain depend on whether the subdomain already exists in the parent domain.

{{<Aside type="note">}}

The following steps are similar if your Cloudflare parent zone is in a secondary setup, with the only difference that you will use your external primary DNS provider to make any necessary adjustments to DNS records.

{{</Aside>}}

## Subdomain does not exist in the parent domain

If you have not yet created DNS records covering your child domain in the parent zone:

1. Add the child domain to a Cloudflare account. It can be the same account where the parent domain exists or a different one.
2. Complete the configuration accordingly for [full](/dns/zone-setups/full-setup/setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) setup.
3. Get the nameserver names for the child domain. These can be found in [DNS > Records](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) and will not be the same nameservers as the parent domain.
4. Within the **DNS** > **Records** of the parent zone, [add](/dns/manage-dns-records/how-to/create-dns-records/) two `NS` records for the subdomain you want to delegate.

    For example, if you delegated `www.example.com`, you might add the following records to `example.com`:

    | **Type** | **Name** | **Content** |
    | --- | --- | --- |
    | `NS` | www | john.ns.cloudflare.com |
    | `NS` | www | melinda.ns.cloudflare.com |

5. After a few minutes, the child domain will be active.
6. Create the various DNS records needed for your child domain.
7. (Optional) [Enable DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/) on the child domain.

## Subdomain already exists in the parent domain

If you have already created DNS records covering your child domain in the parent zone:

1. Add the child domain to a Cloudflare account. It can be the same account where the parent domain exists or a different one.
2. Complete the configuration accordingly for [full](/dns/zone-setups/full-setup/setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) setup.
3. In your child domain, make sure you have all DNS records that relate to the subdomain. This includes all DNS records deeper than the delegated subdomain. For example, if you are delegating `www.example.com`, you should also move over records for `api.www.example.com`.

    {{<Aside type="note">}}If your child domain is on a full setup, consider [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent domain, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
    {{</Aside>}}

4. If the parent zone is in Cloudflare, make sure that you migrate over any settings ([WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child domain.
5. In the child domain zone, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains (if present).
6. Get the nameserver names for the child domain. These can be found in [DNS > Records](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) and will not be the same nameservers as the parent domain.
7. Within the **DNS** > **Records** of the parent zone, [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) all non-address records (meaning everything except for `A`, `AAAA`, and `CNAME` records) referencing the child domain or any of its deeper subdomains.
8. Within the **DNS** > **Records** of the parent zone, leave one address record referencing the child domain and [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) the rest.
9. Change the type of the last address record to `NS` and its content to one of the child domain's nameserver names. If the parent domain is in Cloudflare, use [a `PATCH` request](/api/operations/dns-records-for-a-zone-patch-dns-record) to achieve this.
10. Within the **DNS** > **Records** of the parent zone, [create](/dns/manage-dns-records/how-to/create-dns-records/) the second `NS` record in the parent zone for the subdomain you want to delegate.

    For example, if you delegated `www.example.com`, you might add the following records to `example.com`:

    | **Type** | **Name** | **Content** |
    | --- | --- | --- |
    | `NS` | www | john.ns.cloudflare.com |

11. Flush the address records of your child domain in public resolvers ([1.1.1.1](https://1.1.1.1/purge-cache/) and [8.8.8.8](https://developers.google.com/speed/public-dns/cache)).
12. Within a short period of time, the child domain should be active.
13. (Optional) [Enable DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/) on the child domain.


[^1]: Meaning that Cloudflare is your Authoritative DNS provider.
