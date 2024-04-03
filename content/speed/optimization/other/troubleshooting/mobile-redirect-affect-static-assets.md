---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115000233611-Why-is-the-mobile-redirect-I-set-up-through-Cloudflare-redirecting-my-static-assets-
title: Mobile redirect affects static assets
---

# Mobile redirect affects static assets

Cloudflare's [mobile redirect](/speed/optimization/other/mobile-redirect/) will redirect all traffic from your apex domain (`example.com`) to whatever is configured as your mobile redirect (`mobile.example.com`). This includes all the resources under the domain.

To host this static content under the mobile subdomain (`mobile.example.com`), our recommendation would be to put a file link or something similar on your server so that images and other content can be served.
