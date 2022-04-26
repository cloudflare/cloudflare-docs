---
pcx-content-type: concept
title: CNAME flattening
weight: 4
---

# CNAME flattening

`CNAME` flattening speeds up `CNAME` resolution and allows you to use a `CNAME` record at your root/apex domain (`example.com`).

## How it works

With `CNAME` flattening, Cloudflare finds the IP address that a `CNAME` points to. This process could involve a single lookup or multiple (if your `CNAME` points to another `CNAME`). Cloudflare then returns the final IP address instead of a CNAME record, helping DNS queries resolve up to 30% faster.

For more details on the mechanics of CNAME flattening, refer to the [blog post](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/).

## Set up CNAME flattening

### For your root domain

`CNAME` flattening occurs by default for all plans when your domain uses a `CNAME` record for its root domain (`example.com`).

### For all CNAME records

Accounts on paid plans can also choose to flatten all `CNAME` records on their domain. This option is useful for DNS-only (unproxied) `CNAME` records since proxied records are flattened by default (as they return Cloudflare edge IPv4 and IPv6 addresses).

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2.  Navigate to **DNS**.
3.  For **CNAME Flattening**, select **Flatten all CNAMEs**.
