---
pcx_content_type: how-to
title: Parent zone on full setup
weight: 2
meta:
    title: Set up a child zone in Cloudflare with parent on full setup
---

# Parent zone on full setup

When the parent zone is using a [full setup](/dns/zone-setups/full-setup/)[^1], the steps to set up your child zone depend on whether the subdomain already exists in the parent domain.

{{<Aside type="note">}}

The following steps are similar if your Cloudflare parent zone is in a secondary setup, with the only difference that you will use your external primary DNS provider to make any necessary adjustments to DNS records.

{{</Aside>}}

## Subdomain does not exist

If you have not yet created DNS records covering your subdomain in the parent zone:

1. Add the subdomain to a Cloudflare account as a new zone. It can be the same account where the parent zone exists or a different one.
2. Complete the configuration accordingly for [full](/dns/zone-setups/full-setup/setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) setup.
3. Get the nameserver names for the subdomain. These can be found within your newly created child zone in [DNS > Records](https://dash.cloudflare.com/?to=/:account/:zone/dns/records), and will **not** be the same nameservers as the ones used in the parent zone.
4. Within the **DNS** > **Records** of the parent zone, [add](/dns/manage-dns-records/how-to/create-dns-records/) two `NS` records for the subdomain you want to delegate.

    For example, if you delegated `www.example.com`, you might add the following records to `example.com`:

    | **Type** | **Name** | **Content** |
    | --- | --- | --- |
    | `NS` | www | john.ns.cloudflare.com |
    | `NS` | www | melinda.ns.cloudflare.com |

5. After a few minutes, the child zone will be active.
6. Create the various DNS records needed for your child zone.
7. (Optional) [Enable DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/) on the child zone.

## Subdomain already exists

If you have already created DNS records covering your subdomain in the parent zone:

1. Add the subdomain to a Cloudflare account as a new zone. It can be the same account where the parent zone exists or a different one.
2. Complete the configuration accordingly for [full](/dns/zone-setups/full-setup/setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) setup.
3. In your child zone, make sure you have all DNS records that relate to the subdomain. This includes all DNS records deeper than the delegated subdomain. For example, if you are delegating `www.example.com`, you should also move over records for `api.www.example.com`.

    {{<Aside type="note">}}If your child zone is on a full setup, consider [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent zone, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
    {{</Aside>}}

4. If the parent zone is in Cloudflare, make sure that you migrate over any settings ([WAF custom rules](/waf/custom-rules/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child zone.
5. In the child zone, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains (if present).
6. Get the nameserver names for the subdomain. These can be found within your newly created child zone in [DNS > Records](https://dash.cloudflare.com/?to=/:account/:zone/dns/records), and will **not** be the same nameservers as the ones used in the parent zone.
7. Within the **DNS** > **Records** of the parent zone, update existing address records (`A/AAAA`) on your subdomain to `NS` records. If you only have one address record, update the existing one and add a new `NS` record. If you have multiple address records, update any two of them.

    For example, to delegate the subdomain `www.example.com`, the updated records in the parent zone `example.com` should contain `NS` records similar to the following:

    | **Type** | **Name** | **Content** |
    | --- | --- | --- |
    | `NS` | www | john.ns.cloudflare.com |
    | `NS` | www | adam.ns.cloudflare.com |

    In this example, `john.ns.cloudflare.com` and `adam.ns.cloudflare.com` represent the subdomain nameservers that you got from step 6.

8. Flush the address records of your subdomain in public resolvers ([1.1.1.1](https://1.1.1.1/purge-cache/) and [8.8.8.8](https://developers.google.com/speed/public-dns/cache)).
9. In the **DNS** > **Records** of the parent zone, [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) all the remaining records on the delegated subdomain, except the `NS` records that you created in step 7.

    Also delete all DNS records deeper than the delegated subdomain. For example, if you are delegating `www.example.com`, records for `api.www.example.com` should only exist in the new child zone.

10. Within a short period of time, the child zone should be active.
11. (Optional) [Enable DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/) on the child zone.


[^1]: Meaning that Cloudflare is your Authoritative DNS provider.
