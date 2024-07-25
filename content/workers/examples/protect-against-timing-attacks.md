---
type: example
summary: Protect against timing attacks by safely comparing values using `timingSafeEqual`.
tags:
  - Security
  - WebCrypto
languages:
  - TypeScript
  - Python
pcx_content_type: example
title: Using timingSafeEqual
weight: 1001
layout: example
---

The [`crypto.subtle.timingSafeEqual`](/workers/runtime-apis/web-crypto/#timingsafeequal) function compares two values using a constant-time algorithm. The time taken is independent of the contents of the values.

When strings are compared using the equality operator (`==` or `===`), the comparison will end at the first mismatched character. By using `timingSafeEqual`, an attacker would not be able to use timing to find where at which point in the two strings there is a difference. 

The `timingSafeEqual` function takes two `ArrayBuffer` or `TypedArray` values to compare. These buffers must be of equal length, otherwise an exception is thrown.
Note that this function is not constant time with respect to the length of the parameters and also does not guarantee constant time for the surrounding code.
Handling of secrets should be taken with care to not introduce timing side channels.

In order to compare two strings, you must use the [`TextEncoder`](/workers/runtime-apis/encoding/#textencoder) API. 

{{<tabs labels="ts | py">}}
{{<tab label="ts" default="true">}}

```ts
interface Environment {
  MY_SECRET_VALUE?: string;
}

export default {
  async fetch(req: Request, env: Environment) {
    if (!env.MY_SECRET_VALUE) {
      return new Response("Missing secret binding", { status: 500 });
    }

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

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, TextEncoder, crypto

async def on_fetch(request, env):
    auth_token = request.headers["Authorization"] or ""
    secret = env.MY_SECRET_VALUE

    if secret is None:
        return Response.new("Missing secret binding", status=500)

    if len(auth_token) != len(secret):
        return Response.new("Unauthorized", status=401)

    if a.byteLength != b.byteLength:
        return Response.new("Unauthorized", status=401)

    encoder = TextEncoder.new()
    a = encoder.encode(auth_token)
    b = encoder.encode(secret)

    if not crypto.subtle.timingSafeEqual(a, b):
        return Response.new("Unauthorized", status=401)

    return Response.new("Welcome!")
```

{{</tab>}}
{{</tabs>}}
