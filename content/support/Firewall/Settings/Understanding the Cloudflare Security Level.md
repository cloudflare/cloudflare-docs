---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170056-Understanding-the-Cloudflare-Security-Level
title: Understanding the Cloudflare Security Level
---

# Understanding the Cloudflare Security Level

## Overview

**Security Level** uses the IP reputation of a visitor to decide whether to present a Managed Challenge page. Once the visitor enters the correct Managed Challenge, they receive the appropriate website resources. 

{{<Aside type="note">}}
When [I\'m Under Attack
mode](https://support.cloudflare.com/hc/articles/200170076) is enabled
in **Security** \> **Settings** or via a [Page
Rule](https://support.cloudflare.com/hc/articles/200172336-How-do-I-create-a-PageRule-),
Security Level presents a JS challenge page.
{{</Aside>}}

IP Reputation is calculated based on [Project Honeypot](https://www.projecthoneypot.org/), external public IP information, as well as internal threat intelligence from our [WAF managed rules](https://support.cloudflare.com/hc/articles/200172016) and [DDoS](https://support.cloudflare.com/hc/articles/200172676).

| Security Level | Threat Scores | Description |
| --- | --- | --- |
| Off (Enterprise customers only) | N/A | Does not challenge IP addresses |
| Essentially off | greater than 49 | Only challenges IP addresses with the worst reputation |
| Low | greater than 24 | Challenges only the most threatening visitors |
| Medium | greater than 14 | Challenges both moderate threat visitors and the most threatening visitors |
| High | greater than 0 | Challenges all visitors that exhibit threatening behavior within the last 14 days |
| I’m Under Attack! | N/A | Only for use if your website is currently under a DDoS attack |

Cloudflare sets **Security Level** to _Medium_ by default.  Change the **Security Level** settings in **Security** > **Settings**. Also, the **Threat Score** values mentioned above are useful as **Field** criteria within [firewall rules](/firewall/cf-firewall-rules/) or [custom rules](/waf/custom-rules/)**. Security Level** is also configurable via Cloudflare [Page Rules](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings).

To prevent bot IPs from attacking a website, a new website owner might set a _Medium_ or _High_ **Security Level** and lower [**Challenge Passage**](https://support.cloudflare.com/hc/articles/200170136#2dwCrNWIMnNJDP6AVjEQ3e) _5_ to _30_ minutes to ensure that Cloudflare is constantly protecting the site.  Alternatively, an experienced website administrator that is confident in their security settings might set **Security Level** to _Essentially Off_ or _Low_ while setting a higher [**Challenge Passage**](https://developers.cloudflare.com/fundamentals/get-started/concepts/cloudflare-challenges/) for a week, month, or even year to provide a less obtrusive visitor experience.

Only use [**I'm Under Attack!**](https://support.cloudflare.com/hc/articles/200170076) mode when a website is under a DDoS attack.  **I'm Under Attack!** mode may affect some actions on your domain, such as your API traffic.  Set a custom **Security Level** for your API or any other part of your domain by creating a [**Page Rule**](https://support.cloudflare.com/hc/en-us/articles/200172336-How-do-I-create-a-PageRule-) for that portion of your site traffic.

___

## Related resources

-   [Cloudflare challenges](/fundamentals/get-started/concepts/cloudflare-challenges/)
-   [Understanding Cloudflare Under Attack Mode](https://support.cloudflare.com/hc/articles/200170076)
-   [Responding to DDoS attacks](https://support.cloudflare.com/hc/articles/200170196)
