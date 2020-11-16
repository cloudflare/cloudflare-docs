---
order: 0
---

# Hardware security modules

In addition to private keys stored on disk, Keyless SSL supports keys stored in a Hardware Security Module (HSM) via the PKCS#11 standard. Keyless uses PKCS#11 for signing and decrypting payloads without having direct access to the private keys.

--------

## Why use Keyless SSL with an HSM?

Hardware Security Modules (HSMs) facilitate a higher level of protection for your private keys over storing them directly on your key server. The primary responsibility of an HSM is safeguarding private keys and performing operations such as signing or encryption internally. In addition to access control, that means the physical device must offer some degree of tamper-resistance in order to be compliant with government or [industry regulations such as FIPS 140](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-2.pdf).

Moreover, many HSMs are also capable of generating keys, producing cryptographically secure randomness, and some are purpose-built to perform cryptographic computations more efficiently.

--------

## Communicating using PKCS#11

The key server communicates with HSMs via PKCS#11, so any HSM supporting the standard can be used with Keyless SSL. We have verified interoperability with the following modules:

* [Gemalto SafeNet Luna](https://safenet.gemalto.com/data-encryption/hardware-security-modules-hsms/fips-common-criteria-validations/)
* [SoftHSMv2](https://github.com/opendnssec/SoftHSMv2)
* [Thales nShield Connect](https://www.thalesesecurity.com/products/general-purpose-hsms/nshield-connect)
* [YubiKey Neo](https://www.yubico.com/product/yubikey-neo/)

We’ve also tested with the following Cloud HSM offerings:

* [AWS CloudHSM](https://aws.amazon.com/cloudhsm/)
* [IBM Cloud HSM](https://console.bluemix.net/docs/infrastructure/hardware-security-modules/about.html#about-ibm-cloud-hsm)


If you have deployed Keyless SSL with an HSM model not listed above, please email keyless@cloudflare.com with details.

--------

## Configuration

<Aside type='warning' header='Important'>

It is critical that you carefully review the manufacturer documentation for your HSM and properly restrict access to the key server.

</Aside>

To get started with your PKCS#11 token you will need to initialize it with a private key, PIN, and token label. The instructions to do this will be specific to each hardware device, and you should follow the instructions provided by your vendor. You will also need to find the path to your `module`, a shared object file (.so). Having initialized your device, you can query it to check your token label with:

    pkcs11-tool --module <module path> --list-token-slots

You’ll also want to check the label of the private key you imported (or generated). Run the following command and look for a `Private Key Object`:

    pkcs11-tool --module <module path> --pin <pin> \
      --list-token-slots --login --list-objects

You now have all the information you need to use your PKCS#11 token with the Keyless server, by adding to the `private_key_stores` section in the configuration file. You can specify the key pairs that you want Keyless to have access to in the [configuration file using the PKCS#11 URI](https://tools.ietf.org/html/rfc7512) format.

A PKCS#11 URI is a sequence of attribute value pairs separated by a semicolon that form a one-level path component, optionally followed by a query. The general form represented is:

    pkcs11:path-component[?query-component]

The URI path component contains attributes that identify a resource. The query component can contain a few attributes that may be needed to retrieve the resource identified by the URI path component. Attributes in the path component are delimited by the `;` character, and attributes in the query component use `&` as a delimiter. All attributes are URL-encoded.

Keyless requires the following three attributes be specified:

* Module: use `module-path` to locate the PKCS#11 module library.
* Token:  use `serial`, `slot-id`, or `token` to specify the PKCS#11 token.
* Slot:   use `id` or `object` to specify the PKCS#11 key pair.

For certain modules, a query attribute `max-sessions` is required in order to prevent opening too many sessions to the module. Certain additional attributes, such as `pin-value`, may be necessary depending on the situation. Refer to the documentation for your PKCS#11 module for more details.

Here are some examples of PKCS#11 URIs for keys stored on various modules:

    private_key_stores:
    - uri: pkcs11:token=SoftHSM2%20RSA%20Token;id=%03?module-path=/usr/lib64/libsofthsm2.so&pin-value=1234
    - uri: pkcs11:token=accelerator;object=thaleskey?module-path=/opt/nfast/toolkits/pkcs11/libcknfast.so
    - uri: pkcs11:token=YubiKey%20PIV;id=%00?module-path=/usr/lib64/libykcs11.so&pin-value=123456&max-sessions=1
    - uri: pkcs11:token=elab2parN;id=%04?module-path=/usr/lib/libCryptoki2_64.so&pin-value=crypto1

Note that for now only one PKCS#11 module can be used at a time, so if you have keys on multiple HSMs, we recommend [using p11-glue to consolidate access through one module](https://p11-glue.github.io/p11-glue/).
