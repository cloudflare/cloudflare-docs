---
title: Actions
pcx_content_type: reference
weight: 4
meta:
  title: IP Access rules actions
---

# Actions

An IP Access rule can perform one of the following actions:

* **Block**: Prevents a visitor from visiting your site.

* **Allow**: Excludes visitors from all security checks, including [Browser Integrity Check](/fundamentals/security/browser-integrity-check/), [I'm Under Attack Mode](/fundamentals/security/under-attack-mode/), and the WAF. Use this option when a trusted visitor is being blocked by Cloudflare's default security features. The _Allow_ action takes precedence over the _Block_ action. Note that allowing a given country code will not bypass the Cloudflare Web Application Firewall (WAF) .

* **Managed Challenge**: Depending on the characteristics of a request, Cloudflare will dynamically choose the appropriate type of challenge from a list of possible actions. For more information, refer to [Cloudflare challenges](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge-recommended).

* **JavaScript Challenge**: Presents the [I'm Under Attack Mode](https://support.cloudflare.com/hc/articles/200170076) interstitial page to visitors. The visitor or client must support JavaScript. Useful for blocking DDoS attacks with minimal impact to legitimate visitors.

* **Interactive Challenge**: Requires the visitor to complete an interactive challenge before visiting your site. Prevents bots from accessing the site.