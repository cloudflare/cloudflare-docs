---
pcx-content-type: concept
title: Wildcard DNS records
weight: 4
---

# Wildcard DNS records

Normal DNS records map a domain name to one or multiple IP addresses or another resources associated with that domain name (a one-to-many mapping).

Wildcard DNS records allow you to have a many-to-one mapping, for example if you had hundreds or thousands of subdomains you wanted to point to the same resource. Wildcard records are used as the response for all subdomains that are not specifically covered by another DNS record.

Within Cloudflare, wildcard DNS records can be either [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) or DNS-only.

## Create a Wildcard record

To create a wildcard DNS record, [create a DNS record](/dns/manage-dns-records/how-to/create-dns-records/) with an `*` in the **Name** field.

{{<example>}}

| Type | Name  | IPv4 address | Proxy status |
| ---- | ----- | ------------ | ------------ |
| `A`    | `*` | `192.0.2.1`  | Proxied      |

{{</example>}}

## Limitations

Customers on all plans can create and proxy wildcard DNS records.

When using wildcard records, there are several limitations detailed in [RFC4592](https://datatracker.ietf.org/doc/rfc4592/):

- Wildcard records do not cover the zone apex (could answer for `www.example.com`, but not `example.com`).
- Wildcard records are only supported on the first level (`*.example.com` would work as a wildcard, but `subdomain.*.example.com` would interpret the `*` as a literal character).
- Wildcard records do apply to multiple levels, but they cannot be defined on multiple levels (`*.*.example.com` would have the second `*` interpreted as a literal character).
- Wildcard records only cover their specified record type (a wildcard `A` record would not cover queries for `AAAA` records).

For more details on wildcard records, refer to the [introductory blog post](https://blog.cloudflare.com/wildcard-proxy-for-everyone/).