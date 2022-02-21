---
pcx-content-type: concept
order: 0
---

# URL Rewrite Rules

A URL Rewrite Rule can perform a static rewrite or a dynamic rewrite:

* A **static rewrite** replaces a given part of a request URL (path or query string) with a static string.
* A **dynamic rewrite** supports more advanced scenarios where you use a rewrite expression to define the resulting path or query string.

You can create a URL Rewrite Rule [in the dashboard](/transform/url-rewrite/create-dashboard) or [via API](/transform/url-rewrite/create-api).

## Rewrites and redirects

You can manipulate the URL of a request through different operations, namely through rewrites and redirects:

* A **rewrite** is a server-side operation that occurs before a web server has fully processed a request. A rewrite is not visible to website visitors, since the URL displayed in the browser does not change. Configure URL Rewrite Rules to perform rewrites at the edge without reaching your web server.

* A **redirect** is a client-side operation that occurs after the web server has loaded the initial URL. In this case, a website visitor can notice the URL changing when the redirect occurs. Refer to [Configuring URL forwarding or redirects with Cloudflare Page Rules](https://support.cloudflare.com/hc/articles/200172286) in the Support KB to learn more about configuring redirects.
