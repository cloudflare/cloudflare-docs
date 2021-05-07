---
title: Change log
order: 5
---

# Change log for Managed Rulesets

Cloudflare has a very regular cadence of releasing updates and new rules to our Managed Rulesets. The updates either improve a rule's accuracy, lower false positives rates or increase the protection due to a change in the threat landscape.

The release cycle for new rules happens on a 7-day cycle. Every Monday, sometimes Tuesday depending on public holidays, Cloudflare will deploy the updated or new rules into logging only ("Log") mode. Logging only mode allows our customers to identify any increases in Firewall Event volumes which look like potential false positives. On the following Monday (or Tuesday) the rules will be transitioned from the logging only mode to the intended default action ("New Action").

Cloudflare is very proactive in responding to new vulnerabilities, which may need to be released outside of the 7-day cycle, defined as an Emergency Release.

If you do notice a new or updated rule generating an increased volume of Firewall Events, you can disable or change the rule from its "Default" action. Once a rule is changed from a "Default" state, Cloudflare is not able to override this.

<p><Button type="primary" href="/change-log/scheduled-changes">View scheduled changes</Button></p>

<!-- TODO: add back RSS feed (was `/waf/change-log/index.xml` before) -->
