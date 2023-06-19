---
type: example
summary: Protect against timing attacks using by safely comparing values using timingSafeEqual.
tags:
  - Security
pcx_content_type: configuration
title: Using timingSafeEqual
weight: 1001
layout: example
---

To avoid timing attacks in your code, you can replace equality checks with the [`crypto.timingSafeEqual`](/workers/runtime-apis/web-crypto/#timingsafeequal) function in your Workers application.

To use this function, you can create a new [`TextEncoder`](/workers/runtime-apis/encoding/#textencoder) instance, encode the values you need to compare using [`encoder.encode`](/workers/runtime-apis/encoding/#methods), and replace the standard JavaScript equality check (`===`) with `crypto.timingSafeEqual`:

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
const encoder = new TextEncoder();

const string1 = "foo"
const string2 = "bar"

// The below code is vulnerable to timing attacks
// if (string1 === string2) { ... }

// You can replace it with `crypto.timingSafeEqual` by encoding the values
// you need to compare
const a = encoder.encode(string1);
const b = encoder.encode(string2);

let equal = crypto.timingSafeEqual(a, b)

if (equal) {
  // The values are equal
} else {
  // The values are not equal
}
```


{{</tab>}}
{{<tab label="ts">}}

```ts
const encoder = new TextEncoder();

const string1 = "foo"
const string2 = "bar"

// The below code is vulnerable to timing attacks
// if (string1 === string2) { ... }

// You can replace it with `crypto.timingSafeEqual` by encoding the values
// you need to compare
const a = encoder.encode(string1);
const b = encoder.encode(string2);

let equal = crypto.timingSafeEqual(a, b)

if (equal) {
  // The values are equal
} else {
  // The values are not equal
}
```

{{</tab>}}
{{</tabs>}}