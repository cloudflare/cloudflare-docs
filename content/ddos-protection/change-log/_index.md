---
title: Change log
pcx-content-type: concept
weight: 20
meta:
  title: Change log for DDoS Managed Rulesets
---

# Change log for DDoS Managed Rulesets

Cloudflare has a regular cadence of releasing updates and new rules to the DDoS maangeed rulesets. The updates either improve a rule's accuracy, lower false positives rates or increase the protection due to a change in the threat landscape.

The release cycle for regular new rules happens is using the following process:

* A new rule is added in logging mode and announced in the "Scheduled changes" section
* From that point on, if this rule match any traffic, the matched traffic will be visible in the "Firewall" section in the dashboard. If you suspect this is might be a false positive, you can lower the sensitivity for that rule, see the [dedicated guide](/ddos-protection/managed-rulesets/adjust-rules/false-positive/) for details
* The rule will be enabled in mitigate mode after a period of at least 7 days, usually on a Monday (the exact date is shown in the scheduled changes list)

Changes to existing rules follow the same process except that a temporary updated rule will be created (denoted as `BETA` in rule description), before updating the original rule on the next release cycle.

Cloudflare is very proactive in responding to new attack vectors, which may need to be released outside of the 7-day cycle, defined as an Emergency Release. This emergency release is only used to respond to new high priority threats with a very low false positive probability.

<!-- TODO: add back RSS feed (was `/waf/change-log/index.xml` before) -->
