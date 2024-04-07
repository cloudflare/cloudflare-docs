---
title: Local development
weight: 2
pcx_content_type: concept
meta:
  description: Develop your Workers locally via Wrangler.
---

# Local development

Cloudflare Workers and most connected resources can be fully developed and tested locally - providing confidence that the applications you build locally will work the same way in production. This allows you to be more efficient and effective by providing a faster feedback loop and removing the need to test against remote resources. Local development runs against the same production runtime used by Cloudflare Workers, [workerd](https://github.com/cloudflare/workerd).

In addition to testing Workers locally with [`wrangler dev`](/workers/wrangler/commands/#dev), the use of Miniflare allows you to test other Developer Platform products locally, such as [R2](/r2/), [KV](/kv/), [D1](/d1/), and [Durable Objects](/durable-objects/).

## Start a local development server

{{<Aside type="note">}}

This guide assumes you are using [Wrangler v3.0](https://blog.cloudflare.com/wrangler3/) or later.

Users new to Wrangler CLI and Cloudflare Workers should visit the [Wrangler Install/Update guide](/workers/wrangler/install-and-update) to install `wrangler`.

{{</Aside>}}

Wrangler provides a [`dev`](/workers/wrangler/commands/#dev) command that starts a local server for developing your Worker. Make sure you have `npm` installed and run the following in the folder containing your Worker application:

```sh
$ npx wrangler dev
```

`wrangler dev` will run the preview of the Worker directly on your local machine. `wrangler dev` uses a combination of `workerd` and [Miniflare](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare), a simulator that allows you to test your Worker against additional resources like KV, Durable Objects, WebSockets, and more.

Resources such as KV, Durable Objects, D1, and R2 will be stored and persisted locally and not affect live production or preview data. Wrangler will automatically create local versions of bindings found in `wrangler.toml`. These will not have data in them initially, so you will need to add data manually.

### Supported resource bindings in different environments

| Product                                   | Local Dev Supported | Remote Dev Supported |
| ----------------------------------------- | ------------------- | -------------------- |
| R2                                        | ✅                  | ✅                   |
| KV                                        | ✅                  | ✅                   |
| D1                                        | ✅                  | ✅                   |
| Durable Objects                           | ✅                  | ✅                   |
| Queues                                    | ✅                  | ❌                   |
| Service Bindings (multiple workers)       | ✅                  | ✅                   |
| AI                                        | ✅[^1]              | ✅                   |
| Hyperdrive                                | ✅                  | ✅                   |
| Rate Limiting                             | ✅                  | ✅                   |
| mTLS                                      | ❌                  | ✅                   |
| Browser Rendering                         | ❌                  | ✅                   |
| Analytics Engine                          | ❌                  | ✅                   |
| Vectorize                                 | ❌                  | ✅                   |

With any bindings that are not supported locally, you will need to use the `--remote` command in wrangler, such as `wrangler dev --remote`.

[^1]: Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.

### Clear Wrangler's local storage

Wrangler will store all locally created resources and storage in a `.wrangler` folder inside your Worker directory. This folder should be added to your `.gitignore` file.

If you need to clear local storage, delete the `.wrangler/state` folder. It will be recreated the next time you run `wrangler dev`.

### Develop locally using remote resources and bindings

{{<Aside type="note">}}

Developing against remote resources will count towards billable usage. `wrangler dev --remote` will leverage remote production resources specified in your `wrangler.toml`. These resources will use production data, and will count towards account usage for billing purposes.

{{</Aside>}}

`wrangler dev` runs locally by default. This means that all resources and bindings are simulated locally as well. However, there may be times you need to develop against remote resources and bindings. To run `wrangler dev` remotely, add the `--remote` flag:

```sh
$ npx wrangler dev --remote
```

Remote resources to use during `wrangler dev --remote` are specified with preview ID/names such as `preview_id` or `preview_bucket name`. Preview resources can be resources separate from production resources to prevent changing production data in development. `wrangler dev --remote` only supports preview ID/names for storage resources such as KV, R2, and D1. To change production data in `wrangler dev --remote`, set the preview ID/name of the resource to the ID/name of the production resource.

### Customize `wrangler dev`

You can customize how `wrangler dev` works to fit your needs. Refer to [the `wrangler dev` documentation](/workers/wrangler/commands/#dev) for available configuration options.

{{<Aside type="warning">}}

There is a bug associated with how outgoing requests are handled when using `wrangler dev --remote`. For more information, read the [Known issues section](/workers/platform/known-issues/#wrangler-dev).

{{</Aside>}}

## Related resources

* [Debugging tools](/workers/testing/debugging-tools) - Tools to help you diagnose issues and gain insight into your Workers.
