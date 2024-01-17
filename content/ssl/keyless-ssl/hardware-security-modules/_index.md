---
pcx_content_type: concept
title: Hardware security modules
weight: 2
---

# Hardware security modules

In addition to private keys stored on disk, Keyless SSL supports keys stored in a Hardware Security Module (HSM) via the PKCS#11 standard. Keyless uses PKCS#11 for signing and decrypting payloads without having direct access to the private keys.

***

## Why use Keyless SSL with an HSM?

Hardware Security Modules (HSMs) facilitate a higher level of protection for your private keys over storing them directly on your key server. The primary responsibility of an HSM is safeguarding private keys and performing operations such as signing or encryption internally. In addition to access control, that means the physical device must offer some degree of tamper-resistance in order to be compliant with government or [industry regulations such as FIPS 140](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf).

Moreover, many HSMs are also capable of generating keys and producing cryptographically secure randomness. Some are purpose-built to perform cryptographic computations more efficiently.

***

## Communicating using PKCS#11

The key server communicates with HSMs via PKCS#11, so any HSM supporting the standard can be used with Keyless SSL.

### Initial configuration

For more details on initializing your PKCS#11 token, refer to [Configuration](/ssl/keyless-ssl/hardware-security-modules/configuration/).

### Compatibility

We have verified interoperability with the following modules:

*   [Gemalto SafeNet Luna](https://cpl.thalesgroup.com/compliance/fips-common-criteria-validations)
*   [SoftHSMv2](https://github.com/opendnssec/SoftHSMv2)
*   [Entrust nShield Connect](https://www.entrust.com/digital-security/hsm)
*   [YubiKey Neo](https://www.yubico.com/product/yubikey-neo/)

We’ve also tested with the following Cloud HSM offerings:

*   [AWS CloudHSM](/ssl/keyless-ssl/hardware-security-modules/aws-cloud-hsm/)
*   [IBM Cloud HSM](/ssl/keyless-ssl/hardware-security-modules/ibm-cloud-hsm/)
*   [Azure Dedicated HSM](/ssl/keyless-ssl/hardware-security-modules/azure-dedicated-hsm/)
*   [Azure Managed HSM](/ssl/keyless-ssl/hardware-security-modules/azure-managed-hsm/)
*   [Google Cloud HSM](/ssl/keyless-ssl/hardware-security-modules/google-cloud-hsm/)

If you have deployed Keyless SSL with an HSM model not listed above, please email keyless@cloudflare.com with details.
