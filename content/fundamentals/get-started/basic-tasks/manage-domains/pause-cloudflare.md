---
pcx_content_type: reference
title: Pause Cloudflare
weight: 5
---

# Pause Cloudflare

To troubleshoot your site, you can pause Cloudflare globally. This will send traffic directly to your origin web server instead of Cloudflare's reverse proxy. Paused domains do not use Cloudflare services such as SSL or WAF.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Within **Overview**, choose **Advanced Actions** > **Pause Cloudflare on Site**.

Pausing Cloudflare takes five minutes or less to complete. This is preferable to [changing nameservers](/dns/zone-setups/full-setup/setup/), which can cause propagation delays of several hours.

## Alternatives to global pause

Instead of pausing Cloudflare globally, you can disable the proxy on individual records:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **DNS**. Choose the record and select **Edit**.

3. Toggle **Proxy Status** off.

To troubleshoot caching issues, you can [enable Development Mode](/cache/reference/development-mode/). This will bypass Cloudflare's cache only.
