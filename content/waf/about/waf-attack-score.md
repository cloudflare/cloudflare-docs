---
title: WAF attack score
pcx_content_type: concept
weight: 2
---

# WAF attack score

WAF attack score is a feature that complements [WAF Managed Rules](/waf/managed-rules/).

WAF's managed rulesets contain rules that are continuously updated to better detect malicious payloads. They target specific patterns of established attack vectors and have a very low rate of false positives. However, managed rulesets are not optimized for attacks based on variations of the original signature introduced, for example, by fuzzing techniques.

WAF attack score allows you to identify these attack variations and their malicious payloads. It classifies each request using a machine learning algorithm, assigning an attack score from 1 to 99 based on the likelihood that the request is malicious. Just like [Bot Management](/bots/plans/bm-subscription/), you can use this score to identify potentially malicious traffic that is not an exact match to any of the rules in WAF Managed Rules.

To maximize protection, Cloudflare recommends that you use both Managed Rules and WAF attack score.

{{<Aside type="note">}}
This feature is available to Enterprise customers. Business plans have access to a single field (WAF Attack Score Class).
{{</Aside>}}

## Available scores

The Cloudflare WAF provides the following attack scores:

{{<table-wrap>}}
Score                 | Minimum plan required |  Attack vector   | Field
----------------------|-----------------------|------------------|------
WAF Attack Score      | Enterprise | N/A (global score)          | [`cf.waf.score`](/ruleset-engine/rules-language/fields/#field-cf-waf-score)
WAF SQLi Attack Score | Enterprise | SQL injection (SQLi)        | [`cf.waf.score.sqli`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-sqli)
WAF XSS Attack Score  | Enterprise | Cross-site scripting (XSS)  | [`cf.waf.score.xss`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-xss)
WAF RCE Attack Score  | Enterprise | Remote Code Execution (RCE) | [`cf.waf.score.rce`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-rce)
WAF Attack Score Class | Business  | N/A (global classification) | [`cf.waf.score.class`](/ruleset-engine/rules-language/fields/#field-cf-waf-score-class)

{{</table-wrap>}}

You can use the fields for these scores in expressions of [custom rules](/waf/custom-rules/) and [rate limiting rules](/waf/rate-limiting-rules/) where:

* A score of `1` indicates that the request is almost certainly malicious.
* A score of `99` indicates that the request is likely clean.
* A score of `100` indicates that the Cloudflare WAF did not score the request.

The available scores are independent of each other. Namely, the WAF Attack Score is not a sum of the other scores.

The WAF Attack Score Class field can have one of the following values, depending on the calculated request attack score:

Dashboard label | Field value | Description
---|---|---
_Attack_ | `attack` | Attack score between `1` and `20`.
_Likely attack_ | `likely_attack` | Attack score between `21` and `50`.
_Likely clean_ | `likely_clean` | Attack score between `51` and `80`.
_Clean_ | `clean` | Attack score between `81` and `99`.

Requests with an attack score of `100` will have a class of _Unscored_ in the Cloudflare dashboard, but you cannot use this class value in rule expressions.

Attack score automatically detects and decodes Base64, JavaScript (Unicode escape sequences), and URL encoded content anywhere in the request: URL, headers, and body.

---

## Start using the WAF attack score

### 1. Create a custom rule

If you are an Enterprise customer:

* Create a [WAF custom rule](/waf/custom-rules/create-dashboard/) that logs all requests with a WAF Attack Score below 40 (recommended initial threshold). For example, set the rule expression to `cf.waf.score lt 40` and the rule action to _Log_.

If you are a Business customer:

* Create a [WAF custom rule](/waf/custom-rules/create-dashboard/) matching requests with a WAF Attack Score Class of _Attack_. For example, set the rule expression to `cf.waf.score.class eq "attack"` and the rule action to a challenge action (such as _Managed Challenge_) or _Block_.

### 2. Monitor domain traffic

Monitor the rule you created, especially in the first few days, to make sure you entered an appropriate threshold (or class) for your traffic. Update the rule if required.

### 3. Update the rule action

If you are an Enterprise customer and you created a rule with _Log_ action, change the rule action to a more severe one, like _Managed Challenge_ or _Block_.

---

## Additional remarks

The WAF Attack Score is different from {{<glossary-tooltip term_id="threat score">}}Threat Score{{</glossary-tooltip>}} and Bot Score. WAF Attack Score identifies variation of attacks that WAF Managed Rules do not catch. Bot Score identifies bots, while Threat Score measures IP reputation across Cloudflare services.
