---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: planReqs
---

## Before you begin

Before you start creating custom hostnames:

1. [Add](/fundamentals/setup/account-setup/add-site/) your zone to Cloudflare $1
2. [Enable](/cloudflare-for-platforms/cloudflare-for-saas/start/enable/) Cloudflare for SaaS for your zone.
3. Review the [Hostname prioritization](/ssl/reference/certificate-and-hostname-priority/#hostname-priority-ssl-for-saas) documentation: wildcard custom hostnames have a different behavior than exact hostname match!
4. (optional) Review the following documentation:

  - [API documentation](/fundamentals/api/) (if you have not worked with the Cloudflare API before).
  - [Certificate validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/).
