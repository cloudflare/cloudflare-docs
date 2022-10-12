---
pcx_content_type: reference
title: Custom hostnames
weight: 3
layout: list
meta:
    title: Custom hostname certificates - DigiCert migration guide
---

# Custom hostnames

On **January 23, 2023**, Cloudflare will stop using DigiCert as an issuing certificate authority (CA) for new [custom hostname certificates](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/). This will not affect existing custom hostname certificates.

On **January 31, 2023**, Cloudflare will stop using DigiCert as the CA for custom hostname certificate renewals. This will not affect existing custom hostname certificates, but only certificate renewals.

## Summary of changes

This table provides a summary of the differences between DigiCert and our other CAs.

{{<table-wrap>}}
| Area | DigiCert | Other CAs | Actions required |
| --- | --- | --- | --- |
| Domain Control <br/> Validation (DCV) | To get a certificate issued for a wildcard custom hostname, one TXT DCV record is required to complete Domain Control Validation. | To get a certificate issued for a wildcard custom hostname, two TXT DCV records will be required to complete validation. | [Wildcard custom hostnames](#wildcard-custom-hostnames) will require additional DCV tokens. [Non-wildcard custom hostnames](#non-wildcard-custom-hostnames) will automatically renew as long as the hostname is proxying through Cloudflare. |
| API | Customers can choose `“digicert”` as the issuing CA when using the [custom hostnames API](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname). | Customers can only choose `“lets_encrypt”` or `“google”` when using the [custom hostnames API](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname). | If you are currently using DigiCert as the issuing CA when creating custom hostnames, [switch your integration](#update-values) to use Let’s Encrypt or Google. |
| DCV Methods | CNAME and Email DCV are available. | CNAME and Email DCV will be deprecated. Customers will be required to use [HTTP](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#http) or [DNS](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#txt-record) DCV. | When certificates come up for renewal that are using CNAME or Email DCV, Cloudflare will automatically choose HTTP DCV as the default method for non-wildcard custom hostnames and TXT DCV for wildcard custom hostnames. |
| Validity period | Custom hostname certificates have a 1 year validity period. | Custom hostnames certificates will have a 90 day validity period. | If you are using [wildcard custom hostnames](#wildcard-custom-hostnames), your customers will need to place DCV tokens at their DNS provider more frequently. [Non-wildcard custom hostname certificates](#non-wildcard-custom-hostnames) will automatically renew, as long as the hostname is actively proxying through Cloudflare. Cloudflare will handle the renewals at a more frequent rate. |
{{</table-wrap>}}

## Domain Control Validation (DCV) updates

CNAME and Email DCV will be deprecated on **January 23, 2023**, requiring customers to use either [HTTP](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/#http) or [TXT](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-verification/#txt) DCV.

Also, the maximum validity period for certificates will be decreased from 1 year to 90 days. This means that certificates will be renewed - and require DCV - more frequently.

## Required actions

### Before January 23, 2023

If your system integrates with the SSL for SaaS API to [create custom hostnames](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname), you will need to update:

- The value sent in the `"certificate_authority"` field under the SSL object. Your integration should either use Google Trust Services (`"google"`) or Let's Encrypt (`"lets_encrypt"`).
- The value sent in the `"method"` field under the SSL object. Your integration should either use [`"http"`](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#http) (only available for [non-wildcard hostnames](#non-wildcard-hostnames)) or [`"txt"`](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#txt-record).

### Before January 31, 2023

We recommend that you migrate all your current custom hostnames away from DigiCert before January 31, 2023. This give you the control to migrate custom hostnames to the new system in a controlled manner instead of having Cloudflare manage the offboarding when the certificates come up for renewal.

#### Identify certificates

To identify certificates that are coming up for renewal, set up [notifications](/fundamentals/notifications/notification-available/#ssltls) for **SSL for SaaS Custom Hostnames Alert** events.

You can also send a [GET](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames) request to the API and look for certificates with a `ssl_status` of `pending_validation` and a `certificate_authority` of `digicert` within the SSL object.

To find wildcard custom hostnames specifically that are using DigiCert certificates, send a [GET](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames) request and include `?certificate_authority=digicert&wildcard=true` in the request parameter.

#### Update values

You should update the following values using the [dashboard](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#via-the-dashboard-1) or the [API](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#via-the-api-1):

- **Certificate Authority**: When you update this value, it will immediately reissue the certificate. Cloudflare will continue serving the previous certificate until the new one is validated. If the certificate was previously using DigiCert and you do not update this value, Cloudflare will choose the issuing CA upon renewal.
    - *Dashboard*: Update the value for **SSL certificate authority** to either be **Let's Encrypt** or **Google Trust Services**.
    - *API*: Update the value sent in the `"certificate_authority"` field under the SSL object to either be `"lets_encrypt"` or `"google"`.

    {{<Aside type="note">}}
 If you update the certificate authority for a wildcard custom hostname to use Let's Encrypt or Google Trust Services, you will now need to add [two DCV tokens](#wildcard-custom-hostnames) for it to validate.
    {{</Aside>}}

- **DCV Method**: You can only update this value when your certificate is up for renewal. If your certificate was previously using **Email** or **CNAME** validation and you do not update this value, Cloudflare will automatically set your DCV method to **TXT** or **HTTP** when the custom hostname comes up for renewal. We will use **HTTP** validation for non-wildcard custom hostname renewals and TXT-based DCV for wildcard custom hostname renewals.
    - *Dashboard*: Update the value for **Certificate validation method** to either be [**HTTP Validation**](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#http) (only available for [non-wildcard custom hostnames](#non-wildcard-custom-hostnames)) or [**TXT Validation**](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#txt-record).
    - *API*: Update the value sent in the `"method"` field under the SSL object to either be [`"http"`](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#http) (only available for [non-wildcard custom hostnames](#non-wildcard-custom-hostnames)) or [`"txt"`](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#txt-record).


{{<Aside type="note">}}

After your DigiCert certificate is renewed, the API will return a new certificate pack ID.

{{</Aside>}}

---

### Non-wildcard custom hostnames

{{<render file="_custom-hostname-non-wildcard.md">}}

### Wildcard custom hostnames

{{<render file="_custom-hostname-wildcard.md">}}

#### Actions required

As the SaaS provider, you will be responsible for sharing these DCV tokens with your customers. Let’s Encrypt DCV tokens are valid for 7 days and Google Trust Services tokens are valid for 14 days. We recommend that you make this clear to your customers, so that they add the tokens in a timely manner. If your customers take longer than the token validity period to add the record then you will need to fetch updated tokens and share those in order for the certificate to validate and issue.

Once your customer has added these tokens, the certificate status will change to **Active**. Cloudflare will periodically check if the DCV tokens have been placed according to the [certificate validation schedule](/ssl/reference/validation-backoff-schedule/). Once your customer has added the records, you can make a no-change call to the custom hostnames API to restart the validation schedule for a specific hostname.