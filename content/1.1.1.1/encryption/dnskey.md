---
pcx_content_type: concept
title: DNSKEY
meta:
    title: Supported DNSKEY signature algorithms
---

# Supported DNSKEY signature algorithms

[DNSSEC is a protocol](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) that adds a layer of security to the domain name system (DNS). DNSSEC does this by providing authentication through public signing keys using two DNS records: DNSKEY and DS. They can be used to verify DNSSEC signatures in [RRSIG records](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/). 

1.1.1.1 supports the following signature algorithms:

- RSA/SHA-1
- RSA/SHA-256
- RSA/SHA-512
- RSASHA1-NSEC3-SHA1
- ECDSA Curve P-256 with SHA-256 (ECDSAP256SHA256)
- ECDSA Curve P-384 with SHA-384 (ECDSAP384SHA384)
- ED25519