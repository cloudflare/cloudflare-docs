---
pcx_content_type: concept
title: Routes
---

# Routes

Routes allow users to map a URL pattern to a Worker.

There are three types of routes:

1. Pattern routes: Routes that are set within a proxied (orange-clouded) Cloudflare zone where your origin server, if you have one, is behind a Worker that the Worker can communicate with.
2. Custom domain routes: Routes to a domain (such as `shop.example.com`) within a Cloudflare zone where the Worker is the origin.
3. `workers.dev` route: The `workers.dev` subdomain route automatically created for your Worker that you can disable.

## Customize your routes

Route setup will differ depending on if your application's origin is a Worker or not. When your Worker is your application's origin, use [Custom Domains](/workers/platform/triggers/custom-domains/). When your Worker is not the origin but is communicating with your origin, set up a pattern route by following the instructions below.

### Set up a route

To configure routes on a Worker that is not your origin server, you must have a valid, proxied (orange-clouded) domain on your Cloudflare zone that points to your origin.

Routes can also be created via the API. Refer to the [Workers Routes API documentation](https://developers.cloudflare.com/api/operations/worker-routes-list-routes) for more information. 

#### Set up a route in the dashboard

To set up a route in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers** and select your Worker.
3. Go to **Triggers** > **Routes** > **Add route**.
4. Enter the pattern route and select the zone it applies to.

#### Set up a route in `wrangler.toml`

To configure a route using your `wrangler.toml` file, use the following syntax and add the `zone_name` or `zone_id` option after each route. The - and - options are interchangeable and you can use whatever you want. Find the zone id in ---.

```toml
routes = [
	{ pattern = "subdomain.example.com/*", zone_name = "example.com" },
    // or
	{ pattern = "subdomain-two.example.com/example", zone_id =" "aa00a000a0a0000000aaa0a0a0aa0aa0" }
]
```

{{<Aside type="note" header="zone_id or zone_name">}}
The `zone_id` and `zone_name` options are interchangeable. However, if using Cloudflare for SaaS with a `*/*` pattern, to avoid errors, use the `zone_name` options. Currently, [publishing `*/*` routes with a `zone_id` option fails with an `Invalid URL` error](https://github.com/cloudflare/workers-sdk/issues/2953).
{{</Aside>}}

### Set up a route (custom domains)

If your Worker is the origin, the easiest way to set up a route is via Custom Domains. The use of pattern routes is available but more tedious. Refer to [Custom Domains] for [dashboard setup] and `wrangler.toml` setup instructions.

#### dashboard

Go to your Worker > Triggers > Custom Domains > Add custom domains. Add the custom domain you want. Cloudflare created the DNS record for you. This is the route that your Worker runs on. You can add multiple custom domain routes using the Custom Domains feature. 

#### wrangler.toml

To create a Custom Domain route in your `wrangler.toml` file, following the following syntax and make sure to add the `custom_domain=true` option on each route. For example, multiple Custom Domains may be configured like so:

```toml
routes = [
	{ pattern = "subdomain.example.com", custom_domain = true },
	{ pattern = "subdomain-two.example.com", custom_domain = true }
]
```

## Routes with `*.workers.dev`

Cloudflare Workers accounts come with a `*.workers.dev` subdomain that is configurable in the Cloudflare dashboard. Your `*.workers.dev` subdomain allows you to deploy Workers [without attaching your domain as a Cloudflare zone](https://blog.cloudflare.com/announcing-workers-dev/).

To claim a `*.workers.dev` subdomain, such as `<YOUR_SUBDOMAIN>.workers.dev`, go to **Account Home** > [**Workers**](https://dash.cloudflare.com/?zone=workers) > **Your subdomain**. The `name` field in your Worker configuration is used as the preview subdomain for the deployed script, (for example, `my-worker.<YOUR_SUBDOMAIN>.workers.dev.`).

Some features are not available on the `workers.dev` route, such as the cache API. The `workers.dev` route is automatically set up. You can check this in the dashboard under Routes. To disable the `workers.dev` route, wrangler.toml way -> the dashboard will change to disabled. If you do a dashboard disable, the next time you publish and do not include workers_dev = false, it will re-enable. 

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

#### Subdomains must have a DNS Record

All subdomains must have a [DNS record](https://support.cloudflare.com/hc/en-us/articles/360019093151#h_60566325041543261564371) to be proxied on Cloudflare and used to invoke a Worker. For example, if you want to put a Worker on `myname.example.com`, and you have added `example.com` to Cloudflare but have not added any DNS records for `myname.example.com`, any request to `myname.example.com` will result in the error `ERR_NAME_NOT_RESOLVED`.

{{<Aside type="warning">}}

If you have previously used the Cloudflare dashboard to add an `AAAA` record for `myname` to `example.com`, pointing to `100::` (the [reserved IPv6 discard prefix](https://tools.ietf.org/html/rfc6666)), Cloudflare recommends creating a [custom domain](/workers/platform/triggers/custom-domains/) pointing to your Worker instead.

{{</Aside>}}