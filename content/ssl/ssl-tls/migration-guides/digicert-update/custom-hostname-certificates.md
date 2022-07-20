---
pcx-content-type: reference
title: Custom hostnames
weight: 3
meta:
    title: Custom hostname certificates - DigiCert migration guide
---

# Custom hostnames

On **September 26, 2022**, Cloudflare will stop using Digicert as an issuing certificate authority (CA) for new [custom hostname certificates](/cloudflare-for-saas/ssl/). This will not affect existing custom hostname certificates.

On **October 31, 2022**, Cloudflare will stop using Digicert as the CA for custom hostname certificate renewals. This will not affect existing custom hostname certificates, but only certificate renewals.

To view which custom hostnames are currently using DigiCert as the issuing CA and might potentially be impacted, make an API call to the `/custom_hostnames/` endpoint.

```sh
GET https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_hostnames?wildcard=true&ssl=0
```

## Domain Control Validation (DCV) updates

CNAME and Email DCV will also be deprecated on **September 26th, 2022**, requiring customers to use either [HTTP](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#http) or [TXT](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) DCV.

Also, the maximum validity period for certificates will be decreased from 1 year to 90 days. This means that certificates will be renewed - and require DCV - more frequently.

## Required actions

### Before September 26, 2022

If your system integrates with the [SSL for SaaS API](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname), you will need to update:

- The value sent in the `"certificate_authority"` field under the SSL object. Your integration should either use Google Trust Services (`"google"`) or Let's Encrypt (`"lets_encrypt"`).
- The value sent in the `"method"` field under the SSL object. Your integration should either use [`"txt"`](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) or [`"http"`](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#http) (only available for [non-wildcard hostnames](#non-wildcard-hostnames)).

### Before October 31, 2022

We recommend that you migrate all  of your current custom hostnames away from DigiCert before October 31st. This will give you control over the offboarding by migrating custom hostnames to the new system in a controlled manner versus having Cloudflare manage the offboarding when the certificates come up for renewal.

If you want more control over custom hostname certificates when they come up for renewal, you should update the following properties by sending a [`PATCH`](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) request:

- The value sent in the `"certificate_authority"` field under the SSL object should either be `"lets_encrypt"` or `"google"`. If the certificate was previously using DigiCert and you do not update this value, Cloudflare will choose the issuing CA.
- The value sent in the `"method"` field under the SSL object should either be [`"txt"`](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) or [`"http"`](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#http) (only available for [non-wildcard hostnames](#non-wildcard-hostnames)). If the certificate is still using `"cname"` or `"email"`, Cloudflare will automatically change it to be `"txt"`.

{{<Aside type="note">}}

After your DigiCert certificate is renewed, the API will return a new certificate pack ID.

{{</Aside>}}

#### Non-wildcard hostnames

For non-wildcard hostnames, you do not need to make any updates for DCV as long as the custom hostname is proxying traffic through Cloudflare. Cloudflare will complete DCV by serving the [HTTP token](/cloudflare-for-saas/ssl/common-tasks/certificate-validation-methods/#http-automatic).

If the custom hostname is not proxying traffic through Cloudflare, then the custom hostname domain owner will need to add the TXT or HTTP DCV token for the new certificate to validate and issue. As the SaaS provider, you will be responsible for sharing this token with the custom hostname domain owner.

### Wildcard hostnames

To validate wildcard hostname, Cloudflare will now require two [TXT DCV tokens](/cloudflare-for-saas/ssl/common-tasks/hostname-verification/#txt) - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew. This is because - in contrast to DigiCert - Let’s Encrypt and Google Trust Services follow the [ACME Protocol](https://datatracker.ietf.org/doc/html/rfc8555), which requires one DCV token to be placed for every hostname on the certificate.

If your hostname is using another validation method, you will need to [update](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) the `"method"` field in the SSL object to be `"txt"`.

These tokens can be fetched through the [GET custom hostnames endpoint](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames) when the certificates are in a “pending validation” state during custom hostname creation or during certificate renewals. You can also fetch them through the dashboard.

As the SaaS provider, you will be responsible for sharing these DCV tokens with your customers. Let’s Encrypt DCV tokens are valid for 7 days and Google Trust Services tokens are valid for 14 days. We recommend that you make this clear to your customers, so that they add the tokens in a timely manner. If your customers take longer than the token validity period to add the record then you will need to fetch updated tokens and share those in order for the certificate to validate and issue.