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

Note that some Node.js APIs are only enabled when your Worker's compatibility date is on or after the following dates:

| Node.js API                                                                                                                    | Enabled with `nodejs_compat` on or after |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| [Disable Top-level Await in `require()`](/workers/configuration/compatibility-flags/#disable-top-level-await-in-require)       | `2024-12-02`                             |
| [`process.env`](/workers/configuration/compatibility-flags/#enable-auto-populating-processenv)                                 | `2025-04-01`                             |
| [`node:http`, `node:https`](/workers/configuration/compatibility-flags/#enable-availability-of-nodehttp-and-nodehttps-modules) | `2025-08-15`                             |
| [`http.server`](/workers/configuration/compatibility-flags/#enable-nodejs-http-server-modules)                                 | `2025-09-01`                             |

Some Node.js modules are available in Workers only as non-functional stubs. These modules can be imported or required, but do not provide working implementations of the corresponding Node.js APIs. Stubs exist for compatibility with packages that check whether a module exists, and should not be used directly in application code.

The following stubs are enabled automatically only when `nodejs_compat` is enabled and your Worker's compatibility date is on or after the date shown:

| Stub module                                                                     | Enabled with `nodejs_compat` on or after | Enable flag                           | Disable flag                           |
| ------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------- | -------------------------------------- |
| [`node:http2`](https://nodejs.org/docs/latest/api/http2.html)                   | `2025-09-01`                             | `enable_nodejs_http2_module`          | `disable_nodejs_http2_module`          |
| [`node:vm`](https://nodejs.org/docs/latest/api/vm.html)                         | `2025-10-01`                             | `enable_nodejs_vm_module`             | `disable_nodejs_vm_module`             |
| [`node:cluster`](https://nodejs.org/docs/latest/api/cluster.html)               | `2025-12-04`                             | `enable_nodejs_cluster_module`        | `disable_nodejs_cluster_module`        |
| [`node:domain`](https://nodejs.org/docs/latest/api/domain.html)                 | `2025-12-04`                             | `enable_nodejs_domain_module`         | `disable_nodejs_domain_module`         |
| [`node:trace_events`](https://nodejs.org/docs/latest/api/tracing.html)          | `2025-12-04`                             | `enable_nodejs_trace_events_module`   | `disable_nodejs_trace_events_module`   |
| [`node:wasi`](https://nodejs.org/docs/latest/api/wasi.html)                     | `2025-12-04`                             | `enable_nodejs_wasi_module`           | `disable_nodejs_wasi_module`           |
| [`node:_stream_wrap`](https://nodejs.org/docs/latest/api/stream.html)           | `2026-01-29`                             | `enable_nodejs_stream_wrap_module`    | `disable_nodejs_stream_wrap_module`    |
| [`node:dgram`](https://nodejs.org/docs/latest/api/dgram.html)                   | `2026-01-29`                             | `enable_nodejs_dgram_module`          | `disable_nodejs_dgram_module`          |
| [`node:inspector`](https://nodejs.org/docs/latest/api/inspector.html)           | `2026-01-29`                             | `enable_nodejs_inspector_module`      | `disable_nodejs_inspector_module`      |
| [`node:sqlite`](https://nodejs.org/docs/latest/api/sqlite.html)                 | `2026-01-29`                             | `enable_nodejs_sqlite_module`         | `disable_nodejs_sqlite_module`         |
| [`node:child_process`](https://nodejs.org/docs/latest/api/child_process.html)   | `2026-03-17`                             | `enable_nodejs_child_process_module`  | `disable_nodejs_child_process_module`  |
| [`node:readline`](https://nodejs.org/docs/latest/api/readline.html)             | `2026-03-17`                             | `enable_nodejs_readline_module`       | `disable_nodejs_readline_module`       |
| [`node:repl`](https://nodejs.org/docs/latest/api/repl.html)                     | `2026-03-17`                             | `enable_nodejs_repl_module`           | `disable_nodejs_repl_module`           |
| [`node:tty`](https://nodejs.org/docs/latest/api/tty.html)                       | `2026-03-17`                             | `enable_nodejs_tty_module`            | `disable_nodejs_tty_module`            |
| [`node:v8`](https://nodejs.org/docs/latest/api/v8.html)                         | `2026-03-17`                             | `enable_nodejs_v8_module`             | `disable_nodejs_v8_module`             |
| [`node:worker_threads`](https://nodejs.org/docs/latest/api/worker_threads.html) | `2026-03-17`                             | `enable_nodejs_worker_threads_module` | `disable_nodejs_worker_threads_module` |

When enabling `nodejs_compat`, we recommend using the latest version of [Wrangler CLI](/workers/wrangler/), and the latest compatibility date, in order to maximize compatibility. Some older versions of Wrangler inject additional polyfills that are no longer necessary when your Worker uses a more recent compatibility date, because they are provided by the Workers runtime.

If you see errors using a particular npm package on Workers, you should first try updating your compatibility date and use the latest version of [Wrangler CLI](/workers/wrangler/) or the [Cloudflare Vite Plugin](/workers/vite-plugin/). If you still encounter issues, please report them by [opening a GitHub issue](https://github.com/cloudflare/workers-sdk/issues/new?template=bug-template.yaml).
