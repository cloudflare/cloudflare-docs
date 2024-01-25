---
pcx_content_type: reference
title: Universal certificates
weight: 1
meta:
    title: Universal certificates - DigiCert migration guide
---

# Changes to Universal certificates

On August and September, 2023, Cloudflare will be offboarding DigiCert as an issuing certificate authority (CA) for new [Universal certificates](/ssl/edge-certificates/universal-ssl/). This will not affect existing Universal certificates.

The validity period for Universal certificates will also be decreased from one year to 90 days.

## DCV changes

You do not need to make any updates to the Domain Control Validation (DCV) for your zone.

If your domain is using a [Full setup](/dns/zone-setups/full-setup/), Cloudflare will automatically complete [TXT-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) on your behalf.

If your domain is on a [Partial setup](/dns/zone-setups/partial-setup/), Cloudflare will automatically complete [HTTP-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/) on your behalf.

## Recommendations

If you are currently pinning your Universal certificate, stop pinning the certificate. This will ensure your certificates are not impacted during the Universal certificate renewal.

If you have CAA records that are not automatically added by Cloudflare, make sure to allow the other Cloudflare CAs to issue certificates for your domain. Since Universal SSL does not guarantee which CA will issue the certificate, it is recommended that you add [CAA records for all CAs that Cloudflare uses](/ssl/reference/certificate-authorities/#caa-records).

If you want to choose the issuing CA for your certificate, [order an Advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/). Once that certificate has deployed, [disable Universal SSL](/ssl/edge-certificates/universal-ssl/disable-universal-ssl/) to prevent Cloudflare from issuing the Universal certificate for you.