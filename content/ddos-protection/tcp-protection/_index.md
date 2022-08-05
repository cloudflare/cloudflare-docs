---
title: Advanced TCP Protection
pcx_content_type: concept
weight: 6
layout: single
meta:
  title: Cloudflare Advanced TCP Protection
---

# Cloudflare Advanced TCP Protection

Cloudflare Advanced TCP Protection, powered by [`flowtrackd`](https://blog.cloudflare.com/announcing-flowtrackd/), is a TCP flow classification engine used to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods, SYN floods, and SYN-ACK reflection attacks.

Advanced TCP Protection is available to all Magic Transit customers, and is disabled by default. Protection for simpler TCP-based DDoS attacks is also included as part of the [Network-layer DDoS Protection Managed Ruleset](/ddos-protection/managed-rulesets/network/).

To get started with Advanced TCP Protection, refer to [Setup](/ddos-protection/tcp-protection/setup/).

---

Advanced TCP Protection offers two types of protection:

* [SYN Flood Protection](#syn-flood-protection): Protects against attacks such as fully randomized SYN-ACK reflection attacks and SYN floods.
* [Out-of-State TCP Protection](#out-of-state-tcp-protection): Protects against out-of-state TCP DDoS attacks such as fully randomized ACK floods and RST floods.

Each protection type is configured independently using rules. You should configure at least one rule for each type of protection before enabling Advanced TCP Protection.

## SYN Flood Protection

This system protects against attacks such as fully randomized SYN-ACK reflection attacks and SYN floods. You should configure at least one SYN flood rule before enabling Advanced TCP Protection.

In mitigation mode, SYN flood rules will challenge new connection initiation requests (SYN, SYN-ACK) if they exceed the configured packet-per-second thresholds. The threshold should be higher than the normal rate of legitimate SYN and SYN-ACK packets that your network receives. Packets below the threshold will not be challenged. Using the [rate sensitivity](/ddos-protection/tcp-protection/rule-settings/#rate-sensitivity) and [burst sensitivity](/ddos-protection/tcp-protection/rule-settings/#burst-sensitivity) settings you can increase or decrease the tolerance of SYN and SYN-ACK packets.

For more information on the configuration settings of SYN flood rules, refer to [Rule settings](/ddos-protection/tcp-protection/rule-settings/).

## Out-of-state TCP Protection

This system protects against out-of-state TCP DDoS attacks such as fully randomized ACK floods and RST floods. You should configure one out-of-State TCP rule before enabling Advanced TCP Protection.

In mitigation mode, out-of-state TCP rules will drop out-of-state packets that do not belong to existing (and tracked) TCP connections if their rates exceed the configured thresholds. The threshold should be higher than the normal rate of non SYN or SYN-ACK TCP packets that your network receives. Packets below the threshold will not be evaluated. Using the [rate sensitivity](/ddos-protection/tcp-protection/rule-settings/#rate-sensitivity) and [burst sensitivity](/ddos-protection/tcp-protection/rule-settings/#burst-sensitivity) settings you can increase or decrease the tolerance of out-of-state TCP packets.

For more information on the configuration settings of out-of-state TCP rules, refer to [Rule settings](/ddos-protection/tcp-protection/rule-settings/).
