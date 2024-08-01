---
title: Overview
pcx_content_type: overview
weight: 1
meta:
  title: Cloudflare Advanced DDoS Protection
---

# Overview

Advanced DDoS Protection systems are configured using the general settings, Advanced TCP Protection, and Advanced DNS Protection.

## General settings

General settings enable and control the use of the Advanced TCP Protection and the Advanced DNS Protection systems, and are composed of thresholds, prefixes, rules, and enablement. To configure the general settings, refer to Setup.

### Thresholds

Thresholds are based on your network's unique traffic, they define the sensitivity levels, and are configured by Cloudflare.

### Prefixes

Add prefixes to instruct the system on which traffic to route through the system.

### Rules

Create rules for the TCP and DNS Protection systems to enable mitigation. Start with Monitoring mode.

### Enablement

Enable the Advanced DDoS system and begin routing traffic through it.

## Advanced TCP Protection

Advanced TCP Protection offers two types of protection:

- [SYN Flood Protection](): Protects against attacks such as fully randomized SYN and SYN-ACK floods.
- [Out-of-state TCP Protection](): Protects against out-of-state TCP DDoS attacks such as fully randomized ACK floods and RST floods.

Each protection type is configured independently using rules and (optionally) filters. You should configure at least one rule for each type of protection before enabling Advanced TCP Protection.

### Availability

Advanced TCP Protection is available to all [Magic Transit]() customers, and is disabled by default. Protection for simpler TCP-based DDoS attacks is also included as part of the [Network-layer DDoS Attack Protection managed ruleset]().

## Advanced DNS Protection

Cloudflare’s Advanced DNS Protection works by first learning your traffic patterns and forming a baseline of the type of DNS queries you normally receive. Later, the system will be able to distinguish between legitimate and malicious queries, protecting your DNS infrastructure without impacting legitimate traffic.

Currently, the protection system only analyzes DNS over UDP (it does not include DNS over TCP).

The [Network Analytics dashboard]() will display system-specific analytics for Advanced DNS Protection in the DNS protection tab, including the queried domains and record types.

### Availability

Advanced DNS Protection is currently available in beta to [Magic Transit]() customers.

Protection for simpler DNS-based DDoS attacks is also included as part of the [Network-layer DDoS Attack Protection managed ruleset]().
