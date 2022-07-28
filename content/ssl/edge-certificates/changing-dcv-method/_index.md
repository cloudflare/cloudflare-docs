---
title: Domain Control Validation (DCV)
pcx-content-type: concept
layout: single
weight: 5
meta:
  title: Domain Control Validation (DCV) — SSL/TLS
---

# Domain Control Validation (DCV) — SSL/TLS

{{<render file="_dcv-definition.md">}}

## Who needs to perform DCV

If your application is on a [partial/CNAME DNS setup](/dns/zone-setups/partial-setup/) — meaning that someone else runs your authoritative nameservers — you may need to perform DCV.

Performing DCV gives you more control over the valdiation method, as well as ensuring that your application does not experience any downtime.

## DCV exceptions

If your domain is on a [**full setup**](/dns/zone-setups/full-setup/), Cloudflare handles DCV automatically on your behalf using a TXT record. For more details, refer to [Enabling Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#minimize-downtime).

If your domain is using a [**custom certificate**](/ssl/edge-certificates/custom-certificates/), you need to handle DCV on your own when you obtain certificates from a CA.

## Perform DCV

For more details about performing DCV and each DCV method, refer to [DCV methods](/ssl/edge-certificates/changing-dcv-method/methods/).