---
title: Development Mode
pcx_content_type: how-to
---

# Development Mode

Development Mode temporarily suspends Cloudflare's edge caching, [minification](https://support.cloudflare.com/hc/en-us/articles/200168196), [Polish](/images/polish/), and [Railgun](/railgun/) features for three hours unless disabled beforehand. Development Mode allows customers to immediately observe changes to their cacheable content like images, CSS, or JavaScript.

{{<Aside type="note">}}
To bypass cache for longer than three hours, use bypass cache in [Cache Rules](/cache/about/cache-rules/).
{{</Aside>}}

## Enable Development Mode

Development Mode temporarily bypasses Cloudflare’s cache and does not purge cached files. To purge your Cloudflare cache, refer to [purge cache](/cache/how-to/purge-cache/).

1.  Log in to your Cloudflare account.
2.  Select your domain.
3.  Select **Caching**.
4.  Toggle **Development Mode** to **On**.
