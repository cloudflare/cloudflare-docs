---
pcx_content_type: concept
title: Compatibility dates
layout: compatibility-dates
rss: https://github.com/cloudflare/cloudflare-docs/commits/production/content/workers/_partials/_platform-compatibility-dates.atom
outputs:
  - html
  - json
---

# Compatibility dates

Cloudflare regularly updates the Workers runtime. These updates apply to all Workers globally and should never cause a Worker that is already deployed to stop functioning. Sometimes, though, some changes may be backwards-incompatible. In particular, there might be bugs in the runtime API that existing Workers may inadvertently depend upon. Cloudflare implements bug fixes that new Workers can opt into while existing Workers will continue to see the buggy behavior to prevent breaking deployed Workers.

Compatibility dates (and flags) are how you, as a developer, opt into these changes. By specifying a `compatibility_date` in your `wrangler.toml` file, that Worker enables all changes that were made before the given date.

Compatibility dates can only be set via your `wrangler.toml` file and by running [`npx wrangler deploy`](/workers/wrangler/commands/#deploy).

```toml
# (in wrangler.toml)
# Opt into backwards-incompatible changes through April 5, 2022.
compatibility_date = "2022-04-05"
```

When you start your project, you should always set `compatibility_date` to the current date. You should occasionally update the `compatibility_date` field. When updating, you should refer to this page to find out what has changed, and you should be careful to test your Worker to see if the changes affect you, updating your code as necessary. The new compatibility date takes effect when you next run the [`npx wrangler deploy`](/workers/wrangler/commands/#deploy) command.

There is no need to update your `compatibility_date` if you do not want to. The Workers runtime will support old compatibility dates forever. If, for some reason, Cloudflare finds it is necessary to make a change that will break live Workers, Cloudflare will actively contact affected developers. That said, Cloudflare aims to avoid this if at all possible.

However, even though you do not need to update the `compatibility_date` field, it is a good practice to do so for two reasons:

1.  Sometimes, new features can only be made available to Workers that have a current `compatibility_date`. To access the latest features, you need to stay up-to-date.
2.  Generally, other than this page, the Workers documentation may only describe the current `compatibility_date`, omitting information about historical behavior. If your Worker uses an old `compatibility_date`, you will need to continuously refer to this page in order to check if any of the APIs you are using have changed.

## Compatibility flags

In addition to setting a `compatibility_date` in your `wrangler.toml` file, you may also provide a list of `compatibility_flags`, which enable or disable specific changes.

```toml
# (in wrangler.toml)
# Opt into backwards-incompatible changes through September 14, 2021.
compatibility_date = "2021-09-14"
# Also opt into an upcoming fix to the FormData API.
compatibility_flags = [ "formdata_parser_supports_files" ]
```

This example enabled the specific flag `formdata_parser_supports_files`, which is described below. As of the specified date, `2021-09-14`, this particular flag was not yet enabled by default, but specifying it in this way enables it anyway. `compatibility_flags` can also be used to disable changes that became the default in the past.

Most developers will not need to use `compatibility_flags`; instead, Cloudflare recommends only specifying `compatibility_date`. `compatibility_flags` can be useful if you want to help the Workers team test upcoming changes that are not yet enabled by default, or if you need to hold back a change that your code depends on but still want to apply other compatibility changes.

### Node.js compatibility flag

A [growing subset](/workers/runtime-apis/nodejs/) of Node.js APIs are available directly as [Runtime APIs](/workers/runtime-apis/nodejs), with no need to add polyfills to your own code. To enable these APIs in your Worker, add the `nodejs_compat` compatibility flag to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

As additional Node.js APIs are added, they will be made available under the `nodejs_compat` compatibility flag. Unlike most other compatibility flags, we do not expect the `nodejs_compat` to become active by default at a future date.

## Change history

Newest changes are listed first.

{{<compatibility-dates>}}

## Experimental changes

These changes can be enabled via `compatibility_flags`, but are not yet scheduled to become default on any particular date.

{{<compatibility-dates experimental="true">}}
