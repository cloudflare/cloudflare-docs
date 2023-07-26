---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172016-Understanding-WAF-managed-rules-Web-Application-Firewall-
title: Troubleshooting
weight: 2
meta:
  title: Troubleshoot WAF managed rules (previous version)
---

# Troubleshoot WAF managed rules (previous version)

By default, WAF managed rules are fully managed via the Cloudflare dashboard and are compatible with most websites and web applications. However, false positives and false negatives may occur:

- **False positives**: Legitimate requests detected and filtered as malicious.
- **False negatives**: Malicious requests not filtered.

## Troubleshoot false positives

The definition of suspicious content is subjective for each website. For example, PHP code posted to your website is normally suspicious. However, your website may be teaching how to code and it may require PHP code submissions from visitors. In this situation, you should disable related managed rules for this website, since they would interfere with normal website operation.

To test for false positives, set WAF managed rules to _Simulate_ mode. This mode allows you to record the response to possible attacks without challenging or blocking incoming requests. Also, use the Firewall Analytics [**Activity log**](/waf/security-events/paid-plans/#activity-log) to determine which managed rules caused false positives.

If you find a false positive, there are several potential resolutions:

- **Add the client’s IP addresses to the [IP Access Rules](/waf/tools/ip-access-rules/) allowlist:** If the browser or client visits from the same IP addresses, allowing is recommended. 
- **Disable the corresponding managed rule(s)**: Stops blocking or challenging false positives, but reduces overall site security. A request blocked by Rule ID `981176` refers to OWASP rules. Decrease OWASP sensitivity to resolve the issue.
- **Bypass WAF managed rules with a firewall rule:** [Create a firewall rule](/firewall/cf-dashboard/create-edit-delete-rules/#create-a-firewall-rule) with the _Bypass_ action to deactivate WAF managed rules for a specific combination of parameters. For example, [bypass managed rules](/firewall/cf-firewall-rules/actions/) for a specific URL and a specific IP address or user agent.
- **(Not recommended) Disable WAF managed rules for traffic to a URL:** Lowers security on the particular URL endpoint. Configured via [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

Additional guidelines are as follows:

- If one specific rule causes false positives, set rule’s **Mode** to _Disable_ rather than turning _Off_ the entire rule **Group**.
- For false positives with the administrator section of your website, create a [**Page Rule**](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) to **Disable Security** for the admin section of your site resources — for example, `example.com/admin`.

## Troubleshoot false negatives

To identify false negatives, review the HTTP logs on your origin web server. To reduce false negatives, use the following checklist:

- Are WAF managed rules enabled in **Security** > **WAF** > **Managed rules**?
- Are WAF managed rules being disabled via [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/)?
- Not all managed rules are enabled by default, so review individual managed rule default actions.

    - For example, Cloudflare allows requests with empty user agents by default. To block requests with an empty user agent, change the rule **Mode** to _Block_.
    - Another example: if you are looking to block unmitigated SQL injection attacks, make sure the relevant SQLi rules are enabled and set to _Block_ under the **Cloudflare Specials** group.

- Are DNS records that serve HTTP traffic proxied through Cloudflare?
- Is a firewall rule [bypassing](/firewall/cf-firewall-rules/actions/#supported-actions) managed rules? 
- Does an allowed country, ASN, IP range, or IP address in [IP Access rules](/waf/tools/ip-access-rules/) or [firewall rules](/firewall/cf-firewall-rules/) match the attack traffic?
- Is the malicious traffic reaching your origin IP addresses directly to bypass Cloudflare protection? Block all traffic except from [Cloudflare's IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) at your origin web server.
