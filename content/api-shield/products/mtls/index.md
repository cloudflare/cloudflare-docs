---
pcx-content-type: concept
order: 4
---

# Mutual TLS (mTLS)

Mutual TLS (mTLS) authentication uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.

![mTLS sequence diagram](../../images/api-shield-call-sequence.png)

Support includes [gRPC](https://grpc.io/docs/what-is-grpc/introduction/)-based APIs, which use binary formats such as protocol buffers rather than JSON.

## Configure

For help setting up mTLS for one or more hosts using the dashboard, refer to [Configure mTLS](configure).

## Availability

All Cloudflare plans can set up mTLS with a Cloudflare-managed certificate authority (CA). For certificates from another CA, use <a href="https://developers.cloudflare.com/cloudflare-one/identity/devices/mutual-tls-authentication?">Cloudflare Access</a>.

## Limitations

When using Yubikeys, the browser may prompt for unlocking the key due to a problem in Yubikey's PKCS#11 library.
