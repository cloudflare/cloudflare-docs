---
pcx_content_type: configuration
title: Buffer
---

# Buffer

{{<render file="_nodejs-compat-howto.md">}}

The `Buffer` API in Node.js is one of the most commonly used Node.js APIs for manipulating binary data. Every `Buffer` instance extends from the standard [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) class, but adds a range of unique capabilities such as built-in base64 and hex encoding/decoding, byte-order manipulation, and encoding-aware substring searching.

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=
```

A Buffer extends from `Uint8Array`. Therefore, it can be used in any Workers API that currently accepts `Uint8Array`, such as creating a new Response:

```js
const response = new Response(Buffer.from("hello world"));
```

You can also use the `Buffer` API when interacting with streams:

```js
const writable = getWritableStreamSomehow();
const writer = writable.getWriter();
writer.write(Buffer.from("hello world"));
```

Refer to the [Node.js documentation for `Buffer`](https://nodejs.org/dist/latest-v19.x/docs/api/buffer.html) for more information.