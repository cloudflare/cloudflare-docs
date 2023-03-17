---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170476-Troubleshooting-mixed-content-errors
title: Troubleshooting mixed content errors
---

# Troubleshooting mixed content errors



## Overview

Domains added to Cloudflare receive SSL certificates and can serve traffic over HTTPS. However, after starting to use Cloudflare, some customers notice missing content or page rendering issues when they first serve HTTPS traffic.

Typically, the problem is due to a request for HTTP resources from a web page served over HTTPS.  For example, you type `https://example.com` in a browser and the page contains an image reference via HTTP in the HTML to `<img src="http://example.com/resource.jpg">`.

Normally, if your website loads all resources securely over HTTPS, visitors observe a lock icon (typically a **green lock**) in the address bar of their browser.

This indicates your site has a working SSL certificate and all resources loaded by the site are loaded over HTTPS. The green lock assures visitors that their connection is safe. One of the [symptoms of mixed content](https://support.cloudflare.com/hc/articles/200170476#h_a6c5a05b-baba-4f88-a75c-d61f206366ed) is that different icons appear instead of the green lock icon.

{{<Aside type="tip">}}
Other causes of content rendering issues are [Rocket
Loader](https://support.cloudflare.com/hc/articles/200168056) and
[Auto-Minify](https://blog.cloudflare.com/an-all-new-and-improved-autominify/).
Test disabling both features if you do not observe mixed content errors.
{{</Aside>}}

___

## Symptoms of mixed content occurrence

Most modern browsers block HTTP requests on secure HTTPS pages. Blocked content can include images, JavaScript, CSS, or other content that affects how the page looks or behaves.

### Browser indications

Each web browser uses different methods to warn visitors about mixed content on a website, potentially including:

-   A yellow triangle or information symbol beside the URL bar
-   Messages mentioning "secure content"

### **Console logs**

-   For mixed content warnings, the web browser loads the resources but users don’t see the green lock icon in the URL. Warning messages appear within the browser’s debug tools:

![Screenshot of mixed content warnings displayed in a browser console.](/support/static/hc-import-mixed_content_warning.png)

For mixed content errors, the browser refuses to load the resources over an insecure connection:

![Screenshot of mixed content errors displayed in a browser console.](/support/static/hc-import-mixed_content_error.png)

Information on using the browser’s debug tools to locate these issues are found in the documentation for [Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content) and [Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content). Alternatively, you can view your page source and find specific references of _http://_ for paths to other resources.

___

## Resolution

There are two methods to resolve mixed content errors.

1\. Load all resources via your HTML source without specifying the HTTP or HTTPS protocols. For example:

```
//domain.com/path/to.file
```

unstead of

```
http://domain.com/path/to.file
```

2\. Depending on your Content Management System, check for plugins that automatically rewrite HTTP resources to HTTPS. Within the **SSL/TLS** app **Edge Certificates** tab, Cloudflare provides such a service via [Automatic HTTPS Rewrites](/ssl/edge-certificates/additional-options/automatic-https-rewrites).

{{<Aside type="note">}}
Cloudflare recommends WordPress users to install the [Cloudflare
WordPress plugin](https://wordpress.org/plugins/cloudflare/) and enable
the *Automatic HTTPS rewrites* option within the plugin. Alternatively,
Cloudflare recommends the [SSL insecure content
fixer](https://en-gb.wordpress.org/plugins/ssl-insecure-content-fixer/)
or [Really Simple
SSL](https://en-gb.wordpress.org/plugins/really-simple-ssl/) plugin to
automatically replace the HTTP with HTTPS.
{{</Aside>}}

___

## Related resources

-   [Debugging mixed content in Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
-   [Debugging mixed content in Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
-   [Community Tip - Fixing mixed content errors](https://community.cloudflare.com/t/community-tip-fixing-mixed-content-errors/42476)
