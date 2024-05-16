---
type: example
summary: Protect against timing attacks by safely comparing values using `timingSafeEqual`.
tags:
  - Security
  - WebCrypto
languages:
  - TypeScript
pcx_content_type: configuration
title: Using timingSafeEqual
weight: 1001
layout: example
---

The [`crypto.subtle.timingSafeEqual`](/workers/runtime-apis/web-crypto/#timingsafeequal) function compares two values using a constant-time algorithm. The time taken is independent of the contents of the values. 

When strings are compared using the equality operator (`==` or `===`), the comparison will end at the first mismatched character. By using `timingSafeEqual`, an attacker would not be able to use timing to find where at which point in the two strings there is a difference.

The `timingSafeEqual` function takes two `ArrayBuffer` or `TypedArray` values to compare. These buffers must be of equal length, otherwise an exception is thrown.

In order to compare two strings, you must use the [`TextEncoder`](/workers/runtime-apis/encoding/#textencoder) API. Since the time taken to encode the values may reveal the length of our secret value, you should check the length of the strings before encoding. 

```ts
interface Environment {
  MY_SECRET_VALUE?: string;
}

export default {
  async fetch(req: Request, env: Environment) {
    if (!env.MY_SECRET_VALUE) return new Response("Missing secret binding", { status: 500 });

    const authToken = req.headers.get("Authorization") || "";

    if (authToken.length !== env.MY_SECRET_VALUE.length) {
      return new Response("Unauthorized", { status: 401 });
    }

    const encoder = new TextEncoder();

    const a = encoder.encode(authToken);
    const b = encoder.encode(env.MY_SECRET_VALUE);

    if (a.byteLength !== b.byteLength) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!crypto.subtle.timingSafeEqual(a, b)) {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response("Welcome!");
  },
};
```

