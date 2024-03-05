---
title: Concepts
pcx_content_type: concept
weight: 2
---

# Concepts

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web requests and filters undesired traffic based on sets of rules called rulesets. The matching engine that powers the WAF rules supports the wirefilter syntax using the [Rules language](/ruleset-engine/rules-language/).

{{<Aside type="note" header="What is a Web Application Firewall?">}}

A Web Application Firewall or WAF creates a shield between a web app and the Internet. This shield can help mitigate many common attacks. For a more thorough definition, refer to [Web Application Firewall explained](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/) in the Learning Center.

{{</Aside>}}

---

## Rules and rulesets

Refer to the [Ruleset Engine](/ruleset-engine/about/rules/) documentation for more information on the following concepts:

* [Rule](/ruleset-engine/about/rules/): Defines a filter and an action to perform on the incoming requests that match the filter.
* [Ruleset](/ruleset-engine/about/rulesets/): An ordered set of rules that you can apply to traffic on the Cloudflare global network.

## WAF Managed Rules

WAF Managed Rules allows you to deploy [managed rulesets](/waf/managed-rules/) preconfigured by Cloudflare, and adjust their rules' behavior if necessary.

When you enable these managed rulesets, you get immediate protection from a broad set of security rules that are regularly updated. Each of these rules has a default action that varies according to the severity of the rule.

Rules of managed rulesets have associated **tags** that allow you to search for a specific group of rules and configure them in bulk.

To customize the behavior of managed rulesets, do one of the following:

- [Create exceptions](/waf/managed-rules/waf-exceptions/) to skip the execution of WAF managed rulesets or some of their rules under certain conditions.
- [Configure overrides](/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset) to override the default rule action or disable one or more rules of managed rulesets. Overrides can affect an entire managed ruleset, specific tags, or specific rules in the managed ruleset.

Exceptions have priority over overrides.

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

1. [Firewall rules](/firewall/cf-firewall-rules/) (deprecated)
2. [Custom rulesets](/waf/custom-rules/custom-rulesets/)
3. [Custom rules](/waf/custom-rules/)
4. [Rate limiting rules](/waf/rate-limiting-rules/)
5. [WAF Managed Rules](/waf/managed-rules/)
6. [Cloudflare Rate Limiting](/waf/reference/legacy/old-rate-limiting/) (previous version, deprecated)

For more information on the Ruleset Engine phases where each WAF feature will execute, refer to [WAF phases](/waf/reference/phases/).