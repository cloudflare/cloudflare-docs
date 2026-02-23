---
_build:
  publishResources: false
  render: never
  list: never

name: "Node.js compatibility"
sort_date: "2023-01-15"
enable_flag: "nodejs_compat"
disable_flag: "no_nodejs_compat"
---

Enables [Node.js APIs](/workers/runtime-apis/nodejs/) in the Workers Runtime.

Note that some Node.js APIs are only enabled if your Worker's compatibility date is set to on or after the following dates:

| Node.js API | Enabled after  |
|---|---|
| [`http.server`](/workers/configuration/compatibility-flags/#enable-nodejs-http-server-modules)  | `2025-09-01`  |
| [`node:http`, `node:https`](/workers/configuration/compatibility-flags/#enable-availability-of-nodehttp-and-nodehttps-modules)  | `2025-08-15`  |
| [`process.env`](/workers/configuration/compatibility-flags/#enable-auto-populating-processenv)  | `2025-04-01`  |
| [Disable Top-level Await in `require()`](/workers/configuration/compatibility-flags/#disable-top-level-await-in-require)  | `2024-12-02`  |

When enabling `nodejs_compat`, we recommend using the latest version of [Wrangler CLI](/workers/wrangler/), and the latest compatiblity date, in order to maximize compatibility. Some older versions of Wrangler inject additional polyfills that are no longer neccessary, as they are provided by the Workers runtime, if your Worker is using a more recent compatibility date.

If you see errors using a particular NPM package on Workers, you should first try updating your compatibility date and use the latest version of [Wrangler CLI](/workers/wrangler/) or the [Cloudflare Vite Plugin](/workers/vite-plugin/). If you still encounter issues, please report them by [opening a GitHub issue](https://github.com/cloudflare/workers-sdk/issues/new?template=bug-template.yaml).
