---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000308492-Will-Cloudflare-Apps-make-my-site-slower-
title: Will Cloudflare Apps make my site slower
---

# Will Cloudflare Apps make my site slower?



## Overview

Performance is an important consideration when installing anything onto your website. Cloudflare Apps has been designed to be the fastest way to install new tools and includes a variety of performance optimizations to make that possible:

-   All code installed with Cloudflare Apps is minified, compressed, and bundled to make it as efficient as is possible.
-   Cloudflare Apps code is served from the same domain as your website whenever possible, allowing it to benefit from the existing TCP and TLS connections (including HTTP/2 optimizations).
-   Cloudflare Apps are automatically split into two bundles, one which loads immediately, the other which can load later after the page has rendered. This allows your site to load as quickly as is possible with no unnecessary resources blocking the page.
-   Cloudflare Apps are moderated and tested to help detect common performance mistakes.
-   Cloudflare Apps are often designed to operate as much as is possible within your user's browser, eliminating load on your server which could slow down your site.

We recommend trying any new app on your site and evaluating its performance to make the final decision on what impact it will have.
