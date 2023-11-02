---
pcx_content_type: reference
source: https://support.cloudflare.com/hc/en-us/articles/115001992652-Using-Privacy-Pass-with-Cloudflare
title: Privacy Pass
---

# Privacy Pass

[Privacy Pass](https://datatracker.ietf.org/wg/privacypass/about/) specifies an extensible protocol for creating and redeeming anonymous and transferable tokens. Its specification is maintained by [the IETF](https://datatracker.ietf.org/wg/privacypass/about/).
Cloudflare provides "Silk - Privacy Pass Client". This is a Chrome and Firefox browser extension that is used for Research, and provides a better visitor experience for Cloudflare-protected websites. Privacy Pass is especially helpful for visitors from shared networks, VPNs, and Tor that tend to have poorer IP reputations.

For instance, a visitor IP address with poor reputation may receive a Cloudflare challenge page before gaining access to a Cloudflare-protected website. Privacy Pass allows the visitor to solve a challenge, with or without interaction depending on the device. Solving this challenge is coordinated with a third party attester in such a way that Cloudflare does not see the attestation method or the interaction, preserving visitors privacy while maintaining a high level of security.

---

## Set up Privacy Pass

### For your end users

Your end users should download the Privacy Pass extension for either Google Chrome or Firefox:

-   Chrome: [https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi](https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi)
-   Firefox: [https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/](https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/)

The Privacy Pass code is available on [GitHub](https://github.com/cloudflare/pp-browser-extension) which allows reporting of issues.

---

## Support for Privacy Pass v1 (legacy)

In 2017 Cloudflare [announced support](https://blog.cloudflare.com/cloudflare-supports-privacy-pass/) for Privacy Pass, a recent protocol to let users prove their identity across multiple sites anonymously without enabling tracking. The initial use case was to provide untraceable tokens to sites to vouch for users who might otherwise have been presented with a CAPTCHA challenge. In the time since this release, Privacy Pass has evolved both at the [IETF](https://datatracker.ietf.org/wg/privacypass/documents/) and within Cloudflare. The version announced in 2017 is now considered legacy, and these legacy Privacy Pass tokens are no  longer supported as an alternative to Cloudflare challenges. As has been discussed on our blog [The end road for CAPTCHA](https://blog.cloudflare.com/end-cloudflare-captcha/), Cloudflare uses a variety of signals to infer if incoming traffic is likely automated. The (legacy) Privacy Pass zone setting is no longer meaningful to Cloudflare customers as Cloudflare now operates [CAPTCHA free](https://blog.cloudflare.com/turnstile-ga/), and supports the latest [Privacy Pass draft](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/).

In September 2023 support for Privacy Pass v1 (legacy) tokens as an alternative to Cloudflare Managed Challenge was removed and by the end of 2023 the current public-facing API will be removed as well.

Full deprecation notice for the first version of Privacy Pass is available on the [API deprecation page](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#privacy-pass-api-removal).
