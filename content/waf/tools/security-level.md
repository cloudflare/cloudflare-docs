---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/200170056-Understanding-the-Cloudflare-Security-Level
title: Security Level
---

# Security Level

{{<render file=_security-level-description.md productFolder="waf">}}

---

{{<render file=_security-level-scores.md productFolder="waf">}}

---

## Customize security level

The default security level is _Medium_.

### Update globally

To update the security level for your entire zone:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and zone.
2. Go to **Security** > **Settings**.
3. For **Security Level**, select an option.

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
