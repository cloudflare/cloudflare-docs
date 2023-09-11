---
pcx_content_type: troubleshooting
title: Content encoding Issues
---

# Content encoding Issues

If you are noticing any encoding errors with your HTML pages, we recommend verifying that the impacted pages are explicitly setting the correct charset in the `Content-Type` header from your origin for all text/html pages, for example `Content-Type: text/html; charset=utf-8`. This is particularly important if you are not using UTF-8 encoding. Alternatively you can set the correct charset within the HTML.

If you believe these settings are correct, please inform us. You can find more information in [setting the HTTP charset parameter](https://www.w3.org/International/articles/http-charset/index) and in [HTML charset attribute](https://www.w3schools.com/tags/att_meta_charset.asp).

Alternatively, you can use a [Configuration Rule](/rules/configuration-rules/) to disable features that rewrite HTML. This will send the content as-is to the browser.
 
You also have the option to turn off these features site-wide within the dashboard:

* [Email Obfuscation](/support/more-dashboard-apps/cloudflare-scrape-shield/what-is-email-address-obfuscation/), located in the **Scrape Shield** section.
* [Server Side Excludes (SSE)](/support/more-dashboard-apps/cloudflare-scrape-shield/what-does-server-side-excludes-sse-do/#what-does-server-side-excludes-sse-do), located in the **Scrape Shield** section.
* [Rocket Loader](/speed/optimization/content/rocket-loader/), located in **Speed** > **Optimization** > **Content Optimization** section.
* [HTML Minification](/speed/optimization/content/auto-minify/) (JavaScript and CSS can be left enabled), located in the **Speed** > **Optimization** > **Content Optimization** section.
* [Mirage](/speed/optimization/images/mirage/#cloudflare-mirage), located in **Speed** > **Optimization** > **Image Optimization**. section.
* [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites/), located in the **SSL/TLS** > **Edge Certificates** section.

Misconfiguring the `Content-Type` or charset within HTML, or leaving them unspecified can lead to unintended consequences. This can disrupt the intended content presentation, resulting in disorganized rendering and potentially unclear characters. Properly configuring these elements ensures consistent and accurate interpretation, correct HTML modifications, and accurate rendering for browsers. This creates a seamless user experience and aligns with best practices in web development.