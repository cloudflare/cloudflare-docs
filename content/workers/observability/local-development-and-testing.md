---
title: Local development and testing
weight: 6
pcx_content_type: concept
---

# Local development and testing

Cloudflare Workers can be fully developed and tested locally - providing confidence that the applications you develop locally work the same way in production. This allows you to be more efficient and effective by providing a faster feedback loop and removing the need to test against remote resources. Local development runs against the same production runtime used by Cloudflare Workers, [workerd](https://github.com/cloudflare/workerd).

In addition to testing Workers locally with `wrangler dev`, the use of Miniflare allows you to test other Developer Platform products locally, such as [R2](/r2/), [KV](/kv/), [D1](/d1/), and [Durable Objects](/durable-objects/).


## Start a local development server

{{<Aside type="note">}}

This guide assumes you are using [Wrangler v3.0](https://blog.cloudflare.com/wrangler3/) or later.

Users new to Wrangler CLI and Cloudflare Workers should visit the [Wrangler Install/Update guide](/wrangler/install-and-update) to install `wrangler`.

{{</Aside>}}

Wrangler provides a [`dev`](/workers/wrangler/commands/#dev) command that starts a local server for developing your Worker. Make sure you have `npm` installed and run the following in the folder containing your Worker application:

```sh
$ npx wrangler dev
```

`wrangler dev` will run the preview of the Worker directly on your local machine. `wrangler dev` uses a combination of `workerd` and [Miniflare](https://github.com/cloudflare/miniflare), a simulator that allows you to test your Worker against additional resources like KV, Durable Objects, WebSockets, and more.

### Developing locally using remote resources and bindings

{{<Aside type="note">}}

Developing against remote resources will count towards billable usage.

{{</Aside>}}

`wrangler dev` runs locally by default. This means that all resources and bindings are simulated locally as well. However, there may be times you need to develop against remote resources and bindings. To run `wrangler dev` remotely, add the `--remote flag`:

```sh
$ npx wrangler dev --remote
```

### Customize `wrangler dev`

You can customize how `wrangler dev` works to fit your needs. Refer to [the `wrangler dev` documentation](/workers/wrangler/commands/#dev) for available configuration options.

{{<Aside type="warning">}}

There is a bug associated with how outgoing requests are handled when using `wrangler dev --remote`. For more information, read the [Known issues section](/workers/platform/known-issues/#wrangler-dev).

{{</Aside>}}

## Test Workers

### Integration testing

Wrangler offers an experimental API, `unstable_dev`, that will allow you to start a server for integration testing. For more information and examples, read the [`unstable_dev` guide](/workers/wrangler/api/#unstable_dev).
