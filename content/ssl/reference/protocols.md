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

TLS 1.3 has become widely adopted. As a general rule, Cloudflare recommends setting TLS to 1.3, as it will provide the best security.

However, not all browser versions support TLS 1.2 and above. Depending on your particular business situation, this may present some limitations in using stronger encryption standards:

- Consider using TLS 1.0 or 1.1 for sites with a broad user base, particularly non-transactional sites. In this way, you minimize the possibility that some clients cannot connect to your site securely.

- For a narrow user base and sites that run internal applications or business and productivity applications, Cloudflare recommends TLS 1.2. These sites might already have more stringent security requirements or might be subject to PCI compliance. You also need to ensure that your users upgrade to a TLS 1.2 compliant browser.

## Related resources

- [PCI compliance and vulnerabilities mitigation](/ssl/reference/compliance-and-vulnerabilities/)
- [Transport Layer Security](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/)
- [PCI Security Standards Council](https://www.pcisecuritystandards.org/)