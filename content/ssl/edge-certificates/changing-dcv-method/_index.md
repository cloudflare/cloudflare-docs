---
title: Domain Control Validation (DCV)
pcx_content_type: concept
layout: single
weight: 5
meta:
  title: Domain Control Validation (DCV) — SSL/TLS
  description: Learn when and how to perform Domain Control Validation when using Cloudflare SSL/TLS.
---

# Domain Control Validation (DCV) — SSL/TLS

{{<render file="_dcv-definition.md">}}
<br/>

## DCV situations

### No DCV required (Full DNS setup)

If your domain is on a [**full setup**](/dns/zone-setups/full-setup/) — meaning that Cloudflare runs your authoritative nameservers — Cloudflare handles DCV automatically on your behalf using a TXT record. For more details, refer to [Enabling Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#minimize-downtime).

---

### DCV sometimes required (Partial DNS setup)

If your application is on a [partial DNS setup](/dns/zone-setups/partial-setup/) — meaning that someone else runs your authoritative nameservers — you may need to perform additional steps to complete DCV.

#### Non-wildcard certificates

{{<render file="_partial-zone-acm-dcv-nonwildcard.md">}}

#### Wildcard certificates

{{<render file="_partial-zone-acm-dcv-wildcard.md">}}

---

### DCV outside of Cloudflare (Custom certificates)

If your domain is using a [**custom certificate**](/ssl/edge-certificates/custom-certificates/), you need to handle DCV on your own when you obtain certificates from a CA.