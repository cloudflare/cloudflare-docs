---
_build:
  publishResources: false
  render: never
  list: never
---

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2.  Select your Cloudflare for SaaS application.
3.  Navigate to **SSL/TLS** > **Custom Hostnames**.
4.  Click **Add Custom Hostname**.
5.  Add your customer's hostname `app.customer.com` and set the relevant options, including:
    *   Choosing the [Validation method](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/).
    *   Whether you want to **Enable wildcard**, which adds a `*.<custom-hostname>` SAN to the custom hostname certificate. For more details, refer to [Hostname priority](/ssl/reference/certificate-and-hostname-priority/#hostname-priority-ssl-for-saas).
    *   Choosing a value for [Custom origin server](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/).
6.  Click **Add Custom Hostname**.

{{<Aside type="warning">}}

If you issue a custom hostname certificate with wildcards enabled, you cannot customize TLS settings for these wildcard hostnames.

{{</Aside>}}
