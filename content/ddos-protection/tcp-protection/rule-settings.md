---
title: Rule settings
pcx_content_type: reference
weight: 9
---

# Rule settings

Each rule type has the following settings: scope, mode, burst sensitivity, and rate sensitivity.

You may need to adjust the burst or rate sensitivity of a rule in case of false positives or due to specific traffic patterns.

## Scope

Advanced TCP Protection rules can have one of the following scopes:

* **Global**: The rule will apply to all incoming packets.
* **Region**: The rule will apply to incoming packets in a selected region.
* **Data center**: The rule will apply to incoming packets in the selected Cloudflare data center.

The rule scope allows you to adjust the system's tolerance for out-of-state packets in locations where you may have more or less traffic than usual, or due to any other networking reasons.

Besides defining rules with one of the above scopes, you must also select the [prefixes](/ddos-protection/tcp-protection/concepts/#prefixes) that you wish to protect with Advanced TCP Protection.

## Mode

The Advanced TCP Protection system constantly learns your TCP connections to mitigate DDoS attacks. Advanced TCP Protection rules can have one of the following execution modes: monitoring, mitigation (enabled), or disabled.

{{<definitions>}}

* **Monitoring**

    * In this mode, Advanced TCP Protection will not impact any packets. Instead, the protection system will learn your legitimate TCP connections and show you what it would have mitigated. Check Network Analytics to visualize what actions Advanced TCP Protection would have taken on incoming packets, according to the current configuration.

* **​​Mitigation (Enabled)**

    * In this mode, Advanced TCP Protection will learn your legitimate TCP connections and perform mitigation actions on incoming TCP DDoS attacks based on the rule configuration (burst and rate sensitivity) and your [allowlist](/ddos-protection/tcp-protection/concepts/#allowlist).

* **Disabled**

    * In this mode, a rule will not evaluate any incoming packets.

{{</definitions>}}

## Burst sensitivity

The burst sensitivity is the rule's sensitivity to short-term bursts in the packet rate:

* A low sensitivity means that bigger spikes in the packet rate may trigger a mitigation action.
* A high sensitivity means that smaller spikes in the packet rate may trigger a mitigation action.

The default burst sensitivity is _Medium_.

## Rate sensitivity

The rate sensitivity is the rule's sensitivity to the sustained packet rate:

* A low sensitivity means that higher sustained packet rates can trigger a mitigation action.
* A high sensitivity means that lower sustained packet rates may trigger a mitigation action. A high sensitivity offers increased protection, but you may get more false positives (that is, mitigated packets that belong to legitimate traffic).

The default rate sensitivity is _Medium_.
