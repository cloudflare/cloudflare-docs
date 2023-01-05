---
title: Changelog
pcx_content_type: concept
weight: 20
meta:
  title: Changelog for managed rulesets
rss: folder
---

# Changelog for managed rulesets

Cloudflare has a regular cadence of releasing updates and new rules to WAF managed rulesets. The updates either improve a rule's accuracy, lower false positives rates, or increase the protection due to a change in the threat landscape.

The release cycle for new rules happens on a 7-day cycle, typically every Monday or Tuesday depending on public holidays. For rule updates, Cloudflare will initially deploy the updated rule as a BETA rule (denoted in rule description), before updating the original rule on the next release cycle. Cloudflare will deploy the updated or new rules into logging only ("Log") mode. Logging only mode allows you to identify any increases in firewall event volumes which look like potential false positives. On the following Monday (or Tuesday) the rules will change from logging only mode to the intended default action ("New Action").

Cloudflare is very proactive in responding to new vulnerabilities, which may need to be released outside of the 7-day cycle, defined as an Emergency Release.

If you do notice a new or updated rule generating an increased volume of security events, you can disable or change the rule from its _Default_ action. Once you change a rule to use an action other than the default one, Cloudflare will not be able to override the rule action.

<p>{{<button type="primary" href="/waf/change-log/scheduled-changes/">}}View scheduled changes{{</button>}}</p>
