---
title: Known issues
pcx_content_type: concept
weight: 7
meta:
  description: Explore the known issues associated with the Workers Vitest integration.
---

# Known issues

The Workers Vitest pool is currently in open beta. The following are issues Cloudflare is aware of and fixing:

- Dynamic `import()` statements do not work inside `export default { ... }` handlers when writing integration tests with `SELF`, or inside Durable Object event handlers. You must use static `import` statements in the global scope.

- `console.log()`s inside `export default { ... }` handlers are not shown when writing integration tests with `SELF` if the handler does no asynchronous work. You can work around this by including `ctx.waitUntil(scheduler.wait(100))` in your tests during debugging to keep the request context alive for long enough.

- If you are writing integration tests with `SELF`, you must import your Worker's `main` entrypoint in your test file for tests to re-run when files change. For example, if `main` was set to `./src/index.ts`, include `import "./src/index"` at the top of each test file. Vite's module analysis that powers hot-module-reloading is performed statically and currently does not detect the dynamic import of `main` in our test runner.

- Durable Object alarms are not reset between test runs and do not respect isolated storage. Ensure you delete or run all alarms scheduled in each test before finishing the test.