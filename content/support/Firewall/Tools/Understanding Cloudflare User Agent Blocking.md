---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115001856951-Understanding-Cloudflare-User-Agent-Blocking
title: Understanding Cloudflare User Agent Blocking
---

# Understanding Cloudflare User Agent Blocking



## Overview

**User Agent Blocking** (UA) rules block specific browser or web application [**User-Agent** request headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent).  UA rules apply to the entire domain instead of individual subdomains.  UA rules are applied after [**Zone Lockdown** rules](https://support.cloudflare.com/hc/articles/115001595131), so permitting an IP address via **Zone Lockdown** skips UA rules.

The maximum number of allowed UA rules is based on plan type: 

-   **Free**: 10
-   **Lite**: 50
-   **Pro**: 50
-   **Pro Plus**: 250
-   **Business**: 250
-   **Enterprise**: 1,000

___

## Create a User Agent Blocking rule

1\. Log in to your Cloudflare account.

2\. Select the appropriate domain.

3\. Navigate to **Security** > **WAF** > **Tools**.

4\. Under **User Agent Blocking**, click **Create Blocking Rule.** 

5\. Enter the **Name/Description.**

6\. Select an applicable **Action** of either _Block_, _Interactive Challenge_, _Managed Challenge_, or _JS challenge_.

7\. Enter the **User Agent**.  For example, to block the _Bad Bot_ web spider:

_BadBot/1.0.2 (+http://bad.bot)_

**Note:** Wildcards (\*) are not supported.

8\. Click **Save and Deploy.**

___

## Related resources

-   [Understanding your site protection options](https://support.cloudflare.com/hc/articles/115002059131)
-   [Understanding Cloudflare Zone Lockdown](https://support.cloudflare.com/hc/articles/115001595131)
