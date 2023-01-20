---
title: Changelog
pcx_content_type: concept
weight: 20
layout: single
meta:
  title: Changelog for managed rulesets
rss: folder
---

# Changelog for managed rulesets

Cloudflare has a regular cadence of releasing updates and new rules to the DDoS managed rulesets. The updates either improve a rule's accuracy, lower false positives rates, or increase the protection due to a change in the threat landscape.

The release cycle for a new rule within the regular cadence follows this process:

* Cloudflare adds a new rule configured with the _Log_ action, and announces the rule in the "Scheduled changes" section of each managed ruleset.
* From that point on, if this rule matches any traffic, the matched traffic will be visible in one of the [analytics dashboards](/ddos-protection/reference/analytics/). If you suspect this might be a false positive, you can lower the sensitivity for that rule. Refer to [Handle a false positive](/ddos-protection/managed-rulesets/adjust-rules/false-positive/) for details.
* Cloudflare updates the rule action to mitigate traffic (for example, using the _Block_ action) after a period of at least seven days, usually on a Monday. The exact date is shown in the scheduled changes list.

Changes to existing rules follow the same process, except that Cloudflare will create a temporary updated rule (denoted as `BETA` in rule description) before updating the original rule on the next release cycle.

Cloudflare is very proactive in responding to new attack vectors, which may need to be released outside of the 7-day cycle, defined as an Emergency Release. This emergency release is only used to respond to new high priority threats with a low false positive probability.
