---
pcx_content_type: concept
title: How it works
weight: 1
---

# How it works

Once you [enable Security Insights](/security-center/get-started/), Cloudflare runs regular security scans on the infrastructure associated with your Cloudflare account. These scans perform a series of checks on your Cloudflare account settings and on the configurations of different Cloudflare products for the domains in your Cloudflare account.

The performed checks take into account a set of ideal product configurations and states that indicate a good security posture. If your current configuration does not meet this ideal configuration for one or more checks, the Security Center will report these situations as **Security Insights**.

The list of insights may include potential security threats, vulnerabilities, compliance risks, insecure configurations, or any other identified risks.

## Scan properties
Each insight will have the following properties assigned to them:

*   **Severity**: The security risk of the insight. The severity values are: *Moderate*, *High*, and *Critical*.
*   **Insight**: The insight description detailing the current configuration that is causing the risk or vulnerability.
*   **Risk**: A description of the risk associated with not addressing the issue.
*   **Type**: The insight category.

## Scan frequency

{{<render file="_scan-frequency.md">}} 