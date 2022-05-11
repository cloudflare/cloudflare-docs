---
pcx-content-type: how-to
title: Add custom domains
---

# Add custom domains

With custom domains, you can configure your RTMPS feeds to use a domain that you specify instead of using `live.cloudflare.com.`

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Click **Stream** > **Live Inputs**.
3. Click the **Settings** button above the list. The **Custom Input Domains** page displays.
4. Under **Domain**, add your domain and click **Add domain**.
5. With your DNS provider, add a CNAME record that points to `live.cloudflare.com`.

## Delete a custom domain

1. From the **Custom Input Domains** page under **Hostnames**, locate the domain.
2. Click the menu icon under **Action**. Click **Delete**.