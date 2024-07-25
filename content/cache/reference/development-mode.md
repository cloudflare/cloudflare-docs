---
title: Development Mode
pcx_content_type: how-to
---

# Development Mode

Development Mode temporarily suspends Cloudflare's edge caching, [minification](/speed/optimization/content/auto-minify/) and [Polish](/images/polish/) features for three hours unless disabled beforehand. Development Mode allows customers to immediately observe changes to their cacheable content like images, CSS, or JavaScript.

{{<Aside type="note">}}
To bypass cache for longer than three hours, use bypass cache in [Cache Rules](/cache/how-to/cache-rules/settings/#bypass-cache).
{{</Aside>}}

## Enable Development Mode

Development Mode temporarily bypasses Cloudflare’s cache and does not purge cached files. To purge your Cloudflare cache, refer to [purge cache](/cache/how-to/purge-cache/).

1.  Log in to your Cloudflare account.
2.  Select your domain.
3.  Select **Caching**.
4.  Toggle **Development Mode** to **On**.
