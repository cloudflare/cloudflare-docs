---
pcx_content_type: reference
title: Browser compatibility
weight: 6
meta:
    description: Review information about browser compatibility for the different Cloudflare SSL offerings.
---

# Browser compatibility

Cloudflare attempts to provide compatibility for as wide a range of user agents (browsers, API clients, etc.) as possible. However, the specific set of supported browsers differs by SSL product. Consider the following sections for details.

## Universal SSL

| Feature/Zone Plan                | Free | Pro | Business | Enterprise |
| -------------------------------- | ---- | --- | -------- | ---------- |
| Clients using ECDSA key exchange | ✅   | ✅  | ✅       | ✅         |
| Clients using RSA key exchange   | ❌   | ✅  | ✅       | ✅         |

{{<Aside type="warning">}}

By default, Cloudflare Universal SSL only supports browsers and API clients that use the [Server Name Indication (SNI)](https://www.cloudflare.com/learning/ssl/what-is-sni/) extension to the TLS protocol.

{{</Aside>}}

### Free plan

Universal SSL certificates issued for Free plan zones require user agents that send Server Name Indication (SNI) and support the Elliptic Curve Digital Signature Algorithm (ECDSA). SNI and ECDSA certificates work with these modern browsers:

**Desktop Browsers installed on Windows Vista or OS X 10.6 or later**:

- Internet Explorer 7
- Firefox 2
- Opera 8 (with TLS 1.1 enabled)
- Google Chrome v5.0.342.0
- Safari 2.1

**Mobile Browsers**:

- Mobile Safari for iOS 4.0
- Android 3.0 (Honeycomb) and later
- Windows Phone 7

### Paid plans

Zones in paid plans have additional compatibility with older browsers/operating systems - such as Windows XP and Android 3.0 and earlier -, and can also [provide non-SNI support](/ssl/troubleshooting/non-sni-support/).

---

## Other products

| Feature/Product                  | Custom (Legacy IP) | Custom Certificates | Advanced Certificates | SSL for SaaS |
| -------------------------------- | ------------------ | ------------------- | --------------------- | ------------ |
| Clients using ECDSA key exchange | ✅                 | ✅                  | ✅                    | ✅           |
| Clients using RSA key exchange   | ✅                 | ✅                  | ✅                    | ✅           |
| Clients without SNI              | ✅                 | ❌                  | ❌                    | ❌           |

[SNI extensions](https://www.cloudflare.com/learning/ssl/what-is-sni/) to the TLS protocol were standardized in 2003. However, some browsers and operating systems only implemented this extension when TLS 1.1 was released in 2006 (or 2011 for mobile browsers). If your visitors use devices that have not been updated since 2011, they may not have SNI. Refer to [non-SNI support](/ssl/troubleshooting/non-sni-support/) to see how you can setup your zone to be compatible to this.