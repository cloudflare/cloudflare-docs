---
pcx_content_type: troubleshooting
title: Debugging Workers
weight: 3
---

# Debugging Workers

Debugging is a critical part of developing a new application — whether running code in the initial stages of development, or trying to understand an issue occurring in production. In this article, you will learn how to effectively debug your Workers application, as well as review some code samples to help you get started:

{{<youtube id="8iPmy7ePYDE">}}

---

## Local testing with `wrangler dev`

The [`wrangler dev`](/workers/wrangler/commands/#dev) command starts a local server for developing your Worker. `wrangler dev` allows you to get feedback quickly while iterating by exposing logs on `localhost` and to experiment without deploying to production. `wrangler dev` can significantly reduce the time it takes to test and debug new features.

`wrangler dev` will run the preview of the Worker directly on your local machine using the open source Cloudflare Workers runtime, [workerd](https://github.com/cloudflare/workerd) and the Miniflare simulator.

In addition to testing Workers locally with `wrangler dev`, the use of Miniflare allows you to test other Developer Platform products, such as [R2](/r2/), [KV](/workers/runtime-apis/kv/), [D1](/d1/), and [Durable Objects](/workers/learning/using-durable-objects/).

### Local testing against remote resources

While `wrangler dev` runs locally by default, you can run `wrangler dev --remote` to deploy your application to the edge preview service, and make it available for access on `localhost`:

```sh
$ wrangler dev

  Built successfully, built project size is 27 KiB.
  Using namespace for Workers Site "__app-workers_sites_assets_preview"
  Uploading site files
  Listening on http://localhost:8787

[2020-05-28 10:42:33] GET example.com/ HTTP/1.1 200 OK
[2020-05-28 10:42:35] GET example.com/static/nav-7cb303.png HTTP/1.1 200 OK
[2020-05-28 10:42:36] GET example.com/sw.js HTTP/1.1 200 OK
```

In the output above, you can begin to see log lines for the URLs being requested locally.

{{<Aside type="info">}}

Unlike `wrangler dev`, which provides local instances of resources to develop against, `wrangler dev --remote` will leverage remote production resources specified in your `wrangler.toml`. These resources will use production data, and will count towards account usage for billing purposes.

{{</Aside>}}

### Additional info

You can customize how `wrangler dev` works to fit your needs. Refer to [the `wrangler dev` documentation](/workers/wrangler/commands/#dev) for available configuration options.

{{<Aside type="warning">}}

There is a bug associated with `wrangler dev --remote` documented in the [Known issues section](/workers/platform/known-issues/#wrangler-dev).

{{</Aside>}}

## Getting logs from deployed Workers

If you need more insight into currently deployed Workers, you can start a new session to livestream logs by running `wrangler tail`.

TBD: Insert screenshot.
