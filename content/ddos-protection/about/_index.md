---
title: About
pcx-content-type: concept
weight: 4
meta:
  title: About Cloudflare DDoS Protection
---

# About Cloudflare DDoS Protection

Cloudflare provides unmetered and unlimited [distributed denial-of-service (DDoS)](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) protection to all customers on all plans and services.

The protection is enabled by Cloudflare’s [Autonomous DDoS Protection Edge](/ddos-protection/about/components/#autonomous-edge), which automatically detects and mitigates DDoS attacks.

The Autonomous Edge includes multiple dynamic mitigation rules exposed as [Cloudflare DDoS Attack Protection Managed Rulesets](/ddos-protection/managed-rulesets/), which provide comprehensive protection against a variety of DDoS attacks across L3/4 and L7 of the OSI model.

## How it works

To detect and mitigate DDoS attacks, Cloudflare’s Autonomous Edge and centralized DDoS systems analyze traffic samples “out-of-path”, which allows Cloudflare to asynchronously detect DDoS attacks without causing latency or impacting performance.

The analyzed samples include:

*   **Packet fields** such as the source IP, source port, destination IP, destination port, protocol, TCP flags, sequence number, options, and packet rate.
*   **HTTP request metadata** such as HTTP headers, user agent, query-string, path, host, HTTP method, HTTP version, TLS cipher version, and request rate.
*   **HTTP response metrics** such as error codes returned by customers’ origin servers and their rates.

Once attack traffic matches a rule, Cloudflare's systems will track that traffic and generate a real-time signature to surgically match against the attack pattern and mitigate the attack without impacting legitimate traffic. The rules are able to generate different signatures based on various properties of the attacks and the signal strength of each attribute. For example, if the attack is distributed — that is, originating from many source IPs — then the source IP field will not serve as a strong indicator, and the rule will not choose the source IP field as part of the attack signature. Once generated, the fingerprint is propagated as a mitigation rule to the most optimal location in the Cloudflare edge for cost-efficient mitigation. These mitigation rules are ephemeral and will expire shortly after the attack has ended, which happens when no additional traffic has been matched to the rule.
