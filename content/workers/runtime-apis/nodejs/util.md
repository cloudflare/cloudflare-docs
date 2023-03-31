---
pcx_content_type: configuration
title: util
---

# util

{{<render file="nodejs-compat-howto.md">}}

## promisify/callbackify

The `promisify` and `callbackify` APIs in Node.js provide a means of bridging between a Promise-based programming model and a callback-based model.

The `promisify` method allows taking a Node.js-style callback function and converting it into a Promise-returning async function:

```js
import { promisify } from 'node:util';

function foo(args, callback) {
  try {
    callback(null, 1);
  } catch (err) {
    // Errors are emitted to the callback via the first argument.
    callback(err);
  }
}

const promisifiedFoo = promisify(foo);
await promisifiedFoo(args);
```

Similarly to `promisify`, `callbackify` converts a Promise-returning async function into a Node.js-style callback function:

```js
import { callbackify } from 'node:util';

async function foo(args) {
  throw new Error('boom');
}

const callbackifiedFoo = callbackify(foo);

callbackifiedFoo(args, (err, value) => {
  If (err) throw err;
});
```

`callbackify` and `promisify` make it easy to handle all of the the challenges that come with bridging between callbacks and promises.

Refer to the [Node.js documentation for `callbackify`](https://nodejs.org/dist/latest-v19.x/docs/api/util.html#utilcallbackifyoriginal) and [Node.js documentation for `promisify`](https://nodejs.org/dist/latest-v19.x/docs/api/util.html#utilpromisifyoriginal) for more information.

## util.types

The `util.types` API provides a reliable and efficient way of checking that values are instances of various built-in types.

```js
import { types } from 'node:util';

types.isAnyArrayBuffer(new ArrayBuffer());  // Returns true
types.isAnyArrayBuffer(new SharedArrayBuffer());  // Returns true
types.isArrayBufferView(new Int8Array());  // true
types.isArrayBufferView(Buffer.from('hello world')); // true
types.isArrayBufferView(new DataView(new ArrayBuffer(16)));  // true
types.isArrayBufferView(new ArrayBuffer());  // false
function foo() {
  types.isArgumentsObject(arguments);  // Returns true
}
types.isAsyncFunction(function foo() {});  // Returns false
types.isAsyncFunction(async function foo() {});  // Returns true
// .. and so on
```
{{<Aside type="warning">}}
The Workers implementation currently does not provide implementations of the `util.types.isExternal()`, `util.types.isProxy()`, `util.types.isKeyObject()`, or `util.type.isWebAssemblyCompiledModule()` APIs.
{{</Aside>}}

For more about `util.types`, refer to the [Node.js documentation for util](https://nodejs.org/dist/latest-v19.x/docs/api/util.html#utiltypes).