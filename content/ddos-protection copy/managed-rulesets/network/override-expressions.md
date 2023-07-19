---
title: Override expressions
pcx_content_type: reference
weight: 6
meta:
  title: Override expressions for Network-layer DDoS Attack Protection
---

# Override expressions

Set an override expression for the Network-layer DDoS Attack Protection managed ruleset to define a specific scope for [sensitivity level](/ddos-protection/managed-rulesets/network/override-parameters/#sensitivity-level) or [action](/ddos-protection/managed-rulesets/network/override-parameters/#action) adjustments. For example, you can set different sensitivity levels for different destination IP addresses or ports: a medium sensitivity level for destination IP address `A` and a low sensitivity level for destination IP address `B`.

## Available expression fields

You can use the following fields in override expressions:

- `ip.src`
- `ip.dst`
- `ip.proto.num`
- `ip.len`
- `ip.ttl`
- `tcp.srcport`
- `tcp.dstport`
- `tcp.flags`
- `tcp.flags.ack`
- `tcp.flags.fin`
- `tcp.flags.push`
- `tcp.flags.reset`
- `tcp.flags.syn`
- `tcp.flags.urg`
- `udp.srcport`
- `udp.dstport`

Refer to [Fields](/ruleset-engine/rules-language/fields/) in the Rules language documentation for more information.

## Important remarks

* Each expression is limited to 4,000 characters, which means you can enter approximately a maximum of 200 IP addresses in a single expression. However, you can enter IP addresses in CIDR format, which allows you to include a larger number of IP addresses. For example, you can use `192.0.0.0/24` to match IP addresses from `192.0.0.0` to `192.0.0.255`.

* An expression is not an allowlist and does not become part of the attack fingerprint. The expression applies to the scope of the override and is used right before applying a mitigation action, to determine if the sensitivity level and action need to be adjusted.<br>
For example, if you have an expression matching packets with a specific source IP address and the override sets the sensitivity level to low, this override will only lower the sensitivity level for traffic that comes directly from that source IP address. If the DDoS protection system detects an attack coming from many source IP addresses targeted at a single destination IP and port, the generated fingerprint will only match the common criteria of the attack which, in this example, does not include the source IP address. The system will trigger the required mitigation actions at the default high sensitivity level because the traffic did not come from the user-provided source IP address. Therefore, traffic from the source IP in the override expression may still be blocked because the fingerprint only contains the destination IP address and port of the attack.
