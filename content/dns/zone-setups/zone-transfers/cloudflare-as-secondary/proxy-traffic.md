---
pcx_content_type: how-to
title: Proxy traffic
weight: 2
meta:
   title: Proxy traffic with Secondary DNS override
---

# Proxy traffic with Secondary DNS override

When you set up [incoming zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) on a secondary zone, you cannot enable the proxy on any transferred DNS records by default.

With Secondary DNS override, you can use Cloudflare as your secondary DNS provider but still get the [performance and security benefits](/fundamentals/get-started/concepts/how-cloudflare-works/#benefits) of Cloudflare's proxy. Additionally it lets you override any `A` and `AAAA` records on your zone apex with a `CNAME` record.

{{<Aside type="note">}}

Only `A`, `AAAA`, and `CNAME` records can be proxied.

{{</Aside>}}

## Prerequisites

Before you set up Secondary DNS override, make sure that you have:

- [Set up a secondary DNS zone](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/) and make sure your DNS records are transferred correctly.
- Asked your account team to enable Secondary DNS override.
- Removed all nameservers from your registrar except for those provided by Cloudflare (highly recommended).

## Set up Secondary DNS override

After proxying (orange clouding) a Secondary DNS record, any additional records under that hostname transferred from the primary DNS provider are automatically proxied. This applies to all `A` and `AAAA` records under that domain.

### Using the dashboard

To set up Secondary DNS override for specific `A`, `AAAA`, or `CNAME` records, [change](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) the **Proxy status** for these records to be **Proxied**.

### Using the API

To set up Secondary DNS override for specific `A`, `AAAA`, or `CNAME` records, send a [POST](/api/operations/dns-records-for-a-zone-create-dns-record) request with the `proxied` status as `true`. Make sure the added record has the same name as the transferred record you intend to proxy. Cloudflare only looks at the name and the proxy status, so the record content does not matter.

## `CNAME` record on the zone apex

You can also add a `CNAME` record on the zone apex (supported through [CNAME Flattening](/dns/cname-flattening/)) and either proxy that record or keep it on DNS Only.

Once you create a `CNAME` record at the apex, existing `A` or `AAAA` records on the zone apex will be deactivated. You can view those deactivated records by clicking **View Inactive Records**. To re-activate the `A` or `AAAA` records at the root, remove the `CNAME` record.

## Verify that your records are proxied

Query DNS at your assigned Secondary DNS nameserver to confirm the DNS response Cloudflare returns. Records proxied by Cloudflare return [Cloudflare IPs](https://www.cloudflare.com/ips/).

{{<Aside type="warning">}}

If you are using Secondary DNS override and make other nameservers authoritative - meaning you add other nameservers besides Cloudflare's at your registrar - DNS responses will be inconsistent across DNS providers.

{{</Aside>}}