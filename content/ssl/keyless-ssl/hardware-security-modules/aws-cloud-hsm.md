---
pcx-content-type: tutorial
title: AWS cloud HSM
weight: 2
---

# AWS cloud HSM

{{<Aside type="note" header="Note">}}

This example imports an existing key pair, but you may prefer to [generate your key on the HSM](https://docs.aws.amazon.com/cloudhsm/latest/userguide/manage-keys.html).

{{</Aside>}}

---

## Before you start

Make sure you have:

- Provisioned an [AWS CloudHSM cluster](https://docs.aws.amazon.com/cloudhsm/latest/userguide/getting-started.html) .
- Installed the [appropriate software library for PKCS#11](https://docs.aws.amazon.com/cloudhsm/latest/userguide/pkcs11-library-install.html).

---

## 1. Import the public and private key to the HSM

Before importing the public key, extract it from the certificate provided by your CA. Place the contents of your private key in `privkey.pem` and then run the following (replacing certificate.pem with your actual certificate) to populate `pubkey.pm`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">keyserver$ openssl x509 -pubkey -noout -in certificate.pem &gt pubkey.pem</span></div></span></span></span></code></pre>{{</raw>}}

Log in to the CloudHSM using a previously created [crypto user](https://docs.aws.amazon.com/cloudhsm/latest/userguide/hsm-users.html#crypto-user) (CU) account and generate a key encryption key that will be used to import your private key.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">keyserver$ /opt/cloudhsm/bin/key_mgmt_util</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Command: loginHSM -u CU -s patrick -p donahue</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Command: genSymKey -t 31 -s 16 -sess -l import-wrapping-key</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">...</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Symmetric Key Created.  Key Handle: 658</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">...</span></div></span></span></span></code></pre>{{</raw>}}

Referencing the key handle returned above, import the private and public key and then log out of the HSM:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Command: importPrivateKey -f privkey.pem -l mykey -id 1 -w 658</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">...</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Cfm3WrapHostKey returned: 0x00 : HSM Return: SUCCESS</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Cfm3CreateUnwrapTemplate returned: 0x00 : HSM Return: SUCCESS</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Cfm3UnWrapKey returned: 0x00 : HSM Return: SUCCESS</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">...</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Private Key Unwrapped.  Key Handle: 658</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Command: importPubKey -f pubkey.pem -l mykey -id 1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Cfm3CreatePublicKey returned: 0x00 : HSM Return: SUCCESS</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">...</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Public Key Handle: 941</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Command: logoutHSM</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Command: exit</span></div></span></span></span></code></pre>{{</raw>}}

---

## 2. Modify the gokeyless config file and restart the service

Now that the keys are in place, we need to modify the configuration file that the key server will read on startup. Change the `object=mykey` and `pin-value=username:password` values to match the key label you provided and CU user you created.

Open `/etc/keyless/gokeyless.yaml` and immediately after:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yaml" language="yaml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-atrule">private_key_stores</span><span class="CodeBlock--token-punctuation">:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">dir</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> /etc/keyless/keys</span></div></span></span></span></code></pre>{{</raw>}}

add:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-yaml" language="yaml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-atrule">uri</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain"> pkcs11</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-plain">token=cavium;object=mykey</span><span class="CodeBlock--token-punctuation">?</span><span class="CodeBlock--token-plain">module</span><span class="CodeBlock--token-punctuation">-</span><span class="CodeBlock--token-plain">path=/opt/cloudhsm/lib/libcloudhsm_pkcs11_standard.so</span><span class="CodeBlock--token-important">&amp;pin-value=patrick:donahue&amp;max-sessions=1</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

With the config file saved, restart `gokeyless` and verify it started successfully.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> systemctl restart gokeyless.service</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ </span><span class="CodeBlock--token-function">sudo</span><span class="CodeBlock--token-plain"> systemctl status gokeyless.service -l</span></div></span></span></span></code></pre>{{</raw>}}
