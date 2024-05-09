---
title: Known issues
pcx_content_type: concept
weight: 7
meta:
  description: Explore the known issues associated with the Workers Vitest integration.
---

# Known issues

The Workers Vitest pool is currently in open beta. The following are issues Cloudflare is aware of and fixing:

### Coverage

Native code coverage via [V8](https://v8.dev/blog/javascript-code-coverage) is not supported. You must use instrumented code coverage via [Istanbul](https://istanbul.js.org/) instead. Refer to the [Vitest Coverage documentation](https://vitest.dev/guide/coverage) for setup instructions.

### Fake timers

Vitest's [fake timers](https://vitest.dev/guide/mocking.html#timers) do not apply to KV, R2 and cache simulators. For example, you cannot expire a KV key by advancing fake time.

### Automatically re-running tests with `SELF`

If you are writing integration tests with `SELF`, you must import your Worker's `main` entry point in your test file for tests to re-run when files change. For example, if `main` was set to `./src/index.ts`, include `import "./src/index"` at the top of each test file. Vite's module analysis that powers hot-module-reloading is performed statically and currently does not detect the dynamic import of `main` in our test runner.

### `console.log()`s with `SELF`

`console.log()`s inside `export default { ... }` handlers are not shown when writing integration tests with `SELF` if the handler does no asynchronous work. You can work around this by including `ctx.waitUntil(scheduler.wait(100))` in your tests during debugging to keep the request context alive for long enough.

### Dynamic `import()` statements with `SELF` and Durable Objects

Dynamic `import()` statements do not work inside `export default { ... }` handlers when writing integration tests with `SELF`, or inside Durable Object event handlers. You must import and call your handlers directly, or use static `import` statements in the global scope.

### Durable Object alarms

Durable Object alarms are not reset between test runs and do not respect isolated storage. Ensure you delete or run all alarms with [`runDurableObjectAlarm()`](/workers/testing/vitest-integration/test-apis/#durable-objects) scheduled in each test before finishing the test.
