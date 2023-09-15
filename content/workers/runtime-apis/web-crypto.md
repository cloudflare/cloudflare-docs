---
pcx_content_type: configuration
title: Web Crypto
---

# Web Crypto

## Background

The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers Runtime implements the full surface of this API, but with some differences in the [supported algorithms](#supported-algorithms) compared to those implemented in most browsers.

Performing cryptographic operations using the Web Crypto API is significantly faster than performing them purely in JavaScript. If you want to perform CPU-intensive cryptographic operations, you should consider using the Web Crypto API.

The Web Crypto API is implemented through the `SubtleCrypto` interface, accessible via the global `crypto.subtle` binding. A simple example of calculating a digest (also known as a hash) is:

```js
const myText = new TextEncoder().encode('Hello world!');

const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
  myText // The data you want to hash as an ArrayBuffer
);

console.log(new Uint8Array(myDigest));
```

Some common uses include [signing requests](/workers/examples/signing-requests/).

{{<Aside type="warning">}}
The Web Crypto API differs significantly from Node’s Crypto API. If you want to port JavaScript code that relies on Node’s Crypto API, you will need to adapt it to use Web Crypto primitives.
{{</Aside>}}

---

## Constructors

{{<definitions>}}

  - {{<code>}}crypto.DigestStream(algorithm){{</code>}} {{<type>}}DigestStream{{</type>}}

    - A non-standard extension to the `crypto` API that supports generating a hash digest from streaming data. The `DigestStream` itself is a [`WritableStream`](/workers/runtime-apis/streams/writablestream/) that does not retain the data written into it. Instead, it generates a hash digest automatically when the flow of data has ended.

{{</definitions>}}

### Parameters

{{<definitions>}}

- {{<code>}}algorithm{{</code>}}{{<param-type>}}string | object{{</param-type>}}

  - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).

{{</definitions>}}

### Usage

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}
```js
export default {
  async fetch(req) {
    // Fetch from origin
    const res = await fetch(req);
    
    // We need to read the body twice so we `tee` it (get two instances)
    const [bodyOne, bodyTwo] = res.body.tee();
    // Make a new response so we can set the headers (responses from `fetch` are immutable)
    const newRes = new Response(bodyOne, res);
    // Create a SHA-256 digest stream and pipe the body into it
    const digestStream = new crypto.DigestStream("SHA-256");
    bodyTwo.pipeTo(digestStream);
    // Get the final result
    const digest = await digestStream.digest;
    // Turn it into a hex string
    const hexString = [...new Uint8Array(digest)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    // Set a header with the SHA-256 hash and return the response
    newRes.headers.set("x-content-digest", `SHA-256=${hexString}`);
    return newRes;
  }
}
```
{{</tab>}}
{{<tab label="ts">}}
```ts
const handler: ExportedHandler = {
  async fetch(req) {
    // Fetch from origin
    const res = await fetch(req);
    
    // We need to read the body twice so we `tee` it (get two instances)
    const [bodyOne, bodyTwo] = res.body.tee();
    // Make a new response so we can set the headers (responses from `fetch` are immutable)
    const newRes = new Response(bodyOne, res);
    // Create a SHA-256 digest stream and pipe the body into it
    const digestStream = new crypto.DigestStream("SHA-256");
    bodyTwo.pipeTo(digestStream);
    // Get the final result
    const digest = await digestStream.digest;
    // Turn it into a hex string
    const hexString = [...new Uint8Array(digest)]
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    // Set a header with the SHA-256 hash and return the response
    newRes.headers.set("x-content-digest", `SHA-256=${hexString}`);
    return newRes;
  }
}
export default handler;
```
{{</tab>}}
{{</tabs>}}

## Methods

{{<definitions>}}

- {{<code>}}crypto.randomUUID(){{</code>}} : {{<type>}}string{{</type>}}

  - Generates a new random (version 4) UUID as defined in [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt).

- {{<code>}}crypto.getRandomValues(buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} : {{<type>}}ArrayBufferView{{</type>}}

  - Fills the passed {{<code>}}ArrayBufferView{{</code>}} with cryptographically sound random values and returns the {{<code>}}buffer{{</code>}}.

{{</definitions>}}

### Parameters

{{<definitions>}}

