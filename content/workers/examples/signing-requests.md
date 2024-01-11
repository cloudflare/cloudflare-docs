---
type: example
summary: Verify a signed request using the HMAC and SHA-256 algorithms or
  return a 403.
tags:
  - Security
  - WebCrypto
pcx_content_type: configuration
title: Sign requests
weight: 1001
layout: example
playground: true
---

{{<Aside type="note">}}

This example Worker makes use of the [Node.js Buffer API](/workers/runtime-apis/nodejs/buffer/), which is available as part of the Worker's runtime [Node.js compatibility mode](/workers/runtime-apis/nodejs/). To run this Worker, you will need to [enable the `nodejs_compat` compatibility flag](/workers/runtime-apis/nodejs/#enable-nodejs-with-workers).
{{</Aside>}}

You can both verify and generate signed requests from within a Worker using the [Web Crypto APIs](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle).

The following Worker will:

- For request URLs beginning with `/generate/`, replace `/generate/` with `/`, sign the resulting path with its timestamp, and return the full, signed URL in the response body.

- For all other request URLs, verify the signed URL and allow the request through.

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
import { Buffer } from "node:buffer";

const encoder = new TextEncoder();

// How long an HMAC token should be valid for, in seconds
const EXPIRY = 60;

export default {
  /**
   *
   * @param {Request} request
   * @param {{SECRET_DATA: string}} env
   * @returns
   */
  async fetch(request, env) {
    // You will need some secret data to use as a symmetric key. This should be
    // attached to your Worker as an encrypted secret.
    // Refer to https://developers.cloudflare.com/workers/configuration/secrets/
    const secretKeyData = encoder.encode(
      env.SECRET_DATA ?? "my secret symmetric key"
    );

    // Import your secret as a CryptoKey for both 'sign' and 'verify' operations
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    );

    const url = new URL(request.url);

    // This is a demonstration Worker that allows unauthenticated access to /generate
    // In a real application you would want to make sure that
    // users could only generate signed URLs when authenticated
    if (url.pathname.startsWith("/generate/")) {
      url.pathname = url.pathname.replace("/generate/", "/");

      const timestamp = Math.floor(Date.now() / 1000);

      // This contains all the data about the request that you want to be able to verify
      // Here we only sign the timestamp and the pathname, but often you will want to
      // include more data (for instance, the URL hostname or query parameters)
      const dataToAuthenticate = `${url.pathname}${timestamp}`;

      const mac = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(dataToAuthenticate)
      );

      // Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/
      // for more details on using Node.js APIs in Workers
      const base64Mac = Buffer.from(mac).toString("base64");

      url.searchParams.set("verify", `${timestamp}-${base64Mac}`);

      return new Response(`${url.pathname}${url.search}`);
      // Verify all non /generate requests
    } else {
      // Make sure you have the minimum necessary query parameters.
      if (!url.searchParams.has("verify")) {
        return new Response("Missing query parameter", { status: 403 });
      }

      const [timestamp, hmac] = url.searchParams.get("verify").split("-");

      const assertedTimestamp = Number(timestamp);

      const dataToAuthenticate = `${url.pathname}${assertedTimestamp}`;

      const receivedMac = Buffer.from(hmac, "base64");

      // Use crypto.subtle.verify() to guard against timing attacks. Since HMACs use
      // symmetric keys, you could implement this by calling crypto.subtle.sign() and
      // then doing a string comparison -- this is insecure, as string comparisons
      // bail out on the first mismatch, which leaks information to potential
      // attackers.
      const verified = await crypto.subtle.verify(
        "HMAC",
        key,
        receivedMac,
        encoder.encode(dataToAuthenticate)
      );

      if (!verified) {
        return new Response("Invalid MAC", { status: 403 });
      }

      // Signed requests expire after one minute. Note that this value should depend on your specific use case
      if (Date.now() / 1000 > assertedTimestamp + EXPIRY) {
        return new Response(
          `URL expired at ${new Date((assertedTimestamp + EXPIRY) * 1000)}`,
          { status: 403 }
        );
      }
    }

    return fetch(new URL(url.pathname, "https://example.com"), request);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
import { Buffer } from "node:buffer";

const encoder = new TextEncoder();

// How long an HMAC token should be valid for, in seconds
const EXPIRY = 60;

export default <ExportedHandler<{ SECRET_DATA: string }>>{
  async fetch(request, env) {
    // You will need some secret data to use as a symmetric key. This should be
    // attached to your Worker as an encrypted secret.
    // Refer to https://developers.cloudflare.com/workers/configuration/secrets/
    const secretKeyData = encoder.encode(
      env.SECRET_DATA ?? "my secret symmetric key"
    );

    // Import your secret as a CryptoKey for both 'sign' and 'verify' operations
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    );

    const url = new URL(request.url);

    // This is a demonstration Worker that allows unauthenticated access to /generate
    // In a real application you would want to make sure that
    // users could only generate signed URLs when authenticated
    if (url.pathname.startsWith("/generate/")) {
      url.pathname = url.pathname.replace("/generate/", "/");

      const timestamp = Math.floor(Date.now() / 1000);

      // This contains all the data about the request that you want to be able to verify
      // Here we only sign the timestamp and the pathname, but often you will want to
      // include more data (for instance, the URL hostname or query parameters)
      const dataToAuthenticate = `${url.pathname}${timestamp}`;

      const mac = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(dataToAuthenticate)
      );

      // Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/
      // for more details on using NodeJS APIs in Workers
      const base64Mac = Buffer.from(mac).toString("base64");

      url.searchParams.set("verify", `${timestamp}-${base64Mac}`);

      return new Response(`${url.pathname}${url.search}`);
      // Verify all non /generate requests
    } else {
      // Make sure you have the minimum necessary query parameters.
      if (!url.searchParams.has("verify")) {
        return new Response("Missing query parameter", { status: 403 });
      }

      const [timestamp, hmac] = url.searchParams.get("verify").split("-");

      const assertedTimestamp = Number(timestamp);

      const dataToAuthenticate = `${url.pathname}${assertedTimestamp}`;

      const receivedMac = Buffer.from(hmac, "base64");

      // Use crypto.subtle.verify() to guard against timing attacks. Since HMACs use
      // symmetric keys, you could implement this by calling crypto.subtle.sign() and
      // then doing a string comparison -- this is insecure, as string comparisons
      // bail out on the first mismatch, which leaks information to potential
      // attackers.
      const verified = await crypto.subtle.verify(
        "HMAC",
        key,
        receivedMac,
        encoder.encode(dataToAuthenticate)
      );

      if (!verified) {
        return new Response("Invalid MAC", { status: 403 });
      }

      // Signed requests expire after one minute. Note that this value should depend on your specific use case
      if (Date.now() / 1000 > assertedTimestamp + EXPIRY) {
        return new Response(
          `URL expired at ${new Date((assertedTimestamp + EXPIRY) * 1000)}`,
          { status: 403 }
        );
      }
    }

    return fetch(new URL(url.pathname, "https://example.com"), request);
  },
};
```

{{</tab>}}
{{</tabs>}}

## Validate signed requests using the WAF

The provided example code for signing requests is compatible with the [`is_timed_hmac_valid_v0()`](/ruleset-engine/rules-language/functions/#hmac-validation) Rules language function. This means that you can verify requests signed by the Worker script using a [WAF custom rule](/waf/custom-rules/use-cases/configure-token-authentication/#option-2-configure-using-waf-custom-rules).
