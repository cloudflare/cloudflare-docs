---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/115001992652-Using-Privacy-Pass-with-Cloudflare
title: Privacy Pass
---

# Privacy Pass

Privacy Pass is a Chrome and Firefox browser extension that provides a better visitor experience for Cloudflare-protected websites. Privacy Pass is especially helpful for visitors from shared networks, VPNs, and Tor that tend to have poorer IP reputations.

For instance, a visitor IP address with poor reputation may receive a Cloudflare CAPTCHA page before gaining access to a Cloudflare-protected website. After a single CAPTCHA page is solved, Privacy Pass generates tokens for use with Cloudflare websites to prevent frequent CAPTCHAs. Privacy Pass generates 30 tokens for each solved CAPTCHA.

---

## Set up Privacy Pass

### For your zone

To enable Privacy Pass for your zone:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Security** > **Settings**.
4. For **Privacy Pass**, switch the toggle to **On**.

### For your end users

Your end users should download the Privacy Pass extension for either Google Chrome or Firefox:

-   Chrome: [https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi](https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi)
-   Firefox: [https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/](https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/)

Report general Privacy Pass issues to [privacy-pass-support@cloudflare.com](mailto:privacy-pass-support@cloudflare.com). The Privacy Pass code is available on [GitHub](https://github.com/privacypass/challenge-bypass-extension) which also allows reporting of issues.

---

## Privacy Pass with Under Attack mode

Privacy Pass allows a user to bypass CAPTCHAs. To help mitigate malicious usage of this feature, we automatically disable Privacy Pass anytime a domain is placed into [I'm Under Attack!](/fundamentals/security/under-attack-mode/) mode. A few key points you need to keep in mind when enabling the **I'm Under Attack!** mode:

1.  When **I'm Under Attack!** mode is enabled on a domain, then Privacy Pass is disabled.
2.  When **I'm Under Attack!**  mode is disabled on a domain, then Privacy Pass is re-enabled if it was enabled before **I'm Under Attack!**  mode was turned on. 
3.  If Privacy Pass was disabled before **I'm Under Attack!**  mode is turned on, it does not get enabled when **I'm Under Attack!**  mode is turned off. 
4.  Privacy Pass cannot be enabled while **I'm Under Attack!**  mode is turned on.