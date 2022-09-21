---
pcx_content_type: concept
title: Routing
layout: single
---

# Routing

## Background

To allow a Worker to receive inbound HTTP requests, you must connect it to an external endpoint such that it can be accessed by the Internet. There are two ways to route to a Worker: 

1. [Custom Domains](/workers/platform/routing/custom-domains).

and

2. [Routes](/workers/platform/routing/routes).

Routes add Workers functionality to your existing proxied hostnames, in front of your application server. These allow your  Workers to act as a 'proxy' and perform any necessary work before reaching out to an application server behind Cloudflare.

Custom Domains automatically attach a Worker to your hostname by creating a DNS record and an SSL certificate on your behalf. With Custom Domains, there's no application server to 'phone home' to - and that also means your application can use the power of Cloudflare’s global network to run your application. Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

## Custom Domains

[Custom Domains](/workers/platform/routing/custom-domains) allow you to attach a Worker to a hostname. Cloudflare will create DNS records and issue necessary certificates on your behalf. The DNS records will point directly to your Worker.

Custom Domains are recommended if you want to connect your Worker to the Internet and do not have an application server that you want to always communicate with.  If you do have external dependencies, you can create a `Request` object with the target URI, and use `fetch()` to reach out.

Custom Domains can stack on top of each other. For example, if you have Worker A attached to `app.example.com` and Worker B attached to `api.example.com`, Worker A can call `fetch()` on `api.example.com` and invoke Worker B.

![Custom Domains can stack on top of each other, like any external dependencies](./media/custom-domains-subrequest.png)

## Routes

[Routes](/workers/platform/routing/routes) are a set of rules that evaluate against a request's URL. Routes are recommended for you if you have a designated application server you always need to communicate with. Calling `fetch()` on the incoming `Request` object will trigger a subrequest to your application server, as defined in the **DNS** settings of your Cloudflare zone.

![Routes work with your applications defined in Cloudflare DNS](./media/routes-diagram.png)

Routes can `fetch()` Custom Domains and take precedence if configured on the same hostname. If you would like to run a logging Worker in front of your application, for example, you can create a Custom Domain on your application Worker for `app.example.com`, and create a Route for your logging Worker at `app.example.com/*`.  Calling `fetch()` will invoke the application Worker on your Custom Domain. Note that Routes cannot be the target of a same-zone `fetch()` call.

## Configure your `wrangler.toml`

To configure a route in your `wrangler.toml`, add the following to your environment:

```toml
routes = [
    { pattern = "example.com/about", zone_id = "<YOUR_ZONE_ID>" }
]
```

If you have specified your zone ID in the environment of your `wrangler.toml`, you will not need to write it again in object form.

To configure a subdomain in your `wrangler.toml`, add the following to your environment:

```toml
routes = [
	{ pattern = "subdomain.example.com", custom_domain = true, zone_name = "example.com" }
]
```

## What is best for me?

[Custom Domains](/workers/platform/routing/custom-domains/) are recommended for use cases where your application lives on the Cloudflare network, needs to be global by default, and may optionally communicate with any number of dependencies.

Generally, [Routes](/workers/platform/routing/routes) are good for use cases where the Worker acts like a 'proxy', making small modifications to the Request, Response, or logging data in between the user and the server. 
