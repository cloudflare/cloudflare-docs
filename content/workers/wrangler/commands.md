---
pcx-content-type: how-to
title: Commands
weight: 3
---

## [WIP] wrangler commands

`wrangler` is a Command Line Interface (CLI) for developing and publishing code on to the Cloudflare Workers® platform. This document serves as a reference for all the commands one can use, and the flags and options that can be passes to these commands.

### `wrangler init [name]`

Creates a `wrangler.toml` configuration file. For more details on the configuration keys and values, refer to the [documentation](/workers/cli-wrangler/configuration).

### `wrangler dev [script]`

Start a local development server, with live reloading and devtools.

### `wrangler publish [script] --name [name]`

Publish the given script to the worldwide Cloudflare network.

For more commands and options, refer to the [documentation](/workers/cli-wrangler/commands).

### `wrangler pages dev [directory] [-- command]`

Either serves a static build asset directory, or proxies itself in front of a command.

Builds and runs functions from a `./functions` directory or uses a `_worker.js` file inside the static build asset directory.

For more commands and options, refer to the [documentation](/pages/platform/functions#develop-and-preview-locally) or run `wrangler pages dev --help`.
