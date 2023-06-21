---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200167906-Securing-user-access-with-two-factor-authentication-2FA-
title: Securing user access with two-factor authentication (2FA)
---

# Securing user access with two-factor authentication (2FA)

## Overview

Two-factor authentication (2FA) allows user account owners to add an additional layer of login security to Cloudflare accounts. This additional authentication step requires you to provide both something you know, such as a Cloudflare password, and something you have, such as an authentication code from a mobile device.

{{<Aside type="note">}}
Cloudflare user accounts configured to use single sign-on (SSO) cannot
configure 2FA.
{{</Aside>}}

Cloudflare offers the option to use either a phishing-resistant security key, like a YubiKey, or a Time-Based One-Time password (TOTP) mobile app for authentication, like Google Authenticator, or both. If you add both of these authentication methods to your account, you are initially prompted to log in with the security key, but can opt-out and use TOTP instead.

To ensure that you can securely access your account even without your mobile device, or security keys, Cloudflare also provides backup codes for download.

{{<Aside type="tip">}}
After downloading your backup codes, we recommend saving them in a
secure location.
{{</Aside>}}

As the user account owner, you are automatically assigned the [Super Administrator](https://support.cloudflare.com/hc/en-us/articles/205065067#12345682) role. Once 2FA is enabled, all Cloudflare account members are required to configure 2FA on their mobile devices.

___

## Enable two-factor authentication for your Cloudflare account

We recommend that all Cloudflare user account holders enable 2FA to keep their accounts secure. 

2FA can only be enabled successfully on an account with a [verified email address](/fundamentals/account-and-billing/account-setup/verify-email-address/). If you do not verify your email address first, you may lock yourself out of your account.

{{<Aside type="warning">}}
Super Administrators can turn on **2FA Enforcement** to require all
members to enable 2FA. If you are not a Super Administrator, you will be
forced to turn on 2FA prior to accepting the invitation to join a
Cloudflare account as a member. 
{{</Aside>}}

To enable two-factor authentication for your Cloudflare login:

1.  Log in to the Cloudflare dashboard.
2.  Under the **My Profile** dropdown, select **My Profile**.
3.  Select the **Authentication** tab. 
4.  Select **Manage** in the Two-Factor Authentication card.
5.  Configure either a TOTP mobile app or a security key to enable 2FA on your account.

___

## Configure security key authentication for two-factor Cloudflare login

{{<Aside type="warning">}}
Security keys only work with browsers that support the WebAuthn
protocol.
{{</Aside>}}

A security key provides phishing-resistant multifactor authentication to your Cloudflare account using a built-in authenticator (Apple Touch ID, Android fingerprint, or Windows Hello) or an external hardware key (like [YubiKey](https://www.yubico.com/works-with-yubikey/catalog/cloudflare/)) that connects to your computer through USB-A, USB-C, NFC, or Bluetooth.

{{<Aside type="tip">}}
We strongly recommend configuring multiple security keys. With multiple
keys, you can still use 2FA if the primary key is unavailable or if
working on a different device.
{{</Aside>}}

Select **Manage** to configure 2FA security key authentication after [enabling 2FA on your Cloudflare account](https://support.cloudflare.com/hc/en-us/articles/200167906/#6Gqe6f3nZtXSTpwyS2PBZ1).

#### **Configure a built-in authenticator (Apple Touch ID, Android fingerprint, or Windows Hello)**

1.  In **Security Key Authentication**, select **Add**.
2.  Enter your Cloudflare password on the **Add a Security Key** screen, then select **Next**.
3.  A dialog appears. Interact with your built-in authenticator to add it to your Cloudflare account. 
4.  Enter a name for the built-in authenticator. If this is the initial setup, you will be prompted to generate backup codes. If not, skip to Step 8.
5.  Enter your password. 
6.  Select **Next** again to review your backup codes.  Backup codes can be used to access your user account without your mobile device.
7.  Select **Download**, **Print**, or **Copy** to save your backup codes in a secure location
8.  Select **Next** to finish the configuration.

#### **Configure a security key (like YubiKey)**

Before you begin, ensure that your hardware security key is configured and plugged in. On a Windows device, you may need to set up Windows Hello or register your security key to your Microsoft account. Review the Windows documentation for more details.

1.  Once your security key is plugged in, from **Security Key Authentication**, select **Add**.
2.  Enter your Cloudflare password on the **Add a Security Key** screen, then select **Next**.
3.  A dialog appears. Interact with your security key to add it to your Cloudflare account.  - Ensure that the dialog is for the security key setup. On a Windows device, if the Windows Hello dialog appears, select **Cancel**.  The security key dialog box will then appear. - Depending on your system, you may be required to register a PIN for the security key.
4.  Enter a name for the security key. If this is the initial setup, you will be prompted to generate backup codes. If not, skip to Step 8.
5.  Enter your password. 
6.  Select **Next** again to review your backup codes.  Backup codes can be used to access your user account without your mobile device.
7.  Select **Download**, **Print**, or **Copy** to save your backup codes in a secure location
8.  Select **Next** to finish the configuration. 

___

## Configure TOTP mobile app authentication for two-factor Cloudflare login

To enable 2FA mobile app authentication:

1\. Under **Mobile App Authentication**, click **Add**.

2\. Scan the QR code with your mobile device and enter the code from your authenticator app.

3\. Enter the code from your authenticator app. 

4.  Enter your Cloudflare password, then click **Next**.

-   If you can't scan the QR code, click **Can't scan QR code, Follow alternative steps** to configure your authenticator app manually.

![You can enable 2FA by scanning a QR code with your mobile device.](/support/static/2FA_scan_QR_code.png)

5\. Enter your Cloudflare password again.

6. Click **Next** again to review your backup codes. You can use backup codes to access your account without your mobile device.  

7\. Click **Download**, **Print**, or **Copy** to save the codes, then click **Next**.

{{<Aside type="note">}}
You can regenerate your backup codes on the following screen or at any
time in the Authentication tab.
{{</Aside>}}

8\. Click **Next** on the backup code page to complete the recovery code set up. Two-Factor Authentication is now _Enabled_.

### Reconfigure TOTP mobile app authentication

You may need to reconfigure your mobile app authentication if you join a new organization or lose access to your mobile device. When you reconfigure your mobile app authentication, your previous TOTP codes are invalid. 

{{<Aside type="note">}}
Reconfiguring TOTP mobile app authentication does not turn off 2FA.
{{</Aside>}}

To reconfigure, follow the same [Steps 1-8](https://support.cloudflare.com/hc/en-us/articles/200167906/#12345681) as detailed above.

___

## Regenerate backup codes

Each backup code is one-time use only, but you can always request a new set of backup codes using the Cloudflare dashboard. This is useful if you have lost access to or used all of your previous backup codes.

{{<Aside type="note">}}
Regenerating your backup codes will invalidate your previous codes.
{{</Aside>}}

To regenerate backup codes, 

1.  Log in to the Cloudflare dashboard.
2.  Click **My Profile**.
3.  Click the **Authentication** tab.
4.  Click **Regenerate** to generate and save a new set of two-factor backup codes.

___

## Disable two-factor authentication for your Cloudflare account

To disable 2FA for your Cloudflare account, you must delete all security keys and TOTP authenticators from your account.

{{<Aside type="note">}}
If you are not the Super Administrator of an organization with **2FA
Enforcement** enabled, you may not have permission to disable 2FA.
{{</Aside>}}

To disable 2FA:

1.  Log in to the Cloudflare dashboard
2.  Click **My Profile**.
3.  Click the **Authentication** tab.
4.  To remove your security key: 

-   Click **Edit** in the **Security Key Authentication** card. A drop-down menu shows more details about your security key.
-   Click **Delete**. A pop-up will appear.
-   Enter your Cloudflare password, then click **Remove**.

5\. To remove your TOTP mobile app authentication: 

-   Click **Delete method** in the **Mobile App Authentication** card. A popup window appears.
-   Enter your Cloudflare password, authenticator app code, or a recovery code,  then click **Disable**.

![gif showing how you would disable your TOTP mobile app authentication.](https://developerdocsgifs.cloudflaretraining.com/resampled_5fps_disable_mobile_auth_v2_final.gif)

___

You might lose access to a mobile device, security key, or authentication code.

#### **Use a backup code**

Generally, you can solve these issues by using a backup code or retrieving a backup code from your preferred authentication app.

{{<Aside type="tip">}}
Google\'s documentation describes how to [transfer Google Authenticator
codes from one Android device to
another](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0).
{{</Aside>}}

When setting up 2FA, you should have saved your backup codes in a secure location. To restore lost access using a Cloudflare backup code:

1\. Retrieve the backup code from where you stored it.

2\. Navigate to the Cloudflare login page.

3\. Enter the backup code in the login screen, then click **Log in**.

{{<Aside type="note">}}
Once you use a backup code, it becomes invalid.
{{</Aside>}}

#### **Disable 2FA**

If you or another account owner still has access to your Cloudflare account, you could disable [your 2FA settings](https://dash.cloudflare.com/?to=/:account/members).

#### **Recover your account**

If you do not have access to your 2FA account or backup codes, use a verified device to request a temporary access code.

1\. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).

2\. On the **Two-Factor Authentication** page, click **Can't access your 2FA device or backup codes?**.

3\. Click **Begin recovery**.

4\. Using a temporary access code, verify the email address associated with your account.

5\. Using a device that you have logged in from before, verify your device. If you clear your cookies often or are logging in from a different IP address, you have wiped our memory of your device and will need to use a different device to verify.

6\. For security reasons, you have to wait 3 to 5 days after completing verification to receive your temporary access code.

#### **Still need additional help?**

If you are still having issues with your two-factor authentication, follow the instructions provided in the **Verify device** stage of **Recover your account**.

___

## Related resources

-   [Google Authentication documentation](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
-   [YubiKey documentation](https://www.yubico.com/works-with-yubikey/catalog/cloudflare/)
-   [Setting up multi-user accounts on Cloudflare](/fundamentals/account-and-billing/members/)
