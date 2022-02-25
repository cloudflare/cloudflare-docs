---
title: Enable Always Online
pcx-content-type: how-to
---

# Enable Always Online

Always Online with Internet Archive integration is a Beta feature and is not enabled by default. 

1. Log in to your Cloudflare account.
1. Choose the domain that will use Always Online with Internet Archive integration. 
1. Click the **Caching** > **Configuration**.
1. Under **Always Online**, set the toggle to **On**.
1. To enable Internet Archive integration, click **Update**.

To use Cloudflare's Always Online cache without Internet Archive integration, switch the toggle to On but do not click **Update**.

Alternatives to globally enabling Always Online include:

- Using Cloudflare [Page Rules](/how-to/create-page-rules) to enable Always Online
- Allowing your origin web server to determine which content to cache for display if your origin web server is offline:
  1. Disable **Always Online**.
  1. Set [Origin Cache Control](/about/cache-control) for your resources.
  1. Enable `stale-if-error` at your origin.

For best practices and limitations for Always Online, see [Always Online Best Practices](/best-practices/always-online).
