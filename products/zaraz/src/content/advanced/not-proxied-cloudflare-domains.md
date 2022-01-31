---
order:
pcx-content-type: reference
---

# Using Zaraz on non Cloudflare domains

You can load Zaraz on domains that are not proxied through Cloudflare. However, you will need to create a separate domain, or sub-domain, proxied by Cloudflare (also [known as orange-clouded](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) domains), and load the script from it:

1. Create a new subdomain like `my-subdomain.example.com` and proxy it through Cloudflare. Refer to [Enabling the Orange Cloud](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) for more information.
1. Add the following script to your main website’s HTML, immediately before the `</head>` tag closes:
```html
<script src="https://my-subdomain.example.com/cdn-cgi/zaraz/i.js"></script>
```
