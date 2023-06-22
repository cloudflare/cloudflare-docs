---
pcx_content_type: concept
title: DNSSEC options
layout: single
meta:
    title: DNSSEC for Secondary DNS
---

# Use DNSSEC with incoming zone transfers

If you want [DNSSEC](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) available for your secondary zone, you will need one of the following setups (reach out to your account team for more details):

- **Hidden primary**: Since Cloudflare secondary nameservers are the only nameservers authoritatively responding to DNS queries, Cloudflare can sign records on the fly.
- **Pre-signed zones**: If your primary DNS provider signs records and transfers out the signatures, Cloudflare serves records and DNSSEC signatures as is without doing any signing. Cloudflare only supports NSEC records (and not NSEC3 records) and this setup does not support [Secondary Overrides](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/).
- **Multi-signer DNSSEC**: Both Cloudflare and your primary DNS provider know the signing keys of the other provider and perform their own online signing in accordance with [RFC 8901](https://www.rfc-editor.org/rfc/rfc8901.html).