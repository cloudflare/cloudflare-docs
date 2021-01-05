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

- [Signing requests](/examples/signing-requests)

<Aside type="warning" header="Warning">

The Web Crypto API differs significantly from Node’s Crypto API. If you want to port JavaScript that relies on Node’s Crypto API, you’ll need to invest in translating it to use Web Crypto primitives.

</Aside>

## Methods

<Definitions>

- <Code>crypto.getRandomValues(buffer<ParamType>ArrayBuffer</ParamType>)</Code>
  <Type>ArrayBuffer</Type>

  - Fills the passed ArrayBuffer with cryptographically sound random values.

</Definitions>

### SubtleCrypto Methods

These methods are all accessed via `crypto.subtle`, which is also [documented in detail on MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#Methods).

<Definitions>

- <Code>encrypt(algorithm, key, data)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with the encrypted data corresponding to the clear text,
    algorithm, and key given as parameters.

    __Parameters:__

    - <Code>algorithm<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#Syntax).

    - <Code>key<ParamType>CryptoKey</ParamType></Code>
    - <Code>data<ParamType>BufferSource</ParamType></Code>

- <Code>decrypt(algorithm, key, data)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with the clear data corresponding to the ciphertext, algorithm,
    and key given as parameters.

    __Parameters:__

    - <Code>algorithm<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt#Syntax).

    - <Code>key<ParamType>CryptoKey</ParamType></Code>
    - <Code>data<ParamType>BufferSource</ParamType></Code>

- <Code>sign(algorithm, key, data)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with the signature corresponding to the text, algorithm, and key
    given as parameters.

    __Parameters:__

    - <Code>algorithm<ParamType>string | object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#Syntax).

    - <Code>key<ParamType>CryptoKey</ParamType></Code>
    - <Code>data<ParamType>ArrayBuffer</ParamType></Code>

- <Code>verify(algorithm, key, signature, data)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with a Boolean value indicating if the signature given as a
    parameter matches the text, algorithm, and key that are also given as parameters.

    __Parameters:__

    - <Code>algorithm<ParamType>string | object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/verify#Syntax).

    - <Code>key<ParamType>CryptoKey</ParamType></Code>
    - <Code>signature<ParamType>ArrayBuffer</ParamType></Code>
    - <Code>data<ParamType>ArrayBuffer</ParamType></Code>

- <Code>digest(algorithm, data)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with a digest generated from the algorithm and text given as
    parameters.

    __Parameters:__

    - <Code>algorithm<ParamType>string | object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Syntax).

    - <Code>data<ParamType>ArrayBuffer</ParamType></Code>

- <Code>generateKey(algorithm, extractable, keyUsages)</Code> <Type>Promise&lt;CryptoKey>&nbsp;|&nbsp;Promise&lt;CryptoKeyPair></Type>

  - Returns a Promise that fulfills with a newly-generated `CryptoKey`, for symmetrical algorithms,
    or a `CryptoKeyPair`, containing two newly generated keys, for asymmetrical algorithms. For
    example, to generate a new AES-GCM key:

    ```js
    let keyPair = crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: "256"
      },
      true,
      ["encrypt", "decrypt"]
    )
    ```

    __Parameters:__

    - <Code>algorithm<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

    - <Code>extractable<ParamType>bool</ParamType></Code>
    - <Code>keyUsages<ParamType>Array</ParamType></Code>

      - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey#Syntax).

- <Code>deriveKey(algorithm, baseKey, derivedKeyAlgorithm, extractable, keyUsages)</Code> <Type>Promise&lt;CryptoKey></Type>

  - Returns a Promise that fulfills with a newly generated `CryptoKey` derived from the base key
    and specific algorithm given as parameters.

    __Parameters:__

    - <Code>algorithm<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

    - <Code>baseKey<ParamType>CryptoKey</ParamType></Code>
    - <Code>derivedKeyAlgorithm<ParamType>object</ParamType></Code>

      - Defines the algorithm the derived key will be used for in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax).

    - <Code>extractable<ParamType>bool</ParamType></Code>
    - <Code>keyUsages<ParamType>Array</ParamType></Code>

      - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey#Syntax)

- <Code>deriveBits(algorithm, baseKey, length)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Returns a Promise that fulfills with a newly generated buffer of pseudo-random bits derived from
    the base key and specific algorithm given as parameters. It returns a
    Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This method
    is very similar to `deriveKey()`, except that `deriveKey()` returns a `CryptoKey` object rather
    than an `ArrayBuffer`. Essentially, `deriveKey()` is composed of `deriveBits()` followed by
    `importKey()`.

    __Parameters:__

    - <Code>algorithm<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveBits#Syntax).

    - <Code>baseKey<ParamType>CryptoKey</ParamType></Code>
    - <Code>length<ParamType>int</ParamType></Code>

      - Length of the bit string to derive.

