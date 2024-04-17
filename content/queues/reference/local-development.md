---
pcx_content_type: concept
title: Local Development 
weight: 19
---

# Develop locally

Queues support local development workflows using [Wrangler](/workers/wrangler/install-and-update/), the command-line interface for Workers. Wrangler runs the same version of Queues as Cloudflare runs globally.

## Prerequisites 

To develop locally with Queues, you will need:
- [Wrangler v3.1.0](https://blog.cloudflare.com/wrangler3/) or later. 

- Node.js version of `18.0.0` or later. Consider using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node versions.

- If you are new to Queues and/or Cloudflare Workers, refer to the [Queues tutorial](/queues/get-started/) to install `wrangler` and deploy their first Queue.
## Start a local development session
Open your terminal and run the following commands to start a local development session:

```sh
# Confirm we are using wrangler v3.1.0+
$ wrangler --version
⛅️ wrangler 3.1.0

# Start a local dev session:
$ npx wrangler dev

# Outputs:
------------------
wrangler dev now uses local mode by default, powered by 🔥 Miniflare and 👷 workerd.
To run an edge preview session for your Worker, use wrangler dev --remote
⎔ Starting local server...
[mf:inf] Ready on http://127.0.0.1:8787/
```

Local development sessions create a standalone, local-only environment that mirrors the production environment Queues runs in so you can test your Workers _before_ you deploy to production.

Refer to the [`wrangler dev` documentation](/workers/wrangler/commands/#dev) to learn more about how to configure a local development session.

## Known Issues

Wrangler does not yet support running separate producer and consumer Workers bound to the same Queue locally. To develop locally with Queues, you can temporarily put your consumer's `queue()` handler in the same Worker as your producer, so the same Worker acts as both a producer and consumer. 

Wrangler also does not yet support `wrangler dev --remote`.

