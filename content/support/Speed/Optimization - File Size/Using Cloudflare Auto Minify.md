---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168196-Using-Cloudflare-Auto-Minify
title: Using Cloudflare Auto Minify
---

# Using Cloudflare Auto Minify



## Overview

Cloudflare users interested in minifying HTML, CSS and JavaScript can activate **Auto Minify** in their Cloudflare settings. Auto Minify will remove all unnecessary characters from HTML, JavaScript, and CSS files.

HTML files are minified dynamically by removing comments and unnecessary empty lines only. It does not require files to be cached. CSS and JS minification operates on cached CSS and JS files only. Once Cloudflare returns a cache HIT for the file it will be returned to browsers in minified form. This allows us to deliver a more complete minification result. If you need to enable or disable minification for CSS & JS you will now need to [purge your Cloudflare cache](https://support.cloudflare.com/hc/articles/200169246) to see the effect of any minification change.

___

## Enable Auto Minify

To enable Auto Minify on your website:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Speed** > **Optimization**.
4.  For **Auto Minify**, select the file types to minify.

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

___

## Related resources

-   [Troubleshooting Auto Minify](https://support.cloudflare.com/hc/articles/200169876)
