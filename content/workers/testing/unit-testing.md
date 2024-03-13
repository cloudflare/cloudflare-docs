---
title: Unit testing
weight: 2
pcx_content_type: concept
meta:
  description: Test independent units of your Worker by importing them into your tests.
---

# Unit testing

In a Workers context, a unit test imports and directly calls functions from your Worker. After calling the functions, the unit test then asserts on the functions' return values. For example, consider you have the following Worker:

```js
---
filename: index.mjs
---
export function add(a, b) {
  return a + b;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const a = parseInt(url.searchParams.get("a"));
    const b = parseInt(url.searchParams.get("b"));
    return new Response(add(a, b));
  }
}
```

An example unit test for the above Worker may look like the following:

```js
import { add } from "./index.mjs";

assert(add(1, 2) === 3);
```

This test only assets that the `add` function is returning the correct value, but does not test the Worker itself like an [integration test](/workers/testing/integration-testing) would.

## Vitest integration

The recommended way to unit test your Workers is by using the Workers Vitest integration. For more information on features, as well as installation and setup instructions, refer to the [Vitest integration Get Started guide](/workers/testing/vitest-integration/get-started/)

{{<render file="_testing-pages-functions.md" productFolder="workers">}}

## Related Resources

- [Recipes](/workers/testing/vitest-integration/recipes/) - Examples of unit tests using the Workers Vitest integration.
