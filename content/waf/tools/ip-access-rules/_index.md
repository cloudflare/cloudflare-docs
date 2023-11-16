---
title: IP Access rules
pcx_content_type: concept
weight: 2
layout: single
---

# IP Access rules

Use IP Access rules to {{<glossary-tooltip term_id="allowlist">}}allowlist{{</glossary-tooltip>}}, block, and challenge traffic based on the visitor's IP address, country, or Autonomous System Number (ASN).

IP Access rules are commonly used to block or challenge suspected malicious traffic. Another common use of IP Access rules is to allow services that regularly access your site, such as APIs, crawlers, and payment providers.

{{<Aside type="warning">}}
Cloudflare recommends that you create [WAF custom rules](/waf/custom-rules/) instead of IP Access rules to perform IP-based or geography-based blocking (geoblocking):

- For IP-based blocking, use an [IP list](/waf/tools/lists/custom-lists/#ip-lists) in the custom rule expression.
- For geoblocking, use fields such as _AS Num_, _Country_, and _Continent_ in the custom rule expression.
{{</Aside>}}

## Availability

IP Access rules are available to all customers.

Each Cloudflare account can have a maximum of 50,000 rules. If you are an Enterprise customer and need more rules, contact your account team.

Block by country is only available on the Enterprise plan. Other customers may perform country blocking using [WAF custom rules](/waf/custom-rules/).

## Important remarks

* Allowing a country code does not bypass [WAF Managed Rules](/waf/managed-rules/) or [WAF managed rules (previous version)](/waf/reference/legacy/old-waf-managed-rules/).

* By design, IP Access rules configured to _Allow_ traffic do not show up in [Security Events](/waf/security-events/).

* Requests containing certain attack patterns in the `User-Agent` field are checked before being processed by the general firewall pipeline. Therefore, such requests are blocked before any allowlist logic takes place. When this  occurs, security events downloaded from the API show `rule_id` as `security_level` and action as `drop`.

* Cloudflare supports use of `fail2ban` to block IPs on your server. However, to prevent `fail2ban` from inadvertently blocking Cloudflare IPs and causing errors for some visitors, ensure you restore original visitor IP in your origin server logs. For details, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

## Related resources

To learn more about protection options provided by Cloudflare to protect your website against malicious traffic and bad actors, refer to [Secure your website](/learning-paths/application-security/).