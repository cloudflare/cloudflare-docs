---
_build:
  publishResources: false
  render: never
  list: never
---

You need to perform the following steps for each custom hostname.

### Step 1 — Plan for validation

Before you create a hostname, you need to plan for:

1. [Certificate validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/): Upon successful validation, the certificates are deployed to Cloudflare’s global network.
2. [Hostname validation](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/): Upon successful validation, Cloudflare proxies traffic for this hostname.

You must complete both these steps for the hostname to work as expected.

{{<Aside type="warning" header="Important">}}

Depending on which method you select for each of these options, additional steps might be required for you and your customers.

{{</Aside>}}

### Step 2 — Create custom hostname

After planning for certification and hostname validation, you can create the custom hostname.

To create a custom hostname:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_create-custom-hostname.md">}}

{{<render file="_create-custom-hostname-limitations.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_create-custom-hostname-api.md">}}

{{<render file="_create-custom-hostname-limitations.md">}}

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

{{<render file="_issue-certs-preamble.md">}}

{{</Aside>}}