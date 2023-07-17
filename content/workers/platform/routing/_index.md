---
pcx_content_type: navigation
title: Routing
layout: single
---

# Routing

To allow a Worker to receive inbound HTTP requests, you must connect it to an external endpoint such that it can be accessed by the Internet. There are two ways to route to a Worker: 

* [Custom Domains](/workers/platform/triggers/custom-domains)
* [Routes](/workers/platform/triggers/routes)

## What is best for me?

Custom Domains are recommended for use cases where your Worker is your application's origin server. Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

Routes are recommended for use cases where your application's origin server is external to Cloudflare. Note that Routes cannot be the target of a same-zone `fetch()` call.