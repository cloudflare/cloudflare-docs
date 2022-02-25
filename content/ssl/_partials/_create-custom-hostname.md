---
---

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2.  Select your SSL for SaaS application.
3.  Navigate to **SSL/TLS** > **Custom Hostnames**.
4.  Click **Add Custom Hostname**.
5.  Add your customer's hostname `app.customer.com` and set the relevant options, including:
    *   Choosing the [Validation method](/ssl-for-saas/common-tasks/certificate-validation-methods).
    *   Whether you want to **Enable wildcard**, which adds a `*.<custom-hostname>` SAN to the custom hostname certificate. For more details, refer to [Hostname priority](/ssl-tls/certificate-and-hostname-priority#hostname-priority).
    *   Choosing a value for [Custom origin server](/ssl-for-saas/hostname-specific-behavior/custom-origin).
6.  Click **Add Custom Hostname**.

<Aside type="warning">

If you [issue a custom hostname certificate](/ssl-for-saas/common-tasks/issuing-certificates) with wildcards enabled, you cannot customize TLS settings for these wildcard hostnames.

</Aside>
