---
title: Concepts
pcx_content_type: concept
weight: 3
---

# Concepts

{{<render file="_waf-intro.md">}}

{{<Aside type="note" header="What is a Web Application Firewall?">}}
A Web Application Firewall or WAF creates a shield between a web app and the Internet. This shield can help mitigate many common attacks. For a more thorough definition, refer to [Web Application Firewall explained](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/) in the Learning Center.
{{</Aside>}}

## Rules and rulesets

A [rule](/ruleset-engine/about/rules/) defines a filter and an action to perform on the incoming requests that match the filter.

A [ruleset](/ruleset-engine/about/rulesets/) is an ordered set of rules that you can apply to traffic on the Cloudflare global network.

## Main components

The Cloudflare WAF includes:

- [Managed Rules](/waf/managed-rules/) (for example, the [Cloudflare Managed Ruleset](/waf/managed-rules/reference/cloudflare-managed-ruleset/)), which are signature-based rules created by Cloudflare that provide immediate protection against known attacks.
- [Traffic detections](#available-traffic-detections) (for example, bot score and attack score) that enrich requests with metadata.
- User-defined rules for your specific needs, including [custom rules](/waf/custom-rules/) and {{<glossary-tooltip term_id="rate limiting" link="/waf/rate-limiting-rules/">}}rate limiting rules{{</glossary-tooltip>}}.

## Detection versus mitigation

The two main roles of the Cloudflare WAF are the following:

- **Detection**: Run incoming requests through one or more [traffic detections](#available-traffic-detections) to find malicious or potentially malicious activity. The scores from enabled detections are available in the [Security Analytics](/waf/analytics/security-analytics/) dashboard, where you can analyze your security posture and determine the most appropriate mitigation rules.

- **Mitigation**: Blocks, challenges, or throttles requests through different [mitigation features](#waf-mitigation-features) such as custom rules, WAF Managed Rules, and rate limiting rules. Rules that mitigate traffic can include scores from traffic scans in their expressions to better address possibly malicious requests.

{{<Aside type="warning" header="Warning">}}
Enabling traffic detections will not apply any mitigation measures to incoming traffic; detections only provide signals that you can use to define your attack mitigation strategy.
{{</Aside>}}

### Available traffic detections

The WAF currently provides the following detections for finding security threats in incoming requests:

- [**Bots**](/bots/reference/bot-management-variables/#ruleset-engine-fields): Scores traffic on a scale from 1 (likely to be a bot) to 99 (likely to be human).
- [**Attacks**](/waf/about/waf-attack-score/): Checks for known attack variations and malicious payloads. Scores traffic on a scale from 1 (likely to be malicious) to 99 (unlikely to be malicious).
- [**Malicious uploads**](/waf/about/content-scanning/): Scans content objects, such as uploaded files, for malicious signatures like malware.

To enable traffic detections in the Cloudflare dashboard, go to your domain > **Security** > **Settings**.

{{<Aside type="note" header="Note">}}
Currently, you cannot manage the [Bots](/bots/reference/bot-management-variables/#ruleset-engine-fields) and [Attacks](/waf/about/waf-attack-score/) detections from the **Security** > **Settings** page. Refer to the documentation of each feature for availability details.
{{</Aside>}}

### WAF mitigation features

The WAF provides the following mitigation features for traffic posing as a security threat:

- [**Custom rules**](/waf/custom-rules/): Allow you to control incoming traffic by filtering requests to a zone. You can perform actions like Block or Managed Challenge on incoming requests according to rules you define.
- [**Rate limiting rules**](/waf/rate-limiting-rules/): Allow you to define rate limits for requests matching an expression, and the action to perform when those rate limits are reached.
- [**Managed rules**](/waf/managed-rules/): Allow you to deploy pre-configured managed rulesets that provide immediate protection against common attacks.

To configure these mitigation features in the Cloudflare dashboard, go to your domain > **Security** > **WAF**.

---

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

1. [Firewall rules](/firewall/cf-firewall-rules/) (deprecated)
2. [Custom rulesets](/waf/custom-rules/custom-rulesets/)
3. [Custom rules](/waf/custom-rules/)
4. [Rate limiting rules](/waf/rate-limiting-rules/)
5. [WAF Managed Rules](/waf/managed-rules/)
6. [Cloudflare Rate Limiting](/waf/reference/legacy/old-rate-limiting/) (previous version, deprecated)

For more information on the Ruleset Engine phases where each WAF feature will execute, refer to [WAF phases](/waf/reference/phases/).