---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169876-Why-isn-t-Auto-Minify-working-
title: Why isn't Auto Minify working
---

# Why isn't Auto Minify working?

Once enabled, Cloudflare's Auto Minify will minify your HTML and your cached CSS and JS files. If you view the source of your files in your web browser or via a command line tool (such as cURL) and you do not see the code being minified, here are some things you should check:

-   Only files that are served via your orange-clouded DNS records will be minified — this means that code on third-party domains that are not using Cloudflare will not be minified.
-   For CSS and JS only a cache `HIT` will be minified — [refer to Default Cache Behavior](/cache/concepts/default-cache-behavior/) to check an individual file's cache status.
-   The feature will deliberately skip minification for JS/CSS files with `.min` in the name.
-   If your code has fatal syntax errors, Auto Minify may not be able to successfully minify the code — use syntax checkers (such as the ones recommended in this article) on your files to confirm this.
-   We will not minify inline JS/CSS inside your HTML.
-   We do not remove HTML comments by default. However, HTML Minification does remove comments like `<!-- This is a comment —>`. As a result, any tool or program relying on HTML comment might not work as expected. That is the case, for example, with the [FacetWP WordPress plugin](https://facetwp.com/using-facetwp-with-cloudflare/). In this case, the Auto Minify feature needs to be disabled for the HTML. This can be done by [logging in to the Cloudflare dashboard](https://dash.cloudflare.com/login), and selecting your account and website. Then, go to the **Speed** app > **Optimization** tab. Auto Minify can also be disabled on specific URLs using a [Configuration Rule](/rules/configuration-rules/) or [Page Rule](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

If you want to manually confirm whether your files are getting minified, you can use a tool such as `cURL` to compare the response with and without Cloudflare — refer to [Gathering information for troubleshooting sites](https://support.cloudflare.com/hc/articles/219304477) to learn how to do that or you can [view the source code](https://www.computerhope.com/issues/ch000746.htm) in your browser directly.

## Syntax checkers

To check the syntax of your HTML / CSS or JS files we recommend using online validators / tools such as the following to look for potential issues:

-   [HTML](https://validator.w3.org/)
-   [CSS](http://jigsaw.w3.org/css-validator/)
-   [JavaScript](https://www.javascriptlint.com/)

If you see that minification still is not taking effect after checking these steps, please [contact Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476). You should include the URLs of the resources that you are seeing issues with.

{{<Aside type="note">}}
CSS & JS minification will operate on cached CSS and JS files only. Once
Cloudflare returns a cache HIT for the file it will be returned to
browsers in minified form. This allows us to deliver a more complete
minification result. If you need to enable or disable minification for
CSS & JS you will now need to [purge your Cloudflare
cache](/cache/how-to/purge-cache) to
see the effect of any minification setting change.
{{</Aside>}}
