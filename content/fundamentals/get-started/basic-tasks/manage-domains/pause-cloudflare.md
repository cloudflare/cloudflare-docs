---
pcx_content_type: reference
title: Pause Cloudflare
weight: 5
---

# Pause Cloudflare

To troubleshoot your site, you can pause Cloudflare globally. This will send traffic directly to your origin web server instead of Cloudflare's reverse proxy. Paused domains also cannot use Cloudflare services like [Rules](/rules/), [WAF](/waf/), and [SSL/TLS certificates](/ssl/edge-certificates/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Within **Overview**, choose **Advanced Actions** > **Pause Cloudflare on Site**.

Pausing Cloudflare takes five minutes or less to complete. This is preferable to [changing nameservers](/dns/zone-setups/full-setup/setup/), which can cause propagation delays of several hours.

---

## Alternatives to global pause

### Disable proxy on DNS records

Instead of pausing Cloudflare globally, you can disable the proxy on individual records:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Go to **DNS** > **Records**. Choose the record and select **Edit**.

3. Toggle **Proxy Status** to **Off**.

Adjusting the proxy status will prevent that record from using Cloudflare services like [Rules](/rules/), [WAF](/waf/), and [SSL/TLS certificates](/ssl/edge-certificates/).

### Enable Development Mode

To troubleshoot caching issues, you could [enable Development Mode](/cache/reference/development-mode/). This will bypass Cloudflare's cache while still preserving Cloudflare services like [Rules](/rules/), [WAF](/waf/), and [SSL/TLS certificates](/ssl/edge-certificates/).
