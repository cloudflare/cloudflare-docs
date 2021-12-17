---
title: Advanced TCP Protection
order: 4
pcx-content-type: concept
---

# Cloudflare Advanced TCP Protection Managed Ruleset

The Cloudflare Advanced TCP Protection Managed Ruleset, powered by [flowtrackd](https://blog.cloudflare.com/announcing-flowtrackd/), is a set of pre-configured rules used to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods, SYN floods, and SYN-ACK reflection attacks.

The Cloudflare Advanced TCP Protection Managed Ruleset is disabled by default.

<Aside type="note">

The Advanced TCP Protection Managed Ruleset is available in early access to Magic Transit customers.

</Aside>

## Ruleset configuration

### Enabling and disabling the ruleset

To enable or disable the Cloudflare Advanced TCP Protection Managed Ruleset, [use the Cloudflare dashboard](/managed-rulesets/tcp-protection/configure-dashboard) or the [Advanced TCP Protection API](/managed-rulesets/tcp-protection/configure-api).

### Adjusting the sensitivity threshold

You may need to adjust the sensitivity thresholds of the ruleset in case of false positives or due to specific traffic patterns.

To change the sensitivity thresholds, use Monitor mode, and add filter expressions, you must contact Cloudflare support.
