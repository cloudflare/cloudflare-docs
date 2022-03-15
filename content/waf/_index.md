---
title: Overview
pcx-content-type: overview
weight: 2
meta:
  title: Cloudflare Web Application Firewall
---

# Cloudflare Web Application Firewall

The Cloudflare Web Application Firewall (WAF) provides both automatic protection from vulnerabilities and the flexibility to create custom rules.

{{<button-group>}}
  {{<button type="primary" href="/waf/about/">}}Learn more{{</button>}}
  {{<button type="secondary" href="/waf/managed-rulesets/">}}WAF Managed Rulesets{{</button>}}
  {{<button type="secondary" href="/waf/change-log/">}}Managed Rulesets change log{{</button>}}
{{</button-group>}}

***

## Main features

*   **Custom rules**: Create your own Custom rules to protect your website and your APIs from malicious incoming traffic.
*   **Rate limiting rules**: Define rate limits for incoming requests matching an expression, and the action to take when those rate limits are reached.
*   **WAF Managed Rulesets**: Enable the pre-configured Managed Rulesets to get immediate protection. These rulesets are regularly updated, offering advanced zero-day vulnerability protections. Adjust the behavior of managed rules, choosing from several possible actions.
*   **Exposed Credential Checks**: Monitor and block use of stolen/exposed credentials for account takeover.
*   **Firewall Analytics**: Identify and investigate security threats using an intuitive interface. Tailor your security configurations based on the activity log.

## Availability

The new Cloudflare WAF announced in March 2021 is available for select customers on paid plans. The exact features and limits depend on your current plan. Rate limiting is a paid add-on on all plans.

## Related resources

For more information on the previous WAF implementation, also known as Managed Rules, refer to [Understanding the Cloudflare Web Application Firewall (WAF)](https://support.cloudflare.com/hc/articles/200172016) in the Support KB.

For more information on firewall rules, refer to [Cloudflare Firewall Rules](/firewall/).
