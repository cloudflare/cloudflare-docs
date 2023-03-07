---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115001992652-Using-Privacy-Pass-with-Cloudflare
title: Using Privacy Pass with Cloudflare
---

# Using Privacy Pass with Cloudflare



## Overview

Privacy Pass is a Chrome and Firefox browser extension that provides a better visitor experience for Cloudflare-protected websites.  For instance, a visitor IP address with poor reputation may receive a Cloudflare CAPTCHA page before gaining access to a Cloudflare-protected website.  After a single CAPTCHA page is solved, Privacy Pass generates tokens for use with Cloudflare websites to prevent frequent CAPTCHA.  Privacy Pass generates 30 tokens for each solved CAPTCHA.

Privacy Pass allows a user to bypass CAPTCHAs. To help mitigate malicious usage of this, we automatically disable Privacy Pass anytime a domain is placed into "[I'm Under Attack!](https://support.cloudflare.com/hc/en-us/articles/200170076-Understanding-Cloudflare-Under-Attack-mode-advanced-DDOS-protection-)" mode. A few key points you need to keep in mind when enabling the "I'm Under Attack!" mode:

1.  When "I'm Under Attack!" mode is enabled on a domain, then Privacy Pass is disabled.
2.  When "I'm Under Attack!" mode is disabled on a domain, then Privacy Pass is re-enabled if it was enabled before "I'm Under Attack!" mode was turned on. 
3.  If Privacy Pass was disabled before "I'm Under Attack!" mode is turned on, it does not get enabled when "I'm Under Attack!" mode is turned off. 
4.  Privacy Pass cannot be enabled while "I'm Under Attack!" mode is turned on.

Privacy Pass is helpful for visitors from shared networks, VPNs and Tor that tend to have poorer IP reputations.  Enable **Privacy Pass Support** in **Security** > **Settings**.  Download the Privacy Pass extension for either Google Chrome or Firefox:

-   Chrome: [https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi](https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi)
-   Firefox: [https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/](https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/)

Report general Privacy Pass issues to [privacy-pass-support@cloudflare.com](mailto:A0privacy-pass-support@cloudflare.com).  The Privacy Pass code is available on [GitHub](https://github.com/privacypass/challenge-bypass-extension) which also allows reporting of issues.
