---
pcx_content_type: navigation
title: Routes and domains
meta:
  description: Connect your Worker to an external endpoint (via Routes, Custom Domains or a `workers.dev` subdomain) such that it can be accessed by the Internet.
---

# Routes and domains

To allow a Worker to receive inbound HTTP requests, you must connect it to an external endpoint such that it can be accessed by the Internet.

There are three types of routes:

* [Custom Domains](/workers/configuration/routing/custom-domains): Routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone where the Worker is the origin.

* [Routes](/workers/configuration/routing/routes/): Routes that are set within a Cloudflare zone where your origin server, if you have one, is behind a Worker that the Worker can communicate with.

* [`workers.dev`](/workers/configuration/routing/workers-dev/): The `workers.dev` subdomain route automatically created for your Worker that you can disable.

## What is best for me?

Custom Domains are recommended for use cases where your Worker is your application's origin server. Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

Routes are recommended for use cases where your application's origin server is external to Cloudflare. Note that Routes cannot be the target of a same-zone `fetch()` call.