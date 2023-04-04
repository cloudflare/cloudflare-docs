---
pcx_content_type: how-to
title: Set up
weight: 2
meta:
    title: Set up CNAME flattening
---

# Set up CNAME flattening

{{<Aside type="note">}}

If the `CNAME` target is on the same zone as the `CNAME` record, Cloudflare proceeds with `CNAME` flattening and ignores the **CNAME Flattening** setting.

{{</Aside>}}

## For your root domain

`CNAME` flattening occurs by default for all plans when your domain uses a `CNAME` record for its root domain (`example.com`).

## For all CNAME records

Accounts on paid plans can also choose to flatten all `CNAME` records on their domain. This option is useful for DNS-only (unproxied) `CNAME` records since proxied records are flattened by default (as they return Cloudflare edge IPv4 and IPv6 addresses).

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2.  Navigate to **DNS** > **Settings**.
3.  For **CNAME Flattening**, select **Flatten all CNAMEs**.
