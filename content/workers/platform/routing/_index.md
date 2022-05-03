---
pcx-content-type: concept
title: Routing
---

# Routing

## Background

Routing lets customers connect a Worker to the Internet, allowing it to receive HTTP requests on their Cloudflare zones. There are two ways to route to a Worker: [Custom Domains](/workers/platform/routing/custom-domains) and [Routes](/workers/platform/routing/routes).

## Custom Domains
[Custom Domains](/workers/platform/routing/custom-domains) allow our customers to attach a Worker to a hostname. Cloudflare will create DNS records and issue necessary certificates on behalf of our customers. The DNS records will point directly to the Worker.

Custom Domains are the best option if you'd like to connect your Worker to the Internet, and you don't have a default application server that you want to always communicate with. If you do have external dependencies, you can create a `Request` object with the target URI, and call `fetch()`.

Custom Domains can stack on top of each other. If you have Worker A attached to `app.example.com` and Worker B attached to `api.example.com`, Worker A can call `fetch()` on `api.example.com` and invoke Worker B.

![Custom Domains can stack on top of each other, like any external dependencies](./media/custom-domains-subrequest.png)

## Routes
[Routes](/workers/platform/routing/routes) are a good option if you have a designated application server you always need to communicate with. Calling `fetch()` on the incoming `Request` object will trigger a subrequest to your application server, as defined in the DNS tab of your Cloudflare zone.

![Routes work with your applications defined in Cloudflare DNS](./media/routes-diagram.png)

Routes can stack on top of Custom Domains, if configured on the appropriate URL. If you'd like to run a logging Worker in front of your application, you can create a Custom Domain on your application Worker, and create a Route for your logging Worker. Calling `fetch()` will invoke the application Worker on your Custom Domain.

## What's Best for Me?

Generally, [Routes](/workers/platform/routing/routes) are good for use cases where the Worker acts like a 'proxy', making small modifications to the Request, Response, or logging data in between the user and the server. [Custom Domains](/workers/platform/routing/custom-domains) are great for more in-depth use cases, where your application lives on the Cloudflare network and may optionally communicate with external dependencies.
