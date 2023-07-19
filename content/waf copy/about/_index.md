---
title: Concepts
pcx_content_type: concept
weight: 2
layout: single
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

You can override the default action or disable one or more rules included in managed rulesets. To customize the rules behavior you define specific **configurations** or **overrides**.

You can define a configuration that affects an entire managed ruleset, or configure the action and status of one or more rules in the ruleset. Rules have associated **tags** that allow you to search for a specific group of rules and configure them in bulk.

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

1. [Firewall rules](/firewall/cf-firewall-rules/)
2. [Custom rulesets](/waf/custom-rulesets/)
3. [Custom rules](/waf/custom-rules/)
4. [Rate limiting rules](/waf/rate-limiting-rules/)
5. [WAF Managed Rules](/waf/managed-rules/)
6. [Rate Limiting (previous version)](/waf/reference/legacy/old-rate-limiting/)

For more information on the Ruleset Engine phases where each WAF feature will execute, refer to [WAF phases](/waf/reference/phases/).