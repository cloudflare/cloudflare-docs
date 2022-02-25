---
pcx-content-type: concept
title: Client certificates
weight: 4
---

# Client certificates

Use Cloudflare public key infrastructure (PKI) to create client certificates. You can use these certificates with Cloudflare [API Shield™](/api-shield) to enforce mutual Transport Layer security (mTLS) encryption.

To use API Shield to protect your API or web application, you must do the following:

1.  Use Cloudflare’s fully hosted public key infrastructure (PKI) to [create a client certificate](/ssl/create-a-client-certificate/).

2.  [Configure your mobile app or IoT device](/ssl/configure-your-mobile-app-or-iot-device/) to use your Cloudflare-issued client certificate.

3.  [Enable mTLS](/ssl/enable-mtls/) for the hosts you wish to protect with API Shield.

4.  Create Cloudflare firewall rules that [require API requests to present a valid client certificate](/api-shield/products/mtls/configure).
