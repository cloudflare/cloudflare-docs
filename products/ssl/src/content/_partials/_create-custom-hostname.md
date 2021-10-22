1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
1. Select your SSL for SaaS application.
1. Navigate to **SSL/TLS** > **Custom Hostnames**.
1. Click **Add Custom Hostname**.
1. Add your customer's hostname `app.customer.com` and set the relevant options, including:
    - Choosing the [Validation method](/ssl-for-saas/common-tasks/certificate-validation-methods).
    - Whether you want to **Enable wildcard**, which adds a `*.<custom-hostname>` SAN to the custom hostname certificate. For more details, refer to [Hostname priority](/ssl-tls/certificate-and-hostname-priority#hostname-priority).
    - Choosing a value for [Custom origin server](/ssl-for-saas/hostname-specific-behavior/custom-origin).
1. Click **Add Custom Hostname**.