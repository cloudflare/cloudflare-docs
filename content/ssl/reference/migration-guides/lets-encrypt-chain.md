---
pcx_content_type: reference
title: Let's Encrypt chain update
weight: 1
meta:
  description: Review notes on the expiration of ISRG Root X1 cross-signed with DST Root CA X3, and how it may affect Cloudflare customers that use Let’s Encrypt.
---

# Let's Encrypt chain update

Let's Encrypt - one of the [certificate authorities (CAs)](/ssl/reference/certificate-authorities/) used by Cloudflare - has announced changes in its [chain of trust](/ssl/concepts/#chain-of-trust).

As the IdenTrust cross-sign (DST Root CA X3) expires on **September 30, 2024**, the self-signed ISRG Root X1 will be the only chain used for RSA certificates issued through Let's Encrypt.

This means that, if visitors to your website or application are using older devices (e.g. Android 7.0 and earlier), or if their systems rely solely on the cross-signed chain, they may see warning messages or fail to connect to your services.

## Important dates

- **May 15, 2024**: Cloudflare will stop using the cross-signed chain, both in certificate issuance and in [certificate bundling](#changes-to-custom-certificates).
- **September 30, 2024**: The cross-signed chain will expire.

### Changes to custom certificates

[Custom certificates](/ssl/edge-certificates/custom-certificates/) uploaded to Cloudflare are [bundled](/ssl/edge-certificates/custom-certificates/bundling-methodologies/) with the certificate chain that Cloudflare finds to be the most compatible and efficient.

After May 15, 2024, all Let’s Encrypt certificates uploaded to Cloudflare will be bundled with the ISRG Root X1 chain, instead of the cross-signed chain.

Custom certificates uploaded before May 15 will continue to use the cross-signed chain until their expiry.

As Cloudflare does not manage the [renewal of custom certificates](/ssl/edge-certificates/custom-certificates/renewing/), you will need to [update the custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#update-an-existing-custom-certificate) before it expires.
The new certificate that will be uploaded to extend the expiry will then be bundled with the new ISRG Root X1 chain.

## Background

Let’s Encrypt has been issuing RSA certificates through two chains: the self-signed ISRG Root X1 chain, and the ISRG Root X1 chain cross-signed by IdenTrust’s DST Root CA X3.

As explained in the [Let's Encrypt announcement](https://letsencrypt.org/2023/07/10/cross-sign-expiration), the cross-signed chain has allowed their certificates to be widely trusted, while the self-signed chain gradually developed compatibility with various devices.

As of late 2023, the number of Android devices trusting the self-signed ISRG Root X1 reached 93.9%, and Let's Encrypt has decided to drop the cross-signed chain.

## Impact

The expiration of the cross-signed chain will primarily affect:

- older devices (e.g. Android 7.0 and earlier)
- systems that solely rely on the cross-signed chain, lacking the ISRG Root X1 chain in their [trust store](/ssl/concepts/#trust-store)

{{<Aside type="note">}}
This change only affects RSA certificates. ECDSA certificates should maintain their current level of compatibility.
{{</Aside>}}

## Recommendations

### Monitor inquiries from your visitors

Once the change is rolled out, it is recommended that you monitor your support channels for any inquiries related to certificate warnings or access problems.

### Change certificate authority

If visitors are interacting with your website or application via older devices, and you expect or notice their experience is impacted, you can consider using [Advanced Certificate Manager](/ssl/edge-certificates/advanced-certificate-manager/) to choose a different certificate authority (CA), or you can [upload a certificate](/ssl/edge-certificates/custom-certificates/) from the CA of your choice.

### Update trust store

If you control the clients that are connecting to your website or application, it is recommended that you update their [trust store](/ssl/concepts/#trust-store) to include the self-signed ISRG Root X1 chain to prevent impact.

## Other resources

- [Cloudflare CAs and certificates FAQ](/ssl/edge-certificates/troubleshooting/ca-faq/)
- [Let's Encrypt Chain of Trust](https://letsencrypt.org/certificates/)
