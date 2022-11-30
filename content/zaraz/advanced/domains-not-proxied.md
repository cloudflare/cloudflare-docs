---
pcx_content_type: reference
title: Domains not proxied by Cloudflare
weight: 4
meta:
  title: Use Zaraz on domains not proxied by Cloudflare
---

# Use Zaraz on domains not proxied by Cloudflare

You can load Zaraz on domains that are not proxied through Cloudflare. However, you will need to create a separate domain, or subdomain, proxied by Cloudflare (also [known as orange-clouded](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) domains), and load the script from it:

1. Create a new subdomain like `my-subdomain.example.com` and proxy it through Cloudflare. Refer to [Enabling the Orange Cloud](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) for more information.
2. Add the following script to your main website’s HTML, immediately before the `</head>` tag closes:

```html
<script src="https://my-subdomain.example.com/cdn-cgi/zaraz/i.js"></script>
```