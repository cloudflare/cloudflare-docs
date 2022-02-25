---
pcx-content-type: configuration
title: Web Crypto
---

# Web Crypto

## Background

The Web Crypto API provides a set of low-level functions for common cryptographic tasks. The Workers Runtime implements the full surface of this API, but with some differences in the [supported algorithms](#supported-algorithms) compared to those implemented in most browsers.

Performing cryptographic operations using the Web Crypto API is significantly faster than performing them purely in JavaScript. If you want to perform CPU-intensive cryptographic operations, you should consider using the Web Crypto API.

The Web Crypto API is implemented through the `SubtleCrypto` interface, accessible via the global `crypto.subtle` binding. A simple example of calculating a digest (also known as a hash) is:

```js
const myText = new TextEncoder().encode("Hello world!")

const myDigest = await crypto.subtle.digest(
  {
    name: "SHA-256",
  },
  myText, // The data you want to hash as an ArrayBuffer
)

console.log(new Uint8Array(myDigest))
```

Some common uses include:

*   [Signing requests](/workers/examples/signing-requests/)

{{<Aside type="warning" header="Warning">}}

The Web Crypto API differs significantly from Node’s Crypto API. If you want to port JavaScript code that relies on Node’s Crypto API, you will need to adapt it to use Web Crypto primitives.

{{</Aside>}}

## Methods

{{<definitions>}}

*   {{<code>}}crypto.getRandomValues(buffer{{<param-type>}}ArrayBufferView{{</param-type>}}){{</code>}} {{<type>}}ArrayBufferView{{</type>}}

    *   Fills the passed {{<code>}}ArrayBufferView{{</code>}} with cryptographically sound random values and returns the {{<code>}}buffer{{</code>}}.

        **Parameters:**

        *   {{<code>}}buffer{{<param-type>}}ArrayBufferView{{</param-type>}}{{</code>}}

            *   Must be an {{<code>}}{{<type>}}Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array{{</type>}}{{</code>}}.

*   {{<code>}}crypto.randomUUID(){{</code>}} {{<type>}}string{{</type>}}

    *   Generates a new random (version 4) UUID as defined in [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt).

{{</definitions>}}

### SubtleCrypto Methods

These methods are all accessed via `crypto.subtle`, which is also [documented in detail on MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods).

{{<definitions>}}

*   {{<code>}}encrypt(algorithm, key, data){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a Promise that fulfills with the encrypted data corresponding to the clear text,
        algorithm, and key given as parameters.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#Syntax).

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}data{{<param-type>}}BufferSource{{</param-type>}}{{</code>}}

*   {{<code>}}decrypt(algorithm, key, data){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a Promise that fulfills with the clear data corresponding to the ciphertext, algorithm,
        and key given as parameters.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#Syntax).

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}data{{<param-type>}}BufferSource{{</param-type>}}{{</code>}}

*   {{<code>}}sign(algorithm, key, data){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a Promise that fulfills with the signature corresponding to the text, algorithm, and key
        given as parameters.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}string | object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#Syntax).

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}data{{<param-type>}}ArrayBuffer{{</param-type>}}{{</code>}}

*   {{<code>}}verify(algorithm, key, signature, data){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a Promise that fulfills with a Boolean value indicating if the signature given as a
        parameter matches the text, algorithm, and key that are also given as parameters.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}string | object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify#Syntax).

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}signature{{<param-type>}}ArrayBuffer{{</param-type>}}{{</code>}}

        *   {{<code>}}data{{<param-type>}}ArrayBuffer{{</param-type>}}{{</code>}}

*   {{<code>}}digest(algorithm, data){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a Promise that fulfills with a digest generated from the algorithm and text given as
        parameters.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}string | object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).

        *   {{<code>}}data{{<param-type>}}ArrayBuffer{{</param-type>}}{{</code>}}

*   {{<code>}}generateKey(algorithm, extractable, keyUsages){{</code>}} {{<type>}}Promise\<CryptoKey> | Promise\<CryptoKeyPair>{{</type>}}

    *   Returns a Promise that fulfills with a newly-generated `CryptoKey`, for symmetrical algorithms,
        or a `CryptoKeyPair`, containing two newly generated keys, for asymmetrical algorithms. For
        example, to generate a new AES-GCM key:

        ```js
        let keyPair = await crypto.subtle.generateKey(
          {
            name: "AES-GCM",
            length: "256"
          },
          true,
          ["encrypt", "decrypt"]
        )
        ```

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

        *   {{<code>}}extractable{{<param-type>}}bool{{</param-type>}}{{</code>}}

        *   {{<code>}}keyUsages{{<param-type>}}Array{{</param-type>}}{{</code>}}

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

