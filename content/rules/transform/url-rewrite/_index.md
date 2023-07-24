---
pcx_content_type: concept
title: Rewrite URL
weight: 1
layout: single
meta:
  title: Rewrite URL rules
---

# Rewrite URL rules

You can manipulate the URL of a request through different operations, namely rewrites and redirects:

* **URL rewrite**: A server-side operation that occurs before a web server has fully processed a request. A rewrite is not visible to website visitors, since the URL displayed in the browser does not change. Configure rewrite URL rules to perform rewrites on the Cloudflare global network without reaching your web server.

* **URL redirect**: A client-side operation that occurs after the web server has loaded the initial URL. In this case, a website visitor can notice the URL changing when the redirect occurs. Refer to [URL forwarding](/rules/url-forwarding/) to learn more about configuring redirects.

Use a URL rewrite to return the content of a URL while displaying a different URL in the browser. You can rewrite the URI path, the query string, or both.

You cannot rewrite the hostname using a rewrite URL rule. To rewrite the hostname, use an [origin rule](/rules/origin-rules/) or a [Page Rule](/support/page-rules/using-resolve-override-in-page-rules/).

## Static and dynamic rewrites

Rewrite URL rules can perform static or dynamic rewrites:

* **Static rewrite**: Replaces a given part of a request URL (path or query string) with a static string.
* **Dynamic rewrite**: Supports more advanced scenarios where you use a rewrite expression to define the resulting path or query string.

Create rewrite URL rules [in the dashboard](/rules/transform/url-rewrite/create-dashboard/) or [via API](/rules/transform/url-rewrite/create-api/).