- {{<code>}}buffer{{</code>}}{{<param-type>}}ArrayBufferView{{</param-type>}}

  - Must be an {{<type>}}Int8Array{{</type>}} | {{<type>}}Uint8Array{{</type>}} | {{<type>}}Uint8ClampedArray{{</type>}} | {{<type>}}Int16Array{{</type>}} | {{<type>}}Uint16Array{{</type>}} | {{<type>}}Int32Array{{</type>}} | {{<type>}}Uint32Array{{</type>}} | {{<type>}}BigInt64Array{{</type>}} | {{<type>}}BigUint64Array{{</type>}}.

{{</definitions>}}

## SubtleCrypto Methods

These methods are all accessed via [`crypto.subtle`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods), which is also documented in detail on MDN.

### encrypt

{{<definitions>}}

- {{<code>}}encrypt(algorithm, key, data){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Returns a Promise that fulfills with the encrypted data corresponding to the clear text, algorithm, and key given as parameters.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#Syntax).

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}data{{</code>}}{{<param-type>}}BufferSource{{</param-type>}}

  {{</definitions>}}

### decrypt

{{<definitions>}}

- {{<code>}}decrypt(algorithm, key, data){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Returns a Promise that fulfills with the clear data corresponding to the ciphertext, algorithm, and key given as parameters.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#Syntax).

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}data{{</code>}}{{<param-type>}}BufferSource{{</param-type>}}

  {{</definitions>}}

### sign

{{<definitions>}}

- {{<code>}}sign(algorithm, key, data){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Returns a Promise that fulfills with the signature corresponding to the text, algorithm, and key given as parameters.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}string | object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#Syntax).

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}data{{</code>}}{{<param-type>}}ArrayBuffer{{</param-type>}}

  {{</definitions>}}

### verify

{{<definitions>}}

- {{<code>}}verify(algorithm, key, signature, data){{</code>}} : {{<type>}}Promise\<boolean>{{</type>}}

  - Returns a Promise that fulfills with a Boolean value indicating if the signature given as a parameter matches the text, algorithm, and key that are also given as parameters.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}string | object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify#Syntax).

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}signature{{</code>}}{{<param-type>}}ArrayBuffer{{</param-type>}}

  - {{<code>}}data{{</code>}}{{<param-type>}}ArrayBuffer{{</param-type>}}

  {{</definitions>}}

### digest

{{<definitions>}}

- {{<code>}}digest(algorithm, data){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Returns a Promise that fulfills with a digest generated from the algorithm and text given as parameters.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}string | object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).

  - {{<code>}}data{{</code>}}{{<param-type>}}ArrayBuffer{{</param-type>}}
  
  {{</definitions>}}

### generateKey

{{<definitions>}}

- {{<code>}}generateKey(algorithm, extractable, keyUsages){{</code>}} : {{<type>}}Promise\<CryptoKey> | Promise\<CryptoKeyPair>{{</type>}}

    - Returns a Promise that fulfills with a newly-generated `CryptoKey`, for symmetrical algorithms, or a `CryptoKeyPair`, containing two newly generated keys, for asymmetrical algorithms. For example, to generate a new AES-GCM key:

    ```js
    let keyPair = await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
    ```

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

  - {{<code>}}extractable{{</code>}}{{<param-type>}}bool{{</param-type>}}

  - {{<code>}}keyUsages{{</code>}}{{<param-type>}}Array{{</param-type>}}

    - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

  {{</definitions>}}

### deriveKey

{{<definitions>}}

- {{<code>}}deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages){{</code>}} : {{<type>}}Promise\<CryptoKey>{{</type>}}

  - Returns a Promise that fulfills with a newly generated `CryptoKey` derived from the base key and specific algorithm given as parameters.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

  - {{<code>}}baseKey{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

  - {{<code>}}derivedKeyAlgorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

    - Defines the algorithm the derived key will be used for in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

  - {{<code>}}extractable{{<param-type>}}bool{{</param-type>}}{{</code>}}

  - {{<code>}}keyUsages{{<param-type>}}Array{{</param-type>}}{{</code>}}

    - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax)
  
  {{</definitions>}}

### deriveBits

{{<definitions>}}

