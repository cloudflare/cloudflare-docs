---
pcx_content_type: how-to
title: Setup
weight: 2
meta: 
    title: Set up a child domain - Subdomain setup
---

# Set up a child domain 

When using a [subdomain setup](/dns/zone-setups/subdomain-setup/), the steps to create a child domain depend on the parent domain's setup and whether the child domain already exists.

```mermaid
    flowchart TD
      accTitle: DNS resolution flow with CNAME target in same partial zone
      A[<code>example.com</code>] --> B[<code>docs.example.com</code>]
      A[<code>example.com</code>] --> C[<code>blog.example.com</code>]
      subgraph Parent domain
        A
      end
      subgraph Child domain
        B
        C
      end
```

---

## Available setups

| Parent zone | Child zone | Available |
| --- | --- | --- |
| [Full](/dns/zone-setups/full-setup/) or [Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Full](/dns/zone-setups/full-setup/) | Yes |
| [Full](/dns/zone-setups/full-setup/) or [Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | Yes |
| [Full](/dns/zone-setups/full-setup/) or [Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Partial](/dns/zone-setups/partial-setup/) | No |
| [Partial](/dns/zone-setups/partial-setup/) | [Full](/dns/zone-setups/full-setup/) | Yes |
| [Partial](/dns/zone-setups/partial-setup/) | [Secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | Yes |
| [Partial](/dns/zone-setups/partial-setup/) | [Partial](/dns/zone-setups/partial-setup/) | Yes |
---

## Parent domain on full setup

If the parent domain is using a [full setup](/dns/zone-setups/full-setup/)[^1], your child domain setup depends on whether the child domain already exists.

### Subdomain does not exist in the parent domain

If you have not yet created a DNS record covering your child domain in the parent domain:

1. [Add the child domain](/fundamentals/get-started/setup/add-site/) to the parent domain's Cloudflare account or another account.
2. [Get the nameserver names](/dns/zone-setups/full-setup/setup/#get-nameserver-names) for the child domain. These will not be the same nameservers as the parent domain.
3. Within the **DNS** > **Records** of the parent zone, [add](/dns/manage-dns-records/how-to/create-dns-records/) two `NS` records in the parent zone for the subdomain you want to delegate.

    For example, if you delegated `www.example.com`, you might add the following records to `example.com`:

    | **Type** | **Name** | **Content** | 
    | --- | --- | --- |
    | `NS` | www | john.ns.cloudflare.com |
    | `NS` | www | melinda.ns.cloudflare.com |

4. After a few minutes, the child domain will be active.
5. Create the various [DNS records](/dns/manage-dns-records/how-to/create-dns-records/) needed for your child domain.
6. (Optional) [Enable DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/) on the child domain.

### Subdomain already exists in the parent domain

If you have already created a DNS record covering your child domain in the parent domain:

1. [Add the child domain](/fundamentals/get-started/setup/add-site/) to the parent domain's Cloudflare account or another account.
2. In your child domain, [re-create all DNS records](/dns/manage-dns-records/how-to/create-dns-records/) that relate to your child domain. This includes all DNS records deeper than the delegated subdomain, meaning that if you are delegating `www.example.com`, you should also move over records for `api.www.example.com`.

    {{<Aside type="note">}}Cloudflare recommends [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent domain, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
    {{</Aside>}}

3. In the parent domain, make sure that you migrate over any settings ([Firewall rules](/firewall/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child domain.
4. In the child domain, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains (if present).
5. [Get the nameserver names](/dns/zone-setups/full-setup/setup/#get-nameserver-names) for the child domain. These will not be the same nameservers as the parent domain.
6. Within the **DNS** > **Records** of the parent zone, [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) all non-address records (meaning everything except for `A`, `AAAA`, and `CNAME` records).
7. Within the **DNS** > **Records** of the parent zone, leave one address record and [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) the rest.
8. Using the Cloudflare API, [send a `PATCH` request](/api/operations/dns-records-for-a-zone-patch-dns-record) to change the type of the last address record to `NS` and its content to one of the child domain's nameserver names.
7. Within the **DNS** > **Records** of the parent zone, [create](/dns/manage-dns-records/how-to/create-dns-records/) the second `NS` record in the parent zone for the subdomain you want to delegate.

    For example, if you delegated `www.example.com`, you might add the following records to `example.com`:

    | **Type** | **Name** | **Content** | 
    | --- | --- | --- |
    | `NS` | www | john.ns.cloudflare.com |

8. Flush the address records of your child domain in public resolvers ([1.1.1.1](https://1.1.1.1/purge-cache/) and [8.8.8.8](https://developers.google.com/speed/public-dns/cache)).
9. Within a short period of time, the child domain should be active.
10. (Optional) [Enable DNSSEC](/dns/zone-setups/subdomain-setup/dnssec/) on the child domain.

---

## Parent domain on partial setup

If the parent domain is using a [partial setup](/dns/zone-setups/partial-setup/)[^2], your child domain setup depends on whether the child domain already exists.

### Subdomain does not exist in the parent domain

If you have not yet created a DNS record covering your child domain in the parent domain:

1. [Add the child domain](/fundamentals/get-started/setup/add-site/) in the same or a new account.
2. Convert the child zone to [a partial setup](/dns/zone-setups/partial-setup/setup/#step-1--add-your-domain-to-cloudflare).
3. Create the various [DNS records](/dns/manage-dns-records/how-to/create-dns-records/) needed for your child domain.
4. [Add the TXT verification record](/dns/zone-setups/partial-setup/setup/#step-2--verify-ownership-for-your-domain) at your authoritative DNS provider.
5. Within a short period of time, the child domain should be active.
6. Add a [`CNAME` record](/dns/zone-setups/partial-setup/setup/#step-3--add-dns-records) at your authoritative DNS provider.

### Subdomain already exists in the parent domain

If you have already created a DNS record covering your child domain in the parent domain:

1. [Add the child domain](/fundamentals/get-started/setup/add-site/) in the same or a new account.
2. Convert the child zone to [a partial setup](/dns/zone-setups/partial-setup/setup/#step-1--add-your-domain-to-cloudflare).
3. In your child domain, [re-create all DNS records](/dns/manage-dns-records/how-to/create-dns-records/) that relate to your child domain. This includes all DNS records deeper than the delegated subdomain, meaning that if you are delegating `www.example.com`, you should also move over records for `api.www.example.com`.

    {{<Aside type="note">}}Cloudflare recommends [exporting](/dns/manage-dns-records/how-to/import-and-export/#export-records) records from the parent domain, deleting all unnecessary records, and then [importing](/dns/manage-dns-records/how-to/import-and-export/#import-records) the records into your new zone.
    {{</Aside>}}

4. In the parent domain, make sure that you migrate over any settings ([Firewall rules](/firewall/), [Rules](/rules/), [Workers](/workers/), and more) that might be needed for the child domain.
5. In the child domain, [order an advanced SSL certificate](/ssl/edge-certificates/advanced-certificate-manager/) that covers the child subdomain and any deeper subdomains.
6. [Add the TXT verification record](/dns/zone-setups/partial-setup/setup/#step-2--verify-ownership-for-your-domain) at your authoritative DNS provider.
7. Within a short period of time, the child domain should be active.
8. Within the **DNS** > **Records** of the parent zone, [delete](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) any `A`, `AAAA`, or `CNAME` records referencing the child domain or any of its deeper subdomains.

[^1]: Meaning that Cloudflare is your Authoritative DNS provider.
[^2]: Meaning that another DNS provider - not Cloudflare - maintains your Authoritative DNS.
