---
pcx_content_type: configuration
title: Crypto
---

# Crypto

{{<render file="_nodejs-compat-howto.md">}}

The `node:crypto`` module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

A subset of the the `node:crypto` module is available in Workers. All APIs in the tables below with a ✅ are supported, and unless otherwise noted, work the same way as the implementations in Node.js.

The [WebCrypto API](/workers/runtime-apis/web-crypto/) is also available within Cloudflare Workers.

## Classes

| API | Supported? | Notes |
|-----|------------|-------|
| [Certificate](https://nodejs.org/api/crypto.html#class-certificate) |  | |
| [Cipher](https://nodejs.org/api/crypto.html#class-cipher) |  | |
| [Decipher](https://nodejs.org/api/crypto.html#class-decipher) |  | |
| [DiffieHellman](https://nodejs.org/api/crypto.html#class-diffiehellman) | ✅ | |
| [DiffieHellmanGroup](https://nodejs.org/api/crypto.html#class-diffiehellmangroup) | ✅ | |
| [ECDH](https://nodejs.org/api/crypto.html#class-ecdh) |  | |
| [Hash](https://nodejs.org/api/crypto.html#class-hash) | ✅ | |
| [Hmac](https://nodejs.org/api/crypto.html#class-hmac) | ✅ | |
| [KeyObject](https://nodejs.org/api/crypto.html#class-keyobject) |  | |
| [Sign](https://nodejs.org/api/crypto.html#class-sign) |  | |
| [Verify](https://nodejs.org/api/crypto.html#class-verify) |  | |
| [X509Certificate](https://nodejs.org/api/crypto.html#class-x509certificate) |  | |
| [constants](https://nodejs.org/api/crypto.html#cryptoconstants) |  | |

## Primes

| API | Supported? | Notes |
|-----|------------|-------|
| [checkPrime](https://nodejs.org/api/crypto.html#cryptocheckprimecandidate-options-callback) | ✅ | |
| [checkPrimeSync](https://nodejs.org/api/crypto.html#cryptocheckprimesynccandidate-options) | ✅ | |
| [generatePrime](https://nodejs.org/api/crypto.html#cryptogenerateprimesize-options-callback) | ✅ | |
| [generatePrimeSync](https://nodejs.org/api/crypto.html#cryptogenerateprimesyncsize-options) | ✅ | |


## Ciphers

| API | Supported? | Notes |
|-----|------------|-------|
| [createCipher](https://nodejs.org/api/crypto.html#cryptocreatecipheralgorithm-password-options) |  | Deprecated, use `createCipheriv` instead |
| [createCipheriv](https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options) |  | |
| [createDecipher](https://nodejs.org/api/crypto.html#cryptocreatedecipheralgorithm-password-options) |  | Deprecated, use `createDecipheriv` instead |
| [createDecipheriv](https://nodejs.org/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options) |  | |
| [privateDecrypt](https://nodejs.org/api/crypto.html#cryptoprivatedecryptprivatekey-buffer) |  | |
| [privateEncrypt](https://nodejs.org/api/crypto.html#cryptoprivateencryptprivatekey-buffer) |  | |
| [publicDecrypt](https://nodejs.org/api/crypto.html#cryptopublicdecryptkey-buffer) |  | |
| [publicEncrypt](https://nodejs.org/api/crypto.html#cryptopublicencryptkey-buffer) |  | |

## DiffieHellman

| API | Supported? | Notes |
|-----|------------|-------|
| [createDiffieHellman(prime)](https://nodejs.org/api/crypto.html#cryptocreatediffiehellmanprime-primeencoding-generator-generatorencoding) | ✅ | |
| [createDiffieHellman(primeLength)](https://nodejs.org/api/crypto.html#cryptocreatediffiehellmanprimelength-generator) | ✅ | |
| [createDiffieHellmanGroup](https://nodejs.org/api/crypto.html#cryptocreatediffiehellmangroupname) | ✅ | |
| [createECDH](https://nodejs.org/api/crypto.html#cryptocreateecdhcurvename) |  | |
| [diffieHellman](https://nodejs.org/api/crypto.html#cryptodiffiehellmanoptions) |  | |
| [getDiffieHellman](https://nodejs.org/api/crypto.html#cryptogetdiffiehellmangroupname) | ✅ | |

## Hash

| API | Supported? | Notes |
|-----|------------|-------|
| [createHash](https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options) | ✅ | |
| [createHmac](https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options) | ✅ | |
| [getHashes](https://nodejs.org/api/crypto.html#cryptogethashes) | ✅ | |

## Keys

| API | Supported? | Notes |
|-----|------------|-------|
| [createPrivateKey](https://nodejs.org/api/crypto.html#cryptocreateprivatekeykey) |  | |
| [createPublicKey](https://nodejs.org/api/crypto.html#cryptocreatepublickeykey) |  | |
| [createSecretKey](https://nodejs.org/api/crypto.html#cryptocreatesecretkeykey-encoding) | ✅ | |
| [generateKey](https://nodejs.org/api/crypto.html#cryptogeneratekeytype-options-callback) | ✅ | |
| [generateKeyPair](https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback) | ✅ | |
| [generateKeyPairSync](https://nodejs.org/api/crypto.html#cryptogeneratekeypairsynctype-options) | ✅ | |
| [generateKeySync](https://nodejs.org/api/crypto.html#cryptogeneratekeysynctype-options) | ✅ | |

## Sign/Verify

| API | Supported? | Notes |
|-----|------------|-------|
| [createSign](https://nodejs.org/api/crypto.html#cryptocreatesignalgorithm-options) |  | |
| [createVerify](https://nodejs.org/api/crypto.html#cryptocreateverifyalgorithm-options) |  | |
| [sign](https://nodejs.org/api/crypto.html#cryptosignalgorithm-data-key-callback) |  | |
| [verify](https://nodejs.org/api/crypto.html#cryptoverifyalgorithm-data-key-signature-callback) |  | |

## Misc

| API | Supported? | Notes |
|-----|------------|-------|
| [getCipherInfo](https://nodejs.org/api/crypto.html#cryptogetcipherinfonameornid-options) |  | |
| [getCiphers](https://nodejs.org/api/crypto.html#cryptogetciphers) | ✅ | |
| [getCurves](https://nodejs.org/api/crypto.html#cryptogetcurves) | ✅ | |
| [secureHeapUsed](https://nodejs.org/api/crypto.html#cryptosecureheapused) | ✅ | |
| [setEngine](https://nodejs.org/api/crypto.html#cryptosetengineengine-flags) | ✅ | |
| [timingSafeEqual](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b) | ✅ | |

## Fips

| API | Supported? | Notes |
|-----|------------|-------|
| [getFips](https://nodejs.org/api/crypto.html#cryptogetfips) | ✅ | |
| [fips](https://nodejs.org/api/crypto.html#cryptofips) | ✅ | Deprecated, use `getFips()` instead |
| [setFips](https://nodejs.org/api/crypto.html#cryptosetfipsbool) | ✅ | |

## Random

| API | Supported? | Notes |
|-----|------------|-------|
| [getRandomValues](https://nodejs.org/api/crypto.html#cryptogetrandomvaluestypedarray) | ✅ | |
| [randomBytes](https://nodejs.org/api/crypto.html#cryptorandombytessize-callback) | ✅ | |
| [randomFillSync](https://nodejs.org/api/crypto.html#cryptorandomfillsyncbuffer-offset-size) | ✅ | |
| [randomFill](https://nodejs.org/api/crypto.html#cryptorandomfillbuffer-offset-size-callback) | ✅ | |
| [randomInt](https://nodejs.org/api/crypto.html#cryptorandomintmin-max-callback) | ✅ | |
| [randomUUID](https://nodejs.org/api/crypto.html#cryptorandomuuidoptions) | ✅ | |

## Key Derivation

| API | Supported? | Notes |
|-----|------------|-------|
| [hkdf](https://nodejs.org/api/crypto.html#cryptohkdfdigest-ikm-salt-info-keylen-callback) | ✅ | Does not yet support KeyObject |
| [hkdfSync](https://nodejs.org/api/crypto.html#cryptohkdfsyncdigest-ikm-salt-info-keylen) | ✅ | Does not yet support KeyObject |
| [pbkdf2](https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback) | ✅ | |
| [pbkdf2Sync](https://nodejs.org/api/crypto.html#cryptopbkdf2password-salt-iterations-keylen-digest-callback) | ✅ | |
| [scrypt](https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) |  | |
| [scryptSync](https://nodejs.org/api/crypto.html#cryptoscryptsyncpassword-salt-keylen-options) |  | |

## WebCrypto

| API | Supported? | Notes |
|-----|------------|-------|
| [subtle](https://nodejs.org/api/crypto.html#cryptosubtle) | ✅ | |
| [webcrypto](https://nodejs.org/api/crypto.html#) | ✅ | |