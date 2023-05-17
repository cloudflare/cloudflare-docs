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
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    // You will need some super-secret data to use as a symmetric key.
    const encoder = new TextEncoder();
    const secretKeyData = encoder.encode("my secret symmetric key");

    // Convert a ByteString (a string whose code units are all in the range
    // [0, 255]), to a Uint8Array. If you pass in a string with code units larger
    // than 255, their values will overflow.
    function byteStringToUint8Array(byteString) {
      const ui = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; ++i) {
        ui[i] = byteString.charCodeAt(i);
      }
      return ui;
    }

    const url = new URL(request.url);

    // If the path does not begin with our protected prefix, pass the request through
    if (!url.pathname.startsWith("/verify/")) {
      return fetch(request);
    }

    // Make sure you have the minimum necessary query parameters.
    if (!url.searchParams.has("mac") || !url.searchParams.has("expiry")) {
      return new Response("Missing query parameter", { status: 403 });
    }

    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Extract the query parameters we need and run the HMAC algorithm on the
    // parts of the request we are authenticating: the path and the expiration
    // timestamp. It is crucial to pad the input data, for example, by adding a symbol
    // in-between the two fields that can never occur on the right side. In this
    // case, use the @ symbol to separate the fields.
    const expiry = Number(url.searchParams.get("expiry"));
    const dataToAuthenticate = `${url.pathname}@${expiry}`;

    // The received MAC is Base64-encoded, so you have to go to some trouble to
    // get it into a buffer type that crypto.subtle.verify() can read.
    const receivedMacBase64 = url.searchParams.get("mac");
    const receivedMac = byteStringToUint8Array(atob(receivedMacBase64));

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
      const body = "Invalid MAC";
      return new Response(body, { status: 403 });
    }

    if (Date.now() > expiry) {
      const body = `URL expired at ${new Date(expiry)}`;
      return new Response(body, { status: 403 });
    }

    // you have verified the MAC and expiration time; you can now pass the request
    // through.
    return fetch(request);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request) {
    // You will need some super-secret data to use as a symmetric key.
    const encoder = new TextEncoder();
    const secretKeyData = encoder.encode("my secret symmetric key");

    // Convert a ByteString (a string whose code units are all in the range
    // [0, 255]), to a Uint8Array. If you pass in a string with code units larger
    // than 255, their values will overflow.
    function byteStringToUint8Array(byteString) {
      const ui = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; ++i) {
        ui[i] = byteString.charCodeAt(i);
      }
      return ui;
    }

    const url = new URL(request.url);

    // If the path does not begin with our protected prefix, pass the request through
    if (!url.pathname.startsWith("/verify/")) {
      return fetch(request);
    }

    // Make sure you have the minimum necessary query parameters.
    if (!url.searchParams.has("mac") || !url.searchParams.has("expiry")) {
      return new Response("Missing query parameter", { status: 403 });
    }

    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Extract the query parameters we need and run the HMAC algorithm on the
    // parts of the request we are authenticating: the path and the expiration
    // timestamp. It is crucial to pad the input data, for example, by adding a symbol
    // in-between the two fields that can never occur on the right side. In this
    // case, use the @ symbol to separate the fields.
    const expiry = Number(url.searchParams.get("expiry"));
    const dataToAuthenticate = `${url.pathname}@${expiry}`;

    // The received MAC is Base64-encoded, so you have to go to some trouble to
    // get it into a buffer type that crypto.subtle.verify() can read.
    const receivedMacBase64 = url.searchParams.get("mac");
    const receivedMac = byteStringToUint8Array(atob(receivedMacBase64));

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
      const body = "Invalid MAC";
      return new Response(body, { status: 403 });
    }

    if (Date.now() > expiry) {
      const body = `URL expired at ${new Date(expiry)}`;
      return new Response(body, { status: 403 });
    }

    // you have verified the MAC and expiration time; you can now pass the request
    // through.
    return fetch(request);
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}

---

{{<content-column>}}

## Generating signed requests

You can generate signed requests from within a Worker using the [Web Crypto APIs](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle).

{{<Aside type="note">}}

