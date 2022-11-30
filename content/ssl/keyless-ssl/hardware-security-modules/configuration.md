---
pcx_content_type: reference
title: Configuration
weight: 1
---

# Configuration

{{<Aside type="warning" header="Important">}}

Carefully review the manufacturer documentation for your HSM and properly restrict access to the key server.

{{</Aside>}}

To get started with your PKCS#11 token you will need to initialize it with a private key, PIN, and token label. The instructions to do this will be specific to each hardware device, and you should follow the instructions provided by your vendor. You will also need to find the path to your `module`, a shared object file (`.so`). Having initialized your device, you can query it to check your token label with:

```sh
$ pkcs11-tool --module <module path> --list-token-slots
```

You will also want to check the label of the private key you imported (or generated). Run the following command and look for a `Private Key Object`:

```bash
$ pkcs11-tool --module <module path> --pin <pin> \
    --list-token-slots --login --list-objects
```

You now have all the information you need to use your PKCS#11 token with the Keyless server, by adding to the `private_key_stores` section in the configuration file. You can specify the key pairs that you want Keyless to have access to in the [configuration file using the PKCS#11 URI](https://tools.ietf.org/html/rfc7512) format.

## PKCS#11 URI

A PKCS#11 URI is a sequence of attribute value pairs separated by a semicolon that form a one-level path component, optionally followed by a query. The general form represented is:

```txt
pkcs11:path-component[?query-component]
```

The URI path component contains attributes that identify a resource. The query component can contain a few attributes that may be needed to retrieve the resource identified by the URI path component. Attributes in the path component are delimited by the `;` character, and attributes in the query component use `&` as a delimiter. All attributes are URL-encoded.

Keyless requires the following three attributes be specified:

- **Module**: use `module-path` to locate the PKCS#11 module library.
- **Token**: use `serial`, `slot-id`, or `token` to specify the PKCS#11 token.
- **Slot**: use `id` or `object` to specify the PKCS#11 key pair.

For certain modules, a query attribute `max-sessions` is required in order to prevent opening too many sessions to the module. Certain additional attributes, such as `pin-value`, may be necessary depending on the situation. Refer to the documentation for your PKCS#11 module for more details.

## Examples

Here are some examples of PKCS#11 URIs for keys stored on various modules:

```txt
private_key_stores:
- uri: pkcs11:token=SoftHSM2%20RSA%20Token;id=%03?module-path=/usr/lib64/libsofthsm2.so&pin-value=1234
- uri: pkcs11:token=accelerator;object=thaleskey?module-path=/opt/nfast/toolkits/pkcs11/libcknfast.so
- uri: pkcs11:token=YubiKey%20PIV;id=%00?module-path=/usr/lib64/libykcs11.so&pin-value=123456&max-sessions=1
- uri: pkcs11:token=elab2parN;id=%04?module-path=/usr/lib/libCryptoki2_64.so&pin-value=crypto1
```

## Limitations

For now, only one PKCS#11 module can be used at a time, so if you have keys on multiple HSMs, we recommend [using p11-glue to consolidate access through one module](https://p11-glue.github.io/p11-glue/).
