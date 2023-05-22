---
pcx_content_type: navigation
title: Validate
weight: 2
layout: single
meta:
    title: Validate certificates
    description: Learn which methods you should use to validate Cloudflare for SaaS certificates.
---

# Validate certificates

{{<render file="_dcv-definition.md" productFolder="ssl" >}}
<br>

{{<Aside type="warning">}}

With the [upcoming change](/ssl/reference/migration-guides/digicert-update/custom-hostname-certificates/) to certificates issued by DigiCert, both [email](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/email/) and [CNAME](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/cname/) DCV will soon be unsupported.

{{</Aside>}}

## DCV situations
 
### Non-wildcard certificates

{{<render file="_http-dcv-situation.md">}}

### Wildcard certificates

{{<render file="_txt-dcv-situation.md">}}
<br/>

- [DCV Delegation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/) (generally recommended)
- [Manual](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/)

### Minimize downtime

If you want to minimize downtime, explore one of the following methods:

- [Delegated DCV](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/)
- [TXT validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/txt/)
- [Manual HTTP validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-manual)

### Minimize customer effort

If you value simplicity and your customers can handle a few minutes of downtime, you can rely on Cloudflare [automatic HTTP validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-automatic).

## Potential issues

To avoid or solve potential issues, refer to our [troubleshooting guide](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/).