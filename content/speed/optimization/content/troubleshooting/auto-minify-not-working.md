---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169876-Why-isn-t-Auto-Minify-working-
title: Auto Minify is not working
---

# Auto Minify is not working

Once enabled, Cloudflare's Auto Minify will minify your HTML and your cached CSS and JS files. If you view the source of your files in your web browser or via a command line tool (such as cURL) and you do not see the code being minified, here are some things you should check:

- Cloudflare only minifies files served by hostnames with [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) (code on third-party domains not using Cloudflare will not be minified).
-  For CSS and JS files, only a cache `HIT` will be minified (refer to [Default Cache Behavior](/cache/concepts/default-cache-behavior/) to check an individual file's cache status). This also means that you need to [purge your Cloudflare cache](/cache/how-to/purge-cache/) if you enable or disable minification for CSS and JS files.
-  The feature will deliberately skip minification for JS and CSS files with `.min` in the name.
-  If your code has fatal syntax errors, Auto Minify may not be able to successfully minify the code. Use [syntax checkers](#syntax-checkers) to confirm this.
-  Cloudflare does not minify inline JS/CSS inside your HTML.
-  Cloudflare does not remove HTML comments by default. However, HTML Minification does remove comments like `<!-- This is a comment —>`. As a result, any tool or program relying on HTML comment might not work as expected. That is the case, for example, with the [FacetWP WordPress plugin](https://facetwp.com/using-facetwp-with-cloudflare/). In this case, the Auto Minify feature needs to be disabled for the HTML.

If you want to manually confirm whether your files are getting minified, you can use a tool such as [`cURL`](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/#troubleshoot-requests-with-curl) to compare the response with and without Cloudflare or [view the source code](https://www.computerhope.com/issues/ch000746.htm) in your browser directly.

## Syntax checkers

To check the syntax of your HTML / CSS or JS files we recommend using online validators and tools such as the following to look for potential issues:

-   [HTML](https://validator.w3.org/)
-   [CSS](http://jigsaw.w3.org/css-validator/)
-   [JavaScript](https://www.javascriptlint.com/)