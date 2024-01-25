---
type: example
summary: Protect against timing attacks by safely comparing values using `timingSafeEqual`.
tags:
  - Security
pcx_content_type: configuration
title: Using timingSafeEqual
weight: 1001
layout: example
---

To avoid timing attacks in your code, you can replace equality checks with the [`crypto.timingSafeEqual`](/workers/runtime-apis/web-crypto/#timingsafeequal) function in your Workers application.

To use this function, create a new [`TextEncoder`](/workers/runtime-apis/encoding/#textencoder) and encode the string values to instances of `ArrayBuffer` using [`encoder.encode`](/workers/runtime-apis/encoding/#methods). This is needed because `crypto.subtle.timingSafeEqual` compares `ArrayBuffer` instances, not strings. With the encoded values, replace the standard JavaScript equality check (`===`) with `crypto.subtle.timingSafeEqual`. Note that the strings must be the same length in order to compare to `timingSafeEqual`. The below code shows how to implement string equality checks with `crypto.subtle.timingSafeEqual`. Note that the example shown would apply to TypeScript and JavaScript:



```ts
const encoder = new TextEncoder();

const username = "foo";
const password = "bar";

if (username.length !== password.length) {
  // Minimise the possibility of a timing attack via how long encoding takes on the strings
}

const a = encoder.encode(username)
const b = encoder.encode(password)

if (a.byteLength !== b.byteLength) {
  // Strings must be the same length in order to compare
  // with crypto.subtle.timingSafeEqual
  return false
}

// The below code is vulnerable to timing attacks
// if (string1 === string2) { ... }

// You can replace it with `crypto.subtle.timingSafeEqual` by encoding the values
// you need to compare

let isEqual = crypto.subtle.timingSafeEqual(a,b)

if (isEqual) {
  // The values are equal
} else {
  // The values are not equal
}
```

