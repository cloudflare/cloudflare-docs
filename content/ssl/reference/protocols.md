---
pcx_content_type: reference
title: TLS protocols
weight: 3
meta:
    description: Cloudflare supports a variety of TLS protocols, ranging from TLS 1.0 to TLS 1.3.
---

# TLS protocols

Cloudflare supports the following TLS protocols:

- TLS 1.0
- TLS 1.1
- TLS 1.2
- TLS 1.3

TLS 1.0 is the version that Cloudflare sets by default for all customers using certificate-based encryption.

## Understand TLS versions

A higher TLS version implies a stronger cryptographic standard. TLS 1.2 includes fixes for known vulnerabilities found in previous versions.

As of June 2018, TLS 1.2 is the version required by the Payment Card Industry (PCI) Security Standards Council. Cloudflare recommends migrating to TLS 1.2 to comply with the PCI requirement.

TLS 1.3, which offers additional security and performance improvements, was approved by the Internet Engineering Task Force (IETF) in May 2018.

## Decide which version to use

Not all browser versions support TLS 1.2 and above. Depending on your particular business situation, this may present some limitations in using stronger encryption standards.

Consider using TLS 1.0 or 1.1 for sites with a broad user base, particularly non-transactional sites. In this way, you minimize the possibility that some clients cannot connect to your site securely.

For a narrow user base and sites that run internal applications or business and productivity applications, Cloudflare recommends TLS 1.2. These sites might already have more stringent security requirements or might be subject to PCI compliance. However, you also need to ensure that your users upgrade to a TLS 1.2 compliant browser.

It is not recommended to set the minimum TLS to 1.3, unless there is a specific use case, as this will likely cause issues with search engine crawlers and certain browsers.

## Related resources

- [PCI compliance and Cloudflare SSL/TLS](https://support.cloudflare.com/hc/en-us/articles/205043158)
- [Transport Layer Security](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/)
- [PCI Security Standards Council](https://www.pcisecuritystandards.org/)