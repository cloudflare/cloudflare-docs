---
title: Customize cache
pcx_content_type: concept
---

# Customize cache

Some possible combinations of origin web server settings and Cloudflare [Cache Rules](/cache/how-to/cache-rules/) include:

## Create a directory for static content at your origin web server

For example, create a `/static/` subdirectory at your origin web server and a Cache Everything Cache Rule matching:

- Using the Expression Builder: `Hostname contains "example.com" AND URI Path starts with "/static"`
- Using the Expression Editor: `(http.host contains "example.com" and starts_with(http.request.uri.path, "/static"))`

## Append a unique file extension to static pages 

For example, create a `.shtml` file extension for resources at your origin web server and a Cache Everything Cache Rule matching:

- Using the Expression Builder: `Hostname contains "example.com" AND URI Path ends with ".shtml"`
- Using the Expression Editor: `(http.host contains "example.com" and ends_with(http.request.uri.path, ".shtml"))`

## Add a query string to a resource’s URL to mark the content as static

For example, add a `static=true` query string for resources at your origin web server and a Cache Everything Cache Rule matching:

- Using the Expression Builder: `Hostname contains "example.com" AND URI Query String contains "static=true"`
- Using the Expression Editor: `(http.host contains "example.com" and http.request.uri.query contains "static=true")`

Resources that match a Cache Everything Cache Rule are still not cached if the origin web server sends a Cache-Control header of `max-age=0`, `private`, `no-cache`, or an `Expires` header with an already expired date. Include the [Edge Cache TTL](/cache/how-to/cache-rules/settings/#edge-ttl) setting within the Cache Everything Cache Rule to additionally override the `Cache-Control` headers from the origin web server.
