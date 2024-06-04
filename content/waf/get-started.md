---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web and API requests and filters undesired traffic based on sets of rules called rulesets.

This page will guide you through some basic concepts and the recommended initial steps for configuring the WAF to get immediate protection against the most common attacks.

This guide focuses on configuring WAF for individual domains, known as {{<glossary-tooltip term_id="zone">}}zones{{</glossary-tooltip>}}. The WAF configuration is also available at the account level for Enterprise customers with a paid add-on.

## Basic WAF concepts

A [rule](/ruleset-engine/about/rules/) includes a filter (which defines the scope) and an action to perform on the incoming requests that match the filter.

The Cloudflare WAF includes:
- Signature-based rules (for example, the [Cloudflare Managed Ruleset](/waf/managed-rules/reference/cloudflare-managed-ruleset/)) created by Cloudflare that provide immediate protection against known attacks.
- [Traffic detections](/waf/about/#available-traffic-detections) (for example, bot score and attack score) that enrich requests with metadata.
- User-defined rules for your specific needs, including [custom rules](/waf/custom-rules/) and {{<glossary-tooltip term_id="rate limiting" link="/waf/rate-limiting-rules/">}}rate limiting rules{{</glossary-tooltip>}}.

Detections do not take any action on incoming traffic – they only add relevant information about each request that you can use in the rules you create. For more information on the detection and mitigation roles of the WAF, refer to [Detection versus mitigation](/waf/about/#detection-versus-mitigation).

When defining the filter expression of a custom rule or a rate limiting rule you can use all the HTTP request properties. These properties are called [fields](/ruleset-engine/rules-language/fields/).

Once you proxy your traffic through Cloudflare, after some time you will have traffic information available in the [Security Analytics](/waf/analytics/security-analytics/) and [Security Events](/waf/analytics/security-events/paid-plans/) dashboards.

---

## Before you begin

- Make sure that you have [set up a Cloudflare account](/fundamentals/setup/account/) and [added your domain](/fundamentals/setup/manage-domains/add-site/) to Cloudflare.

- Users on the Free plan have access to the Cloudflare Free Managed Ruleset, a subset of the Cloudflare Managed Ruleset. The Free Managed Ruleset is deployed by default on Free plans and is not specifically covered in this guide.<br>If you are on a Free plan, you may skip to [5. Review traffic in security dashboards](#5-review-traffic-in-security-dashboards).

## 1. Deploy the Cloudflare Managed Ruleset

The [Cloudflare Managed Ruleset](/waf/managed-rules/reference/cloudflare-managed-ruleset/) protects against CVEs and known attack vectors. This ruleset is designed to identify common attacks using signatures, while generating low false positives. Rule changes are published on a weekly basis in the [WAF changelog](/waf/change-log/). Cloudflare may also add rules at any time during emergency releases for high profile zero-day protection.

To deploy the Cloudflare Managed Ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** and select the **Managed rules** tab.
3. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare Managed Ruleset.

In particular situations, enabling the managed ruleset can cause some false positives. False positives are legitimate requests inadvertently mitigated by the WAF. For information on addressing false positives, refer to [Handle false positives](/waf/managed-rules/handle-false-positives/).

{{<details header="Default settings and ruleset customization">}}

By default, the Cloudflare Managed Ruleset enables only a subset of rules and it is designed to strike a balance between protection and false positives. You can review and enable additional rules based on your application technology stack.

If you are testing the WAF against pentesting tools, it is recommended that you enable all rules by using the following ruleset configuration:

- **Ruleset action**: _Block_
- **Ruleset status**: _Enabled_ (enables all rules in the ruleset)

For more information on configuring the Cloudflare Managed Ruleset in the dashboard, refer to [Configure field values for all the rules](/waf/managed-rules/deploy-zone-dashboard/#configure-field-values-for-all-the-rules).

{{</details>}}

## 2. Create custom rule based on WAF attack score

{{<Aside type="note">}}
This feature is only available to Business customers (limited access to a single field) and Enterprise customers (full access).
{{</Aside>}}

[WAF attack score](/waf/about/waf-attack-score/) is a machine-learning layer that complements Cloudflare's managed rulesets, providing additional protection against SQL injection (SQLi), Cross-site scripting (XSS), and many remote code execution (RCE) attacks. It helps identify rule bypasses and potentially new, undiscovered attacks.

The [WAF Attack Score field](/waf/about/waf-attack-score/#available-scores), available to Enterprise customers, represents the likelihood that a request is an attack. An attack score of 1 indicates that the request is almost certainly malicious, while a score of 99 indicates that the request is likely clean.

If you are an Enterprise customer, do the following:

1. Reach out to your account team to get access to WAF attack score.
2. Create a custom rule using WAF attack score:

    1. Go to your domain > **Security** > **WAF** and select the **Custom rules** tab.
    2. Create a rule with the following configuration:

	      - **Expression**: `Attack Score less than 20`
        - **Action**: _Block_

If you are on a Business plan, create a custom rule as mentioned above but use the [WAF Attack Score Class](/waf/about/waf-attack-score/#available-scores) field instead. For example, you could use the following rule expression: `WAF Attack Score Class equals Attack`.

## 3. Create custom rule based on bot score

{{<Aside type="note">}}
Bot score is only available to Enterprise customers with Bot Management. Customers on Pro and Business plans may enable [Super Bot Fight mode](/bots/get-started/pro/) instead.
{{</Aside>}}

Customers with access to [Bot Management](/bots/get-started/bm-subscription/) can block automated traffic (for example, from bots scraping online content) using a custom rule with bot score, preventing this traffic from hitting your application. Bot score varies from 1 to 99 and indicates how likely a request came from a bot. Scores below 30 are commonly associated with bot traffic.

To create a custom rule using bot score:

1. Go to your domain > **Security** > **WAF** and select the **Custom rules** tab.
2. Create a rule with the following configuration:

    - **Expression**: `Bot Score less than 20 AND Verified Bot equals Off`
    - **Action**: _Block_

For more information about the bot-related fields you can use in expressions, refer to [Bot Management variables](/bots/reference/bot-management-variables/).

Once you have deployed the Cloudflare Managed Ruleset and a rule based on the attack score you will have achieved substantial protection, limiting the chance of false positives.

## 4. (Optional) Deploy the Cloudflare OWASP Core Ruleset

After configuring the Cloudflare Managed Ruleset and attack score, you can also deploy the [Cloudflare OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/). This managed ruleset is Cloudflare's implementation of the OWASP ModSecurity Core Rule Set and its attack coverage significantly overlaps with Cloudflare Managed Ruleset by detecting common attack vectors such as SQLi and XSS.

{{<Aside type="warning" header="Warning">}}
The Cloudflare OWASP Core Ruleset is prone to false positives and offers only marginal benefits when added on top of Cloudflare Managed Ruleset and WAF attack score. If you decide to deploy this managed ruleset, you will need to monitor and adjust its settings based on your traffic to prevent false positives.
{{</Aside>}}

Unlike the signature-based Cloudflare Managed Ruleset, the Cloudflare OWASP Core Ruleset is score-based. You select a certain paranoia level (levels vary from _PL1_ to _PL4_), which enables an increasing larger group of rules. You also select a score threshold, which decides when to perform the configured action. Low paranoia with a high score threshold usually leads to fewer false positives. For an example of how the OWASP Core Ruleset is evaluated, refer to [OWASP evaluation example](/waf/managed-rules/reference/owasp-core-ruleset/example/).

To deploy the OWASP Core Ruleset:

1. Go to your domain > **Security** > **WAF** and select the **Managed rules** tab.

2. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare OWASP Core Ruleset.<br>
This will deploy the ruleset with the default configuration: paranoia level = _PL1_ and score threshold = _Medium - 40 and higher_. Cloudflare recommends that you deploy the OWASP Core Ruleset after the Cloudflare Managed Ruleset.

3. (Optional) Follow one of these strategies to configure the ruleset according to your needs:

    - Start from a strict configuration (paranoia level = _PL4_, score threshold = _Low - 60 and higher_). Reduce the score threshold and paranoia level until you achieve a good false positives/true positives rate for your incoming traffic.
    - Alternatively, start from a more permissive configuration (paranoia level = _PL1_, score threshold = _High - 25 and higher_) and increase both parameters to adjust your protection, trying to keep a low number of false positives.

For more information on configuring the Cloudflare OWASP Core Ruleset in the dashboard, refer to [Configure field values for all the rules](/waf/managed-rules/deploy-zone-dashboard/#configure-field-values-for-all-the-rules).

## 5. Review traffic in security dashboards

{{<Aside type="note">}}
Users on the Free plan only have access to Security Events.
{{</Aside>}}

After setting up your WAF configuration, review how incoming traffic is being affected by your current settings using the Security Analytics and Security Events dashboards.

Use [Security Analytics](/waf/analytics/security-analytics/) to explore all traffic, including traffic not affected by WAF mitigation measures. Since all data provided by WAF detections is available in this dashboard, you can use it to:
- Adjust your current configuration — for example, update thresholds in expressions that use WAF attack score and bot score.
- Review traffic that you would like to mitigate and create a new custom rule from applied fields.
- Review the request rate for traffic matching the selected filters and time period to [find an appropriate rate limit](/waf/rate-limiting-rules/find-rate-limit/), creating a rate limiting rule based on your findings.

Use [Security Events](/waf/analytics/security-events/) to get more information about requests that are being mitigated by Cloudflare security products. This dashboard shows top events by source and the activity log, with requests handled by the WAF during the selected time period. You can also create custom rules based on selected filters.

Enterprise customers can also obtain data about HTTP requests and security events using [Cloudflare Logs](/logs/).

---

## Next steps

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

The Cloudflare Exposed Credentials Check Ruleset contains predefined rules for popular CMS applications. By enabling this ruleset for a given zone, you immediately enable checks for {{<glossary-tooltip term_id="exposed credentials">}}exposed credentials{{</glossary-tooltip>}} for these well-known applications.

The default action of rules in this managed ruleset is to add a new HTTP header to any HTTP requests with exposed credentials, which you will receive at your origin server. You can change this action to a more severe one such as _Managed Challenge_ or _Block_.

Follow these recommended steps to start checking for leaked credentials:

1. Go to your domain > **Security** > **WAF** and select the **Managed rules** tab.
2. Under **Managed Rulesets**, select **Deploy** next to the Cloudflare Exposed Credentials Check Ruleset.
3. Test your configuration by entering special [test credentials](/waf/managed-rules/check-for-exposed-credentials/test-configuration/) in your application:

    {{<render file="_exposed-creds-test-credentials.md">}}

4. After a few minutes, check the activity log in the [Security Events](/waf/analytics/security-events/) dashboard, searching for entries corresponding to requests with exposed credentials.
5. (Optional, API only) If you have access to account-level WAF, you can [create a custom rule checking for exposed credentials](/waf/managed-rules/check-for-exposed-credentials/configure-api/#create-a-custom-rule-checking-for-exposed-credentials) in custom locations of incoming requests, specific to your application.

### Prevent users from uploading malware into your applications

{{<Aside type="note">}}
Available to Enterprise customers with a paid add-on.
{{</Aside>}}

[WAF content scanning](/waf/about/content-scanning/) is a WAF [traffic detection](/waf/about/#detection-versus-mitigation) that scans content being uploaded to your application searching for malicious content.

Follow these recommended steps to start using WAF content scanning:

1. Go to your domain > **Security** > **Settings**.
2. Under **Incoming traffic detections**, turn on **Malicious uploads**.
3. Use [Security Analytics](/waf/analytics/security-analytics/) and HTTP logs to validate that malicious content objects are being detected correctly. At this point no mitigation action is being taken on requests with content objects considered malicious.
4. Create a custom rule using [content scanning fields](/waf/about/content-scanning/#content-scanning-fields) to handle requests with malicious content objects. Refer to [Example rules](/waf/about/content-scanning/example-rules/) for a few examples.

### Get additional security for your APIs

{{<Aside type="note">}}
Available to Enterprise customers.
{{</Aside>}}

The Cloudflare WAF protects your APIs from new and known application attacks and exploits such as SQL injection attacks. API-specific security products extend those protections to the unique risks in APIs such as API discovery and authentication management.

For more information on Cloudflare's API security features, refer to [Cloudflare API Shield](/api-shield/).
