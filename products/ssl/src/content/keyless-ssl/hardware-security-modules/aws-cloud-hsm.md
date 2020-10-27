---
order: 1
---

# AWS cloud HSM

<Aside>

In this example it is assumed that you have already [provisioned the AWS CloudHSM cluster](https://docs.aws.amazon.com/cloudhsm/latest/userguide/getting-started.html) and installed the [appropriate software library for PKCS#11](https://docs.aws.amazon.com/cloudhsm/latest/userguide/pkcs11-library-install.html). The example imports an existing key pair, but you may prefer to [generate your key on the HSM](https://docs.aws.amazon.com/cloudhsm/latest/userguide/manage-keys.html).

</Aside>

--------

## 1. Import the public and private key to the HSM

Before importing the public key, you’ll need to extract it from the certificate provided by your CA. Place the contents of your private key in `privkey.pem` and then run the following (replacing certificate.pem with your actual certificate) to populate `pubkey.pm`.

```txt
keyserver$ openssl x509 -pubkey -noout -in certificate.pem > pubkey.pem
```

Log in to the CloudHSM using a previously created [crypto user](https://docs.aws.amazon.com/cloudhsm/latest/userguide/hsm-users.html#crypto-user) (CU) account and generate a key encryption key that will be used to import your private key.

```txt
keyserver$ /opt/cloudhsm/bin/key_mgmt_util
Command: loginHSM -u CU -s patrick -p donahue
Command: genSymKey -t 31 -s 16 -sess -l import-wrapping-key
...
Symmetric Key Created.  Key Handle: 658
...
```

Referencing the key handle returned above, import the private and public key, and then log out of the HSM:

```txt
Command: importPrivateKey -f privkey.pem -l mykey -id 1 -w 658
...
Cfm3WrapHostKey returned: 0x00 : HSM Return: SUCCESS
Cfm3CreateUnwrapTemplate returned: 0x00 : HSM Return: SUCCESS
Cfm3UnWrapKey returned: 0x00 : HSM Return: SUCCESS
...
Private Key Unwrapped.  Key Handle: 658


Command: importPubKey -f pubkey.pem -l mykey -id 1
Cfm3CreatePublicKey returned: 0x00 : HSM Return: SUCCESS
...
Public Key Handle: 941


Command: logoutHSM
Command: exit
```

--------

## 2. Modify the gokeyless config file and restart the service
Now that the keys are in place, we need to modify the configuration file that the key server will read on startup. Be sure to change the `object=mykey` and `pin-value=username:password` values to match the key label you provided and CU user you created.

Open  `/etc/keyless/gokeyless.yaml` and immediately after:

```yaml
private_key_stores:
- dir: /etc/keyless/keys
```

add:

```yaml
- uri: pkcs11:token=cavium;object=mykey?module-path=/opt/cloudhsm/lib/libcloudhsm_pkcs11_standard.so&pin-value=patrick:donahue&max-sessions=1
```


With the config file saved, restart `gokeyless` and verify it started successfully.

```bash
$ sudo systemctl restart gokeyless.service
$ sudo systemctl status gokeyless.service -l
```
