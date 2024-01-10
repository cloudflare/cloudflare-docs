---
type: example
summary: Verify a signed request using the HMAC and SHA-256 algorithms or
  return a 403.
tags:
  - Security
  - WebCrypto
pcx_content_type: configuration
playground: https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbMutvvsCMAbAKwBMADgAsg-twAM-AJyDB3fgGYp0zoM79eoid24AuDoaNseAkWMky5C5TLUatgndwCwAKADC6KhACmP7AARKABnGHQQqGhvPRIMLDwCYhIqOGBfBgAifEIAOgArEMzSVCgwfzSM7KSCovcvH38IbAAVOhhfWLgYGDAoAGMCKG9kfLgANzgQ-oRYCABqYHRccF93d18AD3CkElxfVDhwCBIAbzcASFT02MyAUU203t8SAEEABQBJTIAaS8IAOYhWIAbUyWye5V+JEy3Sg0MyCF8YW8IV8mQAun8AL5ENzuYyEwymISicQqaxKFT2TTaXT1bx+ALBFGRaJUWLxHA5ZLXKpQGhbWrFOJlCrpLIC-abYUMxoBNodLo9PqDdmjCZTGZzRbLVbrNxQYA7E6nEgAIRAqFQvgQJGxcQQ6GAJAA5FRlp0yFabQhXXi3P1USd-EH9naGClfAB3EgtLYQO5UMO2gAUAEoA8hkCQABLoWNgbwAkhwKh5gCyrw8JAg6AA1v4SCEABaUMC4cgvSZ9TvxH4kAXN3xBmghQPBkh3AAaXwASgBNEiRyRuNxbE17A5HSBnS7IABUB8uJAPJBPZ4AAvAEGkznPfABHEDIiAOpHP1-ni6nkjXxB3qcpwAMp3B4c53C0AD6gSvC0ryxCEECzFQALYg6-jjN+v6XkiEAgAgVAhNhB7IJcUx0MmcS+BA-QtqmH4vkhA6Yeme4XBc2YkAulAkNGZRgFGvidiEzovGiMw0XsSS1ugJAgGipbEXAzZ0MA6TIQMJCNnQuRxi2oTNm24CdmQviXJxOYEIQdHCbJJB0JQdoAOqYI2dpTKW5ahvQMB+CJI54bkFlcQ+vr2S2EAQDAwLZvs4y+EWHQICEuT9EWIC4KgYCIL4aXOsg0ZubaITIKOpQAgRQwjBJeGlRZo5IcOkkQAA0r4dCBDJkahp6CC5L1+ypphuSgeBkEwXBrwkAA-DNbrAHQzV4ap6k0bM-TaR1rqZmuHFcZ8xqYCcjkEctUmeSpHi+XW7VLfE5DoBALZupEAJUK6Xmdq6CWzKgdCfegyXVURDWTjpy6ltGcBRCQMztHWuQhCAZAQOUuRGiad2pq6t7Rq6A61TRd1dYQA5mnysSurmVYeATJAtlMLZU8BuavNgmjcJ92IDocYBogOIKum9H0Dj9tpQP9roYrtYNEScBGCZGVAxiQACqc4ADIMU+TEQLkiuy-tOYtAZxGGSp+xLPLt7siQrkIO5taMyccBgEW0bEdQRzPU0AwEHZcD9P0yLEXWJDIAC-i2gHIU5p85YqUibuliq-t26drqdtDPj2cAcCNs2BEvM9BBx-JaIpXD7adt4YBLVHKu2+JUDvXZGua8R0Ytk2Ps9z46fCRZkskKmiu5PAz18kjhBICEzlRPRrqR9HzfIDtbHnBxFzj5PLZ8pDu8EPvlS5EivRB74OMr03Afr2L69GxxjUnNA6RIU8kMVsfuTZegmCplJnlD00YMwRxIJwCQUD0x7WNvpQyo5CACmUu7Z2LweSlgoCAV+PcSCMS-KXE6vEc6vzkmZTB5R7K-UlnQCylk8y2heNGF4dcloizQbWI0r5P5lk7L7Ege8+QDm9CcdAqAmQOUoK6VBJDZJ0K4gKdKmUXhLCRNJQgo8HrIMIMmXwA5+EdwZhECAB9MAkE-PQARAENIlRgdvF+6i4AtHQK8bB-doBqheJGAABgAElOEfKelRsT+Lftw402JvGwIuA4-Om1IxwGhrDeGfl0BIxRmjPKIscY02rPTHSLFkx9QGkUoaPJnGuN9gPTx6Yn70LCraCKUUYp6Dir4BKSUSppQyllHKSJ8rAEKsVFKyAEDUDCdgOEpUPT7EKGRbeXEHqqPQTRGG-MSDeArgKEsAA5T0AApYCbwvjm3LA7dy457GTjIFMXw3BhDf3iRaH0tpf5OmAKmOJ6Zch1mAppVCOMblonuTtAM29x5okQHRd41jUpoggDjahUsBx+NOGEj+ETsD+KBXch5QdIl1LwgRcsKtYwPhRERK+qLAkn3SCEgJCAwBI18FClsBK8RwIAGoS3+qWVBHpyw3xjn4PButXyXIuBhfmLwt5wO-oXZGajToMwmCXXBwABRGhAC6FWIcQghEQEtCxS0byVD8ClYK28R6pgAIQQpZQgaFsLciMxCIinlANansW3kSwiUYyXInCJSnGFZQiRFQuYl8ljTU2L9OTZshB8LAhIMICQih7S7W3tiaJDiQTosIMaAcLY4kYkPoy5lrKYW3mAKlKOCLxZ-U9UjXoURUyZGwJkGBdCHFTErv5FoXCMUwEhjs7VZkECpnzU8LtVz5aOIqW4v2njIbUvLYI4J-je22n7YOgtMBIk5snEiEOUAEq4EeZDS01pXmoHeamYtQcxY4pBXUriatFIpMRsjVG6MkV0DAeHSqiBOxwABDDOdb9tmliikHesqUSDAUUS8XJHgvZonkTmEIakNIbS2nQEIA5lVBhMoOY05R0i52eoZMgS1Bjuyg5+tJ37MlI1blQMBvCMNoPLLgdAUGVJIRQiWIMxpEChE2cwZ2hlpOUv6MXAcnlBMMedDecToMFk5huWUDZ2CNnln4aUFKJwNUhHzrRFsA5u4DBeuUAupyuQg3suEJk0A3ZcesrBrp3bJxIqgHZBJSSTiMfST+vKf6cm03yR1Acx7fCnuEo8wpKZ+qDSvuUlxi7qkB1qWCji1qbW+eEpvOhFxfUktVuSoNaIcYJx7FATskX40fyTbEVN6bsSZo4tmrjiG26dnwUhYiG4oBqLgOIxp3gVECmwXlEgeyRWEKk8RHsL4jI1y3B0GgenJFnTCCOSWWkFIvEGOhq1qBR6AIDrkEBGZkCQOgSQAAfKPLdSBhIDvfnukg8wpyzk+IuL1sqOJlf9SQSrqIqWGOG0iEDJx-GkpIEA1MqZXs7s+5-H7M55wLjYmee7Eh0yRKa4mhSrW00Zo5V1iy3Xgc0WJdRczqYEcdzHmu4+Qi3SRWirFZAEIyN5REztGLYqkKZp5m4XE+I3BEhl6wEk5hyRWHkFSOw6haROHpJ4RkTQgihHCGyYYHI4iYG5EkUgfIsjMLACJvKkVgBgBFKUcoFvMhW5ty6iA9vMhyhc60donRawJmQBfAUBoAA8NrAgAHkPAtAXO8O4DNPdgEe24MPdvBI5VQlkfwmRU8XHTyy3A+eC8aRUnRRA8KshqxaAAMWwIITIEcS9h7L0n6K2BdanqyNObAat2ZeFE9AMgUJq7yggFkT4dwGDCSjk35ALe28u-GH56MJom+IKaJb+rz0GDxQGL4bA-FcDPQHJq1zYBsDTDdhkTguQJDz5b9ATJj2PA9Oyrle2wziLvBynQAETo1AuAYeyAz+5QLefQVA9YdCSIYAWQSEdA5QrYvgNEmQdCLYSIqAWQXOLS2YF8-+gBNAuQ8UMATouA3SlAvSuUxB7ShUiUNuV+EAiBAu+qaB+0+eIBPccAxee0YeFAuAdALeuAp6cMOU+qWQH+SIRQJeBeRoJYIQjq2BzSPO+BABlARBJBZBFBmUkheU8UaAfSyIE8qEj+FkIBwh4wi+4GMhYeFhohvalu3+2ARYAI6Aee5hp6NhMAMhFwzk9BYkNq6sikVGP+f+ahQB9kfgTUuAswCUpYX+jstoA4kkAc8RVsckdYJWrYn+dcAoeiX0fE-coq3BS0+wvQ6ApRI2I4aMS04c-Cs+LwNGw4UUUGIAw6cAJWb+lBuhpYwc6h+sdCIB3hgxLYnAj2zkLsg4ykCR7kM0nBYxgxwx28Fw00XROhhhMxjShk+ymowE2ofk1c+wO2fEswC2kxjMNASBO2dozCZAWRUQvgwseYLQLQ7wtYt41oWkwhx6NRg45YaxVBSITxDRJARYaohuykhBfCPcJWRUjKuACm7sBYUGyq4cYJqRKYohEQJcckp0do-gnYR2VcQ4mA4YciyxUhQafCGRPcLoyykaAw9Y9cgxweNhoxj2LQlisMeJaIYAqA8xXhPhUe5YeJoJBwJwFszYkILw5yjSi2hkYyVAVAUGmyIRzYDxekPEIAcMZYJWwksMsMfQcRvCw4aqLwUhxwxEPc-SU4whOCLwe8mC6AcR4cyAcI5J28aILwbYsY9Rjw-OmxdoFxuAVxwh16SIucgBURmpvEgwic-Mck+pEAJW-CmJ4cXphRBATx+ukQI+LwJpZAQm1xUYmwEp+wKkaJkseULJSxBeyA+cAoHByA-BghaeyAGeqeBIsusu8uZIlgsgyutgqgaujgzgPuOuLI+uUQhunIJuiQhA5ulQWQZePIjuYoLuI+6AZA3uWu4+fuSoqcLa4JIwhQ3gBopwmQDZVAUESwKwUIegmQUoQohQmQ2IXZ3ZRIvZFgFIg51II5dI3AzA7gQAA
title: Sign requests
weight: 1001
layout: example
---

{{<Aside type="info">}}

This example Worker makes use of the [Node.JS Buffer API](/workers/runtime-apis/nodejs/buffer/), which is available as part of the Worker's runtime [Node.js compatibility mode](/workers/runtime-apis/nodejs/). To run this Worker, you will need to [enable the `nodejs_compat` compatibility flag](http://localhost:5173/workers/runtime-apis/nodejs/#enable-nodejs-with-workers)
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
    // In a real application you'd want to make sure that
    // users could only generate signed URLs when authenticated
    if (url.pathname.startsWith("/generate/")) {
      url.pathname = url.pathname.replace("/generate/", "/");

      const timestamp = Math.floor(Date.now() / 1000);

      // This contains all the data about the request that you want to be able to verify
      // Here we only sign the timestamp and the pathname, but often you'll want to
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
    // In a real application you'd want to make sure that
    // users could only generate signed URLs when authenticated
    if (url.pathname.startsWith("/generate/")) {
      url.pathname = url.pathname.replace("/generate/", "/");

      const timestamp = Math.floor(Date.now() / 1000);

      // This contains all the data about the request that you want to be able to verify
      // Here we only sign the timestamp and the pathname, but often you'll want to
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
