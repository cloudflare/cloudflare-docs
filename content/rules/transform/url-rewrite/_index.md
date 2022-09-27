---
pcx_content_type: concept
title: URL Rewrite Rules
weight: 2
---

# URL Rewrite Rules

You can manipulate the URL of a request through different operations, namely through rewrites and redirects:

*   A **rewrite** is a server-side operation that occurs before a web server has fully processed a request. A rewrite is not visible to website visitors, since the URL displayed in the browser does not change. Configure URL Rewrite Rules to perform rewrites at the edge without reaching your web server.

*   A **redirect** is a client-side operation that occurs after the web server has loaded the initial URL. In this case, a website visitor can notice the URL changing when the redirect occurs. Refer to [Bulk Redirects](/rules/url-forwarding/bulk-redirects/) to learn more about configuring redirects.

Configuring a URL rewrite can allow you to return the content of one url while diplaying another in the browser by rewriting the uri, the query string, or both. Please note, that you **cannot** rewrite the host of the url with a URL Rewrite Rule, please see the [Using Resolve Override in Page Rules](https://support.cloudflare.com/hc/en-us/articles/206190798-Using-Resolve-Override-in-Page-Rules) documentation instead.

## Static and Dynamic Rewrites

A URL Rewrite Rule can be written as _static_ or _dynamic_:

*   A **static rewrite** replaces a given part of a request URL (path or query string) with a static string.
*   A **dynamic rewrite** supports more advanced scenarios where you use a rewrite expression to define the resulting path or query string.

You can create a URL Rewrite Rule [in the dashboard](/rules/transform/url-rewrite/create-dashboard/) or [via API](/rules/transform/url-rewrite/create-api/).





