---
pcx_content_type: reference
title: Full
weight: 3
meta:
    title: Full - SSL/TLS encryption modes
---

# Full - SSL/TLS encryption modes

When you set your encryption mode to **Full**, Cloudflare allows HTTPS connections between your visitor and Cloudflare and makes connections to the origin using the scheme requested by the visitor. If your visitor uses `http`, then Cloudflare connects to the origin using plaintext HTTP and vice versa.

<div class="mermaid">
flowchart LR
        accTitle: Full SSL/TLS Encryption
        accDescr: With an encryption mode of Full, your application encrypts traffic going to and coming from Cloudflare but does not validate your origin certificate.
        A[Browser] <--Encrypted--> B((Cloudflare))<--Encrypted--> C[(Origin server)]
</div>

## Use when

Choose **Full** mode when your origin can support an SSL certification, but — for various reasons — it cannot support a valid, publicly trusted certificate.

## Required setup

Before enabling **Full** mode, make sure your origin allows HTTPS connections on port 443 and presents a certificate (self-signed, [Cloudflare Origin CA](/ssl/origin-configuration/origin-ca/), or purchased from a Certificate Authority). Otherwise, your visitors may experience a [525 error](https://support.cloudflare.com/hc/articles/115003011431#525error).

{{<render file="_ssl-mode-errors.md">}}

## Limitations

The certificate presented by the origin will **not be validated in any way**. It can be expired, self-signed, or not even have a matching CN/SAN entry for the hostname requested.

Without using [**Full (strict)**](/ssl/origin-configuration/ssl-modes/full-strict/), a malicious party could technically hijack the connection and present their own certificate.