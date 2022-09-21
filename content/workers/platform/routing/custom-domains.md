---
pcx_content_type: concept
title: Custom Domains
---

# Custom Domains

## About Custom Domains

Custom Domains allow you to connect your Worker to a hostname, without having to make changes to your DNS settings or do extra certificate management. Cloudflare will create DNS records and issue necessary certificates on your behalf. The created DNS records will point directly to your Worker.

## Build a Custom Domain

To create a Custom Domain, you must have:

1. An active Cloudflare zone.
2. A Worker to invoke.

The interface provides active feedback on valid and invalid entries. Valid entries are hostnames on an active Cloudflare zone. Custom Domains can be attached to your Worker via API, Wrangler, or within the Cloudflare dashboard under **Account Home** > [**Workers**](https://dash.cloudflare.com/?zone=workers) > **your Worker** > **Triggers** > **Add Custom Domain**.

## Configure your `wrangler.toml`

To configure a subdomain for a Custom Domain in your `wrangler.toml`, add the following to your environment:

```toml
routes = [
	{ pattern = "subdomain.example.com", custom_domain = true, zone_name = "example.com" }
]
```

## Fetch

Custom Domains are considered the origin for your request. This means calling `fetch()` on the incoming request object is an anti-pattern (there's nowhere to go!). Instead, create new `Request` objects to reference any external dependencies, or use Cloudflare's built in primitives via bindings.

![Workers can use the fetch API to request external dependencies](/workers/platform/routing/media/custom-domains-dependencies.png)

Another benefit of integration with Cloudflare DNS is that you can use your Custom Domains like you would any external dependency. Your Workers can `fetch()` Custom Domains and invoke their associated Worker, even if the Worker is on the same Cloudflare zone. The newly invoked Worker is treated like a new top-level request and will execute in a separate thread.

![Custom Domains can stack on top of each other, like any external dependencies](/workers/platform/routing/media/custom-domains-subrequest.png)

## Ordering

Custom Domains follow standard DNS ordering and matching logic. Custom Domains do not support wildcard records; as such, an incoming request must match the hostname your Custom Domain is registered to. Other parts of the URI are not considered when executing this matching logic. For example, if you create a Custom Domain on `api.example.com` attached to your `api-gateway` Worker, a request to either `api.example.com/login` or `api.example.com/user` would invoke the same `api-gateway` Worker.

![Custom Domains follow standard DNS ordering and matching logic](/workers/platform/routing/media/custom-domains-api-gateway.png)

## Interaction with Routes

Custom Domains are evaluated before Route rules, but take lower precedence. [Routes](/workers/platform/routing/routes) defined on your Custom Domain will run first, and can optionally call the Worker registered on your Custom Domain by issuing `fetch(request)` with the incoming `Request` object.

In the example above, a Custom Domain for `api.example.com` can point to your Worker `api`. A Route added to `api.example.com/auth` can point to your Worker `auth`. A request to `api.example.com//auth` will trigger the `auth` Worker. Using `fetch(request)` within the Worker `auth` will invoke the Worker `api`, as if it was a normal application server. This means you can run your Workers in series, creating layers of proxy Workers and application Workers.

![Routes can be run in front of Custom Domains](/workers/platform/routing/media/routes-with-custom-domains.png)

## Certificates

Creating a Custom Domain will also generate an Advanced Certificate on your target zone, with a Subject Name of the target hostname. These certificates are generated with default settings. If you'd like to override these settings, you can manually create your certificate in the Cloudflare Dashboard or via API.

## Configuring your Custom Domain

Custom Domains need to be configured on an appropriate zone. If you attempt to create a Custom Domain on a hostname with an existing DNS record, Cloudflare will confirm that you would like to replace the existing record. If you attempt to create a Custom Domain on a zone you don't own, the attempt will fail.

## Migrate from Routes

If you are currently invoking a Worker using a [Route](/workers/platform/routing/routes) with `/*`, and your DNS points to `100::` or similar, a Custom Domain is a recommended replacement. 

To migrate the Route `app.example.com/*`, create a Custom Domain on `app.example.com`, replacing the existing record. You can then delete the route `app.example.com/*` in your **Account Home** > [**Workers**](https://dash.cloudflare.com/?zone=workers) > **your Worker** > **Triggers** > **Routes** table.

Unless that Worker acts exclusively as a proxy – meaning it will need to call `fetch(request)` on the incoming connection's HTTP request to connect to an application server defined in DNS – the Custom Domain is the recommended solution.
