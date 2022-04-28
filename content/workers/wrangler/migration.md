---
pcx-content-type: how-to
title: Migrating from Wrangler 1
weight: 2
---

## Migration Guide

This document describes the steps to migrate a project from wrangler 1 to 2.

The latest version of wrangler ships with new features and improvements that will require you to include a few changes to your wrangler configuration to get it working as expected.

The good news is that the CLI itself should guide you through the upgrade process.

To learn more about what's new in wrangler, refer to the [What's new page](/workers/wrangler/compare-v1-v2/).

### Upgrade to Wrangler 2

The first step is to either install Wrangler globally or use the `npx command` to run it against your Wrangler 1 project. Then, run the `wrangler dev` command to generate a list of deprecation warnings or fields which need to be changed in order to build your Worker using Wrangler 2.

```sh
npx wrangler dev
```

This will return some deprecated warnings that you will need to fix in order to get it working.

Example output:

````sh
☁  delete  npx wrangler dev
 ⛅️ wrangler 0.0.0-a788643
---------------------------
⚠  Processing wrangler.toml configuration:
⚠    - Unexpected fields found in build field: "build_upload_main","build_upload_dir"
⚠  No compatibility_date was specified. Using today's date: 2022-04-28.
⚠  Add one to your wrangler.toml file:
⚠  ```
⚠  compatibility_date = "2022-04-28"
⚠  ```
⚠  or pass it in your terminal:
⚠  ```
⚠  --compatibility-date=2022-04-28
⚠  ```
⚠  See https://developers.cloudflare.com/workers/platform/compatibility-dates for more information.
⬣ Listening at http://localhost:8787
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ [b] open a browser, [d] open Devtools, [l] turn on local mode, [c] clear console, [x] to exit                              │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
````

### Deprecations

The following commands is now deprecated in wrangler 2.0, if you're migrating, be sure to go through the list and remove the commands that is no longer required:

- Remove the `type` and `webpack_config` property in the config that is no longer required.
- Remove `webpack`
- Remove `zone_id` this is also no longer required since it can be deduced from the routes directly.
- Remove `site.entry-point` field as it is no longer used, the entry point should be specified through the `main` field.
- Remove `build.upload.format`, the format is now inferred automatically from the code.
- Remove `build.upload.main` and `build.upload.dir` fields in your configuration, instead use the top level `main` field, whuich now serves as the entry-point for the Worker.
- No longer need to use `wrangler preview`, this is now replaced by the `wrangler dev` command, for running your worker in your local environment.
- The `wrangler generate` command is now deprecated, you can use a worker starter by cloning it directly from GitHub.
- The `wrangler route` command is deprecated, use `wrangler build` instead.
- The `wrangler report` command is deprecated, the error reports are now made interactively.
- The `wrangler build` command is deprecated, you can invoke your own build scripts using the [custom builds](link here) field in your configuration.
