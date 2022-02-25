---
pcx-content-type: reference
title: Load Zaraz manually
weight: 0
---

# Load Zaraz manually

If your domain is proxied by Cloudflare and you turn off the [Auto-inject script](/zaraz/reference/options/) option, you will have to manually include the Zaraz script in your HTML, immediately before the `</head>` tag closes. The path to your script would be `/cdn-cgi/zaraz/i.js`, on your domain. Your script tag should look like this:

```html
<script src="/cdn-cgi/zaraz/i.js" referrerpolicy="origin"></script>
```

With the script, your page HTML should be similar to the following:

```html
<html>
  <head>
    ….
    <script src="/cdn-cgi/zaraz/i.js" referrerpolicy="origin"></script>
  </head>
  <body>
    …
  </body>
</html>
```

Note that if your site is not proxied by Cloudflare, you should refer to the section about [Using Zaraz on domains not proxied by Cloudflare](/zaraz/advanced/domains-not-proxied/).
