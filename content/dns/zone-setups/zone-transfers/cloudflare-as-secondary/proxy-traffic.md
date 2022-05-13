---
pcx-content-type: how-to
title: Proxy traffic
weight: 2
meta:
   title: Proxy traffic with Secondary DNS override
---

# Proxy traffic with Secondary DNS override

When you set up an [incoming zone transfer](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/), these transfers normally only provide DNS resolution.

With Secondary DNS override, you can use Cloudflare as your secondary DNS provider but still get the [performance and security benefits](/fundamentals/get-started/concepts/how-cloudflare-works/#benefits) of Cloudflare's proxy.

## Prerequisites

Before you set up Secondary DNS override, make sure that you have:

- [Set up a secondary DNS zone](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) and make sure your DNS records are transferred correctly.
- Asked your account team to enable Secondary DNS override.
- Removed all nameservers from your registrar except for those provided by Cloudflare (highly recommended).

## Set up Secondary DNS override

### For specific resolution records

To set up Secondary DNS override for specific `A`, `AAAA`, or `CNAME` records, [change](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) the **Proxy status** for these records to be **Proxied**.

### For all resolution records

To make all the `A`, `AAAA`, or `CNAME` records proxied for your zone, [create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a proxied `CNAME` record at the zone apex. The **Target** value does not matter, since Cloudflare's DNS only looks at the **Name** and the **Proxy status** values.

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `@` | `example.com` | **Proxied** |

Once you create a `CNAME` record at the apex, existing `A` or `AAAA` records at the root are deactivated. You can view those deactivated records by selecting **View Inactive Records**. To re-activate the `A` or `AAAA` records at the root, remove the `CNAME` record.

## Verify that your records are proxied

Query DNS at your assigned Secondary DNS nameserver to confirm the DNS response Cloudflare returns. Records proxied by Cloudflare return [Cloudflare IPs](https://www.cloudflare.com/ips/).

{{<Aside type="warning">}}

Without a hidden primary, a DNS query does not return Cloudflare IPs for proxied hostnames when the query is served by the authoritative DNS provider's nameservers.

{{</Aside>}}