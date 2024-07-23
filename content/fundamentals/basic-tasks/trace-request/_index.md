---
pcx_content_type: concept
title: Trace a request (beta)
meta:
  title: Trace a request with Cloudflare Trace (beta)
---

{{<heading-pill style="beta">}} Cloudflare Trace {{</heading-pill>}}

{{<plan type="all">}}

Cloudflare Trace (beta) follows an HTTP/S request through Cloudflare’s reverse proxy to your origin. Use this tool to understand how different Cloudflare configurations interact with an HTTP/S request for one of your hostnames. If the hostname you are testing is not [proxied by Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/), Cloudflare Trace will still return all the configurations that Cloudflare would have applied to the request.

You can define specific request properties to simulate different conditions for an HTTP/S request. Inactive rules configured in Cloudflare products will not be evaluated.

Cloudflare Trace is available to users with an Administrator or Super Administrator role.

## Resources

{{<directory-listing>}}