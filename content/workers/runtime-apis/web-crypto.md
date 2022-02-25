---
pcx-content-type: configuration
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

*   [Signing requests](/examples/signing-requests)

<Aside type="warning" header="Warning">

The Web Crypto API differs significantly from Node’s Crypto API. If you want to port JavaScript code that relies on Node’s Crypto API, you will need to adapt it to use Web Crypto primitives.

</Aside>

## Methods

<Definitions>

*   <Code>crypto.getRandomValues(buffer<ParamType>ArrayBufferView</ParamType>)</Code> <Type>ArrayBufferView</Type>

    *   Fills the passed <Code>ArrayBufferView</Code> with cryptographically sound random values and returns the <Code>buffer</Code>.

        **Parameters:**

        *   <Code>buffer<ParamType>ArrayBufferView</ParamType></Code>

            *   Must be an <Code><Type>Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array</Type></Code>.

*   <Code>crypto.randomUUID()</Code> <Type>string</Type>

    *   Generates a new random (version 4) UUID as defined in [RFC 4122](https://www.rfc-editor.org/rfc/rfc4122.txt).

</Definitions>

### SubtleCrypto Methods

These methods are all accessed via `crypto.subtle`, which is also [documented in detail on MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods).

<Definitions>

*   <Code>encrypt(algorithm, key, data)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Returns a Promise that fulfills with the encrypted data corresponding to the clear text,
        algorithm, and key given as parameters.

        **Parameters:**

        *   <Code>algorithm<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#Syntax).

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

        *   <Code>data<ParamType>BufferSource</ParamType></Code>

*   <Code>decrypt(algorithm, key, data)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Returns a Promise that fulfills with the clear data corresponding to the ciphertext, algorithm,
        and key given as parameters.

        **Parameters:**

        *   <Code>algorithm<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#Syntax).

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

        *   <Code>data<ParamType>BufferSource</ParamType></Code>

*   <Code>sign(algorithm, key, data)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Returns a Promise that fulfills with the signature corresponding to the text, algorithm, and key
        given as parameters.

        **Parameters:**

        *   <Code>algorithm<ParamType>string | object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#Syntax).

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

        *   <Code>data<ParamType>ArrayBuffer</ParamType></Code>

*   <Code>verify(algorithm, key, signature, data)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Returns a Promise that fulfills with a Boolean value indicating if the signature given as a
        parameter matches the text, algorithm, and key that are also given as parameters.

        **Parameters:**

        *   <Code>algorithm<ParamType>string | object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify#Syntax).

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

        *   <Code>signature<ParamType>ArrayBuffer</ParamType></Code>

        *   <Code>data<ParamType>ArrayBuffer</ParamType></Code>

*   <Code>digest(algorithm, data)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Returns a Promise that fulfills with a digest generated from the algorithm and text given as
        parameters.

        **Parameters:**

        *   <Code>algorithm<ParamType>string | object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).

        *   <Code>data<ParamType>ArrayBuffer</ParamType></Code>

*   <Code>generateKey(algorithm, extractable, keyUsages)</Code> <Type>Promise\<CryptoKey> | Promise\<CryptoKeyPair></Type>

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

        *   <Code>algorithm<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

        *   <Code>extractable<ParamType>bool</ParamType></Code>

        *   <Code>keyUsages<ParamType>Array</ParamType></Code>

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

*   <Code>deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages)</Code> <Type>Promise\<CryptoKey></Type>

    *   Returns a Promise that fulfills with a newly generated `CryptoKey` derived from the base key
        and specific algorithm given as parameters.

        **Parameters:**

        *   <Code>algorithm<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

        *   <Code>baseKey<ParamType>CryptoKey</ParamType></Code>

        *   <Code>derivedKeyAlgorithm<ParamType>object</ParamType></Code>

            *   Defines the algorithm the derived key will be used for in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

        *   <Code>extractable<ParamType>bool</ParamType></Code>

        *   <Code>keyUsages<ParamType>Array</ParamType></Code>

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax)

