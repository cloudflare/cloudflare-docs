---
title: IP Access Rules
pcx-content-type: concept
weight: 2
---

# IP Access Rules

Use IP Access Rules to allowlist, block, and challenge traffic based on the visitor's IP address, country, or Autonomous System Number (ASN).

IP Access Rules are commonly used to block or challenge suspected malicious traffic. Another common use of IP Access Rules is to allow services that regularly access your site, such as APIs, crawlers, and payment providers.

You can [create IP Access Rules](/waf/tools/ip-access-rules/create-rule/) in the Cloudflare dashboard or via API.

## Availability

IP Access Rules are available to all customers.

Block by country is only available on the Enterprise plan. Other customers may perform country blocking using [firewall rules](/firewall/).

Each Cloudflare account can have a maximum of 50,000 rules. If you are an Enterprise customer and need more rules, contact your account team.

## Important remarks

* Allowing a country code does not bypass Cloudflare's WAF.

* By design, IP Access Rules configured to _Allow_ traffic do not show up in [Firewall Analytics](/waf/analytics/).

* Requests containing certain attack patterns in the `User-Agent` field are checked before being processed by the general firewall pipeline. Therefore, such requests are blocked before any allowlist logic takes place. When this  occurs, firewall events downloaded from the API show `rule_id` as `security_level` and action as `drop`.

* Cloudflare supports use of `fail2ban` to block IPs on your server. However, to prevent `fail2ban` from inadvertently blocking Cloudflare IPs and causing errors for some visitors, ensure you restore original visitor IP in your origin server logs. For details, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

## Related resources

To learn more about protection options provided by Cloudflare to protect your website against malicious traffic and bad actors, refer to [Secure your website](/fundamentals/get-started/task-guides/secure-your-website/).