---
pcx_content_type: troubleshooting
title: Error messages
weight: 14
meta:
    title: Total TLS error messages
---

# Error messages

To help avoid [`ERR_SSL_VERSION_OR_CIPHER_MISMATCH`](/ssl/troubleshooting/version-cipher-mismatch/) errors, Cloudflare automatically shows an error message - `This hostname is not covered by a certificate` - on proxied DNS records not covered by a TLS certificate.

## Pending domains

If you recently [added your domain](/fundamentals/setup/manage-domains/add-site/) to Cloudflare - meaning that your zone is in a [pending state](/dns/zone-setups/reference/domain-status/) - you can often ignore this warning.

Once most domains becomes **Active**, Cloudflare will automatically issue a Universal SSL certificate, which will provide SSL/TLS coverage and remove the warning message.

{{<Aside type="note">}}

Since there are a few nuances to certificate coverage and issuance timing, review [Enable Universal SSL certificates](/ssl/edge-certificates/universal-ssl/enable-universal-ssl/) to make sure your domain will receive SSL/TLS coverage automatically. 

{{</Aside>}}

## Active domains

If your zone is already active on Cloudflare, this warning identifies subdomains that are not covered by your current SSL/TLS certificate.

{{<render file="_ussl-limitations-table.md">}}

{{<render file="_ussl-limitations-solutions.md">}}