---
pcx-content-type: reference
title: Universal certificates
weight: 1
meta:
    title: Universal certificates - DigiCert migration guide
---

# Changes to Universal certificates

Cloudflare will stop using Digicert as an issuing certificate authority (CA) for new Universal certificates and instead use one of our [other CAs](/ssl/ssl-tls/certificate-authorities/). This will not affect existing Universal certificates.

This process will begin for Enterprise zones on **September 12, 2022**. To identify potentially affected certificates, make an API call to the `/certificate_packs/` endpoint.

```sh
GET https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/ssl/certificate_packs?status=all&type=universal&certificate_authority=digicert
```

The maximum validity period for Universal certificates will also be decreased from 1 year to 90 days.

## DCV changes

You do not need to make any updates to the Domain Control Validation (DCV) for your zone.

If your domain is using a [Full setup](/dns/zone-setups/full-setup/), Cloudflare will automatically complete [TXT-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) on your behalf.

If your domain is on a [Partial setup](/dns/zone-setups/partial-setup/), Cloudflare will automatically complete [HTTP-based DCV](/ssl/edge-certificates/changing-dcv-method/methods/http/) on your behalf.

## Recommendations

If you are currently pinning your Universal certificate, stop pinning the certificate. This will ensure your certificates are not impacted during the Universal certificate renewal.

If you want to choose the issuing CA for your certificate, [order an Advanced certificate](/ssl/edge-certificates/advanced-certificate-manager/).