- {{<code>}}deriveBits(algorithm, baseKey, length){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Returns a Promise that fulfills with a newly generated buffer of pseudo-random bits derived from the base key and specific algorithm given as parameters. It returns a Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This method is very similar to `deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather than an `ArrayBuffer`. Essentially, `deriveKey()` is composed of `deriveBits()` followed by `importKey()`.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#Syntax).

  - {{<code>}}baseKey{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}length{{</code>}}{{<param-type>}}int{{</param-type>}}

    - Length of the bit string to derive.
  
  {{</definitions>}}

### importKey

{{<definitions>}}

- {{<code>}}importKey(format, keyData, algorithm, extractable, keyUsages){{</code>}} : {{<type>}}Promise\<CryptoKey>{{</type>}}

  - Transform a key from some external, portable format into a `CryptoKey` for use with the Web Crypto API.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}format{{</code>}}{{<param-type>}}string{{</param-type>}}

    - Describes [the format of the key to be imported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

  - {{<code>}}keyData{{</code>}}{{<param-type>}}ArrayBuffer{{</param-type>}}

  - {{<code>}}algorithm{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

  - {{<code>}}extractable{{</code>}}{{<param-type>}}bool{{</param-type>}}

  - {{<code>}}keyUsages{{</code>}}{{<param-type>}}Array{{</param-type>}}

    - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax)

  {{</definitions>}}

### exportKey

{{<definitions>}}

- {{<code>}}exportKey(format{{<param-type>}}string{{</param-type>}}, key{{<param-type>}}CryptoKey{{</param-type>}}){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Transform a `CryptoKey` into a portable format, if the `CryptoKey` is `extractable`.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}format{{</code>}}{{<param-type>}}string{{</param-type>}}

    - Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#Syntax).

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  {{</definitions>}}

### wrapKey

{{<definitions>}}

- {{<code>}}wrapKey(format, key, wrappingKey, wrapAlgo){{</code>}} : {{<type>}}Promise\<ArrayBuffer>{{</type>}}

  - Transform a `CryptoKey` into a portable format, and then encrypt it with another key. This renders the `CryptoKey` suitable for storage or transmission in untrusted environments.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}format{{</code>}}{{<param-type>}}string{{</param-type>}}

    - Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax) before being encrypted.

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}wrappingKey{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}wrapAlgo{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm to be used to encrypt the exported key, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax).
  
  {{</definitions>}}

### unwrapKey

{{<definitions>}}

- {{<code>}}unwrapKey(format, key, unwrappingKey, unwrapAlgo, <br/> unwrappedKeyAlgo, extractable, keyUsages){{</code>}} : {{<type>}}Promise\<CryptoKey>{{</type>}}

  - Transform a key that was wrapped by `wrapKey()` back into a `CryptoKey`.

{{</definitions>}}

  #### Parameters

  {{<definitions>}}

  - {{<code>}}format{{</code>}}{{<param-type>}}string{{</param-type>}}

    - Described the [data format of the key to be unwrapped](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

  - {{<code>}}key{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}unwrappingKey{{</code>}}{{<param-type>}}CryptoKey{{</param-type>}}

  - {{<code>}}unwrapAlgo{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the algorithm that was used to encrypt the wrapped key, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

  - {{<code>}}unwrappedKeyAlgo{{</code>}}{{<param-type>}}object{{</param-type>}}

    - Describes the key to be unwrapped, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

  - {{<code>}}extractable{{</code>}}{{<param-type>}}bool{{</param-type>}}

  - {{<code>}}keyUsages{{</code>}}{{<param-type>}}Array{{</param-type>}}

    - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax)
  
  {{</definitions>}}

### timingSafeEqual

{{<definitions>}}

- {{<code>}}timingSafeEqual(a, b){{</code>}} : {{<type>}}bool{{</type>}}

  - Compare two buffers in a way that is resistant to timing attacks. This is a non-standard extension to the Web Crypto API.

{{</definitions>}}

  #### Parameters

{{<definitions>}}

  - {{<code>}}a{{</code>}}{{<param-type>}}ArrayBuffer | TypedArray{{</param-type>}}

  - {{<code>}}b{{</code>}}{{<param-type>}}ArrayBuffer | TypedArray{{</param-type>}}

{{</definitions>}}

### Supported algorithms

Workers implements all operations of the [WebCrypto standard](https://www.w3.org/TR/WebCryptoAPI/), as shown in the following table.

A checkmark (✓) indicates that this feature is believed to be fully supported according to the spec.<br>
An x (✘) indicates that this feature is part of the specification but not implemented.<br>
If a feature only implements the operation partially, details are listed.

{{<table-wrap>}}

| Algorithm                                          | sign()<br/>verify() | encrypt()<br/>decrypt() | digest() | deriveBits()<br/>deriveKey() | generateKey() | wrapKey()<br/>unwrapKey() | exportKey() | importKey() |
| :------------------------------------------------- | :------------------ | :---------------------- | :------- | :--------------------------- | :------------ | :------------------------ | :---------- | :---------- |
| RSASSA PKCS1 v1.5                                  | ✓                   |                         |          |                              | ✓             |                           | ✓           | ✓           |
| RSA PSS                                            | ✓                   |                         |          |                              | ✓             |                           | ✓           | ✓           |
| RSA OAEP                                           |                     | ✓                       |          |                              | ✓             | ✓                         | ✓           | ✓           |
| ECDSA                                              | ✓                   |                         |          |                              | ✓             |                           | ✓           | ✓           |
| ECDH                                               |                     |                         |          | ✓                            | ✓             |                           | ✓           | ✓           |
| Ed25519<sup><a href="#footnote-1">1</a></sup>      | ✓                   |                         |          |                              | ✓             |                           | ✓           | ✓           |
| X25519<sup><a href="#footnote-1">1</a></sup>       |                     |                         |          | ✓                            | ✓             |                           | ✓           | ✓           |
| NODE ED25519<sup><a href="#footnote-2">2</a></sup> | ✓                   |                         |          |                              | ✓             |                           | ✓           | ✓           |
| AES CTR                                            |                     | ✓                       |          |                              | ✓             | ✓                         | ✓           | ✓           |
| AES CBC                                            |                     | ✓                       |          |                              | ✓             | ✓                         | ✓           | ✓           |
| AES GCM                                            |                     | ✓                       |          |                              | ✓             | ✓                         | ✓           | ✓           |
| AES KW                                             |                     |                         |          |                              | ✓             | ✓                         | ✓           | ✓           |
| HMAC                                               | ✓                   |                         |          |                              | ✓             |                           | ✓           | ✓           |
| SHA 1                                              |                     |                         | ✓        |                              |               |                           |             |             |
| SHA 256                                            |                     |                         | ✓        |                              |               |                           |             |             |
| SHA 384                                            |                     |                         | ✓        |                              |               |                           |             |             |
| SHA 512                                            |                     |                         | ✓        |                              |               |                           |             |             |
| MD5<sup><a href="#footnote-3">3</a></sup>          |                     |                         | ✓        |                              |               |                           |             |             |
| HKDF                                               |                     |                         |          | ✓                            |               |                           |             | ✓           |
| PBKDF2                                             |                     |                         |          | ✓                            |               |                           |             | ✓           |

{{</table-wrap>}}

**Footnotes:**

1.  <a name="footnote-1"></a> Algorithms as specified in the [Secure Curves API](https://wicg.github.io/webcrypto-secure-curves).
2.  <a name="footnote-2"></a> Legacy non-standard EdDSA is supported for the Ed25519 curve in addition to the Secure Curves version. Since this algorithm is non-standard, note the following while using it:

    - Use {{<code>}}NODE-ED25519{{</code>}} as the algorithm and `namedCurve` parameters.
    - Unlike NodeJS, Cloudflare will not support raw import of private keys.
    - The algorithm implementation may change over time. While Cloudflare cannot guarantee it at this time, Cloudflare will strive to maintain backward compatibility and compatibility with NodeJS's behavior. Any notable compatibility notes will be communicated in release notes and via this developer documentation.

3.  <a name="footnote-3"></a> MD5 is not part of the WebCrypto standard but is supported in Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak algorithm. Do not rely upon MD5 for security.


---

## Related resources

- [SubtleCrypto documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
- [SubtleCrypto documentation as part of the W3C Web Crypto API specification](https://www.w3.org/TR/WebCryptoAPI//#subtlecrypto-interface)
- [Example: signing requests](/workers/examples/signing-requests/)
