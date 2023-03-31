---
pcx_content_type: how-to
title: Mutual TLS
weight: 3
---

# Mutual TLS

<details>
<summary>Feature availability</summary>
<div>

| Operating Systems | [WARP mode required](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| All systems       | WARP not required                                                                         | Enterprise plans                                              |

</div>
</details>

[Mutual TLS (mTLS) authentication](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) ensures that traffic is both secure and trusted in both directions between a client and server. It allows requests that do not log in with an identity provider (like IoT devices) to demonstrate that they can reach a given resource. Client certificate authentication is also a second layer of security for team members who both log in with an identity provider (IdP) and present a valid client certificate.

With a root certificate authority (CA) in place, Access only allows requests from devices with a corresponding client certificate. When a request reaches the application, Access responds with a request for the client to present a certificate. If the device fails to present the certificate, the request is not allowed to proceed. If the client does have a certificate, Access completes a key exchange to verify.

Currently, mTLS does not work with HTTP/3 traffic.

![mTLS handshake diagram](/cloudflare-one/static/documentation/identity/devices/mtls.png)

## Add mTLS authentication to your Access configuration

{{<Aside type="warning" header="Important">}}

The mTLS certificate is used only to verify the client certificate. It does not control the SSL certificate presented during the [server hello](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/).

mTLS is checked on a per host basis. Access sets a flag for when a client certificate was presented and successfully completed mTLS authentication. However, to actually enforce mTLS, you need an Access policy in place, and Access policies are both host and path specific. If you want to enforce mTLS on a specific path, you need to make sure your Access policies are configured accordingly.

{{</Aside>}}

To enforce mTLS authentication from [Zero Trust](https://one.dash.cloudflare.com):

1. Contact your account team to enable mTLS on your account.
2. Go to **Access** > **Service Auth** > **Mutual TLS**.
3. Select **Add mTLS Certificate**.
4. Give the Root CA any name.
5. Paste the content of the `ca.pem` file into the **Certificate content** field.
6. In **Associated hostnames**, enter the fully-qualified domain names (FQDN) that will use this certificate.

   These FQDNs will be the hostnames used for the resources being protected in the [Access policy](/cloudflare-one/policies/access/). You must associate the Root CA with the FQDN that the application being protected uses.

7. Select **Save**.

   If your zone is using an intermediate certificate in addition to the root certificate, upload the entire chain.

8. Next, go to **Access** > **Applications**.

9. Find the application you would like to enforce mTLS on and select **Edit**. The application must be included in the **Associated hostnames** list from Step 5.

10. Create a new (or amend an existing) [Access policy](/cloudflare-one/policies/access/).

   If this is for a client who does not need to log in through an IdP, set the policy **Action** to _Service Auth_.

11. Add an mTLS authentication rule using the following selectors:

    | Selector              | Description                                                                               |
    | --------------------- | ----------------------------------------------------------------------------------------- |
    | **Common Name**       | Only client certificates with a specific common name will be allowed to proceed.          |
    | **Valid Certificate** | Any client certificate that can authenticate with the Root CA will be allowed to proceed. |

12. Save the policy.

{{<Aside type="warning">}}

Cloudflare Gateway cannot inspect traffic to mTLS-protected domains. If a device has the WARP client turned on and passes HTTP requests through Gateway, access will be blocked unless you [bypass HTTP inspection](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) for the domain.
{{</Aside>}}

## Test mTLS using cURL

To test the application protected by an mTLS policy:

1. First, attempt to curl the site without a client certificate.
   This curl command example is for the site `example.com` that has an [Access policy](/cloudflare-one/policies/access/) set for `https://auth.example.com`:

   ```sh
   $ curl -sv https://auth.example.com
   ```

   Without a client certificate in the request, a `403 forbidden` response displays and the site cannot be accessed.

2. Now, add your client certificate information to the request:

   ```sh
   $ curl -sv https://auth.example.com --cert example.pem --key key.pem
   ```

When the authentication process completes successfully, a `CF_Authorization Set-Cookie` header returns in the response.

## Test mTLS using Cloudflare PKI

You can use Cloudflare's open source tools for private key infrastructure (PKI) to test the mTLS feature in Cloudflare Access. This guide details the process to generate a Root Client Authority (CA), add it to the Cloudflare dashboard, and issue client certificates that can authenticate against the root CA and reach a protected resource.

### 1. Install dependencies

The process requires two packages from Cloudflare's PKI toolkit:

- `cf-ssl`
- `cfssljson`

You can install these packages from the [Cloudflare SSL GitHub repository](https://github.com/cloudflare/cfssl). You will need a working installation of Go, version 1.12 or later. Alternatively, you can [download the packages](https://github.com/cloudflare/cfssl) directly.
Use the instructions under Installation to install the toolkit, and ensure that you install all of the utility programs in the toolkit.

### 2. Generate the Root CA

1. Create a new directory to store the Root CA.

2. Within that directory, create two new files:

   - **CSR**. Create a file named `ca-csr.json` and add the following JSON blob, then save the file.

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

   - **config**. Create a file named `ca-config.json` and add the following JSON blob, then save the file.

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
             "usages": ["signing", "key encipherment", "client auth"],
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

   ```sh
   $ ca-config.json ca-csr.json ca-key.pem ca.csr  ca.pem
   ```

### 3. Generate a client certificate

Returning to the terminal, generate a client certificate that will authenticate against the Root CA uploaded.

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
   $ cfssl gencert -ca=ca.pem -ca-key=ca-key.pem  -config=ca-config.json -profile=client client-csr.json | cfssljson -bare client
   ```

3. You can now test the client certificate with the following `cURL` command.

   ```sh
   $ curl -v --cert client.pem --key client-key.pem https://iot.widgetcorp.tech
   ```

### Test in the browser

The instructions here cover usage with a computer running macOS.

1. In the same working directory, run the following command to add the client certificate into the macOS Keychain.

  {{<Aside type="warning" header="Important">}}

  The command adds the client certificate to the trusted store on your device. Only proceed if you are comfortable doing so and intend to keep these testing certificates safeguarded.
  {{</Aside>}}

  ```sh
  $ open client.pem
  $ security import client-key.pem -k ~/Library/Keychains/login.keychain-db
  ```

2. Select the certificate in the Keychain list to set the certificate to trusted. Confirm that the certificate is listed in **My Certificates**.

### Create a CRL

You can use the Cloudflare PKI toolkit to generate a certificate revocation list (CRL), as well. This list will contain client certificates that are revoked.

1. Get the serial number from the client certificate generated earlier. Add that serial number, or any others you intend to revoke, in hex format in a text file. This example uses a file named `serials.txt`.

2. Create the CRL with the following command.

   ```sh
   $ cfssl gencrl serials.txt ../mtls-test/ca.pem ../mtls-test/ca-key.pem | base64 -D > ca.crl
   ```

You will need to add the CRL to your server or enforce the revocation in a Cloudflare Worker. An example Worker Script can be [found on the Cloudflare GitHub repository](https://github.com/cloudflare/access-crl-worker-template)
