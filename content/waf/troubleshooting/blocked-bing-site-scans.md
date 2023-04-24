---
title: Bing's Site Scan blocked by a managed rule
pcx_content_type: troubleshooting
meta:
    description: A WAF managed rule may block site scans performed by Bing Webmaster Tools.
---

# Bing's Site Scan blocked by a WAF managed rule

Microsoft [Bing Webmaster Tools](https://www.bing.com/webmaster/tools) provides a Site Scan feature that crawls your website searching for possible SEO improvements.

Since Site Scan does not use the same IP address range as Bingbot (Bing's website crawler), the WAF managed rule that blocks fake Bingbot requests may trigger inadvertently for Site Scan requests. This is a known issue of Bing Webmaster Tools.

To allow Site Scan to run on your website, Cloudflare recommends that you temporarily skip the triggered WAF managed rule by creating a [WAF exception](/waf/managed-rules/waf-exceptions/). After the scan finishes successfully, re-enable the managed rule as soon as possible to start blocking fake Bingbot requests again.

The rule you should temporarily skip is the following:

{{<table-wrap>}}

|                     | Name                                             | ID                                 |
|---------------------|--------------------------------------------------|------------------------------------|
| **Managed Ruleset** | Cloudflare Managed Ruleset                       | `efb7b8c949ac4650a09736fc376e9aee` |
| **Rule**            | Anomaly:Header:User-Agent - Fake Bing or MSN Bot | `ae20608d93b94e97988db1bbc12cf9c8` |

{{</table-wrap>}}

The WAF exception, shown as a rule with a **Skip** action, must appear in the rules list before the rule executing the Cloudflare Managed Ruleset, or else nothing will be skipped.

To check the rule order, use one of the following methods:

* When using the Cloudflare dashboard, the rules listed in **Security** > **WAF** > **Managed rules** run in order.
* When using the Cloudflare API, the rules in the `rules` object obtained using the [Get a zone entry point ruleset](/api/operations/getZoneEntrypointRuleset) API operation (for your zone and for the `http_request_firewall_managed` phase) run in order.

For more information on creating WAF exceptions, refer to [Create WAF exceptions](/waf/managed-rules/waf-exceptions/).