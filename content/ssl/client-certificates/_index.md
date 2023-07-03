---
pcx_content_type: concept
title: Client certificates
weight: 6
meta:
    description: Use Cloudflare public key infrastructure (PKI) to create client certificates and enforce mutual Transport Layer Security (mTLS) encryption.
---

# Client certificates

Use Cloudflare public key infrastructure (PKI) to create client certificates. Use these certificates with Cloudflare [API Shield™](/api-shield/) or [Cloudflare Workers](/workers/runtime-apis/mtls/) to enforce mutual Transport Layer Security (mTLS) encryption.

{{<render file="_client-cert-shared.md">}}

## API Shield

To use API Shield to protect your API or web application, you must do the following:

1.  Use Cloudflare’s fully hosted public key infrastructure (PKI) to [create a client certificate](/ssl/client-certificates/create-a-client-certificate/).

2.  [Configure your mobile app or IoT device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device/) to use your Cloudflare-issued client certificate.

3.  [Enable mTLS](/ssl/client-certificates/enable-mtls/) for the hosts you wish to protect with API Shield.

4.  Create Cloudflare firewall rules that [require API requests to present a valid client certificate](/api-shield/security/mtls/configure/).

{{<render file="_cloudflare-managed-client-cert.md">}}

## Workers

To authenticate Workers requests using mTLS:

1.  Use Cloudflare’s fully hosted public key infrastructure (PKI) to [create a client certificate](/ssl/client-certificates/create-a-client-certificate/).
2. Create and use an [mTLS binding](/workers/runtime-apis/mtls/) to authenticate Workers connections.
