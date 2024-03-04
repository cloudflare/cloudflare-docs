---
title: Unit Testing
weight: 2
pcx_content_type: concept
meta:
  description: Test independent units of your Worker by importing them into your tests.
---

# Unit Testing

In a Workers context, a unit test imports and directly calls functions from your Worker then asserts on their return values. For example, consider you have the following Worker:

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

A unit test might look like...

```js
import { add } from "./index.mjs";

assert(add(1, 2) === 3);
```

This test only assets that the `add` function is returning the correct value, but doesn't test the Worker itself like an [integration test](/workers/testing/integration-testing) would do.

## Vitest Integration

The recommended way to unit test your Workers is by using our custom Vitest integration. For more information on features, as well as installation and setup instructions, please read the [Get Started guide](/workers/testing/vitest/get-started/)

## Related Resources

- More examples of unit tests can be found on the Vitest [Recipes page](/workers/testing/vitest-integration/recipes).