- <Code>importKey(format, keyData, algorithm, extractable, keyUsages)</Code> <Type>Promise&lt;CryptoKey></Type>

  - Transform a key from some external, portable format into a `CryptoKey` for use with the Web
    Crypto API.

    __Parameters:__

    - <Code>format<ParamType>string</ParamType></Code>

      - Describes [the format of the key to be imported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

    - <Code>keyData<ParamType>ArrayBuffer</ParamType></Code>
    - <Code>algorithm<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax).

    - <Code>extractable<ParamType>bool</ParamType></Code>
    - <Code>keyUsages<ParamType>Array</ParamType></Code>

      - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#Syntax)

- <Code>exportKey(format<ParamType>string</ParamType>, key<ParamType>CryptoKey</ParamType>)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Transform a `CryptoKey` into a portable format, if the `CryptoKey` is `extractable`.

    __Parameters:__

    - <Code>format<ParamType>string</ParamType></Code>

      - Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/exportKey#Syntax).

    - <Code>key<ParamType>CryptoKey</ParamType></Code>

- <Code>wrapKey(format, key, wrappingKey, wrapAlgo)</Code> <Type>Promise&lt;ArrayBuffer></Type>

  - Transform a `CryptoKey` into a portable format, and then encrypt it with another key. This
    renders the `CryptoKey` suitable for storage or transmission in untrusted environments.

    __Parameters:__

    - <Code>format<ParamType>string</ParamType></Code>

      - Describes the [format in which the key will be exported](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax) before being encrypted.

    - <Code>key<ParamType>CryptoKey</ParamType></Code>
    - <Code>wrappingKey<ParamType>CryptoKey</ParamType></Code>
    - <Code>wrapAlgo<ParamType>object</ParamType></Code>

      - Describes the algorithm to be used to encrypt the exported key, including any required parameters, in [an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/wrapKey#Syntax).

- <Code>unwrapKey(format, key, unwrappingKey, unwrapAlgo,<br/>&nbsp;&nbsp;unwrappedKeyAlgo, extractable,
  keyUsages)</Code> <Type>Promise&lt;CryptoKey></Type>

  - Transform a key that was wrapped by `wrapKey()` back into a `CryptoKey`.

    __Parameters:__

    - <Code>format<ParamType>string</ParamType></Code>

      - Described the [data format of the key to be unwrapped](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

    - <Code>key<ParamType>CryptoKey</ParamType></Code>
    - <Code>unwrappingKey<ParamType>CryptoKey</ParamType></Code>
    - <Code>unwrapAlgo<ParamType>object</ParamType></Code>

      - Describes the algorithm that was used to encrypt the wrapped key, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

    - <Code>unwrappedKeyAlgo<ParamType>object</ParamType></Code>

      - Describes the key to be unwrapped, [in an algorithm-specific format](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax).

    - <Code>extractable<ParamType>bool</ParamType></Code>
    - <Code>keyUsages<ParamType>Array</ParamType></Code>

      - An Array of strings indicating the [possible usages of the new key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey#Syntax)

</Definitions>

### Supported algorithms

Workers implements a subset of the most common cryptographic algorithms, as shown in the following table. We are happy to add support for more algorithms — [let us know about your use case](https://community.cloudflare.com/c/developers/workers).

<TableWrap>

| Algorithm                                 | sign()<br/>verify() | encrypt()<br/>decrypt() | digest() | deriveBits()<br/>deriveKey() | generateKey() | wrapKey()<br/>unwrapKey() | exportKey() |
| :---------------------------------------- | :------------------ | :---------------------- | :------- | :--------------------------- | :------------ | :------------------------ | ----------- |
| RSASSA-PKCS1-v1_5                         | ✓                   |                         |          |                              | ✓             |                           | ✓           |
| RSA-PSS                                   | ✓                   |                         |          |                              | ✓             |                           | ✓           |
| ECDSA                                     | ✓                   |                         |          |                              |               |                           | ✓           |
| HMAC                                      | ✓                   |                         |          |                              | ✓             |                           |             |
| AES-CBC                                   |                     | ✓                       |          |                              |               | ✓                         |             |
| AES-GCM                                   |                     | ✓                       |          |                              | ✓             | ✓                         |             |
| SHA-1                                     |                     |                         | ✓        |                              |               |                           |             |
| SHA-256                                   |                     |                         | ✓        |                              |               |                           |             |
| SHA-384                                   |                     |                         | ✓        |                              |               |                           |             |
| SHA-512                                   |                     |                         | ✓        |                              |               |                           |             |
| MD5<sup><a href="#footnote-1">1</a></sup> |                     |                         | ✓        |                              |               |                           |             |
| PBKDF2                                    |                     |                         |          | ✓                            |               |                           |             |

</TableWrap>

__Footnotes:__

1. <a name="footnote-1"></a> MD5 is not part of the WebCrypto standard, but is supported in Cloudflare Workers for interacting with legacy systems that require MD5. MD5 is considered a weak algorithm. Do not rely upon MD5 for security.

--------------------------------

## See also

- [SubtleCrypto documentation on MDN.](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
- [SubtleCrypto documentation as part of the W3C Web Crypto API specification.](https://www.w3.org/TR/WebCryptoAPI/#subtlecrypto-interface)