*   <Code>deriveBits(algorithm, baseKey, length)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Returns a Promise that fulfills with a newly generated buffer of pseudo-random bits derived from
        the base key and specific algorithm given as parameters. It returns a
        Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This method
        is very similar to `deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather
        than an `ArrayBuffer`. Essentially, `deriveKey()` is composed of `deriveBits()` followed by
        `importKey()`.

        **Parameters:**

        *   <Code>algorithm<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#Syntax).

        *   <Code>baseKey<ParamType>CryptoKey</ParamType></Code>

        *   <Code>length<ParamType>int</ParamType></Code>

            *   Length of the bit string to derive.

*   <Code>importKey(format, keyData, algorithm, extractable, keyUsages)</Code> <Type>Promise\<CryptoKey></Type>

    *   Transform a key from some external, portable format into a `CryptoKey` for use with the Web
        Crypto API.

        **Parameters:**

        *   <Code>format<ParamType>string</ParamType></Code>

            *   Describes [the format of the key to be imported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

        *   <Code>keyData<ParamType>ArrayBuffer</ParamType></Code>

        *   <Code>algorithm<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

        *   <Code>extractable<ParamType>bool</ParamType></Code>

        *   <Code>keyUsages<ParamType>Array</ParamType></Code>

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax)

*   <Code>exportKey(format<ParamType>string</ParamType>, key<ParamType>CryptoKey</ParamType>)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Transform a `CryptoKey` into a portable format, if the `CryptoKey` is `extractable`.

        **Parameters:**

        *   <Code>format<ParamType>string</ParamType></Code>

            *   Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#Syntax).

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

*   <Code>wrapKey(format, key, wrappingKey, wrapAlgo)</Code> <Type>Promise\<ArrayBuffer></Type>

    *   Transform a `CryptoKey` into a portable format, and then encrypt it with another key. This
        renders the `CryptoKey` suitable for storage or transmission in untrusted environments.

        **Parameters:**

        *   <Code>format<ParamType>string</ParamType></Code>

            *   Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax) before being encrypted.

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

        *   <Code>wrappingKey<ParamType>CryptoKey</ParamType></Code>

        *   <Code>wrapAlgo<ParamType>object</ParamType></Code>

            *   Describes the algorithm to be used to encrypt the exported key, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax).

*   <Code>unwrapKey(format, key, unwrappingKey, unwrapAlgo,<br/>  unwrappedKeyAlgo, extractable,
    keyUsages)</Code> <Type>Promise\<CryptoKey></Type>

    *   Transform a key that was wrapped by `wrapKey()` back into a `CryptoKey`.

        **Parameters:**

        *   <Code>format<ParamType>string</ParamType></Code>

            *   Described the [data format of the key to be unwrapped](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

        *   <Code>key<ParamType>CryptoKey</ParamType></Code>

        *   <Code>unwrappingKey<ParamType>CryptoKey</ParamType></Code>

        *   <Code>unwrapAlgo<ParamType>object</ParamType></Code>

            *   Describes the algorithm that was used to encrypt the wrapped key, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

        *   <Code>unwrappedKeyAlgo<ParamType>object</ParamType></Code>

            *   Describes the key to be unwrapped, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

        *   <Code>extractable<ParamType>bool</ParamType></Code>

        *   <Code>keyUsages<ParamType>Array</ParamType></Code>

            *   An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax)

</Definitions>

### Supported algorithms

Workers implements all operation of the [WebCrypto standard](https://www.w3.org/TR/WebCryptoAPI), as shown in the following table.
The Workers team continuously adds support for more algorithms — [share your use case with the community](https://community.cloudflare.com/c/developers/workers).

A checkmark (✓) indicates that this feature is believed to be fully supported according to the spec.
\[//]: #  An x (✘) indicates that this feature is part of the specification but not implemented.
\[//]: #  If a feature only implements the operation partially, details are listed.

<TableWrap>

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

</TableWrap>

**Footnotes:**

1.  <a name="footnote-1"></a> Non-standard EdDSA is supported for the Ed25519 curve. Since this algorithm is non-standard, a few things to keep in mind while using it:

*   Use <Code>NODE-ED25519</Code> as the algorithm and namedCurve parameters.
*   Unlike NodeJS, Cloudflare will not support raw import of private keys.
*   The algorithm implementation may change over time. While Cloudflare cannot guarantee it at this time, Cloudflare will strive to maintain backward compatibility and compatibility with NodeJS's behavior.
    Any notable compatibility notes will be communicated in release notes and via this developer document.

2.  <a name="footnote-2"></a> MD5 is not part of the WebCrypto standard but is supported in Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak algorithm — do not rely upon MD5 for security.

***

## Related resources

*   [SubtleCrypto documentation on MDN.](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
*   [SubtleCrypto documentation as part of the W3C Web Crypto API specification.](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface)
*   [Example: signing requests](/examples/signing-requests)
