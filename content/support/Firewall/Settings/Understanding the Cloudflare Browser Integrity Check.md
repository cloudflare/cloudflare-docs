---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170086-Understanding-the-Cloudflare-Browser-Integrity-Check
title: Understanding the Cloudflare Browser Integrity Check
---

# Understanding the Cloudflare Browser Integrity Check

The Cloudflare **Browser Integrity Check (BIC)** operates similar to [Bad Behavior](https://bad-behavior.ioerror.us/) and looks for common HTTP headers abused most commonly by spammers and denies access to your page.  It also challenges visitors without a user agent or with a non-standard user agent such as commonly used by abusive bots, crawlers, or visitors.

**BIC** is enabled by default, and you can configure it in **Security** > **Settings**.  You can disable the **BIC** using a [WAF custom rule with Skip action](/waf/custom-rules/skip/) to selectively disable this feature for certain sections of your website. For example, you could disable BIC for your API traffic. If you do not have access to WAF custom rules, create a firewall rule with the [_Bypass_ action](/firewall/cf-firewall-rules/actions/#supported-actions).

___

## Related resources

* [Cloudflare API Shield](/api-shield/)
* [Secure your application](/learning-paths/application-security/)
* [WAF custom rules](/waf/custom-rules/)
