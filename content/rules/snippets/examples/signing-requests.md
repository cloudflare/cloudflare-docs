---
type: example
summary: Verify a signed request using the HMAC and SHA-256 algorithms or
  return a 403.
goal:
  - Authentication
operation:
  - Request modification
product:
  - Snippets
pcx_content_type: example
title: Sign requests
layout: example
---

The following Snippet will:

- For request URLs beginning with `/generate/`, replace `/generate/` with `/`, sign the resulting path with its timestamp, and return the full, signed URL in the response body.

- For all other request URLs, verify the signed URL and allow the request through.

```js
export default {
  async fetch(request) {
    const secretKey = 'your_secret_key'; // Replace with your actual secret key
    const expiration = 60; // Expiration time in seconds (how long an HMAC token should be valid for)

    const encoder = new TextEncoder();

    // Import the secret key for HMAC-SHA256 signing
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"]
    );

    const url = new URL(request.url);

    // Check if the request URL starts with /generate/
    if (url.pathname.startsWith("/generate/")) {
      // Replace /generate/ with /
      url.pathname = url.pathname.replace("/generate/", "/");

      const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds

      // Data to authenticate: combine pathname and timestamp
      const dataToAuthenticate = `${url.pathname}${currentTimestamp}`;

      // Sign the data with HMAC-SHA256
      const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(dataToAuthenticate)
      );

      // Encode the timestamp and HMAC in a secure manner
      const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
      const signedData = `${currentTimestamp}-${signatureBase64}`;
      const encodedSignedData = encodeURIComponent(signedData);

      // Create the signed URL
      const signedURL = `${url}?verify=${encodedSignedData}`;

      // Return the signed URL in the response body
      return new Response(signedURL, { status: 200 });
    }

    // For all other request URLs, verify the signed URL
    const params = new URLSearchParams(url.search);
    const verifyParam = params.get('verify');

    if (!verifyParam) {
      return new Response('Verification parameter is missing', { status: 403 });
    }

    // Decode and split the verify parameter into timestamp and HMAC
    const decodedVerifyParam = decodeURIComponent(verifyParam);
    const [timestampStr, receivedMac] = decodedVerifyParam.split("-");

    // Parse timestamp and ensure it's a valid number
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) {
      return new Response('Invalid timestamp', { status: 403 });
    }

    // Check if the request has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp > timestamp + expiration) {
      return new Response('Signed URL has expired', { status: 403 });
    }

    // Remove the verify parameter to verify the URL
    params.delete('verify');
    url.search = params.toString();

    // Construct the data to authenticate for verification
    const dataToVerify = `${url.pathname}${timestamp}`;

    // Verify the signature with HMAC-SHA256
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      new Uint8Array([...atob(receivedMac)].map(char => char.charCodeAt(0))),
      encoder.encode(dataToVerify)
    );

    if (!isValid) {
      return new Response('Invalid signature', { status: 403 });
    }

    // Continue processing the request if the signature is valid
    return fetch(request);
  }
}
```