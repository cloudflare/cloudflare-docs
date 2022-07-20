---
pcx-content-type: reference
title: Custom hostnames
weight: 3
meta:
    title: Custom hostname certificates - DigiCert migration guide
---

# Custom hostnames

## Certificate issuance and renewal

Our changes will not affect existing [SSL for SaaS certificates](/cloudflare-for-saas/ssl/) that Cloudflare is actively serving, but will impact new certificate orders and renewals:

- **New certificate orders**: After September 26, 2022, new SSL for SaaS certificates will not be able to use DigiCert as a Certificate Authority for new SSL for SaaS certificates. This means that DigiCert will no longer be an option [in the dashboard](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/#via-the-dashboard) and any [API calls](/cloudflare-for-saas/ssl/common-tasks/issuing-certificates/#via-the-api) that are made using `“digicert”` as the CA will fail.
- **Certificate renewals**: After October 31st, 2022, certificate renewals will no longer use DigiCert. If you do not update your renewals, Cloudflare will choose a certificate authority on your behalf (Let's Encrypt or Google Trust Services).

To view which custom hostnames are currently using DigiCert as the issuing CA, make an API call to the `/custom_hostnames/` endpoint.

```sh
GET https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_hostnames?wildcard=true&ssl=0
```

## Domain Control Validation (DCV)

CNAME DCV will also be deprecated on **September 26th, 2022**, requiring customers to use either [HTTP](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#http) or [TXT](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) DCV.

Also, the maximum validity period for certificates will be decreased from 1 year to 90 days. This means that certificates will be renewed - and require DCV - more frequently.

## Required changes

If your system integrates with the [SSL for SaaS API](https://api.cloudflare.com/#custom-hostname-for-a-zone-properties), update your system to use Google Trust Services (`"google"`) or Let's Encrypt (`"lets_encrypt"`) as the value for the `"certificate_authority"` field under the SSL object.

If you want to choose the issuing CA for certificate renewals, send a [`PATCH`](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) request that changes the `"certificate_authority"` field to use `"lets_encrypt"` or `"google"`.

### Non-wildcard hostnames

For non-wildcard hostnames, you do not need to make any updates for DCV as long as the custom hostname is proxying traffic through Cloudflare. Cloudflare will complete DCV by serving the [HTTP token](/cloudflare-for-saas/ssl/common-tasks/certificate-validation-methods/#http-automatic).

If the custom hostname is not proxying traffic through Cloudflare, then the custom hostname domain owner will need to add the TXT or HTTP DCV token for the new certificate to validate and issue. As the SaaS provider, you will be responsible for sharing this token with the custom hostname domain owner.

### Wildcard hostnames

To validate wildcard hostname, Cloudflare will now require two [TXT DCV tokens](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew. This is because - in contrast to DigiCert - Let’s Encrypt and Google Trust Services follow the [ACME Protocol](https://datatracker.ietf.org/doc/html/rfc8555), which requires one DCV token to be placed for every hostname on the certificate.

If your hostname is using another validation method, you will need to [update](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) the `"method"` field in the SSL object to be `"txt"`.

These tokens can be fetched through the [GET custom hostnames endpoint](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames) when the certificates are in a “pending validation” state during custom hostname creation or during certificate renewals. You can also fetch them through the dashboard.

As the SaaS provider, you will be responsible for sharing these DCV tokens with your customers. Let’s Encrypt DCV tokens are valid for 7 days and Google Trust Services tokens are valid for 14 days. We recommend that you make this clear to your customers, so that they add the tokens in a timely manner. If your customers take longer than the token validity period to add the record then you will need to fetch updated tokens and share those in order for the certificate to validate and issue.