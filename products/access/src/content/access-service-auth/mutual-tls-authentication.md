---
order: 2
---

# Mutual TLS authentication

<Aside>

Cloudflare Access can add mTLS to your application, but it requires a Cloudflare enterprise plan. To enforce mTLS in your application with Access, please contact your Cloudflare Customer Success Manager.
</Aside>

Mutual TLS (mTLS) authentication ensures that traffic is both secure and trusted in both directions between a client and server. It allows requests that do not log in with an identity provider (like IoT devices) to demonstrate that they can reach a given resource. Client certificate authentication is also a second layer of security for team members who both log in with an identity provider (IdP) and present a valid client certificate.

With a root certificate authority (CA) in place, Access only allows requests from devices with a corresponding client certificate. When a request reaches the application, Access responds with a request for the client to present a certificate. If the device fails to present the certificate, the request is not allowed to proceed. If the client does have a certificate, Access completes a key exchange to verify.

![mTLS Diagram](../static/mtls.png)

## Add MTLS Authentication To Your Access Configuration

To enforce mTLS authentication from the [Teams dashboard](https://dash.teams.cloudflare.com):

1. Navigate to **Service Auth > Mutual TLS**.

2. Click **Add mTLS Certificate**.

    ![Root CA](../static/mtls-test/add-mtls.png)

3. Paste the content of the `ca.pem` file in the Certificate content field.

4. Assign the Root CA a name and add the fully-qualified domain names (FQDN) that will use this certificate.

These FQDNs will be the hostnames used for the resources being protected in the Access policy. You must associate the Root CA with the FQDN that the application being protected uses.

5. Click **Save**.

If your zone is using an intermediate certificate in addition to the root certificate, upload the entire chain.

6. Once saved, navigate to the application you would like to enforce mTLS on.

7. Create a new (or amend an existing) policy that will enforce mTLS authentication.

The policy must be built with a hostname that was associated in the certificate upload modal. If this is for a client who does not need to log in through an IdP, select **Service Auth** from the drop-down for *Rule Action*. In the Include rule, you can pick from two options for mTLS authentication or both.

![mTLS Policy](../static/mtls-test/mtls-rule.png)


|Option|Result|
|-|-|
|**Common Name**|Only client certificates with a specific common name will be allowed to proceed.|
|**Valid Certificate**|Any client certificate that can authenticate with the Root CA will be allowed to proceed.|

## Test using cURL

Test for the site using mTLS by attempting to curl the site without a client certificate.
This curl command example is for the site `example.com` that has an Access policy set for `https://auth.example.com`:

```curl
curl -sv https://auth.example.com
```

Without a client certificate in the request, a `403 forbidden` response displays and the site cannot be accessed.
Add your client certificate information to the request:
```curl
curl -sv https://auth.example.com --cert example.pem --key key.pem
```

When the authentication process completes successfully, a `CF_Authorization Set-Cookie` header returns in the response.

## Testing mTLS

You can use Cloudflare's open source tools for private key infrastructure (PKI) to test the mTLS feature in Cloudflare Access. This guide details the process to generate a Root Client Authority (CA), add it to the Cloudflare dashboard, and issue client certificates that can authenticate against the root CA and reach a protected resource.

### Installing dependencies

The process requires two packages from Cloudflare's PKI toolkit:
`cf-ssl`
`cfssljson`

You can install these packages from the [Cloudflare SSL GitHub repository](https://github.com/cloudflare/cfssl). You will need a working installation of Go, version 1.12 or later. Alternatively, you can [download the packages](https://github.com/cloudflare/cfssl) directly.
Use the instructions under Installation to install the toolkit, and ensure that you install all of the utility programs in the toolkit.

### Generating the Root CA

1. Create a new directory to store the Root CA.

2. Within that directory, create two new files:

* **CSR**. Create a file named `ca-csr.json` and add the following JSON blob, then save the file.

```json
{
  "CN": "Access Testing CA",
  "key": {
    "algo": "rsa",
    "size": 4096
  },
  "names": [
    {
      "C": "US",
      "L": "Austin",
      "O": "Access Testing",
      "OU": "TX",
      "ST": "Texas"
    }
  ]
}
```

* **config**. Create a file named `ca-config.json` and add the following JSON blob, then save the file.

```json
{
  "signing": {
    "default": {
      "expiry": "8760h"
    },
    "profiles": {
      "server": {
        "usages": ["signing", "key encipherment", "server auth"],
        "expiry": "8760h"
      },
      "client": {
        "usages": ["signing","key encipherment","client auth"],
        "expiry": "8760h"
      }
    }
  }
}
```

3. Now, run the following command to generate the Root CA with those files.

```sh
$ cfssl gencert -initca ca-csr.json | cfssljson -bare ca
```

4. Within the directory, check its content to confirm the output was successful.

```sh
$ ls
```

The output should now return the following content:

```bash
ca-config.json	ca-csr.json	ca-key.pem	ca.csr		ca.pem
```

## Generating a client certificate

Returning to the terminal, generate a client certificate that will authenticate against the Root CA uploaded. This example creates a new directory to keep client certificates separate from the Root CA working location for ease of management.

1. Create a file named `client-csr.json` and add the following JSON blob:

```json
{
  "CN": "James Royal",
  "hosts": [""],
  "key": {
    "algo": "rsa",
    "size": 4096
  },
  "names": [
    {
      "C": "US",
      "L": "Austin",
      "O": "Access",
      "OU": "Access Admins",
      "ST": "Texas"
    }
  ]
}
```
2. Now, use the following command to generate a client certificate with the Cloudflare PKI toolkit:

```sh
$ cfssl gencert -ca=../mtls-test/ca.pem -ca-key=../mtls-test/ca-key.pem  -config=../mtls-test/ca-config.json -profile=client client-csr.json | cfssljson -bare client
```

3. You can now test the client certificate with the following `cURL` command.

```sh
$ curl -v --cert client.pem --key client-key.pem https://iot.widgetcorp.tech
```

### Testing in the browser

The instructions here cover usage with a computer running MacOS.

1. In the same working directory, run the following command to add the client certificate into the MacOS Keychain.

<Aside>

Warning: this will add the client certificate to the trusted store on your device. Only proceed if you are comfortable doing so and intend to keep these testing certificates safeguarded.
</Aside>

```sh
$ open client.pem
$ security import client-key.pem -k ~/Library/Keychains/login.keychain-db
```

2. Click on the certificate in the Keychain list to set the certificate to trusted. Confirm that the certificate is listed in *My Certificates*.

### Creating a CRL

You can use the Cloudflare PKI toolkit to generate a certificate revocation list (CRL), as well. This list will contain client certificates that are revoked.
1. Get the serial number from the client certificate generated earlier. Add that serial number, or any others you intend to revoke, in hex format in a text file. This example uses a file named `serials.txt`.

2. Create the CRL with the following command.
```bash
cfssl gencrl serials.txt ../mtls-test/ca.pem ../mtls-test/ca-key.pem | base64 -D > ca.crl
You will need to add this to your server or enforce the revocation in a Cloudflare Worker.
```