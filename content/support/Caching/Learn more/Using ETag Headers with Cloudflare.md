---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218505467-Using-ETag-Headers-with-Cloudflare
title: Using ETag Headers with Cloudflare
---

# Using ETag Headers with Cloudflare



## Overview

ETag headers identify whether the version of a resource cached in the browser is the same as the resource at the web server.  A visitor’s browser stores ETags. When a visitor revisits a site, the browser compares each ETag to the one it stored. Matching values cause a _304 Not-Modified HTTP_ response that indicates the cached resource version is current.   Cloudflare supports both strong and weak ETags configured at your origin web server.

### Weak ETags

Weak ETag headers indicate a cached resource is semantically equivalent to the version on the web server but not necessarily byte-for-byte identical.   Cloudflare supports weak ETag headers on all plans.

{{<Aside type="tip">}}
When using weak ETag headers, disable [Email
Obfuscation](https://support.cloudflare.com/hc/articles/200170016) and
[Automatic HTTPS
Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites)
to ensure Cloudflare doesn\'t remove the ETag headers set by your origin
web server.
{{</Aside>}}

### Strong ETags

Strong ETag headers ensure the resource in browser cache and on the web server are byte-for-byte identical. Domains on [Enterprise](https://www.cloudflare.com/pricing/) plans enable strong ETag headers via a **Respect Strong ETags** [Page Rule](https://support.cloudflare.com/hc/articles/200168306) and lower plans customers can enable strong ETag headers using [Cache Rules](/cache/about/cache-rules/). Otherwise, strong ETag headers are converted to weak ETag headers. Also, set a strong ETag header in quotes (Etag: "example") or Cloudflare removes the ETag instead of converting it to a weak ETag. 

Without a Page Rule, Cloudflare preserves strong ETags set by the origin web server if:

-   the content is gzipped on the origin server,
-   the origin sends the gzipped content with a strong ETag header, and
-   [Rocket Loader](https://support.cloudflare.com/hc/articles/200168056), [Minification](https://support.cloudflare.com/hc/articles/200168196), [Email Obfuscation](https://support.cloudflare.com/hc/articles/200170016), and [Railgun](https://www.cloudflare.com/railgun/) features are disabled.

{{<Aside type="tip">}}
Enabling Strong ETags via Cloudflare automatically disables Rocket
Loader, Minification, Email Obfuscation, and Railgun.
{{</Aside>}}

{{<Aside type="note">}}
If a resource is cacheable and there is a cache miss, Cloudflare does
not send ETag headers to the origin. This is because Cloudflare requires
the full response body to fill its cache.
{{</Aside>}}

___

## Related resources

-   [Understanding Cloudflare’s CDN](https://support.cloudflare.com/hc/en-us/articles/200172516)
-   [Controlling Cloudflare’s cache](https://support.cloudflare.com/hc/articles/202775670)
