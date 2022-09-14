---
_build:
  publishResources: false
  render: never
  list: never
---

For non-wildcard hostnames, you can use HTTP DCV to automatically perform DCV as long as the custom hostname is proxying traffic through Cloudflare. Cloudflare will complete DCV on the hostname's behalf by serving the [HTTP token](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#http).

If your hostname is using another validation method, you will need to [update](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) the `"method"` field in the SSL object to be `"http"`.

If the custom hostname is not proxying traffic through Cloudflare, then the custom hostname domain owner will need to add the TXT or HTTP DCV token for the new certificate to validate and issue. As the SaaS provider, you will be responsible for sharing this token with the custom hostname domain owner.