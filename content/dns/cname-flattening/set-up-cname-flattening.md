---
pcx_content_type: how-to
title: Setup
weight: 2
meta:
    title: Set up CNAME flattening
---

# Set up CNAME flattening

{{<Aside type="note">}}

If the `CNAME` target is on the same zone as the `CNAME` record, Cloudflare proceeds with `CNAME` flattening and ignores the **CNAME Flattening** setting.

{{</Aside>}}

## For your zone apex

`CNAME` flattening occurs by default for all plans when your domain uses a `CNAME` record for its zone apex (`example.com`, meaning the record **Name** is set to `@`).

## For all CNAME records

Accounts on paid plans can also choose to flatten all `CNAME` records on their domain. This option is useful for DNS-only (unproxied) `CNAME` records since proxied records are flattened by default (as they return Cloudflare edge IPv4 and IPv6 addresses).

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2.  Navigate to **DNS** > **Settings**.
3.  For **CNAME Flattening**, select **Flatten all CNAMEs**.

{{<Aside type="warning">}}
{{<render file="_cname-flattening-callout.md">}}
{{</Aside>}}