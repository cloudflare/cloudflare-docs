---
pcx_content_type: how-to
title: Renew
weight: 3
meta:
    title: Renew certificates
---
 
# Renew certificates

The exact method for certificate renewal depends on whether that hostname is proxying traffic through Cloudflare and whether it is a wildcard certificate.

Custom hostnames with DigiCert certificates currently have a validity period of one year, though DigiCert is [going to be deprecated](/ssl/reference/migration-guides/digicert-update/) soon as an option. Custom hostnames using Let's Encrypt or Google Trust Services have a 90 day validity period.

Certificates are available for renewal 30 days before their expiration.

## Non-wildcard hostnames

If you are using a non-wildcard hostname and proxying traffic through Cloudflare, Cloudflare will try to perform DCV automatically on the hostname’s behalf by serving the [HTTP token](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/).

If the custom hostname is not proxying traffic through Cloudflare, then the custom hostname domain owner will need to add the TXT or HTTP DCV token for the new certificate to validate and issue. As the SaaS provider, you will be responsible for sharing this token with the custom hostname domain owner.

## Wildcard hostnames
 
{{<render file="_txt-validation_preamble.md">}}
<br>

{{<render file="_update-dcv-method.md">}}
<br/>

After this step, follow the normal steps for [TXT validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/).
