---
pcx_content_type: concept
title: Custom Domains
---

# Custom Domains

## Background

Custom Domains allow you to connect your Worker to a domain or subdomain, without having to make changes to your DNS settings or perform any certificate management. After you setup a Custom Domain for your Worker, Cloudflare will create DNS records and issue necessary certificates on your behalf. The created DNS records will point directly to your Worker.

## Add a custom domain

To add a Custom Domain, you must have:

1. An [active Cloudflare zone](/dns/zone-setups/).
2. A Worker to invoke.

Custom Domains can be attached to your Worker via the [Cloudflare dashboard](/workers/platform/triggers/custom-domains/#set-up-a-custom-domain-in-the-dashboard), [Wrangler](/workers/platform/triggers/custom-domains/#set-up-a-custom-domain-in-your-wranglertoml) or the [API](https://developers.cloudflare.com/api/operations/worker-domain-list-domains).

{{<Aside type="warning">}}

You cannot create a Custom Domain on a hostname with an existing CNAME DNS record or on a zone you do not own.

{{</Aside>}}

### Set up a Custom Domain in the dashboard

To set up a Custom Domain in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers** and select your Worker.
3. Go to **Triggers** > **Custom Domains** > **Add Custom Domain**.
4. Enter the domain you want to configure for your Worker.
5. Select **Add Custom Domain**.

After you have added the domain or subdomain, Cloudflare will create a new DNS record for you. You can add multiple Custom Domains.

### Set up a Custom Domain in your `wrangler.toml`

To configure a Custom Domain in your `wrangler.toml`, add the `custom_domain=true` option on each pattern under `routes`. For example, to configure a Custom Domain:

```toml
routes = [
	{ pattern = "shop.example.com", custom_domain = true }
]
```

To configure multiple Custom Domains:

```toml
routes = [
	{ pattern = "shop.example.com", custom_domain = true },
	{ pattern = "shop-two.example.com", custom_domain = true }
]
```

## Fetch

Custom Domains are considered the origin for your request. Other Workers on the Cloudflare network will treat your Custom Domain as an external origin when sending a `fetch()` request. This is important because if your Worker was not a Custom Domain, the only available Worker to Worker communication is [service bindings]().

Calling `fetch()` on the incoming request object would not work. Instead, create new `Request` objects to reference any external dependencies, or use Cloudflare's built in primitives via bindings.

![Workers can use the fetch API to request external dependencies](/workers/platform/triggers/media/custom-domains-dependencies.png)

## 

Another benefit of integration with Cloudflare DNS is that you can use your Custom Domains like you would any external dependency. Your Workers can `fetch()` Custom Domains and invoke their associated Worker, even if the Worker is on the same Cloudflare zone. The newly invoked Worker is treated like a new top-level request and will execute in a separate thread.

![Custom Domains can stack on top of each other, like any external dependencies](/workers/platform/triggers/media/custom-domains-subrequest.png)

## Ordering

Custom Domains follow standard DNS ordering and matching logic. Custom Domains do not support wildcard records; as such, an incoming request must match the hostname your Custom Domain is registered to. Other parts of the URI are not considered when executing this matching logic. For example, if you create a Custom Domain on `api.example.com` attached to your `api-gateway` Worker, a request to either `api.example.com/login` or `api.example.com/user` would invoke the same `api-gateway` Worker.

![Custom Domains follow standard DNS ordering and matching logic](/workers/platform/triggers/media/custom-domains-api-gateway.png)

## Interaction with Routes

Custom Domains are evaluated before route rules, but take lower precedence. [Routes](/workers/platform/triggers/routes) defined on your Custom Domain will run first, and can optionally call the Worker registered on your Custom Domain by issuing `fetch(request)` with the incoming `Request` object.

In the example below, a Custom Domain for `api.example.com` can point to your Worker `api`. A route added to `api.example.com/auth` can point to your Worker `auth`. A request to `api.example.com//auth` will trigger the `auth` Worker. Using `fetch(request)` within the Worker `auth` will invoke the Worker `api`, as if it was a normal application server. This means you can run your Workers in series, creating layers of proxy Workers and application Workers.

![Routes can be run in front of Custom Domains](/workers/platform/triggers/media/routes-with-custom-domains.png)

## Certificates

Creating a Custom Domain will also generate an [Advanced Certificate](/ssl/edge-certificates/advanced-certificate-manager/) on your target zone for your target hostname.

These certificates are generated with default settings. To override these settings, delete the generated certificate and create your own certificate in the Cloudflare dashboard. Refer to [Manage advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) for instructions.

## Migrate from Routes

If you are currently invoking a Worker using a [route](/workers/platform/triggers/routes) with `/*`, and you have a CNAME record pointing to `100::` or similar, a Custom Domain is a recommended replacement.

### Migrate from Routes via the dashboard

To migrate the route `example.com/*`:

1. Log in to the [Cloudflare dashboard](https://dash.clouflare.com) and select your account.
2. Go to **DNS** and delete the CNAME record for `example.com`.
3. Go to **Account Home** > **Workers** > select your Worker > **Triggers**.
4. Select **Add Custom Domain** and add `example.com`.
5. Delete the route `example.com/*` located in your Worker > **Triggers** > **Routes**.

### Migrate from Routes via Wrangler

To migrate the route `example.com/*` in your `wrangler.toml`:

1. Log in to the [Cloudflare dashboard](https://dash.clouflare.com) and select your account.
2. Go to **DNS** and delete the CNAME record for `example.com`.
3. Add the following to your `wrangler.toml` file:

```toml
routes = [
	{ pattern = "example.com", custom_domain = true }
]
```

4. Run `wrangler publish` to create the Custom Domain your Worker will run on.
