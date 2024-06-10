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

`wrangler dev` will run the Worker directly on your local machine. `wrangler dev` uses a combination of `workerd` and [Miniflare](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare), a simulator that allows you to test your Worker against additional resources like KV, Durable Objects, WebSockets, and more.

### Supported resource bindings in different environments

| Product                                   | Local Dev Supported | Remote Dev Supported |
| ----------------------------------------- | ------------------- | -------------------- |
| AI                                        | ✅[^1]              | ✅                   |
| Analytics Engine                          | ❌                  | ✅                   |
| Browser Rendering                         | ❌                  | ✅                   |
| D1                                        | ✅                  | ✅                   |
| Durable Objects                           | ✅                  | ✅                   |
| Email Bindings                            | ❌                  | ✅                   |
| Hyperdrive                                | ✅                  | ✅                   |
| KV                                        | ✅                  | ✅                   |
| mTLS                                      | ❌                  | ✅                   |
| Queues                                    | ✅                  | ❌                   |
| R2                                        | ✅                  | ✅                   |
| Rate Limiting                             | ✅                  | ✅                   |
| Service Bindings (multiple workers)       | ✅                  | ✅                   |
| Vectorize                                 | ❌                  | ✅                   |

With any bindings that are not supported locally, you will need to use the `--remote` command in wrangler, such as `wrangler dev --remote`.

[^1]: Using Workers AI always accesses your Cloudflare account in order to run AI models and will incur usage charges even in local development.

## Work with local data

When running `wrangler dev`, resources such as KV, Durable Objects, D1, and R2 will be stored and persisted locally and not affect the production resources. 

### Use bindings in `wrangler.toml`

[Wrangler](/workers/wrangler/) will automatically create local versions of bindings found in the `wrangler.toml` [configuration file](/workers/wrangler/configuration/). These local resources will not have data in them initially, so you will need to add data manually via Wrangler commands and the [`--local` flag](/workers/testing/local-development/#use---local-flag).

When you run `wrangler dev` Wrangler stores local resources in a `.wrangler/state` folder, which is automatically created.

If you prefer to specify a directory, you can use the [`--persist-to`](/workers/wrangler/commands/#dev) flag with `wrangler dev` like this:

```sh
$ npx wrangler dev --persist-to <DIRECTORY>
```

Using this will write all local storage and cache to the specified directory instead of `.wrangler`.

{{<Aside type="note">}}

This local persistence folder should be added to your `.gitignore` file.

{{</Aside>}}

### Use `--local` flag

The following [Wrangler commands](/workers/wrangler/commands/) have a `--local` flag which allows you to create, update, and delete local data during development:

| Command                                    |
| ----------------------------------------------------|
| [`d1 execute`](/workers/wrangler/commands/#execute) |
| [`kv:key`](/workers/wrangler/commands/#kvkey) |
| [`kv:bulk`](/workers/wrangler/commands/#kvbulk) |
| [`r2 object`](/workers/wrangler/commands/#r2-object) |

If using `--persist-to` to specify a custom folder with `wrangler dev` you should also add `--persist-to` with the same directory name along with the `--local` flag when running the commands above. For example, to put a custom KV key into a local namespace via the CLI you would run:

```sh
$ npx wrangler kv:key put test 12345 --binding MY_KV_NAMESPACE --local --persist-to worker-local
```

Running `wrangler kv:key put` will create a new key `test` with a value of `12345` on the local namespace specified via the binding `MY_KV_NAMESPACE` in `wrangler.toml`. This example command sets the local persistence directory to `worker-local` using `--persist-to`, to ensure that the data is created in the correct location. If `--persist-to` was not set, it would create the data in the `.wrangler` folder.

### Clear Wrangler's local storage

If you need to clear local storage entirely, delete the `.wrangler/state` folder. You can also be more fine-grained and delete specific resource folders within `.wrangler/state`.

Any deleted folders will be created automatically the next time you run `wrangler dev`.

## Develop using remote resources and bindings

There may be times you want to develop against remote resources and bindings. To run `wrangler dev` in remote mode, add the `--remote` flag, which will run both your code and resources remotely:

```sh
$ npx wrangler dev --remote
```

For some products like KV and R2, remote resources used for `wrangler dev --remote` must be specified with preview ID/names in `wrangler.toml` such as `preview_id` for KV or `preview_bucket name` for R2. Resources used for remote mode (preview) can be different from resources used for production to prevent changing production data during development. To use production data in `wrangler dev --remote`, set the preview ID/name of the resource to the ID/name of your production resource.

## Customize `wrangler dev`

You can customize how `wrangler dev` works to fit your needs. Refer to [the `wrangler dev` documentation](/workers/wrangler/commands/#dev) for available configuration options.

{{<Aside type="warning">}}

There is a bug associated with how outgoing requests are handled when using `wrangler dev --remote`. For more information, read the [Known issues section](/workers/platform/known-issues/#wrangler-dev).

{{</Aside>}}

## Related resources

* [D1 local development](/d1/build-with-d1/local-development/) - The official D1 guide to local development and testing.
* [Debugging tools](/workers/testing/debugging-tools) - Tools to help you diagnose issues and gain insight into your Workers.
