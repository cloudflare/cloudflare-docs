---
title: IP Access Rules
pcx-content-type: concept
weight: 2
---

# IP Access Rules

Use IP Access Rules to allowlist, block, and challenge actions for traffic based on the visitor's IP address, country, or Autonomous System Number (ASN).

IP Access Rules are commonly used to block or challenge suspected malicious traffic. Another common use of IP Access Rules is to allow services that regularly access your site, such as APIs, crawlers, and payment providers. 

## IP Access Rules actions

You can configure an IP Access Rule with one of the following actions:

* **Block**: Prevents a visitor from visiting your site.

* **Allow**: Excludes visitors from all security checks (Browser Integrity Check, I'm Under Attack Mode, WAF, etc). Use this option when a trusted visitor is being blocked by Cloudflare's default security features. The _Allow_ action takes precedence over the _Block_ action.

* **Managed Challenge**: Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge from a list of possible actions. For more information, refer to [Understanding Cloudflare Captchas, Managed Challenge, and Challenge Passage](https://support.cloudflare.com/hc/articles/200170136#managed-challenge).

* **JavaScript Challenge**: Presents the [I'm Under Attack Mode](https://support.cloudflare.com/hc/articles/200170076) interstitial page to visitors. The visitor or client must support JavaScript. Useful for blocking DDoS attacks with minimal impact to legitimate visitors.

* **Legacy CAPTCHA**: Requires the visitor to complete a CAPTCHA before visiting your site. Prevents bots from accessing the site.

## Important remarks

* Allowing a country code does not bypass Cloudflare's WAF.

* By design, IP Access Rules configured to _Allow_ traffic do not show up in [Firewall Analytics](/waf/analytics/).

* Requests containing certain attack patterns in the `User-Agent` field are checked before being processed by the general firewall pipeline. Therefore, such requests are blocked before any allowlist logic takes place. When this  occurs, firewall events downloaded from the API show `rule_id` as `security_level` and action as `drop`.

* Cloudflare supports use of `fail2ban` to block IPs on your server. However, to prevent `fail2ban` from inadvertently blocking Cloudflare IPs and causing errors for some visitors, ensure you restore original visitor IP in your origin server logs. For details, refer to [Restoring original visitor IPs](https://support.cloudflare.com/hc/articles/200170786).

## Create an IP Access Rule in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and website.
2. Navigate to **Security** > **WAF** > **Tools**.
3. Under **IP Access Rules**, enter the following details:
    1. For **Value**, enter an IP, IP range, two-letter country code, or Autonomous System Number (ASN).
    2. Select a rule action.
    3. For **Zone**, select whether the rule applies to the current website only or to all websites in the account.
    4. (Optional) Enter a note for the rule (for example, `Payment Gateway`).
4. Click **Add**.

## Create an IP Access Rule via API

Use the Cloudflare API to programmatically create IP Access Rules. To learn more, refer to [List Access Rules](https://api.cloudflare.com/#firewall-access-rule-for-a-zone-list-access-rules).
