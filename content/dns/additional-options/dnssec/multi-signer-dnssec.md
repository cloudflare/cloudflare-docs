---
pcx_content_type: how-to
title: Multi-signer DNSSEC
weight: 4
---

# Multi-signer DNSSEC

Also known as multi-provider DNSSEC, multi-signer DNSSEC consists of two models that allow different authoritative DNS providers to serve the same zone and have DNSSEC enabled at the same time.

This means better compatibility with DNS features that require live-signing of DNS records (at query time), and also being able to transfer zones without having to disable DNSSEC at any moment.

## How multi-signer DNSSEC works

{{<Aside>}}
This is a simplified explanation to give you context and clarify what you will be setting up if you proceed with multi-signer DNSSEC. For technical details refer to [RFC 8901](https://datatracker.ietf.org/doc/html/rfc8901).
{{</Aside>}}

Multi-signer DNSSEC looks into the chain of trust that is necessary for DNSSEC validation and leverages that to guarantee that validation is completed even when multiple providers are involved.

An example case where validation would otherwise be an issue is if a resolver has cached a DNSKEY record set from one provider but receives a response signed by another provider.

In order to avoid issues in that case, when you set up multi-signer DNSSEC, you adjust:

1. The Zone Signing Keys (ZSK) that your DNS providers have in their DNSKEY record sets.
2. Who is responsible for the Secure Entry Point (SEP), Key Signing Keys (KSK) and Delegation Signer (DS) record.

When these configurations are adjusted in a way that (a) all involved providers have each other's public Zone Signing Keys (ZSK), and that (b) Delegation Signer (DS) records reference the necessary Key Signing Keys (KSK), then live-signing of zones by multiple providers is no longer a problem.

### Model 1

Whereas in both models all providers have each other's Zone Signing Keys (ZSK) added to their DNSKEY record set, in model 1, only one Key Signing Key (KSK) is used to sign such record sets. Management of this KSK and its reference by the DS record (i.e. the Secure Entry Point) is the responsibility of the zone owner or only one provider that the zone owner designates to hold the KSK.

### Model 2

In model 2, on the other hand, each provider uses its own KSK to sign its own DNSKEY record set, and these KSKs are then referenced by the DS record (Secure Entry Point). 

## Set up multi-signer DNSSEC (API only)

