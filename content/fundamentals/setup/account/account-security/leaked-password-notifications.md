---
pcx_content_type: reference
title: Leaked Password Notifications
---

# Leaked Password Notifications

Cloudflare automatically checks if your password has been compromised when you log in to the [Cloudflare dashboard](http://dash.cloudflare.com). Every time you log in to your account, we will securely verify through threat intelligence sources to confirm if your password has been leaked in a past data breach.

Refer to the [blog post]() for more information on how Cloudflare checks for leaked credentials.

{{<Aside type="note" header="Note">}}

Cloudflare does not have additional information about the specific breach or Internet service that potentially lost your password.

Popular online tools such as [Have I Been Pwned](https://haveibeenpwned.com/) can help you better understand where your external accounts were attacked. If you reused this password in other systems, it is recommended that you reset it in those as well.

{{</Aside>}}

If your password is found in a data breach, we will email you information on how to reset your password and prompt you to do so in the Cloudflare dashboard.

Your first three login attempts will warn you of the need to reset your password. After three attempts, you will be required to reset your password to log in to Cloudflare.

Users leveraging [Single Sign-On (SSO)](/cloudflare-one/applications/configure-apps/dash-sso-apps/) or [two-factor authentication (2FA)](/fundamentals/setup/account/account-security/2fa/) will not be subject to these requirements given the higher level of security provided by those features.

We encourage you to [enable two-factor authentication](/fundamentals/setup/account/account-security/2fa/) to secure your account.

Cloudflare account Super Administrators can also require that [all members enable 2FA](/fundamentals/setup/account/account-security/2fa/#enable-two-factor-authentication-for-your-cloudflare-account). This functionality can be enabled by going to **Manage Account** > **Members** in the Cloudflare dashboard.
