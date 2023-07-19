---
title: Concepts
pcx_content_type: concept
weight: 4
---

# Concepts

## Prefixes

Advanced TCP Protection protects the IP prefixes you select from sophisticated TCP attacks. A prefix can be an IP address or an IP range in CIDR format. You must add prefixes to Advanced TCP Protection so that Cloudflare can analyze incoming packets and offer protection against sophisticated TCP DDoS attacks.

Prefixes added to Advanced TCP Protection must be one of the following:

* A prefix [onboarded to Magic Transit](/magic-transit/how-to/advertise-prefixes/).
* A subset of a prefix [onboarded to Magic Transit](/magic-transit/how-to/advertise-prefixes/).

You cannot add a prefix (or a subset of a prefix) that you have not onboarded to Magic Transit or whose status is still _Unapproved_. Contact your account team to get help with prefix approvals.

## Allowlist

The Advanced TCP Protection allowlist is a list of prefixes that will bypass all configured Advanced TCP Protection rules.

For example, you could add prefixes used only by partners of your company to the allowlist so that they are exempt from packet inspection and mitigation actions performed by Advanced TCP Protection.

{{<render file="_allowlist-ip-spoofing.md">}}

## Rule

A rule allows you to configure Advanced TCP Protection for a given [scope](/ddos-protection/tcp-protection/rule-settings/#scope), defining several [settings](/ddos-protection/tcp-protection/rule-settings/): execution mode, burst sensitivity, and rate sensitivity.

Each advanced TCP protection type (SYN flood protection and out-of-state TCP protection) has its own list of rules.

## Filter

A filter allows you to modify Advanced TCP Protection's [execution mode](/ddos-protection/tcp-protection/rule-settings/#mode) — monitoring, mitigation (enabled), or disabled — for all incoming packets matching an expression. The expression can reference source and destination IP addresses and ports.

Each type of advanced TCP protection (SYN flood protection and out-of-state TCP protection) has its own list of filters.

{{<Aside type="warning" header="Important notes">}}
* Currently, you can only manage filters [via API](/ddos-protection/tcp-protection/api/).
* For each type of TCP protection (SYN flood protection or out-of-state TCP protection), you can only create one filter for each mode.
{{</Aside>}}

---

## Determining the execution mode

When you have both rules and filters configured, the execution mode is determined according to the following:

1. If there is a match for one of the configured filters, use the filter's execution mode. The filter evaluation order  is based on their mode, in the following order:
    1. Filter with `enabled` mode
    2. Filter with `monitoring` mode
    3. Filter with `disabled` mode
2. If no filter matched, use the execution mode determined by existing rules.
3. If no rules match, disable Advanced TCP Protection.
