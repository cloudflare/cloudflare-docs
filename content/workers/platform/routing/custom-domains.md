---
pcx-content-type: concept
title: Custom Domains
---

# Custom Domains

## About
Custom Domains allow our customers to connect a Worker to a hostname, without having to fuss with DNS or certificate management.  Cloudflare will create DNS records and issue necessary certificates on behalf of our customers.  The DNS records will point directly to the Worker.

## Building a Custom Domain
In order to create a Custom Domain, you must have:
* An active Cloudflare zone on your target domain
* A Worker to invoke

The interface provides active feedback on valid and invalid entries.  Valid entries are hostnames on an active Cloudflare zone.  If you attempt to create a Custom Domain on a hostname with an existing DNS record, Cloudflare will confirm that you'd like to replace the existing record.  Custom Domains can be attached to your Worker via API or within the Cloudflare dashboard under **Account Home** > [**Workers**](https://dash.cloudflare.com/?zone=workers) > **your Worker** > **Triggers** > **Add Custom Domain**.

## Fetch
Custom Domains are considered the 'origin' as far as your request is concerned.  That means calling `fetch()` on the initial request is, in most cases, an antipattern.  Instead, create new `Request` objects to reference any external dependencies, or use Cloudflare's built in primitives via bindings.

![Workers can use the fetch API to request external dependencies](../media/custom-domains-dependencies.png)

Another side effect of the tight integration with Cloudflare DNS is that you can use your Custom Domains like you would any external dependency.  Your Workers can `fetch()` Custom Domains and invoke their associated Worker, even if they're on the same Cloudflare zone.  The newly invoked Worker is treated like a new top-level request, and will execute in a separate thread.

![Custom Domains can stack on top of each other, like any external dependencies](../media/custom-domains-subrequest.png)

## Ordering
Custom Domains follow standard DNS ordering and matching logic.  Custom Domains do not support wildcard records; as such an incoming request must match the hostname your Custom Domain is registered to.  Other parts of the URI are not considered when executing this matching logic.  For example, if you create a Custom Domain on `api.example.com` attached to your `api-gateway` Worker, a request to either `api.example.com/login` or `api.example.com/user` would invoke the same `api-gateway` Worker.

![Custom Domains follow standard DNS ordering and matching logic](../media/custom-domains-api-gateway.png)

## Interaction with Routes
Custom Domains are evaluated before Route rules, but take lower precedence.  [Routes](/workers/platform/routing/routes) defined on your Custom Domain will run first, but can optionally call the Worker registered on your Custom Domain.  In our example above, a Custom Domain for `api.example.com` can point to our Worker `api`.  A Route added to `api.example.com/auth` can point to our Worker `auth`.  Using `fetch(request)` within the Worker `auth` will invoke the Worker `api`, as if it was a normal application server.  This means you can run your Workers in series, creating layers of 'proxy' Workers and 'application' Workers.

![Routes can be run in front of Custom Domains](../media/routes-with-custom-domains.png)

## Migrating from Routes
If you're currently invoking a Worker using a [Route](/workers/platform/routing/routes) with `/*`, and your DNS points to `100::` or similar, it's  advised that a Custom Domain is a suitable replacement.  For example, to migrate the Route `app.example.com/*`, simply create a Custom Domain on `app.example.com`, replacing the existing record.  You can then delete the route `app.example.com/*` in your **Account Home** > [**Workers**](https://dash.cloudflare.com/?zone=workers) > **your Worker** > **Triggers** > **Routes** table.

Unless that Worker acts exclusively as a 'proxy' – meaning it will need to call `fetch(request)` on the incoming connection's HTTP request to connect to an application server defined in DNS – the Custom Domain is the best solution.