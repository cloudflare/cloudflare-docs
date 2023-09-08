---
title: Domain control validation (DCV)
pcx_content_type: concept
layout: single
weight: 5
meta:
  title: Domain control validation (DCV)
  description: Learn when and how to perform Domain Control Validation when using Cloudflare SSL/TLS.
---

# Domain control validation (DCV)

{{<render file="_dcv-definition.md">}}
<br/>

{{<Aside type="note">}}

Refer to [Domain control validation flow](/ssl/edge-certificates/changing-dcv-method/dcv-flow/) to learn more about the steps and parties involved in the DCV process.

{{</Aside>}}

For [custom certificates](/ssl/edge-certificates/custom-certificates/), DCV will always be handled by you, when you request the certificate from the CA.

For certificates issued through Cloudflare, this process may be done automatically or it may require you to take action, as described in the following sections.

---

## Full DNS setup - no action required

If your domain is on a [**full setup**](/dns/zone-setups/full-setup/) — meaning that Cloudflare runs your authoritative nameservers — Cloudflare handles DCV automatically on your behalf using a TXT record. For more details, refer to [Enable Universal SSL](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#full-dns-setup).

---

## Partial DNS setup - action sometimes required

If your application is on a [partial DNS setup](/dns/zone-setups/partial-setup/) — meaning that Cloudflare does not run your authoritative nameservers — you may need to perform additional steps to complete DCV.

### Non-wildcard certificates

{{<render file="_partial-zone-acm-dcv-nonwildcard.md">}}

### Wildcard certificates

{{<render file="_partial-zone-acm-dcv-wildcard.md">}}