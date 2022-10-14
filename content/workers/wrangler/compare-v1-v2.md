---
pcx_content_type: concept
title: Comparing Wrangler 1 & 2
weight: 11
---

# New in Wrangler 2

Wrangler 2 introduces a number of new features for developing and deploying a Worker. This document is to show previous users of Wrangler 1 what they can expect when they move to Wrangler 2.

- `wrangler.toml` is no longer mandatory.
- `dev` and `publish` accept CLI arguments.
- `tail` can be run on arbitrary Worker names.
- `init` creates a project boilerplate.
- Service environments.
- JSON bindings for `vars`.
- Local mode for `wrangler dev`.
- Module system (for both modules and service worker format Workers).
- Devtools.
- Typescript support.
- Sharing development environment on the Internet.
- Wider platform compatibility.
- Developer hotkeys.
- Better configuration validation.

Prefer a video format? The following video describes some of the major changes in Wrangler 2, and shows you how it can help speed up your workflow.

<div style="position: relative; padding-top: 56.25%;"><iframe src="https://iframe.videodelivery.net/6ce3c7bd51288e1e8439f50ad63eda1d?poster=https%3A%2F%2Fcloudflarestream.com%2F6ce3c7bd51288e1e8439f50ad63eda1d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600" style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>

## Wrangler 1 and 2 comparison table

### Commands

| Command     | 1   | 2   | Notes                                          |
| ----------- | --- | --- | ---------------------------------------------- |
| `publish`   | ✅  | ✅  |
| `dev`       | ✅  | ✅  |
| `preview`   | ✅  | ❌  | Removed, use `dev` instead.                    |
| `init`      | ✅  | ✅  |
| `generate`  | ✅  | ❌  | Removed, use `git clone` instead.              |
| `build`     | ✅  | ❌  | Removed, invoke your own build script instead. |
| `secret`    | ✅  | ✅  |
| `route`     | ✅  | ❌  | Removed, use `publish` instead.                |
| `tail`      | ✅  | ✅  |
| `kv`        | ✅  | ✅  |
| `r2`        | 🚧  | ✅  | Introduced in wrangler 1.19.8.                 |
| `pages`     | ❌  | ✅  |
| `config`    | ✅  | ❔  |
| `login`     | ✅  | ✅  |
| `logout`    | ✅  | ✅  |
| `whoami`    | ✅  | ✅  |
| `subdomain` | ✅  | ❔  |
| `report`    | ✅  | ❌  | Removed, error reports are made interactively. |

## Configuration

| Property              | 1   | 2   | Notes                                                                          |
| --------------------- | --- | --- | ------------------------------------------------------------------------------ |
| `type = "webpack"`    | ✅  | ❌  | Removed, refer to [this guide](/workers/wrangler/migration/eject-webpack/#migrate-webpack-projects-from-wrangler-version-1) to migrate.                                        |
| `type = "rust"`       | ✅  | ❌  | Removed, use [`workers-rs`](https://github.com/cloudflare/workers-rs) instead. |
| `type = "javascript"` | ✅  | 🚧  | No longer required, can be omitted.                                            |

## Features

| Feature    | 1   | 2   | Notes                                                                                                                                                                 |
| ---------- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript | ❌  | ✅  | You can give wrangler a TypeScript file, and it will automatically transpile it to JavaScript using [`esbuild`](https://github.com/evanw/esbuild) under-the-hood.     |
| Local mode | ❌  | ✅  | `wrangler dev --local` will run your Worker on your local machine instead of on our network. This is powered by [Miniflare](https://github.com/cloudflare/miniflare). |
