---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200168196-Using-Cloudflare-Auto-Minify
title: Auto Minify
weight: 1
learning_center:
    title: Why minify JavaScript code?
    link: https://www.cloudflare.com/learning/performance/why-minify-javascript-code/
---

{{<heading-pill style="deprecated">}}Auto Minify{{</heading-pill>}}

Cloudflare Auto Minify improves website performance by dynamically removing all unnecessary characters from HTML, CSS and JavaScript files.

{{<render file="_auto-minify-deprecation-warning.md">}}

HTML files are minified dynamically by removing comments and unnecessary empty lines only. It does not require files to be cached. CSS and JS minification operates on cached CSS and JS files only. Once Cloudflare returns a cache `HIT` for the file it will be returned to browsers in minified form. This allows us to deliver a more complete minification result. If you need to enable or disable minification for CSS and JS files, you need to [purge your Cloudflare cache](/cache/how-to/purge-cache/).

___

## Enable Auto Minify

To enable Auto Minify on your website:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Speed** > **Optimization** > **Content Optimization**.
4.  For **Auto Minify**, select the file types to minify.

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

___

## Related resources

-   [Troubleshooting Auto Minify](/speed/optimization/content/troubleshooting/auto-minify-not-working/)
