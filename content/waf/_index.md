---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Cloudflare Web Application Firewall
  description: The Cloudflare Web Application Firewall (WAF) provides automatic protection from vulnerabilities and the flexibility to create custom rules.
---

# Cloudflare Web Application Firewall

{{<description>}}
Get automatic protection from vulnerabilities and the flexibility to create custom rules.
{{</description>}}

{{<plan type="all">}}

{{<render file="_waf-intro.md">}}
<br />

Learn how to [get started](/waf/get-started/).

---

## Features

{{<feature header="Custom rules" href="/waf/custom-rules/">}}
Create your own custom rules to protect your website and your APIs from malicious incoming traffic. Use advanced features like [WAF attack score](/waf/about/waf-attack-score/) and [uploaded content scanning](/waf/about/content-scanning/) in your custom rules.
{{</feature>}}

{{<feature header="Rate limiting rules" href="/waf/rate-limiting-rules/">}}
Define rate limits for incoming requests matching an expression, and the action to take when those rate limits are reached.
{{</feature>}}

{{<feature header="Managed rules" href="/waf/managed-rules/">}}
Enable the pre-configured managed rulesets to get immediate protection. These rulesets are [regularly updated](/waf/change-log/), offering advanced zero-day vulnerability protections, and you can adjust their behavior.
{{</feature>}}

{{<feature header="Security Events" href="/waf/analytics/security-events/" cta="Explore Security Events">}}
Review mitigated requests (rule matches) using an intuitive interface. Tailor your security configurations based on the activity log.
{{</feature>}}

{{<feature header="Security Analytics" href="/waf/analytics/security-analytics/" cta="Explore Security Analytics">}}
{{</*plan type="business"*/>}}
Displays information about all incoming HTTP requests, including those not affected by security measures.
{{</feature>}}

---

## Related products

{{<related header="DDoS Protection" href="/ddos-protection/" product="ddos-protection">}}
Cloudflare DDoS protection secures websites, applications, and entire networks while ensuring the performance of legitimate traffic is not compromised.
{{</related>}}

{{<related header="Page Shield" href="/page-shield/" product="page-shield">}}
Page Shield is a comprehensive client-side security solution to ensure the safety of your website visitors' browser environment.
{{</related>}}

{{<related header="Bots" href="/bots/" product="bots">}}
Cloudflare bot solutions identify and mitigate automated traffic to protect your domain from bad bots.
{{</related>}}
