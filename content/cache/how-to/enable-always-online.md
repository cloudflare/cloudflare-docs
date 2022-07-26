---
title: Enable Always Online
pcx-content-type: how-to
---

# Enable Always Online

Here is how to enable Always Online in the dashboard:

1.  Log in to your Cloudflare account.
2.  Choose the domain that will use Always Online with Internet Archive integration.
3.  Click the **Caching** > **Configuration**.
4.  Under **Always Online**, set the toggle to **On**.

{{<Aside type="note" header="Note">}}

When turning on Always Online, you are also enabling the Internet Archive integration.

{{</Aside>}}

Alternatively, you can also enable Always Online by allowing your origin web server to determine which content to cache for display if your origin web server is offline:

  1.  Disable **Always Online**.
  2.  Set [Origin Cache Control](/cache/about/cache-control/) for your resources.
  3.  Enable `stale-if-error` at your origin.

For best practices and limitations for Always Online, refer to [Always Online Best Practices](/cache/best-practices/always-online/).
