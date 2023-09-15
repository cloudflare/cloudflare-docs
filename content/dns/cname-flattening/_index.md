---
pcx_content_type: concept
title: CNAME flattening
weight: 6
---

# CNAME flattening

`CNAME` flattening speeds up `CNAME` resolution and allows you to use a `CNAME` record at your root/apex domain (`example.com`).

{{<Aside type="note">}}

This functionality is also what allows you to use a [root custom domain](/pages/platform/custom-domains/) with a Cloudflare Pages site.

{{</Aside>}}

## How it works

With `CNAME` flattening, Cloudflare finds the IP address that a `CNAME` points to. This process could involve a single lookup or multiple (if your `CNAME` points to another `CNAME`). Cloudflare then returns the final IP address instead of a `CNAME` record, helping DNS queries resolve up to 30% faster.

For more details on the mechanics of `CNAME` flattening, review the [CNAME flattening diagram](/dns/cname-flattening/cname-flattening-diagram/) and refer to the [Cloudflare blog post](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/).

## Aspects to keep in mind

* `CNAME` flattening happens by default in some cases, as explained in its [Setup page](/dns/cname-flattening/set-up-cname-flattening/)
* {{<render file="_cname-flattening-callout.md">}}
