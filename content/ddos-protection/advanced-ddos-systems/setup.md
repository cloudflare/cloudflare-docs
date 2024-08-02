---
title: Setup
pcx_content_type: how-to
weight: 2
---

# Advanced DDoS Protection setup

Follow the steps described in the following sections to get started with Advanced DDoS Protection systems.

## 1. Request initial configuration

When you get access to Advanced DDoS Protection systems, there are no configured thresholds in your account.

Thresholds are based on your network's individual behavior, derived from your traffic profile as monitored by Cloudflare. Defining the thresholds will effectively determine what the _High_, _Medium_, and _Low_ [sensitivities](/ddos-protection/advanced-ddos-systems/rule-settings/#burst-sensitivity) will be for your specific case.

Ask your Implementation Manager to configure initial threshold values.

Once thresholds are configured, the Implementation Manager will let you know that Advanced DDoS Protection has been initialized and can be configured and enabled.

## 2. Add prefixes

[Add the prefixes](/ddos-protection/advanced-ddos-systems/how-to/add-prefix/) you would like to use with Advanced TCP and DNS Protection. You will be able to register prefixes that you previously [onboarded to Magic Transit](/magic-transit/how-to/advertise-prefixes/) or a subset of these prefixes.

You cannot add unapproved prefixes to Advanced DDoS Protection systems. Contact your account team to get help with prefix approvals.

## 3. Create a global configuration

[Create a rule](/ddos-protection/advanced-ddos-systems/how-to/create-rule/) for SYN Flood Protection and another rule for Out-of-state TCP Protection, both with global scope and in monitoring mode. These rules will apply to all received {{<glossary-tooltip term_id="data packet">}}packets{{</glossary-tooltip>}}.

Optionally, you can create [filters](/ddos-protection/advanced-ddos-systems/concepts/#filter) for each protection system component (SYN flood protection and out-of-state TCP protection). {{<render file="_atp-filter-definition.md">}}

## 4. (Optional) Add IP addresses or prefixes to the allowlist

[Add prefixes to the allowlist](/ddos-protection/advanced-ddos-systems/how-to/add-prefix-allowlist/) if their traffic should bypass Advanced DDoS Protection rules.

The {{<glossary-tooltip term_id="allowlist">}}allowlist{{</glossary-tooltip>}} only applies to source IPs — it does not apply to your own IPs or prefixes. To exclude a subset of an onboarded prefix from Advanced TCP Protection, refer to [Exclude a prefix or a prefix subset](/ddos-protection/advanced-ddos-systems/how-to/exclude-prefix/).


## 5. Enable Advanced DDoS Protection

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **L3/4 DDoS** > **Advanced Protection** > **General settings**.
3. Under **General settings**, toggle the feature status to **Enabled**.