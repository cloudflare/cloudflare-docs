---
pcx_content_type: reference
title: Browser compatibility
weight: 6
meta:
    description: Review information about browser compatibility for the different Cloudflare SSL/TLS offerings.
---

# Browser compatibility

Cloudflare attempts to provide compatibility for as wide a range of user agents (browsers, API clients, etc.) as possible. However, the specific set of supported clients can vary depending on the different SSL/TLS certificate types, your visitor's [browser version](#non-sni-support), and the [certificate authority (CA)](/ssl/reference/certificate-authorities/) that issues the certificate.

## Universal SSL

Cloudflare Universal SSL only supports browsers and API clients that use the [Server Name Indication (SNI)](https://www.cloudflare.com/learning/ssl/what-is-sni/) extension to the TLS protocol.

Also, for zones on Free plan, Universal SSL is only compatible with browsers that support Elliptic Curve Digital Signature Algorithm (ECDSA).

Paid plans have additional compatibility, also supporting RSA algorithm.

## Other certificate types

Refer to [Certificate authorities](/ssl/reference/certificate-authorities/) for a detailed list of Cloudflare SSL/TLS offerings, the different algorithms available, and browser compatibility for each CA.

## Non-SNI support

Although [SNI extensions](https://www.cloudflare.com/learning/ssl/what-is-sni/) to the TLS protocol were standardized in 2003, some browsers and operating systems only implemented this extension when TLS 1.1 was released in 2006 (or 2011 for mobile browsers).

If your visitors use devices that have not been updated since 2011, they may not have SNI support.

To support non-SNI requests, you can:

* [Upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#upload-a-custom-certificate) and specify a value of `Legacy` for its client support.
    
    {{<Aside type="warning">}}

Unlike [Universal SSL](/ssl/edge-certificates/universal-ssl/) or [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare does not manage issuance and renewal for [custom certificates](/ssl/edge-certificates/custom-certificates/).
    
{{</Aside>}}

* (Paid plans only) [Contact Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) and request a set of dedicated IPs for your zone.