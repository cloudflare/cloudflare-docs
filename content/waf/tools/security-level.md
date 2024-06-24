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

{{<render file=_security-level-description.md productFolder="waf">}}

---

{{<render file=_security-level-scores.md productFolder="waf">}}

---

### Update globally

{{<Aside type="warning">}}
Since Security Level is deprecated, you can only turn on or off [I'm Under Attack mode](/fundamentals/reference/under-attack-mode/) in the Cloudflare dashboard.

To use other security level values, you must use the [Change Security Level setting](/api/operations/zone-settings-change-security-level-setting) endpoint or Terraform.
{{</Aside>}}

To turn on or off I’m Under Attack mode for your entire zone:

{{<render productFolder="fundamentals" file="_under-attack-mode-dash-instructions.md" withParameters="**On** or **Off**">}}

### Update selectively

To set the security level more selectively, do one of the following:

- Configure it via a [configuration rule](/rules/configuration-rules/).
- Use the **Threat Score** field (deprecated) within [custom rules](/waf/custom-rules/). If you are using the Expression Editor, use the `cf.threat_score` field.

---

## Recommendations

To prevent bot IPs from attacking a website:
- A new website owner might set a _Medium_ or _High_ security level and lower [**Challenge Passage**](/waf/tools/challenge-passage/) to a value below **30 minutes** to ensure that Cloudflare is constantly protecting the site.
- An experienced website administrator confident in their security settings might set the security level to _Essentially Off_ or _Low_ while setting a higher [**Challenge Passage**](/waf/tools/challenge-passage/) for a week, month, or even year to provide a less obtrusive visitor experience.

You can also create [WAF custom rules](/waf/custom-rules/) to protect sensitive areas of your website — like comment form pages or login forms — using the [threat score](#threat-score) (deprecated) in your rule expression. The flexibility of custom rules allows you to select the action to take (for example, challenge or block) and exclude specific IP addresses.
