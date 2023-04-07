---
pcx_content_type: concept
title: Cross-Origin Resource Sharing (CORS)
---

# Cross-Origin Resource Sharing (CORS)

A cross-origin request is a request for website resources external to the origin. For example, `a.example.com` attempts to serve resources from `b.secondexample.com`. CORS instructs the browser to determine if a cross-origin request, such as an image or JavaScript from `b.secondexample.com`, is allowed by `a.example.com`. The browser does not load resources that are disallowed by CORS.

Cloudflare supports CORS by:

- Identifying cached assets based on the `Host` Header, `Origin` Header, URL path, and query. This allows different resources to use the same `Host` header but different `Origin` headers.
- Passing `Access-Control-Allow-Origin` headers from the origin server to the browser.

The `Access-Control-Allow-Origin` header allows servers to specify rules for sharing their resources with external domains. When a server receives a request to access a resource, it responds with a value for the `Access-Control-Allow-Origin` header. `Access-Control-Allow-Origin` headers are often applied to [cacheable content](/cache/about/default-cache-behavior/). A web server may respond with different `Access-Control` headers depending on the `Origin` header sent in the request.

## Add or change CORS headers

If you add or change CORS configuration at your origin web server, purging the Cloudflare cache by URL does not update the CORS headers. Force Cloudflare to retrieve the new CORS headers via one of the following options:

- Change the filename or URL to bypass cache to instruct Cloudflare to retrieve the latest CORS headers.
- Use the [single-file purge API](/api/operations/zone-purge-files-by-url) to specify the appropriate CORS headers along with the purge request.
- Update the resource’s last-modified time at your origin web server. Then, complete a [full purge](/cache/how-to/purge-cache/#purge-everything) to retrieve the latest version of your assets including updated CORS headers.
