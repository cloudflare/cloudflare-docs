---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000233611-Why-is-the-mobile-redirect-I-set-up-through-Cloudflare-redirecting-my-static-assets-
title: Why is the mobile redirect I set up through Cloudflare redirecting my static assets
---

# Why is the mobile redirect I set up through Cloudflare redirecting my static assets?



## Overview

Cloudflare's mobile redirect will redirect all traffic from your root domain e.g. example.com and www.example.com to m.eaxmple.com. This includes all the resources under the domain.

To host this static content under the mobile subdomain (m.example.com), our recommendation would be to put a file link or similar on your server so that images and other content can be served.
