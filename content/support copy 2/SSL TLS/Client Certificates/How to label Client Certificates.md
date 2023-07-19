---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4567119364749-How-to-label-Client-Certificates-
title: How to label Client Certificates
---

# How to label Client Certificates?

## Problem Description

**Applies to:** Free ✅ / Pro ✅ / Business ✅ / Enterprise ✅

When [generating Client Certificates at Cloudflare](/ssl/client-certificates/create-a-client-certificate) for use with [API Shield™](/api-shield/security/mtls/configure/) to protect your API or web application, it's hard to differentiate the generated certificates.

___

## Root Cause

The option to generate private key and CSR with Cloudflare is meant for simpler cases and the certificates will be generated with just "CN=Cloudflare, C=US" 

___

## Solution

If you need to differentiate client certificates for your clients on a "per organization" basis, I would recommend you to generate your own private key and CSR. When you generate private key and CSR, you can then enter information that will be incorporated into your certificate request.

For example, if you run the following command (with OpenSSL installed):

```sh
$ openssl req -new -newkey rsa:2048 -nodes -keyout client1.key -out client1.csr
```

You can then specify:

```
Country Name (2 letter code) []:
State or Province Name (full name) []:
Locality Name (eg, city) []:
Organization Name (eg, company) []:
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:
Email Address []:
```

Probably, adding Country Name and Organization Name will be enough, but you can provide as much info as you need or want.

Those additional info will be included in the Certificate Subject, allowing you to easily identify which certificate belongs to which client, and making it easy to, for example, revoke a specific certificate, if and when needed.

Here's an example on how it will look (with Country, Organization Name, and Organizational Unit Name) in Cloudflare Dashboard:

![](/images/support/chrome_mQRJVOpkTQ.png)

___

## Additional Information

References:

-   [Introducing API Shield](https://blog.cloudflare.com/introducing-api-shield/)
