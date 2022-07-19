---
pcx-content-type: concept
title: Routing
layout: single
---

# Routing

## Background

Routing lets customers connect a Worker to the Internet, allowing it to receive HTTP requests on their Cloudflare zones. There are two ways to route to a Worker: 

1. [Custom Domains](/workers/platform/routing/custom-domains).

and

2. [Routes](/workers/platform/routing/routes).

Routes add Workers functionality to your existing proxied (orange-clouded) hostnames, as a proxy in front of your application server. 

Custom Domains can replace the proxy (orange-cloud) process entirely. Custom Domains automatically attach a Worker to your hostname by creating a DNS record and an SSL certificate on your behalf. Custom Domains can also be invoked within the same zone via `fetch()`, unlike Routes.

## Custom Domains

[Custom Domains](/workers/platform/routing/custom-domains) allow you to attach a Worker to a hostname. Cloudflare will create DNS records and issue necessary certificates on your behalf. The DNS records will point directly to your Worker.

Custom Domains are recommended if you want to connect your Worker to the Internet and do not have a default application server that you want to always communicate with.  If you do have external dependencies, you can create a `Request` object with the target URI, and call `fetch()`.

Custom Domains can stack on top of each other. For example, if you have Worker A attached to `app.example.com` and Worker B attached to `api.example.com`, Worker A can call `fetch()` on `api.example.com` and invoke Worker B.

![Custom Domains can stack on top of each other, like any external dependencies](./media/custom-domains-subrequest.png)

## Routes

[Routes](/workers/platform/routing/routes) are a set of rules that evaluate against a request's URL. Routes are recommended for you if you have a designated application server you always need to communicate with. Calling `fetch()` on the incoming `Request` object will trigger a subrequest to your application server, as defined in **DNS** of your Cloudflare zone.

![Routes work with your applications defined in Cloudflare DNS](./media/routes-diagram.png)

Routes can `fetch()` Custom Domains and take precedence if configured on the same hostname. If you would like to run a logging Worker in front of your application, for example, you can create a Custom Domain on your application Worker for `app.example.com`, and create a Route for your logging Worker at `app.example.com/*`.  Calling `fetch()` will invoke the application Worker on your Custom Domain. Note that Routes cannot be the target of a same-zone `fetch()` call.

## What is best for me?

Generally, [Routes](/workers/platform/routing/routes) are good for use cases where the Worker acts like a 'proxy', making small modifications to the Request, Response, or logging data in between the user and the server. 

[Custom Domains](/workers/platform/routing/custom-domains) are recommended for more in-depth use cases, where your application lives on the Cloudflare network and may optionally communicate with external dependencies.
