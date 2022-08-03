---
title: Concepts
pcx_content_type: concept
weight: 2
layout: single
meta:
  title: Concepts
---

# Concepts

The Cloudflare Web Application Firewall (Cloudflare WAF) checks incoming web requests and filters undesired traffic based on sets of rules called rulesets. The matching engine that powers the WAF rules supports the wirefilter syntax using the [Rules language](/ruleset-engine/rules-language/).

{{<Aside type="note" header="What is a Web Application Firewall?">}}

A Web Application Firewall or WAF creates a shield between a web app and the Internet. This shield can help mitigate many common attacks. For a more thorough definition, refer to [Web Application Firewall explained](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/) in the Learning Center.

{{</Aside>}}

---

## Managed Rulesets

The Cloudflare WAF includes [several Managed Rulesets](/waf/managed-rulesets/), provided by Cloudflare, that you can enable and configure.

When you enable these Managed Rulesets, you get immediate protection from a broad set of security rules that are regularly updated. Each of these rules has a default action that varies according to the severity of the rule.

You can override the default action or disable one or more rules included in Managed Rulesets. To customize the rules behavior you define specific **configurations** or **overrides**.

You can define a configuration that affects an entire Managed Ruleset, or configure the action and status of one or more rules in the ruleset. Rules have associated **tags** that allow you to search for a specific group of rules and configure them in bulk.

## Rule execution order

Cloudflare evaluates different types of rules when processing incoming requests. The rule execution order is the following:

* [Firewall rules](/firewall/cf-firewall-rules/), available in **Security** > **WAF** > **Firewall rules**
* [Custom rules](/waf/custom-rules/), available in **Security** > **WAF** > **Custom rules**
* [Rate limiting rules](/waf/rate-limiting-rules/), available in **Security** > **WAF** > **Rate limiting rules**
* [Managed Rulesets](/waf/managed-rulesets/), available in **Security** > **WAF** > **Managed rules**
* [Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) (previous version), available in **Security** > **WAF** > **Rate limiting rules**
