---
_build:
  publishResources: false
  render: never
  list: never
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
