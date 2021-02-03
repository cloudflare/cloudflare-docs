---
order: 250
---

# API Shield™

Cloudflare API Shield makes it easy to secure APIs with strong client-certificate-based encryption. Support includes [gRPC](https://grpc.io/docs/what-is-grpc/introduction/)-based APIs, which use binary formats such as protocol buffers rather than JSON.

## A positive security model for APIs

Implementing a positive security model for APIs is the most direct way to eliminate credential stuffing attacks and deny access to automated scanning tools. The first step towards a positive model is deploying strong authentication such as mutual TLS (mTLS) authentication, which is not vulnerable to password reuse or sharing.

Mutual TLS authentication uses client certificates to ensure that traffic between client and server is bidirectionally secure and trusted. It also allows requests that do not authenticate via an identity provider, such as Internet-of-things (IoT) devices, to demonstrate they can reach a given resource.

![mTLS sequence diagram](../images/api-shield-call-sequence.png)

## Use Cloudflare API Shield

Cloudflare API Shield simplifies the deployment and enforcement of mTLS authentication and is available to all Cloudflare plans.

To protect your application with API Shield, use this workflow:

1. [Enable mTLS](https://developers.cloudflare.com/ssl/client-certificates/enable-mtls) for the hosts you wish to protect with API Shield.

1. Use Cloudflare's fully hosted public key infrastructure (PKI) to [create a client certificate in the Cloudflare dashboard](https://developers.cloudflare.com/ssl/client-certificates/create-a-client-certificate).

1. Create Cloudflare firewall rules that [require API requests to present a valid client certificate](/recipes/require-valid-client-certificate). The **Firewall** app in the Cloudflare dashboard provides a dedicated interface where you can [create API Shield rules](/cf-dashboard/create-api-shield-rule).

1. [Configure your mobile app or IoT device](https://developers.cloudflare.com/ssl/client-certificates/configure-your-mobile-app-or-iot-device) to use your Cloudflare-issued client certificate.

<Aside type='warning' header='Important'>

API Shield requires Cloudflare-issued certificates. You can use API Shield with any fully managed certificate authority (CA) where Cloudflare issues the client certificates.

If you need to use certificates issued by another (CA), please reach out to a Cloudflare Customer Success Manager.

When using Yubikeys, the browser may prompt for unlocking the key due to a problem in Yubikey's PKCS#11 library.

</Aside>
