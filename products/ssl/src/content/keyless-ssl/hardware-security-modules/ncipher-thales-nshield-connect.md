---
order: 4
---

# nCipher (Thales) nShield Connect

<Aside>

In this example it is assumed that you have already configured the nShield Connect device, and generated or imported your private keys.

</Aside>

Since the keys are already in place, we merely need to build the configuration file that the key server will read on startup. In this example the device contains a single RSA key pair.

We ask `pkcs11-tool` (provided by the `opensc` package) to display the objects stored in the token:

```txt
$ pkcs11-tool --module /opt/nfast/toolkits/pkcs11/libcknfast.so -O
Using slot 0 with a present token (0x1d622495)
Private Key Object; RSA 
  label:      rsa-privkey
  ID:         105013281578de42ea45f5bfac46d302fb006687
  Usage:      decrypt, sign, unwrap
warning: PKCS11 function C_GetAttributeValue(ALWAYS_AUTHENTICATE) failed: rv = CKR_ATTRIBUTE_TYPE_INVALID (0x12)

Public Key Object; RSA 2048 bits
  label:      rsa-privkey
  ID:         105013281578de42ea45f5bfac46d302fb006687
  Usage:      encrypt, verify, wrap
```

The key piece of information is the label of the object, `rsa-privkey`. Open up `/etc/keyless/gokeyless.yaml` and immediately after

```yaml
private_key_stores:
- dir: /etc/keyless/keys
```

add

```yaml
- uri: pkcs11:token=accelerator;object=rsa-privkey?module-path=/opt/nfast/toolkits/pkcs11/libcknfast.so&max-sessions=4
```

Save the config file, restart `gokeyless`, and verify it started successfully.

```bash
$ sudo systemctl restart gokeyless.service
$ sudo systemctl status gokeyless.service -l
```