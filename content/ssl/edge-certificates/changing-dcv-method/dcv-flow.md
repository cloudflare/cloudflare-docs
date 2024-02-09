---
pcx_content_type: concept
title: Domain control validation flow
weight: 2
meta:
    description: Consider the steps that have to take place before the DCV process is completed and certificate authorities can issue SSL/TLS certificates.
---

# Domain control validation flow

In order to obtain [Universal](/ssl/edge-certificates/universal-ssl/), [Advanced](/ssl/edge-certificates/advanced-certificate-manager/), and [Custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) certificates, Cloudflare partners with different publicly trusted [certificate authorities (CAs)](/ssl/reference/certificate-authorities/).

However, every time a CA is requested to issue or renew a certificate, the requester must prove that they have control over the domain. That is when the DCV process takes place, with the proof usually consisting of placing an HTTP token at a standard URL path (`/.well-known/pki-validation`), or placing a TXT record at the authoritative DNS provider.

## Where Cloudflare sits in the DCV process

For the use cases mentioned above, there are three different parties involved in the process:

* The website or application for which the certificate is issued.
* The requester (Cloudflare).
* The CA that processes the request.

## Steps in the process

In summary, five steps have to succeed after Cloudflare requests a CA to issue or renew a certificate:

1. Cloudflare receives the DCV tokens from the CA.
2. Cloudflare either places the tokens on your behalf ([Full DNS setup](/dns/zone-setups/full-setup/), [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/)), or makes the tokens available for you to place them.
3. Cloudflare polls the validation URLs to check for the tokens.
4. After Cloudflare can confirm that the tokens are placed via multiple DNS resolvers, the CA is asked to check as well.
5. If the CA can confirm the tokens are placed, the certificate gets issued. If the CA cannot confirm the tokens are placed, the certificate is not issued and the tokens are no longer valid.

## Aspects to consider

* Settings that interfere with the validation URLs can cause issues with your certificate issuance or renewal. Refer to the [troubleshooting guide](/ssl/edge-certificates/changing-dcv-method/troubleshooting/).
* Certificate authority authorization (CAA) records may block certificate issuance. Refer to [CAA records](/ssl/edge-certificates/caa-records/).

### DCV tokens

DCV tokens are generated and controlled by the CA and not by Cloudflare. You can find further technical specification of how they work in [RFC 8555](https://www.rfc-editor.org/rfc/rfc8555#section-7.1.5).

* As mentioned in [Step 5](#steps-in-the-process), DCV tokens will change upon verification failures. For example, if a DCV check fails because of a DNSSEC issue, the certificate order is no longer valid and Cloudflare must start a new certificate request. Since tokens cannot be reused, a new token is required.

* DCV tokens also have [validity periods](/ssl/edge-certificates/changing-dcv-method/validation-backoff-schedule/). If you are handling the DCV process manually, it is recommended that you place the tokens as soon as the certificate is up for renewal. Otherwise, the tokens may expire and new tokens will be required.