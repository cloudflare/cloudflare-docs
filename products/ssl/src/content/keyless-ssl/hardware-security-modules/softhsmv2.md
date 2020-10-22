---
order: 3
---

# SoftHSMv2

<Aside type="warning">

SoftHSMv2 should not be considered any more secure than storing private keys directly on disk. No attempt is made below to secure this installation; it is provided simply for demonstration purposes.

</Aside>

--------

## 1. Install and configure SoftHSMv2

First, we install SoftHSMv2 and configure it to store tokens in the default location `/var/lib/softhsm/tokens`. We also need to give the `softhsm` group permission to this directory as this is how the `keyless` user will access this directory.

```bash
$ sudo apt-get install -y softhsm2 opensc

#...

$ cat <<EOF | sudo tee /etc/softhsm/softhsm2.conf
directories.tokendir = /var/lib/softhsm/tokens
objectstore.backend = file
log.level = DEBUG
slots.removable = false
EOF

$ sudo mkdir /var/lib/softhsm/tokens
$ sudo chown root:softhsm $_
$ sudo chmod 0770 /var/lib/softhsm/tokens
$ sudo usermod -G softhsm keyless
$ sudo usermod -G softhsm $(whoami)

$ echo 'export SOFTHSM2_CONF=/etc/softhsm/softhsm2.conf' | tee -a ~/.profile
$ source ~/.profile
```

--------

## 2. Create a token and private keys, and generate CSRs

Next, we create a token in slot 0 called `test-token` and secure it with a PIN of `1234`. In this slot we’ll store the RSA keys for our SSL certificates for `keyless-softhsm.example.com`.

```bash
$ sudo -u keyless softhsm2-util --init-token --slot 0 --label test-token --pin 1234 --so-pin 4321
The token has been initialized.
```

Using cfssl, [we generate the private keys and Certificate Signing Requests](https://github.com/cloudflare/cfssl) (CSRs), the latter of which will be sent to a Certificate Authority (CA) for signing.

```bash
$ cat <<EOF | tee csr.json
{
    "hosts": [
        "keyless-softhsm.example.com"
    ],
    "CN": "keyless-softhsm.example.com",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [{
        "C": "US",
        "L": "San Francisco",
        "O": "TLS Fun",
        "OU": "Technical Operations",
        "ST": "California"
    }]
}
EOF

$ cfssl genkey csr.json | cfssljson -bare certificate
2018/08/12 00:52:22 [INFO] generate received request
2018/08/12 00:52:22 [INFO] received CSR
2018/08/12 00:52:22 [INFO] generating key: rsa-2048
2018/08/12 00:52:22 [INFO] encoded CSR
```

--------

## 3. Convert and import the key

Now that the key has been generated, it’s time to load it into the slot we created. Before doing so, we need to convert from PKCS#1 to PKCS#8 format. During import we specify the token and PIN from token initialization and provide a unique hexidecimal ID and label to the key.

```bash
$ openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in certificate-key.pem -out certificate-key.p8
$ sudo chown keyless certificate-key.p8

$ sudo -u keyless softhsm2-util --pin 1234 --import ./certificate-key.p8 --token test-token --id a000 --label rsa-privkey
Found slot 915669571 with matching token label.
The key pair has been imported.
```

After importing we ask `pkcs11-tool` to confirm the objects have been successfully stored in the token.

```bash
$ sudo -u keyless pkcs11-tool --module /usr/lib/softhsm/libsofthsm2.so -l -p 1234 --token test-token --list-objects
Public Key Object; RSA 2048 bits
  label:      rsa-privkey
  ID:         a000
  Usage:      verify
Private Key Object; RSA
  label:      rsa-privkey
  ID:         a000
  Usage:      sign
```

--------

## 4. Modify your gokeyless config file and restart the service

With the keys in place, it’s time to build the configuration file that the key server will read on startup. The `id` refers to the hexidecimal ID you provided to the `softhsm2-util` import statement; we used `a000` so it is encoded as `%a0%00`. The `module-path` will vary slightly based on the Linux distribution you are using. On Debian it should be `/usr/lib/softhsm/libsofthsm2.so`.

Open up `/etc/keyless/gokeyless.yaml` and immediately after

```yaml
private_key_stores:
- dir: /etc/keyless/keys
```

add

```yaml
- uri: pkcs11:token=test-token;id=%a0%00?module-path=/usr/lib/softhsm/libsofthsm2.so&pin-value=1234&max-sessions=1
```

Save the config file, restart `gokeyless`, and verify it started successfully.

```bash
$ sudo systemctl restart gokeyless.service
$ sudo systemctl status gokeyless.service -l
```
