---
pcx_content_type: configuration
title: assert
---

# assert

{{<render file="_nodejs-compat-howto.md">}}

The `assert` module in Node.js provides a number of useful assertions that are useful when building tests.

```js
import {
  strictEqual,
  deepStrictEqual,
  ok,
  doesNotReject,
} from 'node:assert';

strictEqual(1, 1); // ok!
strictEqual(1, "1"); // fails! throws AssertionError

deepStrictEqual({ a: { b: 1 }}, { a: { b: 1 }});// ok!
deepStrictEqual({ a: { b: 1 }}, { a: { b: 2 }});// fails! throws AssertionError

ok(true); // ok!
ok(false); // fails! throws AssertionError

await doesNotReject(async () => {}); // ok!
await doesNotReject(async () => { throw new Error('boom') }); // fails! throws AssertionError
```

{{<Aside type="note">}}
In the Workers implementation of `assert`, all assertions run in, what Node.js calls, the strict assertion mode. In strict assertion mode, non-strict methods behave like their corresponding strict methods. For example, `deepEqual()` will behave like `deepStrictEqual()`.
{{</Aside>}}

Refer to the [Node.js documentation for `assert`](https://nodejs.org/dist/latest-v19.x/docs/api/assert.html) for more information.