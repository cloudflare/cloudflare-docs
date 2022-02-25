---
title: Advanced TCP Protection
pcx-content-type: concept
weight: 5
meta:
  title: Cloudflare Advanced TCP Protection Managed Ruleset
---

# Cloudflare Advanced TCP Protection Managed Ruleset

The Cloudflare Advanced TCP Protection Managed Ruleset, powered by [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/), is a set of pre-configured rules used to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods, SYN floods, and SYN-ACK reflection attacks.

The Cloudflare Advanced TCP Protection Managed Ruleset is disabled by default.

<Aside type="note">

The Advanced TCP Protection Managed Ruleset is available in early access to all Magic Transit customers.

</Aside>

## Execution modes

Advanced TCP Protection has two execution modes: **Monitoring mode** and **Mitigation mode**.

Currently, to switch between execution modes you must contact your account team.

### Monitoring mode

In this mode, the Advanced TCP Protection ruleset does not impact any packets. Instead, the protection system will learn about existing TCP connections and will maintain their states. Check the Network Analytics to visualize what actions the Advanced TCP Protection ruleset would have taken on incoming packets, according to the current configuration.

Use Monitoring mode when onboarding new prefixes to Magic Transit or performing changes to the Advanced TCP Protection ruleset.

It is recommended that you use Monitoring mode before Mitigation mode.

### Mitigation mode

In this mode, the Advanced TCP Protection ruleset will challenge new connection initiation requests (SYN, SYN-ACK) if they exceed the provisioned thresholds. Furthermore, out-of-state packets that do not belong to existing (and tracked) TCP connections will be dropped if their rates exceed the threshold. If you are using Mitigation mode, you should disable Advanced TCP Protection before making changes to the Advanced TCP Protection ruleset or before advertising prefixes.

When you enable Advanced TCP Protection in Mitigation mode without first using Monitoring mode, the protection system will have a **learning period** of 10 minutes to learn the existing flows. After this period, the Mitigation mode will start and the protection system will apply any required mitigation actions to incoming packets, according to the current configuration.

## Ruleset configuration

### Enabling and disabling the ruleset

To enable or disable the Cloudflare Advanced TCP Protection Managed Ruleset, [use the Cloudflare dashboard](/ddos-protection/managed-rulesets/tcp-protection/configure-dashboard/) or the [Advanced TCP Protection API](/ddos-protection/managed-rulesets/tcp-protection/configure-api/).

### Adjusting the sensitivity threshold

You may need to adjust the sensitivity thresholds of the ruleset in case of false positives or due to specific traffic patterns.

To change the sensitivity thresholds, use Monitor mode, and add filter expressions, you must contact your account team.
