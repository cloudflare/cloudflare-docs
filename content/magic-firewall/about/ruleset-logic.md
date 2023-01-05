---
title: Ruleset logic
pcx_content_type: concept
meta:
  title: Magic Firewall ruleset logic
---

# Magic Firewall ruleset logic

Magic Firewall rules are performed after Cloudflare's DDoS mitigations have been applied. The two systems are independent, and therefore, permitting traffic inside Magic Firewall does not allow it within our DDoS mitigations. Traffic can still be blocked by DDoS mitigations that are applied first in the flow through Cloudflare’s systems.

By default, Magic Firewall permits all traffic until explicitly blocked by a rule. If no rules are configured, all traffic is permitted after Cloudflare’s DDoS mitigations have been applied.

## Security policy

You have two options for configuring a security policy:

- Enforce a positive security model and only permit required traffic and block everything else.
- Begin with a minimal ruleset to block specific traffic and, by default, everything else is permitted.

Traffic is matched in order of the configured rules. As soon as traffic is matched by an enabled rule, it is no longer validated against the later rules, and traffic will pass through disabled rules. In the dashboard under **Magic Firewall**, rule order begins from the top and flows down your list of rules.

For example, permitting all TCP traffic in a rule #4 would mean all TCP traffic is permitted. A rule #5 to block traffic for IP address `x.x.x.x` would not be checked.

For best practices when configuring your security policy, refer to [Best practices](/magic-firewall/best-practices/).

## Magic Firewall rules and Magic Transit endpoint health checks

Cloudflare-sourced traffic is also subject to the Magic Firewall rules you configure. If you block all ICMP traffic, you will also block Cloudflare's endpoint health checks. When blocking ICMP traffic, ensure your rules first allow ICMP sourced from Cloudflare public IPs to your prefix endpoint IPs before applying a block ICMP rule.

For a list of Cloudflare's public IPs, refer to [IP Ranges](https://www.cloudflare.com/ips/).

## Magic Firewall phases

Magic Firewall processes traffic in two phases: in the first phase, Magic Firewall matches packets against rules in the Custom phase. In the second phase, Magic Firewall matches packets against rules in the Managed phase.

### Custom phase ruleset

The Magic Firewall Custom phase is a set of rules defined by the user. The expression, order, and actions of those rules can be customized by the user.

Additionally, users can add a rule in this custom phase to override the behavior of a rule in the Managed phase.

### Managed phase ruleset

Managed phase rulesets are updated and maintained by Cloudflare, and Cloudflare creates these rules based on best practices, known malicious patterns, and other criteria.

Cloudflare maintains the expressions and order of execution for rules in the Managed phase. Rules
can be enabled, disabled, or made to log matching packets.

Refer to [Enable managed rulesets](/magic-firewall/how-to/enable-managed-rulesets/) for more information.