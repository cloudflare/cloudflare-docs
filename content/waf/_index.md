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

{{<feature header="Exposed credential checks" href="/waf/exposed-credentials-check/">}}
Monitor and block use of stolen/exposed credentials for account takeover.
{{</feature>}}

{{<feature header="Security Events" href="/waf/security-events/" cta="Explore Security Events">}}
Review mitigated requests (rule matches) using an intuitive interface. Tailor your security configurations based on the activity log.
{{</feature>}}

{{<feature header="Security Analytics" href="/waf/security-analytics/" cta="Explore Security Analytics">}}
{{<plan type="business">}}
Displays information about all incoming HTTP requests, including those not affected by security measures.
{{</feature>}}

---

## More resources

{{<resource-group>}}

{{<resource header="WAF managed rules (previous version)" href="/waf/reference/legacy/old-waf-managed-rules/" icon="documentation-clipboard">}}
Documentation on the previous implementation of WAF managed rules.
{{</resource>}}

{{<resource header="Firewall rules" href="/firewall/" icon="documentation-clipboard">}}
Create rules that inspect incoming traffic and block, challenge, log, or allow specific requests. Use firewall rules if you do not have access to WAF custom rules.
{{</resource>}}

{{</resource-group>}}