Signed requests expire after one minute. Cloudflare recommends choosing expiration durations dynamically, depending on the path or a query parameter.

{{</Aside>}}

For request URLs beginning with `/generate/`, replace `/generate/` with `/verify/`, sign the resulting path with its timestamp, and return the full, signed URL in the response body.

{{</content-column>}}

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    async function generateSignedUrl(url) {
      // You will need some super-secret data to use as a symmetric key.
      const encoder = new TextEncoder();
      const secretKeyData = encoder.encode("my secret symmetric key");
      const key = await crypto.subtle.importKey(
        "raw",
        secretKeyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      // Signed requests expire after one minute. Note that you could choose
      // expiration durations dynamically, depending on, for example, the path or a query
      // parameter.
      const expirationMs = 60000;
      const expiry = Date.now() + expirationMs;
      // The signature will be computed for the pathname and the expiry timestamp.
      // The two fields must be separated or padded to ensure that an attacker
      // will not be able to use the same signature for other pathname/expiry pairs.
      // The @ symbol is guaranteed not to appear in expiry, which is a (decimal)
      // number, so you can safely use it as a separator here. When combining more
      // fields, consider JSON.stringify-ing an array of the fields instead of
      // concatenating the values.
      const dataToAuthenticate = `${url.pathname}@${expiry}`;

      const mac = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(dataToAuthenticate)
      );

      // `mac` is an ArrayBuffer, so you need to make a few changes to get
      // it into a ByteString, and then a Base64-encoded string.
      let base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)));

      // must convert "+" to "-" as urls encode "+" as " "
      base64Mac = base64Mac.replaceAll("+", "-");
      url.searchParams.set("mac", base64Mac);
      url.searchParams.set("expiry", expiry);

      return new Response(url);
    }

    const url = new URL(request.url);
    const prefix = "/generate/";
    if (url.pathname.startsWith(prefix)) {
      // Replace the "/generate/" path prefix with "/verify/", which we
      // use in the first example to recognize authenticated paths.
      url.pathname = `/verify/${url.pathname.slice(prefix.length)}`;
      return await generateSignedUrl(url);
    } else {
      return fetch(request);
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
const handler: ExportedHandler = {
  async fetch(request: Request) {
    async function generateSignedUrl(url) {
      // You will need some super-secret data to use as a symmetric key.
      const encoder = new TextEncoder();
      const secretKeyData = encoder.encode("my secret symmetric key");
      const key = await crypto.subtle.importKey(
        "raw",
        secretKeyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );

      // Signed requests expire after one minute. Note that you could choose
      // expiration durations dynamically, depending on, for example, the path or a query
      // parameter.
      const expirationMs = 60000;
      const expiry = Date.now() + expirationMs;
      // The signature will be computed for the pathname and the expiry timestamp.
      // The two fields must be separated or padded to ensure that an attacker
      // will not be able to use the same signature for other pathname/expiry pairs.
      // The @ symbol is guaranteed not to appear in expiry, which is a (decimal)
      // number, so you can safely use it as a separator here. When combining more
      // fields, consider JSON.stringify-ing an array of the fields instead of
      // concatenating the values.
      const dataToAuthenticate = `${url.pathname}@${expiry}`;

      const mac = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(dataToAuthenticate)
      );

      // `mac` is an ArrayBuffer, so you need to make a few changes to get
      // it into a ByteString, and then a Base64-encoded string.
      let base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)));

      // must convert "+" to "-" as urls encode "+" as " "
      base64Mac = base64Mac.replaceAll("+", "-");
      url.searchParams.set("mac", base64Mac);
      url.searchParams.set("expiry", expiry);

      return new Response(url);
    }

    const url = new URL(request.url);
    const prefix = "/generate/";
    if (url.pathname.startsWith(prefix)) {
      // Replace the "/generate/" path prefix with "/verify/", which we
      // use in the first example to recognize authenticated paths.
      url.pathname = `/verify/${url.pathname.slice(prefix.length)}`;
      return await generateSignedUrl(url);
    } else {
      return fetch(request);
    }
  },
};

export default handler;
```

{{</tab>}}
{{</tabs>}}
