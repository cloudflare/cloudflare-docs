---
pcx_content_type: reference
title: TXT
weight: 2
meta:
    title: TXT domain control validation (DCV)
---

# TXT domain control validation (DCV)

{{<render file="_txt-validation-definition.md" productFolder="ssl" >}}
<br/>

## When to use

Generally, you should use TXT-based DCV when you cannot use [HTTP validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/) or [Delegated DCV](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/).

### Non-wildcard custom hostnames

If your custom hostname does not include a wildcard, Cloudflare will always and automatically attempt to complete DCV through [HTTP validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-automatic), even if you have selected **TXT** for your validation method.

This HTTP validation should succeed as long as your customer is pointing to your custom hostname and they do not have any [CAA records](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/troubleshooting/#certificate-authority-authorization-caa-records) blocking your chosen certificate authority.

### Wildcard custom hostnames

{{<render file="_wildcard-hostname-reqs.md">}}

This means that - if you choose to use wildcard custom hostnames - you will need a way to share these DCV tokens with your customer.

---

### Step 1 - Get TXT tokens
 
Once you [create a new hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/) and choose this validation method, your tokens will be ready after a few seconds.

{{<render file="_txt-validation_preamble.md">}}

{{<tabs labels="API | Dashboard">}}
{{<tab label="api" no-code="true">}}

{{<render file="_txt-validation_api.md">}}

{{</tab>}}

{{<tab label="dashboard" no-code="true">}}

{{<render file="_txt-validation_dashboard.md">}}

{{</tab>}}
{{</tabs>}}

### Step 2 - Share with your customer

You will then need to share these TXT tokens with your customers.

### Step 3 - Add DNS records (customer)
 
{{<render file="_txt-validation_post.md">}}
 
{{<render file="_ssl-for-saas-validate-patch.md">}}

### Step 4 (optional) - Fetch new tokens

Your DCV tokens expire after a [certain amount of time](/cloudflare-for-platforms/cloudflare-for-saas/reference/token-validity-periods/), depending on your certificate authority.

This means that, if your customers take too long to place their tokens at their authoritative DNS provider, you may need to [get new tokens](#step-1---get-txt-tokens) and re-share them with your customer.

---

### DigiCert

If you create a hostname with DigiCert as the certificate authority, you only need to share one TXT record for your customer to place at their authoritative DNS provider.

However, Cloudflare [will soon be deprecating](/ssl/reference/migration-guides/digicert-update/) DigiCert as an issuing CA for custom hostnames, so we recommend you follow our [migration guide](/ssl/reference/migration-guides/digicert-update/custom-hostname-certificates/) to move your custom hostnames over to another CA.