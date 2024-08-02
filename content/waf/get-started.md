---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web and API requests and filters undesired traffic based on sets of rules called rulesets.

This page will guide you through the recommended initial steps for configuring the WAF to get immediate protection against the most common attacks.

Refer to [Concepts](/waf/about/) for more information on WAF concepts, main components, and roles.

{{<Aside type="note">}}
This guide focuses on configuring WAF for individual domains, known as {{<glossary-tooltip term_id="zone">}}zones{{</glossary-tooltip>}}. The WAF configuration is also available at the account level for Enterprise customers with a paid add-on.
{{</Aside>}}

{{<tutorial>}}

{{<tutorial-prereqs>}}

- Make sure that you have [set up a Cloudflare account](/fundamentals/setup/account/) and [added your domain](/fundamentals/setup/manage-domains/add-site/) to Cloudflare.

- Users on the Free plan have access to the Cloudflare Free Managed Ruleset, a subset of the Cloudflare Managed Ruleset. The Free Managed Ruleset is deployed by default on Free plans and is not specifically covered in this guide.<br>If you are on a Free plan, you may skip to [5. Review traffic in security dashboards](#review-traffic-in-security-dashboards).

{{</tutorial-prereqs>}}

{{<tutorial-step title="Deploy the Cloudflare Managed Ruleset">}}

The [Cloudflare Managed Ruleset](/waf/managed-rules/reference/cloudflare-managed-ruleset/) protects against Common Vulnerabilities and Exposures (CVEs) and known attack vectors. This ruleset is designed to identify common attacks using signatures, while generating low false positives. Rule changes are published on a weekly basis in the [WAF changelog](/waf/change-log/). Cloudflare may also add rules at any time during emergency releases for high profile zero-day protection.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** and select the **Managed rules** tab.
3. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare Managed Ruleset.

{{<details header="Default settings and ruleset customization">}}

By default, the Cloudflare Managed Ruleset enables only a subset of rules and it is designed to strike a balance between protection and false positives. You can review and enable additional rules based on your application technology stack.

In particular situations, enabling the managed ruleset can cause some false positives. False positives are legitimate requests inadvertently mitigated by the WAF. For information on addressing false positives, refer to [Handle false positives](/waf/managed-rules/handle-false-positives/).

If you are testing the WAF against pentesting tools, it is recommended that you enable all rules by using the following ruleset configuration:

- **Ruleset action**: _Block_
- **Ruleset status**: _Enabled_ (enables all rules in the ruleset)

For more information on configuring the Cloudflare Managed Ruleset in the dashboard, refer to [Configure field values for all the rules](/waf/managed-rules/deploy-zone-dashboard/#configure-field-values-for-all-the-rules).

{{</details>}}

{{</tutorial-step>}}

{{<tutorial-step title="Create custom rule based on WAF attack score">}}

{{<Aside type="note">}}
WAF attack score is only available to Business customers (limited access to a single field) and Enterprise customers (full access).
{{</Aside>}}

[WAF attack score](/waf/about/waf-attack-score/) is a machine-learning layer that complements Cloudflare's managed rulesets, providing additional protection against SQL injection (SQLi), Cross-site scripting (XSS), and many remote code execution (RCE) attacks. It helps identify rule bypasses and potentially new, undiscovered attacks.

If you are an Enterprise customer, do the following:

1. Reach out to your account team to get access to WAF attack score.

2. [Create a custom rule](/waf/custom-rules/create-dashboard/) using the {{<glossary-tooltip term_id="attack score">}}Attack Score{{</glossary-tooltip>}} field:

    1. Go to your domain > **Security** > **WAF** and select the **Custom rules** tab.
    2. Create a rule with the following configuration:

	      - **If incoming requests match**:

            | Field        | Operator  | Value |
            |--------------|-----------|-------|
            | Attack Score | less than | `20`  |

        - **Choose action**: Block

If you are on a Business plan, create a custom rule as mentioned above but use the [WAF Attack Score Class](/waf/about/waf-attack-score/#available-scores) field instead. For example, you could use the following rule expression: `WAF Attack Score Class equals Attack`.

{{</tutorial-step>}}

{{<tutorial-step title="Create custom rule based on bot score">}}

{{<Aside type="note">}}
Bot score is only available to Enterprise customers with Bot Management. Customers on Pro and Business plans may enable [Super Bot Fight mode](/bots/get-started/pro/) instead.
{{</Aside>}}

Customers with access to [Bot Management](/bots/get-started/bm-subscription/) can block automated traffic (for example, from bots scraping online content) using a custom rule with bot score, preventing this traffic from hitting your application.

1. Go to your domain > **Security** > **WAF** and select the **Custom rules** tab.

2. [Create a custom rule](/waf/custom-rules/create-dashboard/) using the {{<glossary-tooltip term_id="bot score">}}Bot Score{{</glossary-tooltip>}} and {{<glossary-tooltip term_id="verified bot">}}Verified Bot{{</glossary-tooltip>}} fields:

    - **If incoming requests match**:

        | Field        | Operator  | Value | Logic |
        |--------------|-----------|-------|-------|
        | Bot Score    | less than | `20`  | And   |
        | Verified Bot | equals    | Off   |       |

    - **Choose action**: Managed Challenge

For a more comprehensive example of a baseline protection against malicious bots, refer to [Challenge bad bots](/waf/custom-rules/use-cases/challenge-bad-bots/#general-protection).

For more information about the bot-related fields you can use in expressions, refer to [Bot Management variables](/bots/reference/bot-management-variables/).

Once you have deployed the Cloudflare Managed Ruleset and rules based on attack score and bot score you will have achieved substantial protection, limiting the chance of false positives.

{{</tutorial-step>}}

{{<tutorial-step title="Deploy the Cloudflare OWASP Core Ruleset" optional="true">}}

After configuring the Cloudflare Managed Ruleset and attack score, you can also deploy the [Cloudflare OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/). This managed ruleset is Cloudflare's implementation of the OWASP ModSecurity Core Rule Set. Its attack coverage significantly overlaps with Cloudflare Managed Ruleset by detecting common attack vectors such as SQLi and XSS.

{{<Aside type="warning" header="Warning">}}
The Cloudflare OWASP Core Ruleset is prone to false positives and offers only marginal benefits when added on top of Cloudflare Managed Ruleset and WAF attack score. If you decide to deploy this managed ruleset, you will need to monitor and adjust its settings based on your traffic to prevent false positives.
{{</Aside>}}

1. Go to your domain > **Security** > **WAF** and select the **Managed rules** tab.
2. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare OWASP Core Ruleset.<br>
This will deploy the ruleset with the default configuration: paranoia level = _PL1_ and score threshold = _Medium - 40 and higher_.

{{<details header="Ruleset configuration">}}

Unlike the signature-based Cloudflare Managed Ruleset, the Cloudflare OWASP Core Ruleset is score-based. You select a certain paranoia level (levels vary from _PL1_ to _PL4_, where _PL1_ is the lowest level), which enables an increasing larger group of rules. You also select a score threshold, which decides when to perform the configured action. Low paranoia with a high score threshold usually leads to fewer false positives. For an example of how the OWASP Core Ruleset is evaluated, refer to [OWASP evaluation example](/waf/managed-rules/reference/owasp-core-ruleset/example/).

Follow one of these strategies to configure the ruleset according to your needs:

- Start from a strict configuration (paranoia level = _PL4_, score threshold = _Low - 60 and higher_). Reduce the score threshold and paranoia level until you achieve a good false positives/true positives rate for your incoming traffic.
- Alternatively, start from a more permissive configuration (paranoia level = _PL1_, score threshold = _High - 25 and higher_) and increase both parameters to adjust your protection, trying to keep a low number of false positives.

For more information on configuring the Cloudflare OWASP Core Ruleset in the dashboard, refer to [Configure field values for all the rules](/waf/managed-rules/deploy-zone-dashboard/#configure-field-values-for-all-the-rules).

{{</details>}}

{{</tutorial-step>}}

{{<tutorial-step title="Review traffic in security dashboards">}}

{{<Aside type="note">}}
Users on the Free plan only have access to Security Events.
{{</Aside>}}

After setting up your WAF configuration, review how incoming traffic is being affected by your current settings using the following dashboards:

- Use [Security Analytics](/waf/analytics/security-analytics/) to explore all traffic, including traffic not affected by WAF mitigation measures. All data provided by [traffic detections](/waf/about/#available-traffic-detections) is available in this dashboard.
- Use [Security Events](/waf/analytics/security-events/) to get more information about requests that are being mitigated by Cloudflare security products.

Enterprise customers can also obtain data about HTTP requests and security events using [Cloudflare Logs](/logs/).

{{</tutorial-step>}}

{{<tutorial-step title="Next steps" optional="true">}}

After configuring the WAF based on the information in the previous sections, you should have a strong base protection against possible threats to your applications.

You can explore the following recommendations to get additional protection for specific use cases.

### Allowlist certain IP addresses

Create a custom rule to [allow traffic from IP addresses in allowlist only](/waf/custom-rules/use-cases/allow-traffic-from-ips-in-allowlist/).

### Block specific countries

Create a custom rule to [block traffic from specific countries](/waf/custom-rules/use-cases/block-traffic-from-specific-countries/).

### Define rate limits

Create a rate limiting rule to [apply rate limiting on a login endpoint](/waf/rate-limiting-rules/use-cases/#example-1).

### Prevent credential stuffing attacks

Use [leaked credential checks](/waf/managed-rules/check-for-exposed-credentials/) to prevent {{<glossary-tooltip term_id="credential stuffing">}}credential stuffing{{</glossary-tooltip>}} attacks on your applications.

### Prevent users from uploading malware into your applications

{{<Aside type="note">}}
Available to Enterprise customers with a paid add-on.
{{</Aside>}}

[Use WAF content scanning](/waf/about/content-scanning/get-started/) to scan content being uploaded to your application, searching for malicious content.

### Get additional security for your APIs

{{<Aside type="note">}}
Available to Enterprise customers.
{{</Aside>}}

The Cloudflare WAF protects your APIs from new and known application attacks and exploits such as SQL injection attacks. API-specific security products extend those protections to the unique risks in APIs such as API discovery and authentication management.

For more information on Cloudflare's API security features, refer to [Cloudflare API Shield](/api-shield/).

{{</tutorial-step>}}

{{</tutorial>}}