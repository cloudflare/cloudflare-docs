---
pcx_content_type: concept
title: Custom Domains
---

# Custom Domains

## Background

Custom Domains allow you to connect your Worker to a domain or subdomain, without having to make changes to your DNS settings or perform any certificate management. After you setup a Custom Domain for your Worker, Cloudflare will create DNS records and issue necessary certificates on your behalf. The created DNS records will point directly to your Worker. Unlike [Routes](/workers/platform/triggers/routes/#set-up-a-route), Custom Domains point the _entirety_ of a domain or subdomain at your Worker, with no URL matching.

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

## External communication

When running a Worker on a [route](/workers/platform/triggers/routes/#set-up-a-route), or on a [`workers.dev`](http://localhost:5173/workers/platform/triggers/routes/#routes-with-workersdev) subdomain, the only way to communicate with _other_ Workers on the same zone is via [service bindings](/workers/platform/bindings/about-service-bindings/). With a Worker running on a Custom Domain that limitation is removed and other Workers running on the same zone can send fetch requests to Workers running on a Custom Domain.

For example, consider the following scenario, where both Workers are running on the `example.com` Cloudflare zone:

- `worker-a` running on the [route](/workers/platform/triggers/routes/#set-up-a-route) `auth.example.com/*`
- `worker-b` running on the [route](/workers/platform/triggers/routes/#set-up-a-route) `shop.example.com/*`

If `worker-a` sends a fetch request to `worker-b`, the request will fail, because of the limitation on same-zone fetch requests:

```js
---
header: worker-a
highlight: [4]
---
export default {
	fetch(request) {
		// This will fail
		return fetch("https://shop.example.com")
	}
}
```

However, if `worker-b` was instead set up to run on the Custom Domain `shop.example.com`, the fetch request would succeed.

## Request matching behaviour

Custom Domains do not support wildcard DNS records; as such, an incoming request must exactly match the domain or subdomain your Custom Domain is registered to. Other parts of the URL are not considered when executing this matching logic. For example, if you create a Custom Domain on `api.example.com` attached to your `api-gateway` Worker, a request to either `api.example.com/login` or `api.example.com/user` would invoke the same `api-gateway` Worker.

![Custom Domains follow standard DNS ordering and matching logic](/workers/platform/triggers/media/custom-domains-api-gateway.png)

## Interaction with [Routes](/workers/platform/triggers/routes/#set-up-a-route)

A Worker running on a Custom Domain is treated as an origin. That means that you're able to setup Workers to run before a request gets to your Custom Domain Worker (in other words, you can chain together two Workers in the same request). Any Workers running on routes before your Custom Domain can optionally call the Worker registered on your Custom Domain by issuing `fetch(request)` with the incoming `Request` object.

For example, a Custom Domain for `api.example.com` can point to your Worker `api-worker`. A route added to `api.example.com/auth` can point to your Worker `auth-worker`. A request to `api.example.com/auth` will trigger the `auth-worker` Worker. Using `fetch(request)` within the Worker `auth-worker` will invoke the Worker `api-worker`, as if it was a normal application server.

```js
---
header: auth-worker
highlight: [8]
---
export default {
	fetch(request) {
		const url = new URL(request.url)
		if(url.searchParams.get("auth") !== "SECRET_TOKEN") {
			return new Response(null, { status: 401 })
		} else {
			// This will invoke `api-worker`
			return fetch(request)
		}
	}
}
```

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
