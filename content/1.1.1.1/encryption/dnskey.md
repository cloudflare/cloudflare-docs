---
pcx-content-type: concept
title: DNSKEY
meta:
    title: Supported DNSKEY signature algorithms
---

# Supported DNSKEY signature algorithms

The DNSKEY is a protocol that adds a layer of security to the domain name system (DNS). DNSKEY does this by providing authentication through public signing keys. They can be used to verify DNSSEC signatures in [RRSIG-records](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/). 

1.1.1.1 supports the following signature algorithms:

- RsaSha1
- RsaSha256
- RsaSha512
- RsaSha1Nsec3Sha1
- EcdsaP256Sha256
- EcdsaP384Sha384
- Ed25519