---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200172016-Understanding-WAF-managed-rules-Web-Application-Firewall-
title: WAF managed rules (previous version)
weight: 2
layout: single
---

# WAF managed rules (previous version)

Managed rules, a feature of Cloudflare WAF (Web Application Firewall), identifies and removes suspicious activity for HTTP `GET` and `POST` requests.

{{<Aside type="warning">}}
- This page contains documentation about the previous implementation of WAF Managed Rules. For more information on the new version, refer to [WAF Managed Rules](/waf/managed-rules/).
- All customers with access to the previous version of WAF managed rules can [migrate to the new version](/waf/reference/migration-guides/waf-managed-rules-migration/).
- The new WAF Managed Rules provide the [Cloudflare Free Managed Ruleset](/waf/managed-rules/) to all customers, including customers on a Free plan. Refer to the [announcement blog post](https://blog.cloudflare.com/waf-for-everyone/) for details.
{{</Aside>}}

Examples of [malicious content](https://www.cloudflare.com/learning/security/what-is-web-application-security/) that managed rules identify include: 

- Common keywords used in comment spam (`XX`, `Rolex`, `Viagra`, etc.)
- Cross-site scripting attacks (XSS)
- SQL injections (SQLi)

WAF managed rules (previous version) are available to Pro, Business, and Enterprise plans for any [subdomains proxied to Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/). Control managed rules settings in **Security** > **WAF** > **Managed rules**. 

Managed rules includes three packages: 

- [Cloudflare Managed Ruleset ](#cloudflare-managed-ruleset)
- [OWASP ModSecurity Core Rule Set](#owasp-modsecurity-core-rule-set)
- Customer requested rules 

You can use the activity log in the [Security Events](/waf/security-events/) dashboard, available at **Security** > **Events**, to review threats blocked by WAF managed rules.

___

## Cloudflare Managed Ruleset

The Cloudflare Managed Ruleset contains security rules written and curated by Cloudflare. Select a ruleset name under **Group** to reveal the rule descriptions.

**Cloudflare Specials** is a group that provides core firewall security against [common attacks](https://www.cloudflare.com/learning/security/what-is-web-application-security/).   

{{<Aside type="note">}}
Cloudflare recommends that you always leave **Cloudflare Specials** enabled. Additionally, only enable rule groups that correspond to your technology stack. For example, if you use WordPress, enable the **Cloudflare WordPress** group.
{{</Aside>}}

When viewing a ruleset, Cloudflare shows default actions for each rule listed under **Default mode**. The **Mode** available for individual rules within a specific **Cloudflare Managed Ruleset** are:

- **Default**: Takes the default action listed under **Default mode** when viewing a specific rule.
- **Disable**: Turns off the specific rule within the group.
- **Block**: Discards the request. 
- **Interactive Challenge**: The visitor receives a challenge page that requires interaction.
- **Simulate**: The request is allowed through but is logged in the [**Activity log**](/waf/security-events/paid-plans/#activity-log).

Cloudflare’s [WAF changelog](/waf/change-log/) allows customers to monitor ongoing changes to the Cloudflare Managed Ruleset.

___

## OWASP ModSecurity Core Rule Set

The OWASP ModSecurity Core Rule Set package assigns a score to each request based on how many OWASP rules trigger. Some OWASP rules have a higher sensitivity score than others.

After OWASP evaluates a request, Cloudflare compares the final score to the **Sensitivity** configured for the zone.  If the score exceeds the sensitivity, the request is actioned based on the **Action** configured within **Package: OWASP ModSecurity Core Rule Set**:

- **Block**: The request is discarded.
- **Challenge**: The visitor receives an interactive challenge page.
- **Simulate**: The request is allowed through but is logged in the [**Activity log**](/waf/security-events/paid-plans/#activity-log).

The sensitivity score required to trigger the WAF for a specific **Sensitivity** is as follows:

- **Low**: 60 and higher
- **Medium**: 40 and higher
- **High**: 25 and higher

For AJAX requests, the following scores are applied instead:

- **Low**: 120 and higher
- **Medium**: 80 and higher
- **High**: 65 and higher

Review the [Activity log](/waf/security-events/paid-plans/#activity-log) for the final score and for the individual triggered rules.

### Control the OWASP package

The OWASP ModSecurity Core Rule Set package contains several rules from the [OWASP project](https://www.owasp.org/index.php/Category:OWASP_ModSecurity_Core_Rule_Set_Project). Cloudflare does not write or curate OWASP rules. Unlike the Cloudflare Managed Ruleset, specific OWASP rules are either turned _On_ or _Off._

To manage OWASP thresholds, set the **Sensitivity** to _Low_, _Medium_, or _High_ under **Package: OWASP ModSecurity Core Rule Set**.

Setting the **Sensitivity** to _Off_ will disable the entire OWASP package including all its rules. Determining the appropriate **Sensitivity** depends on your business industry and operations. For instance, a _Low_ setting is appropriate for:

- Certain business industries more likely to trigger the WAF.
- Large file uploads. 

With a high sensitivity, large file uploads will trigger the WAF.

Cloudflare recommends initially setting the sensitivity to _Low_ and reviewing for false positives before further increasing the sensitivity.

{{<Aside type="note">}}
The Activity log displays rule ID `981176` when a request is blocked by OWASP. Also, some OWASP rules listed in the
Activity log do not appear in the OWASP list of rules because disabling those rules is not recommended.
{{</Aside>}}

---

## Important remarks

- Managed rules introduce a limited amount of latency. 
- Changes to WAF managed rules take about 30 seconds to update globally.
- Cloudflare uses proprietary rules to filter traffic. 
- Established Websockets do not trigger managed rules for subsequent requests.
- Managed rules parse JSON responses to identify vulnerabilities targeted at APIs. JSON payload parsing is limited to 128 KB.
- Managed rules mitigate padding techniques. Cloudflare recommends the following:

    1. Turn on rule with ID `100048`. This rule protects against padding type attacks, but it is not deployed by default because there is a high probability of causing false positives in customer environments. It is, however, important that customers tune their managed rules configuration.

    2.  Create a WAF custom rule using the [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) depending on the need to check headers and/or body to block larger payloads (> 128 KB). Use the following fields for this purpose:

        - `http.request.body.truncated`
        - `http.request.headers.truncated`

        You should test your rule in _Log_ mode first (if available), since the rule might generate false positives.

-   There are a handful of managed rules that Cloudflare does not disable even if you turn off **Managed rules** in the Cloudflare dashboard, such as rules with IDs `WP0025B`, `100043A`, and `100030`.

___

## Related resources

- [Troubleshoot WAF managed rules (previous version)](/waf/reference/legacy/old-waf-managed-rules/troubleshooting/)
- [Security Events](/waf/security-events/)
- [Cloudflare WAF](/waf/)
- [Cloudflare’s WAF changelog](/waf/change-log/)
- [WAF custom rules](/waf/custom-rules/)
