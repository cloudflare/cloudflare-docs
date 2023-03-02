---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115001595131-Understanding-Cloudflare-Zone-Lockdown
title: Understanding Cloudflare Zone Lockdown
---

# Understanding Cloudflare Zone Lockdown



**Zone Lockdown** specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL.  **Zone Lockdown** allows multiple destinations in a single rule as well as IPv4 and IPv6 addresses. IP addresses not specified in the **Zone Lockdown** rule are denied access to the specified resources.

The maximum amount of rules allowed per account is based on plan type:

-   **Free**: 0
-   **Lite**: 3
-   **Pro**: 3
-   **Pro Plus**: 10
-   **Business**: 10
-   **Enterprise**: 200

Configure **Zone Lockdown** rules in **Security** > **WAF** > **Tools**. Alternatively, [configure **Zone Lockdown** via the API](https://api.cloudflare.com/#zone-lockdown-create-lockdown-rule). The example below demonstrates using **Zone Lockdown** to restrict access to users connecting from your company’s headquarters and branch offices:

![Configuring a Zone Lockdown rule that restricts access to users connecting from the company’s headquarters and branch offices](/support/static/create_a_zone_lockdown_rule.png)

The above example would not protect an internal wiki located on a different directory path such as _example.com/internal/wiki_.

For multiple overlapping **Zone Lockdown** rules, set a **Priority** under **Advanced Options** of the **Zone Lockdown** configuration. The lower the number, the higher the priority. Higher priority rules take precedence.  For example, a rule for _example.com/admin/api/_ requires a different priority than a similar rule for _example.com/admin/_ if each rule contains a different set of allowed IP addresses.

A visitor from an unauthorized IP observes the following error when **Zone Lockdown** is enabled:

![Example of Error 1106 (access denied) received by a user accessing the zone from an unauthorized IP address](/support/static/zone-lockdown-rule-error-1106-access-denied.png)
