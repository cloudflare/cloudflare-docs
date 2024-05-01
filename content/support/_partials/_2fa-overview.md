---
_build:
  publishResources: false
  render: never
  list: never
---

Two-factor authentication (2FA) allows user account owners to add an additional layer of login security to Cloudflare accounts. This additional authentication step requires you to provide both something you know, such as a Cloudflare password, and something you have, such as an authentication code from a mobile device.

{{<Aside type="note">}}
Cloudflare user accounts configured to use single sign-on (SSO) cannot configure 2FA.
{{</Aside>}}

Cloudflare offers the option to use either a phishing-resistant security key, like a YubiKey, or a Time-Based One-Time password (TOTP) mobile app for authentication, like Google Authenticator, or both. If you add both of these authentication methods to your account, you are initially prompted to log in with the security key, but can opt-out and use TOTP instead.

To ensure that you can securely access your account even without your mobile device or security keys, Cloudflare also provides backup codes for download.

{{<Aside type="note" header="Tip">}}
After downloading your backup codes, we recommend saving them in a secure location.
{{</Aside>}}

As the user account owner, you are automatically assigned the [Super Administrator](/fundamentals/setup/manage-members/) role. Once 2FA is enabled, all Cloudflare account members are required to configure 2FA on their mobile devices.
