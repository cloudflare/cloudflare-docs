---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200170056-Understanding-the-Cloudflare-Security-Level
title: Security Level
---

{{<heading-pill style="deprecated">}}Security Level{{</heading-pill>}}

{{<Aside type="warning" header="Deprecation notice">}}
Security Level and threat score are deprecated. Cloudflare has implemented several automated mechanisms replacing the existing Security Level logic, which was solely based on IP reputation. These improvements are already live and they are being applied to customer traffic on all plans including Free.

Cloudflare replaced the **Security Level** setting in the dashboard with a toggle for [I'm Under Attack mode](/fundamentals/reference/under-attack-mode/).

For Cloudflare API and Terraform users, the following configurations will stop working after 2024-09-30:
- Setting the security level to any value except `off` and `under_attack`.
- Creating/editing any rules using the `cf.threat_score` field in their expressions.
{{</Aside>}}

Cloudflare's Security Level (deprecated) uses the threat score to decide whether to present a [challenge](/waf/reference/cloudflare-challenges/) to the visitor. Once the visitor enters the correct challenge, they receive the appropriate website resources.

---

## Threat score

The threat score (deprecated) measures IP reputation across Cloudflare services. This score is calculated based on [Project Honeypot](https://www.projecthoneypot.org/), external public IP information, as well as internal threat intelligence from our [WAF managed rules](/waf/reference/legacy/old-waf-managed-rules/) and [DDoS](/ddos-protection/about/).

The threat score of a request has a value from 0 to 100, where 0 indicates low risk. Values above 10 may represent spammers or bots, and values above 40 identify bad actors on the Internet.

{{<Aside type="warning">}}
Since the threat score is deprecated, the [Expression Builder](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder) no longer shows _Threat Score_ in the list of fields. Until 2024-09-30 you can use the `cf.threat_score` field in an expression using the [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).
{{</Aside>}}

## Security levels

Security levels (deprecated) are based on the threat score, except _Off_ and _I’m Under Attack!_. Adjust the security level to challenge incoming requests based on the threat they pose.

The available security levels are the following:

{{<table-wrap>}}

| Security Level                     | Threat score range | Description                                                                          |
|------------------------------------|:------------------:|--------------------------------------------------------------------------------------|
| Off                                | _N/A_              | Does not challenge IP addresses.                                                     |
| I’m Under Attack!                  | _N/A_              | Only for use if your website is currently under a DDoS attack. This mode may affect some actions on your domain, such as your API traffic.                       |
| Essentially off<br>_(deprecated)_  | 50–100             | Only challenges IP addresses with the worst reputation.                              |
| Low<br>_(deprecated)_              | 25–100             | Challenges only threatening visitors.                                                |
| Medium<br>_(deprecated)_           | 15–100             | Challenges both threatening and moderately threatening visitors.                     |
| High<br>_(deprecated)_             |  0–100             | Challenges all visitors that exhibited threatening behavior within the last 14 days. |

{{</table-wrap>}}

Higher security level values mean that even requests with a lower risk (that is, with a low [threat score](#threat-score)) will be challenged. Lower security level values mean that only requests posing a higher risk (that is, with a high threat score) will be challenged.

Security levels from _Essentially off_ to _High_ will challenge the visitor using a Managed Challenge. When you select _I'm Under Attack!_, which enables [I'm Under Attack mode](/fundamentals/reference/under-attack-mode/), Cloudflare will present a JS challenge page.

To set a custom security level for your API or any other part of your domain, create a [configuration rule](/rules/configuration-rules/).

---

### Update globally

{{<Aside type="warning">}}
Since Security Level is deprecated, you can only turn on or off [I'm Under Attack mode](/fundamentals/reference/under-attack-mode/) in the Cloudflare dashboard.

To use other security level values, you must use the [Change Security Level setting](/api/operations/zone-settings-change-security-level-setting) endpoint or Terraform.
{{</Aside>}}

To turn on or off I’m Under Attack mode for your entire zone:

{{<render productFolder="fundamentals" file="_under-attack-mode-dash-instructions.md" withParameters="**On** or **Off**">}}

### Update selectively

To set the security level selectively, do one of the following:

- Configure it via a [configuration rule](/rules/configuration-rules/).
- Use the `cf.threat_score` field in an expression (you must use the [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor) for this purpose).
