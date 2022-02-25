---
pcx-content-type: concept
title: Minimum TLS Version
weight: 13
---

import MinimumTLSDefinition from "../../\_partials/\_minimum-tls-definition.md"

# Minimum TLS Version

Transport Layer Security (TLS) guarantees encrypted communications between a client and a web server via HTTPS. It replaces the now deprecated Secured Sockets Layer (SSL) protocol. When web traffic is encrypted with TLS, users see a green padlock in their browser window, near the URL box.

<MinimumTLSDefinition/>

For example, if TLS 1.1 is selected, visitors attempting to connect with TLS 1.0 will be rejected. Visitors attempting to connect using TLS 1.1, 1.2, or 1.3 (if enabled) will be allowed to connect.

You can use the API to [configure cipher suites](/ssl/ssl-tls/cipher-suites).

## Using Minimum TLS Version in Cloudflare SSL/TLS

You can manage the TLS version your domain uses when proxied through Cloudflare by setting the **Minimum TLS Version** in the **SSL/TLS** tab of the Cloudflare dashboard.

Selecting a minimum version ensures that all subsequent, newer versions of the protocol are also supported.  TLS 1.0 is the version that Cloudflare sets by default for all customers using certificate-based encryption. In this case, it means that Cloudflare also accepts requests encrypted with all TLS versions beyond 1.0.

To properly test supported TLS versions, attempt a request to your Cloudflare domain while specifying a TLS version.  For example, use a `curl` command to test TLS 1.1 (replace `www.example.com` with your Cloudflare domain and hostname):

```sh
$ curl https://www.example.com -svo /dev/null --tls-max 1.1
```

If the TLS version you are testing is blocked by Cloudflare, the TLS handshake is not completed and returns an error:

**`* error:1400442E:SSL routines:CONNECT_CR_SRVR_HELLO:tlsv1 alert`**

For guidance on which TLS version to use, review the information outlined below.

## Understand TLS versions

A higher TLS version implies a stronger cryptographic standard.  TLS 1.2 includes fixes for known vulnerabilities found in previous versions.

As of June 2018, TLS 1.2 is the version required by the Payment Card Industry (PCI) Security Standards Council. Cloudflare recommends migrating to TLS 1.2 to comply with the PCI requirement.

TLS 1.3, which offers additional security and performance improvements, was approved by the Internet Engineering Task Force (IETF) in May 2018.

## Decide what version to use

Not all browser versions support TLS 1.2 and above. Depending on your particular business situation, this may present some limitations in using stronger encryption standards.

Consider using TLS 1.0 or 1.1 for sites with a broad user base, particularly non-transactional sites. In this way, you minimize the possibility that some clients cannot connect to your site securely.

For a narrow user base and sites that run internal applications or business and productivity applications, Cloudflare recommends TLS 1.2. These sites might already have more stringent security requirements or might be subject to PCI compliance. However, you also need to ensure that your users upgrade to a TLS 1.2 compliant browser.

It is not recommended to set the minimum TLS to 1.3, unless there is a specific use case, as this will likely cause issues with search engine crawlers and certain browsers.

## Related resources

*   [PCI compliance and Cloudflare SSL/TLS](https://support.cloudflare.com/hc/en-us/articles/205043158)
*   [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security)
*   [PCI Security Standards Council](https://www.pcisecuritystandards.org/)
