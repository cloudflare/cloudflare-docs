---
title: Local development and testing
weight: 6
pcx_content_type: concept
---

# Local development and testing

Cloudflare Workers can be fully developed and tested locally. This allows you to be more efficient and effective by providing a faster feedback loop and removing the need to test against remote resources. Local development runs against the same production runtime used by Cloudflare Workers, [workerd](https://github.com/cloudflare/workerd). By doing this, you can have confidence that the applications you develop locally should work the same way in production.


## Starting a local development server

{{<Aside type="note">}}

This guide assumes you are using [Wrangler v3.0](https://blog.cloudflare.com/wrangler3/) or later.

Users new to Wrangler CLI and Cloudflare Workers should visit the Wrangler Install/Update guide(/wrangler/install-and-update) to install `wrangler`.

{{</Aside>}}

Wrangler provides a [`dev`](/workers/wrangler/commands/#dev) command that will start a local server for developing your Worker. To start a new local server run the following in your Worker folder:

```sh
$ wrangler dev
```

`wrangler dev` will run the preview of the Worker directly on your local machine. This uses a combination of `workerd` and Miniflare, a simulator that allows you to also test your Worker against Worker resources like: KV, Durable Objects, WebSockets, and more.

### Developing locally using remote resources and bindings

{{<Aside type="note">}}

Developing against remote resources will count towards actual usage.

{{</Aside>}}

`wrangler dev` runs locally by default. This means that all resources and bindings are simulated locally as well. However, we understand that there may be times you need to develop against remote resources and bindings. To do this, you'll want to add the `--remote` flag to `wrangler dev` like this:

```sh
$ wrangler dev --remote
```

### Customizing `wrangler dev`

You can customize how `wrangler dev` works to fit your needs. Refer to [the `wrangler dev` documentation](/workers/wrangler/commands/#dev) for available configuration options.

{{<Aside type="warning">}}

There is a bug associated with `wrangler dev --remote` documented in the [Known issues section](/workers/platform/known-issues/#wrangler-dev).

{{</Aside>}}

## Testing Workers

### Integration testing

Wrangler offers an experimental API, `unstable_dev`, that will allow you to start a server for integration testing. For more information and examples, read the [`unstable_dev` guide](/workers/wrangler/api/#unstable_dev).
