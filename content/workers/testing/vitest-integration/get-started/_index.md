---
pcx_content_type: navigation
title: Get started
weight: 1
meta:
  description: Install and setup the Workers Vitest integration - a robust tool for writing unit and integration tests for Workers.
---

# Get started

{{<directory-listing>}}

For most users, Cloudflare recommends using our [custom Vitest integration](/workers/testing/vitest/get-started/) for testing Workers and [Pages Functions](/pages/functions/) projects. [Vitest](https://vitest.dev/) is a popular JavaScript testing framework featuring a very fast watch mode, Jest compatibility, and out-of-the-box support for TypeScript. Cloudflare provides a custom pool that allows your Vitest tests to run _inside_ the Workers runtime. Get started [here](/workers/testing/vitest/get-started/), and check out the [recipes for testing different types of Workers](/workers/testing/vitest/recipes/).

- ✅ Supports both **unit tests** and **integration tests**
- 📚 Provides direct access to Workers runtime APIs and bindings
- 📦 Implements isolated per-test storage
- 🔥 Runs tests fully-locally using [Miniflare](https://miniflare.dev/)
- ⚡️ Leverages Vitest's hot-module reloading for near instant reruns
- ↩️ Provides a declarative interface for mocking outbound requests
- 🧩 Supports projects with multiple workers

{{<Aside type="warning">}}

The Workers Vitest integration does not support testing Workers using the Service Worker format. Please [migrate to the ES modules format](/workers/reference/migrate-to-module-workers/) first.

{{</Aside>}}

```js
import {
  env,
  SELF,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { it, expect } from "vitest";
import worker, { add } from "./index.mjs";

it("adds via function call", () => {
  expect(add(1, 2)).toBe(3);
});
it("adds via request (unit style)", () => {
  const request = new Request("http://example.com/?a=1&b=2");
  const ctx = createExecutionContext();
  const response = await worker.fetch(request, env, ctx);
  await waitOnExecutionContext(ctx);
  expect(await response.text()).toBe("3");
});
it("adds via request (integration style)", () => {
  const response = await SELF.fetch("http://example.com/?a=1&b=2");
  expect(await response.text()).toBe("3");
});
```