*   {{<code>}}deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages){{</code>}} {{<type>}}Promise\<CryptoKey>{{</type>}}

    *   Returns a Promise that fulfills with a newly generated `CryptoKey` derived from the base key
        and specific algorithm given as parameters.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

        *   {{<code>}}baseKey{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}derivedKeyAlgorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Defines the algorithm the derived key will be used for in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

        *   {{<code>}}extractable{{<param-type>}}bool{{</param-type>}}{{</code>}}

        *   {{<code>}}keyUsages{{<param-type>}}Array{{</param-type>}}{{</code>}}

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax)

*   {{<code>}}deriveBits(algorithm, baseKey, length){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Returns a Promise that fulfills with a newly generated buffer of pseudo-random bits derived from
        the base key and specific algorithm given as parameters. It returns a
        Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This method
        is very similar to `deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather
        than an `ArrayBuffer`. Essentially, `deriveKey()` is composed of `deriveBits()` followed by
        `importKey()`.

        **Parameters:**

        *   {{<code>}}algorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#Syntax).

        *   {{<code>}}baseKey{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}length{{<param-type>}}int{{</param-type>}}{{</code>}}

            *   Length of the bit string to derive.

*   {{<code>}}importKey(format, keyData, algorithm, extractable, keyUsages){{</code>}} {{<type>}}Promise\<CryptoKey>{{</type>}}

    *   Transform a key from some external, portable format into a `CryptoKey` for use with the Web
        Crypto API.

        **Parameters:**

        *   {{<code>}}format{{<param-type>}}string{{</param-type>}}{{</code>}}

            *   Describes [the format of the key to be imported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

        *   {{<code>}}keyData{{<param-type>}}ArrayBuffer{{</param-type>}}{{</code>}}

        *   {{<code>}}algorithm{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

        *   {{<code>}}extractable{{<param-type>}}bool{{</param-type>}}{{</code>}}

        *   {{<code>}}keyUsages{{<param-type>}}Array{{</param-type>}}{{</code>}}

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax)

*   {{<code>}}exportKey(format{{<param-type>}}string{{</param-type>}}, key{{<param-type>}}CryptoKey{{</param-type>}}){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Transform a `CryptoKey` into a portable format, if the `CryptoKey` is `extractable`.

        **Parameters:**

        *   {{<code>}}format{{<param-type>}}string{{</param-type>}}{{</code>}}

            *   Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#Syntax).

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

*   {{<code>}}wrapKey(format, key, wrappingKey, wrapAlgo){{</code>}} {{<type>}}Promise\<ArrayBuffer>{{</type>}}

    *   Transform a `CryptoKey` into a portable format, and then encrypt it with another key. This
        renders the `CryptoKey` suitable for storage or transmission in untrusted environments.

        **Parameters:**

        *   {{<code>}}format{{<param-type>}}string{{</param-type>}}{{</code>}}

            *   Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax) before being encrypted.

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}wrappingKey{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}wrapAlgo{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm to be used to encrypt the exported key, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax).

*   {{<code>}}unwrapKey(format, key, unwrappingKey, unwrapAlgo,<br/>  unwrappedKeyAlgo, extractable,
    keyUsages){{</code>}} {{<type>}}Promise\<CryptoKey>{{</type>}}

    *   Transform a key that was wrapped by `wrapKey()` back into a `CryptoKey`.

        **Parameters:**

        *   {{<code>}}format{{<param-type>}}string{{</param-type>}}{{</code>}}

            *   Described the [data format of the key to be unwrapped](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

        *   {{<code>}}key{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}unwrappingKey{{<param-type>}}CryptoKey{{</param-type>}}{{</code>}}

        *   {{<code>}}unwrapAlgo{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the algorithm that was used to encrypt the wrapped key, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

        *   {{<code>}}unwrappedKeyAlgo{{<param-type>}}object{{</param-type>}}{{</code>}}

            *   Describes the key to be unwrapped, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

        *   {{<code>}}extractable{{<param-type>}}bool{{</param-type>}}{{</code>}}

        *   {{<code>}}keyUsages{{<param-type>}}Array{{</param-type>}}{{</code>}}

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax)

{{</definitions>}}

### Supported algorithms

Workers implements all operation of the [WebCrypto standard](https://www.w3.org/TR/WebCryptoAPI), as shown in the following table.
The Workers team continuously adds support for more algorithms — [share your use case with the community](https://community.cloudflare.com/c/developers/workers).

A checkmark (✓) indicates that this feature is believed to be fully supported according to the spec.
\[//]: #  An x (✘) indicates that this feature is part of the specification but not implemented.
\[//]: #  If a feature only implements the operation partially, details are listed.

{{<table-wrap>}}

| Algorithm                                         | sign()<br/>verify()  | encrypt()<br/>decrypt()   | digest() | deriveBits()<br/>deriveKey() | generateKey() | wrapKey()<br/>unwrapKey() | exportKey() | importKey() |
| :------------------------------------------------ | :------------------- | :------------------------ | :------- | :--------------------------- | :------------ | :------------------------ | :---------- | :---------- |
| RSASSA PKCS1 v1.5                                 | ✓                    |                           |          |                              | ✓             |                           | ✓           | ✓           |
| RSA PSS                                           | ✓                    |                           |          |                              | ✓             |                           | ✓           | ✓           |
| RSA OAEP                                          |                      | ✓                         |          |                              | ✓             | ✓                         | ✓           | ✓           |
| ECDSA                                             | ✓                    |                           |          |                              | ✓             |                           | ✓           | ✓           |
| ECDH                                              |                      |                           |          | ✓                            | ✓             |                           | ✓           | ✓           |
| NODE ED25519<sup><a href="#footnote 1">1</a></sup>| ✓                    |                           |          |                              | ✓             |                           | ✓           | ✓           |
| AES CTR                                           |                      | ✓                         |          |                              | ✓             | ✓                         | ✓           | ✓           |
| AES CBC                                           |                      | ✓                         |          |                              | ✓             | ✓                         | ✓           | ✓           |
| AES GCM                                           |                      | ✓                         |          |                              | ✓             | ✓                         | ✓           | ✓           |
| AES KW                                            |                      |                           |          |                              | ✓             | ✓                         | ✓           | ✓           |
| HMAC                                              | ✓                    |                           |          |                              | ✓             |                           | ✓           | ✓           |
| SHA 1                                             |                      |                           | ✓        |                              |               |                           |             |             |
| SHA 256                                           |                      |                           | ✓        |                              |               |                           |             |             |
| SHA 384                                           |                      |                           | ✓        |                              |               |                           |             |             |
| SHA 512                                           |                      |                           | ✓        |                              |               |                           |             |             |
| MD5<sup><a href="#footnote 2">2</a></sup>         |                      |                           | ✓        |                              |               |                           |             |             |
| HKDF                                              |                      |                           |          | ✓                            |               |                           |             | ✓           |
| PBKDF2                                            |                      |                           |          | ✓                            |               |                           |             | ✓           |

{{</table-wrap>}}

**Footnotes:**

1.  <a name="footnote-1"></a> Non-standard EdDSA is supported for the Ed25519 curve. Since this algorithm is non-standard, a few things to keep in mind while using it:

*   Use {{<code>}}NODE-ED25519{{</code>}} as the algorithm and namedCurve parameters.
*   Unlike NodeJS, Cloudflare will not support raw import of private keys.
*   The algorithm implementation may change over time. While Cloudflare cannot guarantee it at this time, Cloudflare will strive to maintain backward compatibility and compatibility with NodeJS's behavior.
    Any notable compatibility notes will be communicated in release notes and via this developer document.

2.  <a name="footnote-2"></a> MD5 is not part of the WebCrypto standard but is supported in Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak algorithm — do not rely upon MD5 for security.

***

## Related resources

*   [SubtleCrypto documentation on MDN.](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
*   [SubtleCrypto documentation as part of the W3C Web Crypto API specification.](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface)
*   [Example: signing requests](/workers/examples/signing-requests/)
