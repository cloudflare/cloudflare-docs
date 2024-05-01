---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200170056-Understanding-the-Cloudflare-Security-Level
title: Security Level
---

# Security Level

Cloudflare's **Security Level** uses the threat score (IP reputation) to decide whether to present a [challenge](/waf/reference/cloudflare-challenges/) to the visitor. Once the visitor enters the correct challenge, they receive the appropriate website resources.

---

## Threat score

The threat score measures IP reputation across Cloudflare services. This score is calculated based on [Project Honeypot](https://www.projecthoneypot.org/), external public IP information, as well as internal threat intelligence from our [WAF managed rules](/waf/reference/legacy/old-waf-managed-rules/) and [DDoS](/ddos-protection/about/).

The threat score of a request has a value from 0 to 100, where 0 indicates low risk. Values above 10 may represent spammers or bots, and values above 40 identify bad actors on the Internet.

## Security levels

Security levels are based on the threat score (except _Off_ and _I’m Under Attack!_). You can adjust the security level to challenge incoming requests based on the threat they pose.

The available security levels are the following:

{{<table-wrap>}}

| Security Level                  | Threat score range | Description                                                                        |
|---------------------------------|--------------------|------------------------------------------------------------------------------------|
| Off (Enterprise<br>customers only) | _N/A_           | Does not challenge IP addresses.                                                   |
| Essentially off                 | 50–100             | Only challenges IP addresses with the worst reputation.                            |
| Low                             | 25–100             | Challenges only threatening visitors.                                              |
| Medium                          | 15–100             | Challenges both threatening and moderately threatening visitors.                   |
| High                            |  0–100             | Challenges all visitors that exhibited threatening behavior within the last 14 days. |
| I’m Under Attack!               | _N/A_              | Only for use if your website is currently under a DDoS attack.                     |

{{</table-wrap>}}

Selecting a higher **Security Level** value means that even requests with a lower risk (that is, with a low [threat score](#threat-score)) will be challenged. Selecting a lower **Security Level** value means that only requests posing a higher risk (that is, with a high threat score) will be challenged.

Security levels from _Essentially off_ to _High_ will challenge the visitor using a Managed Challenge. When you select _I'm Under Attack!_, which enables [I'm Under Attack mode](/fundamentals/reference/under-attack-mode/), Cloudflare will present a JS challenge page.

{{<Aside type="warning">}}
Only use [I'm Under Attack mode](/fundamentals/reference/under-attack-mode/) when a website is under a DDoS attack. I'm Under Attack mode may affect some actions on your domain, such as your API traffic.

To set a custom security level for your API or any other part of your domain, create a [configuration rule](/rules/configuration-rules/).
{{</Aside>}}

---

## Customize security level

The default security level is _Medium_.

### Update globally

To update the security level for your entire zone:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Security** > **Settings**.
4. For **Security Level**, select an option.

### Update selectively

To set the security level more selectively, do one of the following:

- Configure it via a [configuration rule](/rules/configuration-rules/).
- Use the **Threat Score** as a **Field** criteria within [custom rules](/waf/custom-rules/). If you are using the Expression Editor, use the `cf.threat_score` field.

---

## Recommendations

To prevent bot IPs from attacking a website:
- A new website owner might set a _Medium_ or _High_ **Security Level** and lower [**Challenge Passage**](/waf/tools/challenge-passage/) to a value below **30 minutes** to ensure that Cloudflare is constantly protecting the site.
- An experienced website administrator confident in their security settings might set **Security Level** to _Essentially Off_ or _Low_ while setting a higher [**Challenge Passage**](/waf/tools/challenge-passage/) for a week, month, or even year to provide a less obtrusive visitor experience.

You can also create [WAF custom rules](/waf/custom-rules/) to protect sensitive areas of your website — like comment form pages or login forms — using the [threat score](#threat-score) in your rule expression. The flexibility of custom rules allows you to select the action to take (for example, challenge or block) and exclude specific IP addresses.
