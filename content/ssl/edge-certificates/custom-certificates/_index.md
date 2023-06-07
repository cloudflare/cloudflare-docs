---
pcx_content_type: concept
title: Custom certificates
weight: 3
layout: single
---

# Custom certificates

{{<render file="_custom-certificates-definition.md">}}
<br/>

Unlike [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for custom certificates.
When you use custom certificates, the following actions should be considered and accomplished by you:
- [Upload the certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate).
- [Update the certificate](/ssl/edge-certificates/custom-certificates/uploading/#update-a-custom-certificate).
- [Observe the certificate expiration date to avoid downtime](/ssl/edge-certificates/custom-certificates/renewing/).

 {{<Aside type="note">}}
If your custom certificate does not cover all of your first-level hostnames, you can enable [Universal SSL certificate](/ssl/edge-certificates/universal-ssl/) to cover them.
{{</Aside>}}

## Certificate packs

{{<render file="_custom-cert-ciphers.md">}}

Each pack only counts as one SSL certificate against your custom certificate quota.

{{<Aside type="note">}}

You cannot delete the primary certificate if secondary certificates are present in the pack.

{{</Aside>}}

## Availability

{{<feature-table id="ssl.custom_certificates">}}

## Related features

### Certificate Signing Requests (CSRs)

As part of the custom certificate process, you can leverage Cloudflare to generate your [Certificate Signing Request (CSR)](/ssl/edge-certificates/additional-options/certificate-signing-requests/). This additional option means that Cloudflare will safely generate and store the private key associated with the CSR.

### Geo Key Manager (private key restriction)

By default, Cloudflare encrypts and securely distributes private keys to all Cloudflare data centers, where they can be used for local SSL/TLS termination. If you want to restrict where your private keys may be used, use [Geo Key Manager](/ssl/edge-certificates/geokey-manager/).

### Keyless SSL

If you want to upload a custom certificate but retain your private key on your own infrastructure, consider using [Keyless SSL](/ssl/keyless-ssl/).
