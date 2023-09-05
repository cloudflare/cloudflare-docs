---
title: Enable DNSSEC
pcx_content_type: tutorial
meta:
  title: Domain Name System Security Extensions (DNSSEC)
---

# Domain Name System Security Extensions (DNSSEC)

The domain name system (DNS) translates domain names into numeric Internet addresses. However, DNS is a fundamentally insecure protocol. It does not guarantee where DNS records come from and accepts any requests given to it.

[DNSSEC](/dns/dnssec/) creates a secure layer to the domain name system by adding cryptographic signatures to DNS records. By doing so, your request can check the signature to verify that the record you need comes from the authoritative nameserver and was not altered along the way.

## Enable or disable DNSSEC

{{<render file="_enable-dnssec.md">}}

{{<Aside type="note">}}

If your domain is not on Cloudflare Registrar, you can enable DNSSEC in [**DNS**](/dns/dnssec/) on the Cloudflare dashboard.

{{</Aside>}}

## Confirming DNSSEC

{{<render file="_verify-dnssec.md">}}