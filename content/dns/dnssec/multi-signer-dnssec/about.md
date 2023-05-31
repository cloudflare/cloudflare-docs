---
pcx_content_type: concept
title: About
weight: 4
meta:
    title: About multi-signer DNSSEC
---

# About multi-signer DNSSEC

{{<Aside>}}
This is a simplified explanation to give you context and clarify what you will be configuring if you proceed to [set up multi-signer DNSSEC](/dns/dnssec/multi-signer-dnssec/setup//). For technical details refer to [RFC 8901](https://datatracker.ietf.org/doc/html/rfc8901). To read more about what is involved in DNSSEC, check [How DNSSEC works](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/).
{{</Aside>}}

## How it works

Multi-signer DNSSEC looks into the chain of trust that is necessary for DNSSEC validation and leverages that to guarantee that validation is completed even when multiple providers are involved.

An example case where validation would otherwise be an issue is if a resolver has cached a DNSKEY record set from one provider but receives a response signed by another provider.

In order to avoid issues in that case, when you set up multi-signer DNSSEC, you adjust:

1. The Zone Signing Keys (ZSK) that your DNS providers have in their DNSKEY record sets.
2. Who is responsible for the Secure Entry Point (SEP), Key Signing Keys (KSK) and Delegation Signer (DS) record.

When these configurations are adjusted in a way that (a) all involved providers have each other's public Zone Signing Keys (ZSK), and that (b) Delegation Signer (DS) records reference the necessary Key Signing Keys (KSK), then live-signing of zones by multiple providers is no longer a problem.

### Model 1

Whereas in both models all providers have each other's Zone Signing Keys (ZSK) added to their DNSKEY record set, in model 1, only one Key Signing Key (KSK) is used to sign such DNSKEY record sets. Management of this KSK and its reference by the DS record (i.e. the Secure Entry Point) is the responsibility of the zone owner or only one provider (designated by the zone owner).

### Model 2

In model 2, on the other hand, each provider uses its own KSK to sign its own DNSKEY record set, and these KSKs are then referenced by the DS record (Secure Entry Point).