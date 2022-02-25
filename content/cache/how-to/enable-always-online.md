---
title: Enable Always Online
pcx-content-type: how-to
---

# Enable Always Online

Always Online with Internet Archive integration is a Beta feature and is not enabled by default.

1.  Log in to your Cloudflare account.
2.  Choose the domain that will use Always Online with Internet Archive integration.
3.  Click the **Caching** > **Configuration**.
4.  Under **Always Online**, set the toggle to **On**.
5.  To enable Internet Archive integration, click **Update**.

To use Cloudflare's Always Online cache without Internet Archive integration, switch the toggle to On but do not click **Update**.

Alternatives to globally enabling Always Online include:

- Using Cloudflare [Page Rules](/cache/how-to/create-page-rules/) to enable Always Online
- Allowing your origin web server to determine which content to cache for display if your origin web server is offline:
  1.  Disable **Always Online**.
  2.  Set [Origin Cache Control](/cache/about/cache-control/) for your resources.
  3.  Enable `stale-if-error` at your origin.

For best practices and limitations for Always Online, see [Always Online Best Practices](/cache/best-practices/always-online/).
