---
pcx_content_type: integration-guide
title: AWS integration
weight: 3
meta:
  description: Learn how to set up Cloudflare Authenticated Origin Pulls with the AWS Application Load Balancer.
---

# Set up Authenticated Origin Pulls with AWS

This guide will walk you through how to set up [per-hostname](/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) authenticated origin pulls to securely connect to an AWS Application Load Balancer using mutual TLS verify.

## Before you begin

* You should already have your AWS account and [EC2](https://docs.aws.amazon.com/ec2/?icmpid=docs_homepage_featuredsvcs) configured.
* Note that this tutorial uses command-line interface (CLI) to generate a custom certificate, and [API calls](/fundamentals/api/get-started/) to configure Cloudflare Authenticated Origin Pulls.
* For the most up-to-date documentation on how to set up AWS, refer to the [AWS documentation](https://docs.aws.amazon.com/).

## 1. Generate a custom certificate

1. Run the following command to generate a 4096-bit RSA private key, unsing AES-256 encryption. Enter a passphrase when prompted.

```bash
openssl genrsa -aes256 -out rootca.key 4096
```

2. Create the CA root certificate. Use the domain name as `Common Name`, not the hostname.

```bash
openssl req -x509 -new -nodes -key rootca.key -sha256 -days 1826 -out rootca.crt
```

3. Create a Certificate Signing Request (CSR). Use the hostname as `Common Name`.

```bash
openssl req -new -nodes -out cert.csr -newkey rsa:4096 -keyout cert.key
```

4. Sign the certificate using the `rootca.key` and `rootca.crt` created in previous steps.

```bash
openssl x509 -req -in cert.csr -CA rootca.crt -CAkey rootca.key -CAcreateserial -out cert.crt -days 730 -sha256 -extfile ./cert.v3.ext
```

5. Make sure the certificate extensions file `cert.v3.ext` specifies the following:

```
basicConstraints=CA:FALSE
```

## 2. Configure AWS Application Load Balancer

## 3. Configure Cloudflare