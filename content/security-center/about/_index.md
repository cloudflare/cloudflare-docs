---
title: About
pcx_content_type: concept
weight: 3
meta:
  title: About Cloudflare Security Center
---

# About Cloudflare Security Center

## Security Insights

Security Insights provides you with a list of insights provided by Cloudflare’s security scans, covering different areas like:

*   Cloudflare account settings
*   DNS record configuration
*   SSL/TLS certificates configuration
*   Cloudflare Access configuration
*   Cloudflare WAF configuration

These insights have the following properties:

*   **Severity**: The security risk of the insight. The severity values are: *Moderate*, *High*, and *Critical*.
*   **Insight**: The insight description detailing the current configuration that is causing the risk or vulnerability.
*   **Risk**: A description of the risk associated with not addressing the issue.
*   **Type**: The insight category.

For more information on the available operations in the **Security Insights** tab, refer to [Review Security Insights](/security-center/tasks/review-insights/).

### Scan frequency

Once you enable Security Insights, Cloudflare performs scans at the below frequency, according to your plan type:

*   Every day for Cloudflare accounts with at least one Pro, Business, or Enterprise zone.
*   Every day for Cloudflare accounts on the Teams Standard or Teams Enterprise plans.
*   Every three days for all other Cloudflare accounts.

Additionally, Cloudflare accounts with at least one Business or Enterprise zone, or accounts on the Teams Standard or Teams Enterprise plans, can also manually start a new scan. Refer to [Start a new scan](/security-center/tasks/start-scan/) for more information.
