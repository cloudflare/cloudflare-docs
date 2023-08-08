---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200170056-Understanding-the-Cloudflare-Security-Level
title: Security Level
---

# Security Level

Cloudflare's **Security Level** uses the IP reputation of a visitor to decide whether to present a [Managed Challenge](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge-recommended) page. Once the visitor enters the correct Managed Challenge, they receive the appropriate website resources.

{{<Aside type="note">}}
When [I'm Under Attack mode](/fundamentals/security/under-attack-mode/) is enabled, Security Level presents a JS challenge page.
{{</Aside>}}

---

## Security levels

IP reputation is calculated based on [Project Honeypot](https://www.projecthoneypot.org/), external public IP information, as well as internal threat intelligence from our [WAF managed rules](/waf/reference/legacy/old-waf-managed-rules/) and [DDoS](/ddos-protection/about/).

| Security Level | Threat Scores | Description |
| --- | --- | --- |
| Off (Enterprise customers only) | N/A | Does not challenge IP addresses. |
| Essentially off | greater than 49 | Only challenges IP addresses with the worst reputation. |
| Low | greater than 24 | Challenges only the most threatening visitors. |
| Medium | greater than 14 | Challenges both moderate threat visitors and the most threatening visitors. |
| High | greater than 0 | Challenges all visitors that exhibit threatening behavior within the last 14 days. |
| I’m Under Attack! | N/A | Only for use if your website is currently under a DDoS attack. |

---

## Customize security level

Cloudflare sets **Security Level** to _Medium_ by default.

### Update globally

To update the Security Level for your entire zone:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Security** > **Settings**.
4. For **Security Level**, select an option.

### Update selectively

If you wanted to set the Security level more selectively:

- Configure it via a [Configuration Rule](/rules/configuration-rules/).
- Use the **Threat Score** as a **Field** criteria within [firewall rules](/firewall/cf-firewall-rules/) or [custom rules](/waf/custom-rules/).

---

## Recommendations

To prevent bot IPs from attacking a website:
- A new website owner might set a _Medium_ or _High_ **Security Level** and lower [**Challenge Passage**](/fundamentals/security/challenge-passage/) to a value below **30 minutes** to ensure that Cloudflare is constantly protecting the site.
- An experienced website administrator confident in their security settings might set **Security Level** to _Essentially Off_ or _Low_ while setting a higher [**Challenge Passage**](/fundamentals/security/challenge-passage/) for a week, month, or even year to provide a less obtrusive visitor experience.

Only use [**I'm Under Attack!**](/fundamentals/security/under-attack-mode/) mode when a website is under a DDoS attack. **I'm Under Attack!** mode may affect some actions on your domain, such as your API traffic.  Set a custom **Security Level** for your API or any other part of your domain by creating a [Configuration Rule](/rules/configuration-rules/) for that portion of your site traffic.