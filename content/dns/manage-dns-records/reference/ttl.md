---
pcx_content_type: reference
title: Time to Live (TTL)
weight: 3
---

# Time to Live (TTL)

**Time to Live (TTL)** is a field on [DNS records](/dns/manage-dns-records/how-to/create-dns-records/) that controls how long each record is valid and — as a result — how long it takes for record updates to reach your end users.

Longer TTLs speed up [DNS lookups](https://www.cloudflare.com/learning/dns/what-is-dns/) by increasing the chance of cached results, but a longer TTL also means that updates to your records take longer to go into effect.

## Proxied records

By default, all [proxied records](/dns/manage-dns-records/reference/proxied-dns-records/) have a TTL of **Auto**, which is set to 300 seconds.

Since only [IP resolution records](/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution) can be proxied, this setting ensures that queries to your domain name resolve fairly quickly. This setting also means that any changes to proxied `A`, `AAAA`, or `CNAME` records will take place within five minutes or less.

{{<Aside type="note">}}

It may take longer than 5 minutes for you to actually experience record changes, as your local DNS cache may take longer to update.

{{</Aside>}}

## Unproxied records

For **DNS only** records, you can choose a TTL between **30 seconds** (Enterprise) or **60 seconds** (non-Enterprise) and **1 day**.
