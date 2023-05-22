---
pcx_content_type: concept
title: Routes
---

# Routes

## Background

Routes allow users to map a URL pattern to a Worker. When a request comes in to the Cloudflare network that matches the specified URL pattern, your Worker will execute on that route.

## Types of routes

There are three types of routes:

* Routes: Routes that are set within a Cloudflare zone where your origin server, if you have one, is behind a Worker that the Worker can communicate with.
* Custom Domains: Routes to a domain or subdomain (such as `example.com` or `shop.example.com`) within a Cloudflare zone where the Worker is the origin.`
* `workers.dev`: The `workers.dev` subdomain route automatically created for your Worker that you can disable.

## Set up a route

To add a route, you must have:

1. An [active Cloudflare zone](/dns/zone-setups/).
2. A Worker to invoke.
3. An orange-clouded DNS record set up for the [domain](/dns/manage-dns-records/how-to/create-root-domain/) or [subdomain](/dns/manage-dns-records/how-to/create-subdomain/) you would like to route to.

{{<Aside type="warning">}}
Route setup will differ depending on if your application's origin is a Worker or not. If your Worker is your application's origin, use [Custom Domains](/workers/platform/triggers/custom-domains/).
{{</Aside>}}

If your Worker is not your application's origin, follow the instructions below to set up a route.

{{<Aside type="note">}}
Routes can also be created via the API. Refer to the [Workers Routes API documentation](https://developers.cloudflare.com/api/operations/worker-routes-list-routes) for more information.
{{</Aside>}}

### Set up a route in the dashboard

Before you set up a route, make sure you have a DNS record set up for the [domain](/dns/manage-dns-records/how-to/create-root-domain/) or [subdomain](/dns/manage-dns-records/how-to/create-subdomain/) you would like to route to.

To set up a route in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers** and select your Worker.
3. Go to **Triggers** > **Routes** > **Add route**.
4. Enter the route and select the zone it applies to.
5. Select **Add route**.

### Set up a route in `wrangler.toml`

Before you set up a route, make sure you have a DNS record set up for the [domain](/dns/manage-dns-records/how-to/create-root-domain/) or [subdomain](/dns/manage-dns-records/how-to/create-subdomain/) you would like to route to.

To configure a route using your `wrangler.toml` file, refer to the following example.

```toml
routes = [
	{ pattern = "subdomain.example.com/*", zone_name = "example.com" }
	# or
	{ pattern = "subdomain.example.com/*", zone_id = "<YOUR_ZONE_ID>" }
]
```

Add the `zone_name` or `zone_id` option after each route. The `zone_name` and `zone_id` options are interchangeable. If using `zone_id`, find your zone ID by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com) > select your account > select your website > find the **Zone ID** in the lefthand side of **Overview**.

To add multiple routes:

```toml
routes = [
	{ pattern = "subdomain.example.com/*", zone_name = "example.com" },
	{ pattern = "subdomain-two.example.com/example", zone_id = "<YOUR_ZONE_ID>" }
]
```

{{<Aside type="note">}}
The `zone_id` and `zone_name` options are interchangeable. However, if using Cloudflare for SaaS with a `*/*` pattern, use the `zone_name` option to avoid errors. Currently, [publishing `*/*` routes with a `zone_id` option fails with an `Invalid URL` error](https://github.com/cloudflare/workers-sdk/issues/2953).
{{</Aside>}}

## Routes with `*.workers.dev`

Cloudflare Workers accounts come with a `*.workers.dev` subdomain that is configurable in the Cloudflare dashboard. Your `*.workers.dev` subdomain allows you to deploy Workers without attaching your domain as a Cloudflare zone. Refer to the [`workers.dev` blog announcement](https://blog.cloudflare.com/announcing-workers-dev/) for more information.

To claim a `*.workers.dev` subdomain, such as `<YOUR_SUBDOMAIN>.workers.dev`:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers**.
3. Select **Change** next to **Your subdomain**. The `name` field in your Worker configuration is used as the preview subdomain for the deployed Worker, (for example, `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev.`).

When you create your Worker, the `workers.dev` route is automatically set up. Review this in your Worker > **Triggers** > **Routes**.

To disable the `workers.dev` route, include the following in your Worker's `wrangler.toml` file:

```toml
workers_dev = false
```

When you redeploy your Worker with this change, the `workers.dev` route will be disabled.

{{<Aside type="warning">}}
If you disable your `workers.dev` route in the Cloudflare dashboard but do not update your Worker's `wrangler.toml` file with `workers_dev = false`, the `workers.dev` route will re-enable the next time you publish your Worker.
{{</Aside>}}

## Matching behavior

Route patterns look like this:

```txt
https://*.example.com/images/*
```

This pattern would match all HTTPS requests destined for a subhost of
example.com and whose paths are prefixed by `/images/`.

A pattern to match all requests looks like this:

```txt
*example.com/*
```

While they look similar to a [regex](https://en.wikipedia.org/wiki/Regular_expression) pattern, route patterns follow specific rules:

- The only supported operator is the wildcard (`*`), which matches zero or more of any character.

- Route patterns may not contain infix wildcards or query parameters. For example, neither `example.com/*.jpg` nor `example.com/?foo=*` are valid route patterns.

- When more than one route pattern could match a request URL, the most specific route pattern wins. For example, the pattern `www.example.com/*` would take precedence over `*.example.com/*` when matching a request for `https://www.example.com/`. The pattern `example.com/hello/*` would take precedence over `example.com/*` when matching a request for `example.com/hello/world`.

- Route pattern matching considers the entire request URL, including the query parameter string. Since route patterns may not contain query parameters, the only way to have a route pattern match URLs with query parameters is to terminate it with a wildcard, `*`.

- Route patterns are case sensitive, for example, `example.com/Images/*` and `example.com/images/*` are two distinct routes.

A route can be specified without being associated with a Worker. This will act to negate any less specific patterns. For example, consider this pair of route patterns, one with a Workers script and one without:

```txt
*example.com/images/cat.png -> <no script>
*example.com/images/*       -> worker-script
```

In this example, all requests destined for example.com and whose paths are prefixed by `/images/` would be routed to `worker-script`, _except_ for `/images/cat.png`, which would bypass Workers completely. Requests with a path of `/images/cat.png?foo=bar` would be routed to `worker-script`, due to the presence of the query string.

## Validity

The following set of rules govern route pattern validity.

#### Route patterns must include your zone

If your zone is `example.com`, then the simplest possible route pattern you can have is `example.com`, which would match `http://example.com/` and `https://example.com/`, and nothing else. As with a URL, there is an implied path of `/` if you do not specify one.

#### Route patterns may not contain any query parameters

For example, `https://example.com/?anything` is not a valid route pattern.

#### Route patterns may optionally begin with `http://` or `https://`

If you omit a scheme in your route pattern, it will match both `http://` and `https://` URLs. If you include `http://` or `https://`, it will only match HTTP or HTTPS requests, respectively.

- `https://*.example.com/` matches `https://www.example.com/` but not `http://www.example.com/`.

- `*.example.com/` matches both `https://www.example.com/` and `http://www.example.com/`.

#### Hostnames may optionally begin with `*`

If a route pattern hostname begins with `*`, then it matches the host and all subhosts. If a route pattern hostname begins with `*.`, then it only matches all subhosts.

- `*example.com/` matches `https://example.com/` and `https://www.example.com/`.

- `*.example.com/` matches `https://www.example.com/` but not `https://example.com/`.

#### Paths may optionally end with `*`

If a route pattern path ends with `*`, then it matches all suffixes of that path.

- `https://example.com/path*` matches `https://example.com/path` and `https://example.com/path2` and `https://example.com/path/readme.txt`

{{<Aside type="warning">}}

There is a well-known bug associated with path matching concerning wildcards (`*`) and forward slashes (`/`) that is documented in [Known issues](/workers/platform/known-issues/).

{{</Aside>}}

#### Domains and subdomains must have a DNS Record

All domains and subdomains must have a [DNS record](/dns/manage-dns-records/how-to/create-dns-records/) to be proxied on Cloudflare and used to invoke a Worker. For example, if you want to put a Worker on `myname.example.com`, and you have added `example.com` to Cloudflare but have not added any DNS records for `myname.example.com`, any request to `myname.example.com` will result in the error `ERR_NAME_NOT_RESOLVED`.

{{<Aside type="warning">}}

If you have previously used the Cloudflare dashboard to add an `AAAA` record for `myname` to `example.com`, pointing to `100::` (the [reserved IPv6 discard prefix](https://tools.ietf.org/html/rfc6666)), Cloudflare recommends creating a [Custom Domain](/workers/platform/triggers/custom-domains/) pointing to your Worker instead.

{{</Aside>}}
