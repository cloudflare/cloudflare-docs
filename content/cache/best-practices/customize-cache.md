---
title: Customize cache
pcx_content_type: concept
---

# Customize cache

Some possible combinations of origin web server settings and Cloudflare [Page Rules](/cache/how-to/edge-browser-cache-ttl/create-page-rules/) include:

- Create a directory for static content at your origin web server. For example, create a `/static/` subdirectory at your origin web server and a Cache Everything Page Rule matching the `*example.com/static/*` URL pattern.
- Append a unique file extension to static pages. For example, create a `.shtml` file extension for resources at your origin web server and a Cache Everything Page Rule matching the `*example.com/*.shtml` URL pattern.
- Add a query string to a resource’s URL to mark the content as static. For example, add a `static=true` query string for resources at your origin web server and a Cache Everything Page Rule matching the `*example.com/*?*static=true*` URL pattern.

Resources that match a Cache Everything Page Rule are still not cached if the origin web server sends a Cache-Control header of `max-age=0`, `private`, `no-cache`, or an `Expires` header with an already expired date. Include the [Edge Cache TTL](/cache/how-to/edge-browser-cache-ttl/create-page-rules/) setting within the Cache Everything Page Rule to additionally override the `Cache-Control` headers from the origin web server.
