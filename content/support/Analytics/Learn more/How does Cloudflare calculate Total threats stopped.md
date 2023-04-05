---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/204964927-How-does-Cloudflare-calculate-Total-threats-stopped-
title: How does Cloudflare calculate Total threats stopped
---

# How does Cloudflare calculate "Total threats stopped"?

## Overview

Total Threats Stopped measures the number of “suspicious” and “bad” requests that were aimed at your site. Requests receive these labels by our IP Reputation Database as they enter Cloudflare’s network:

-   **Legitimate:** request pass directly to your site
-   **Suspicious:** request has been challenged with a [Cloudflare challenge](/fundamentals/get-started/concepts/cloudflare-challenges/)
-   **Bad:** request has been blocked because our Browser Integrity Check, or because of user configured settings like WAF rules or IP range block.

Cloudflare uses Threat Scores gathered from sources such as Project Honeypot, as well as our own communities' traffic to determine whether a visitor is legitimate or malicious. When a legitimate visitor passes a challenge, that helps offset the Threat Score against the previous negative behavior seen from that IP address. Our system learns who is a threat from this activity.

In addition to threat analytics you can also monitor search engine crawlers going to your websites. For most websites, threats and crawlers make up 20% - 50% of traffic.
