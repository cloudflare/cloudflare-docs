---
pcx_content_type: concept
title: Partial (CNAME) setup
weight: 2
---

# Partial (CNAME) setup

{{<render file="_partial-setup-definition.md">}}

## How to

*   [Set up a partial domain](/dns/zone-setups/partial-setup/setup/)
*   [Convert a partial domain to a full domain](/dns/zone-setups/partial-setup/convert-partial-to-full/)

## Availability

{{<feature-table id="dns.partial_setup">}}

## Reference

### DNS resolution

With a partial zone, Cloudflare resolves [DNS records differently](/dns/zone-setups/partial-setup/dns-resolution/) than for full zones.

### CNAME flattening

A partial (`CNAME`) setup requires the proxied hostname to be pointed to Cloudflare via a `CNAME` record. Since [`CNAME` records are not allowed on the zone apex](https://datatracker.ietf.org/doc/html/rfc1912#section-2.4) (`example.com`), you can only proxy your zone apex to Cloudflare if your authoritative DNS provider supports [`CNAME` Flattening](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/).

If your authoritative DNS provider does not support CNAME Flattening, redirect its traffic — for example, with an `.htaccess` file — to a subdomain proxied to Cloudflare. Alternatively, you can use [static IPs or BYOIPs](/fundamentals/get-started/concepts/cloudflare-ip-addresses/#customize-cloudflare-ip-addresses).

### DDoS protection

[DDoS protection](/ddos-protection/) for attacks against DNS infrastructure is only available for domains on [full setup](/dns/zone-setups/full-setup/). Domains on the partial setup are not using Cloudflare authoritative nameservers.