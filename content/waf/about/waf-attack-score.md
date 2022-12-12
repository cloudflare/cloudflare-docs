---
title: WAF attack score
pcx_content_type: concept
weight: 2
---

# WAF attack score

WAF attack score is a feature that complements [WAF Managed Rulesets](/waf/managed-rulesets/).

Managed Rulesets contain rules that are continuously updated to better detect malicious payloads. They target specific patterns of established attack vectors and have a very low rate of false positives. However, Managed Rulesets are not optimized for attacks based on variations of the original signature introduced, for example, by fuzzing techniques.

WAF attack score allows you to identify these attack variations and their malicious payloads. It classifies each request using a machine learning algorithm, assigning an attack score from 1 to 99 based on the likelihood that the request is malicious. Just like [Bot Management](/bots/get-started/bm-subscription/), you can use this score to identify potentially malicious traffic that is not an exact match to any of the rules in the WAF Managed Rulesets.

To maximize protection, Cloudflare recommends that you use both Managed Rulesets and WAF attack score.

{{<Aside type="note">}}
This feature is only available on Enterprise plans.
{{</Aside>}}

## Available scores

The Cloudflare WAF provides the following attack scores:

{{<table-wrap>}}
Score                 | Attack vector               | Field
----------------------|-----------------------------|--------------------------------------------------------------------------------------
WAF Attack Score      | N/A (global score)          | [`cf.waf.score`](/ruleset-engine/rules-language/fields/#field-cf-waf-score)
WAF SQLi Attack Score | SQL injection (SQLi)        | [`cf.waf.score.sqli`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-sqli)
WAF XSS Attack Score  | Cross-site scripting (XSS)  | [`cf.waf.score.xss`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-xss)
WAF RCE Attack Score  | Remote Code Execution (RCE) | [`cf.waf.score.rce`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-rce)
{{</table-wrap>}}

You can use the fields for these scores in expressions of [custom rules](/waf/custom-rules/) and [firewall rules](/waf/firewall-rules/), where:

* A score of `1` indicates that the request is almost certainly malicious.
* A score of `99` indicates that the request is likely clean.

The available scores are independent of each other. Namely, the WAF Attack Score is not a sum of the other scores.

---

## Start using the WAF attack score

### 1. Create a custom rule or firewall rule

Create a [WAF custom rule](/waf/custom-rules/create-dashboard/#create-a-custom-rule) or a [firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/#create-a-firewall-rule) that logs all requests with a WAF Attack Score below 40 (recommended initial threshold).

For example, set the rule expression to `cf.waf.score lt 40` and the rule action to _Log_.

### 2. Monitor domain traffic

Monitor the rule you created, especially in the first few days, to make sure you entered an appropriate threshold for your traffic. Update the threshold if required.

### 3. Update the rule action

After making sure that your rule is logging the correct requests, change the rule action to a more severe one, like _Managed Challenge_ or _Block_.

---

## Additional remarks

The WAF Attack Score is different from Threat Score and Bot Score. WAF Attack Score identifies variation of attacks that WAF Managed Rulesets do not catch. Bot Score identifies bots, while Threat Score measures IP reputation across Cloudflare services.