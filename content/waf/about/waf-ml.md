---
title: WAF ML
pcx_content_type: concept
weight: 2
meta:
  title: WAF ML (Machine Learning)
---

# WAF ML

{{<Aside type="note">}}
This feature is available in early access to customers on an Enterprise plan. To get access, contact your account team.
{{</Aside>}}

WAF ML (Machine Learning) is a feature that complements [WAF Managed Rulesets](/waf/managed-rulesets/).

Managed Rulesets contain rules that are continuously updated to better detect malicious payloads. They target specific patterns of established attack vectors and have a very low rate of false positives. However, Managed Rulesets are not optimized for attacks based on variations of the original signature introduced, for example, by fuzzing techniques.

WAF ML can identify these attack variations and their malicious payloads. It classifies each request using a machine learning algorithm, assigning an attack score from 1 to 99 based on the likelihood that the request is malicious. Just like [Bot Management](/bots/get-started/bm-subscription/), you can use this score to identify potentially malicious traffic that is not an exact match to any of the rules in the WAF Managed Rulesets.

To maximize protection, Cloudflare recommends that you use both Managed Rulesets and WAF ML.

## Available scores

Currently, WAF ML provides the following scores:

<table>
  <thead>
    <tr>
      <th style="width: 17%">Score</th>
      <th style="width: 33%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
  <tr>
    <td><strong>WAF Attack Score</strong></td>
    <td><code>cf.waf.ml.score</code></td>
    <td>A global score from 1 to 99 that combines the score of each attack vector into a single score.<br/>
      This is the standard WAF ML score to detect variants of attack patterns.</td>
  </tr>
  <tr>
    <td><strong>WAF SQLi Attack Score</strong></td>
    <td><code>cf.waf.ml.score.sqli</code></td>
    <td>An attack score from 1 to 99 classifying the SQL injection (SQLi) attack vector.</td>
  </tr>
  <tr>
    <td><strong>WAF XSS Attack Score</strong></td>
    <td><code>cf.waf.ml.score.xss</code></td>
    <td>An attack score from 1 to 99 classifying the cross-site scripting (XSS) attack vector.</td>
  </tr>
</table>

You can use the fields for these scores in expressions of [custom rules](/waf/custom-rules/) and [firewall rules](/waf/firewall-rules/), where:

* A score of `1` indicates that the request is almost certainly malicious.
* A score of `99` indicates that the request is likely clean.

The available scores are independent of each other. Namely, the WAF Attack Score is not a sum of the other scores.

---

## Start using the WAF ML Score

{{<Aside type="note" header="Before you start">}}
Contact your account team to get access to WAF ML.
{{</Aside>}}

### 1. Create a custom rule or firewall rule

Create a [custom rule](/waf/custom-rules/create-dashboard/#create-a-custom-rule) or a [firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/#create-a-firewall-rule) that logs all requests with a WAF ML Attack Score below 40 (recommended initial threshold).

For example, set the rule expression to `cf.waf.ml.score lt 40` and the rule action to `Log`.

### 2. Monitor domain traffic

Monitor the rule you created, especially in the first few days, to make sure you entered an appropriate threshold for your traffic. Update the threshold if required.

### 3. Update the rule action

After making sure that your rule is logging the correct requests, change the rule action to a more severe one, like _Managed Challenge_ or _Block_.

---

## Additional remarks

* The WAF ML Attack Score is different from Threat Score and Bot Score. WAF ML Attack Score identifies variation of attacks that WAF Managed Rulesets do not catch. Bot Score identifies bots, while Threat Score measures IP reputation across Cloudflare services.
* The WAF ML Attack Score is not available yet in Cloudflare Logpush.