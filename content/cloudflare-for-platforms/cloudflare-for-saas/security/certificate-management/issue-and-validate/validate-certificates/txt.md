---
pcx_content_type: reference
title: TXT
weight: 1
meta:
    title: TXT domain control validation (DCV)
---

# TXT domain control validation (DCV)

{{<render file="../../ssl/_partials/_txt-validation-definition.md">}}

## Wildcard or non-wildcard hostnames

If you are not using a wildcard hostname and choose **TXT** validation, your customer only needs to add **one** token to their authoritative DNS.

{{<render file="_wildcard-hostname-reqs.md">}}
<br>

## Get TXT tokens
 
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

## Steps for your customer
 
{{<render file="_txt-validation_post.md">}}
 
{{<render file="_ssl-for-saas-validate-patch.md">}}