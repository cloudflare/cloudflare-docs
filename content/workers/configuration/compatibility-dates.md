---
pcx_content_type: concept
title: Compatibility dates
layout: compatibility-dates
rss: https://github.com/cloudflare/cloudflare-docs/commits/production/content/workers/_partials/_platform-compatibility-dates.atom
outputs:
  - html
  - json
meta:
  description: Opt into a specific version of the Workers runtime for your Workers project.
---

# Compatibility dates

Cloudflare regularly updates the Workers runtime. These updates apply to all Workers globally and should never cause a Worker that is already deployed to stop functioning. Sometimes, though, some changes may be backwards-incompatible. In particular, there might be bugs in the runtime API that existing Workers may inadvertently depend upon. Cloudflare implements bug fixes that new Workers can opt into while existing Workers will continue to see the buggy behavior to prevent breaking deployed Workers.

The compatibility date (and flags) are how you, as a developer, opt into these runtime changes. Compatibility flags will often have a date in which they are enabled by default, and so, by specifying a `compatibility_date` for your Worker, you can quickly enable all of these various compatibility flags up to, and including, that date.

## Setting compatibility date

When you start your project, you should always set `compatibility_date` to the current date. You should occasionally update the `compatibility_date` field. When updating, you should refer to this page to find out what has changed, and you should be careful to test your Worker to see if the changes affect you, updating your code as necessary. The new compatibility date takes effect when you next run the [`npx wrangler deploy`](/workers/wrangler/commands/#deploy) command.

There is no need to update your `compatibility_date` if you do not want to. The Workers runtime will support old compatibility dates forever. If, for some reason, Cloudflare finds it is necessary to make a change that will break live Workers, Cloudflare will actively contact affected developers. That said, Cloudflare aims to avoid this if at all possible.

However, even though you do not need to update the `compatibility_date` field, it is a good practice to do so for two reasons:

1.  Sometimes, new features can only be made available to Workers that have a current `compatibility_date`. To access the latest features, you need to stay up-to-date.
2.  Generally, other than this page, the Workers documentation may only describe the current `compatibility_date`, omitting information about historical behavior. If your Worker uses an old `compatibility_date`, you will need to continuously refer to this page in order to check if any of the APIs you are using have changed.

#### Via Wrangler

The compatibility date can be set in a Worker's [`wrangler.toml`](/workers/wrangler/configuration/) file.

```toml
---
filename: wrangler.toml
---
# Opt into backwards-incompatible changes through April 5, 2022.
compatibility_date = "2022-04-05"
```

#### Via the Cloudflare Dashboard

When a Worker is created through the Cloudflare Dashboard, the compatibility date is automatically set to the current date.

The compatibility date cannot be updated on the Cloudflare Dashboard at this time. 

#### Via the Cloudflare API

The compatibility date can be set when uploading a Worker using the [Workers Script API](/api/operations/worker-script-upload-worker-module) or [Workers Versions API](/api/operations/worker-versions-upload-version#request-body) in the request body's `metadata` field. 

If a compatibility date is not specified on upload via the API, it defaults to the oldest compatibility date, before any flags took effect (2021-11-02). When creating new Workers, it is highly recommended to set the compatibility date to the current date when uploading via the API.

## Setting compatibility flags

In addition to setting a `compatibility_date`, you may also provide a list of `compatibility_flags`, which enable or disable specific changes.

Most developers will not need to use `compatibility_flags`. `compatibility_flags` can be useful if you want to help the Workers team test upcoming changes that are not yet enabled by default, or if you need to hold back a change that your code depends on but still want to apply other compatibility changes.

#### Via Wrangler

Compatability flags can be set in a Worker's [`wrangler.toml`](/workers/wrangler/configuration/) file.

This example enables the specific flag `formdata_parser_supports_files`, which is described [below](/workers/configuration/compatibility-dates/#formdata-parsing-supports-file). As of the specified date, `2021-09-14`, this particular flag was not yet enabled by default, but, by specifying it in `compatibility_flags`, we can enable it anyway. `compatibility_flags` can also be used to disable changes that became the default in the past.

```toml
---
filename: wrangler.toml
---
# Opt into backwards-incompatible changes through September 14, 2021.
compatibility_date = "2021-09-14"
# Also opt into an upcoming fix to the FormData API.
compatibility_flags = [ "formdata_parser_supports_files" ]
```

#### Via the Cloudflare Dashboard

Compatibility flags cannot be set or updated on the Cloudflare Dashboard at this time. 

#### Via the Cloudflare API

Compatibility flags can be set when uploading a Worker using the [Workers Script API](/api/operations/worker-script-upload-worker-module) or [Workers Versions API](/api/operations/worker-versions-upload-version#request-body) in the request body's `metadata` field. 

## Compatibility flags

### Node.js compatibility flag

A [growing subset](/workers/runtime-apis/nodejs/) of Node.js APIs are available directly as [Runtime APIs](/workers/runtime-apis/nodejs), with no need to add polyfills to your own code. To enable these APIs in your Worker, add the `nodejs_compat` compatibility flag to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

As additional Node.js APIs are added, they will be made available under the `nodejs_compat` compatibility flag. Unlike most other compatibility flags, we do not expect the `nodejs_compat` to become active by default at a future date.

The Node.js `AsyncLocalStorage` API is a particularly useful feature for Workers. To enable only the `AsyncLocalStorage` API, use the `nodejs_als` compatibility flag.

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_als" ]
```

## Change history

Newest changes are listed first.

{{<compatibility-dates>}}

## Experimental changes

These changes can be enabled via `compatibility_flags`, but are not yet scheduled to become default on any particular date.

{{<compatibility-dates experimental="true">}}
