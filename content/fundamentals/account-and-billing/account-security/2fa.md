---
title: Two-factor authentication
pcx_content_type: how-to
weight: 2
---

# Secure user access with two-factor authentication (2FA)

## Overview

{{<render file="_2fa-overview.md" productFolder="support">}}

___

## Enable two-factor authentication for your Cloudflare account

{{<render file="_2fa-enable.md" productFolder="support">}}

___

## Configure security key authentication for two-factor Cloudflare login

{{<Aside type="warning">}}
Security keys only work with browsers that support the WebAuthn protocol.
{{</Aside>}}

A security key provides phishing-resistant multifactor authentication to your Cloudflare account using a built-in authenticator (Apple Touch ID, Android fingerprint, or Windows Hello) or an external hardware key (like [YubiKey](https://www.yubico.com/works-with-yubikey/catalog/cloudflare/)) that connects to your computer through USB-A, USB-C, NFC, or Bluetooth.

Cloudflare recommends configuring multiple security keys. With multiple keys, you can still use 2FA if the primary key is unavailable or if you are working on a different device.

After [enabling 2FA on your Cloudflare account](/fundamentals/account-and-billing/account-security/2fa/#enable-two-factor-authentication-for-your-cloudflare-account), you can select **Manage** to configure 2FA security key authentication.

### Configure a built-in authenticator (Apple Touch ID, Android fingerprint, or Windows Hello)

1. In **Security Key Authentication**, select **Add**.
2. On the **Add a Security Key**, enter your Cloudflare password and select **Next**.
3. Interact with your built-in authenticator to add it to your Cloudflare account. 
4. Enter a name for the built-in authenticator. If this is the initial setup, you will be prompted to generate backup codes. If not, skip to Step 8.
5. Enter your Cloudflare password. 
6. Select **Next** to review your backup codes. Backup codes can be used to access your user account without your mobile device.
7. Select **Download**, **Print**, or **Copy** to save your backup codes in a secure location.
8. Select **Next** to finish the configuration.

### Configure a security key (YubiKey)

Ensure that your hardware security key is configured and plugged in. On a Windows device, you may need to set up Windows Hello or register your security key to your Microsoft account. Review the Windows documentation for more details.

1. Once your security key is plugged in, go to **Security Key Authentication** and select **Add**.
2. Enter your Cloudflare password on the **Add a Security Key** screen, then select **Next**.
3. Interact with your security key to add it to your Cloudflare account. Ensure that the dialog is for the security key setup. If the Windows Hello dialog appears on a Windows device, select **Cancel**. The security key dialog box will then appear. Depending on your system, you may be required to register a PIN for the security key.
4. Enter a name for the security key. If this is the initial setup, you will be prompted to generate backup codes. If not, skip to Step 8.
5. Enter your Cloudflare password. 
6. Select **Next** to review your backup codes. Backup codes can be used to access your user account without your mobile device.
7. Select **Download**, **Print**, or **Copy** to save your backup codes in a secure location.
8. Select **Next** to finish the configuration. 

___

## Configure TOTP mobile application authentication for two-factor Cloudflare login

1. Under **Mobile App Authentication**, select **Add**.
2. Scan the QR code with your mobile device and enter the code from your authenticator application.
3. Enter your Cloudflare password, then select **Next**. If you cannot scan the QR code, select **Can't scan QR code, Follow alternative steps** to configure your authenticator application manually.

![You can enable 2FA by scanning a QR code with your mobile device.](/images/fundamentals/2FA_scan_QR_code.png)

4. Enter your Cloudflare password again.
5. Select **Next** to review your backup codes. You can use backup codes to access your account without your mobile device.  
6. Select **Download**, **Print**, or **Copy** to save your backup codes in a secure location.

{{<Aside type="note">}}
You can regenerate your backup codes at any time using the Cloudflare dashboard.
{{</Aside>}}

7. Select **Next** on the backup code page to complete the recovery code setup. 

### Reconfigure TOTP mobile application authentication

You may need to reconfigure your mobile application authentication if you join a new organization or lose access to your mobile device. When you reconfigure your mobile application authentication, your previous TOTP codes are invalid.

{{<Aside type="note">}}
Reconfiguring TOTP mobile application authentication does not turn off 2FA.
{{</Aside>}}

To reconfigure, follow [Steps 1-7](/fundamentals/account-and-billing/account-security/2fa/#configure-totp-mobile-application-authentication-for-two-factor-cloudflare-login) as detailed above.

___

## Regenerate backup codes

Each backup code is one-time use only, but you can always request a new set of backup codes using the Cloudflare dashboard. This is useful if you have lost access to or used all of your previous backup codes.

{{<Aside type="note">}}
Regenerating your backup codes will invalidate your previous codes.
{{</Aside>}}

1.  Log in to the Cloudflare dashboard.
2.  Select **My Profile**.
3.  Select **Authentication**.
4.  Select **Regenerate** to generate and save a new set of two-factor backup codes.

___

## Disable two-factor authentication for your Cloudflare account

To disable 2FA for your Cloudflare account, you must delete all security keys and TOTP authenticators from your account.

{{<Aside type="note">}}
If you are not the Super Administrator of an organization with **2FA Enforcement** enabled, you may not have permission to disable 2FA.
{{</Aside>}}

1.  Log in to the Cloudflare dashboard
2.  Select **My Profile**.
3.  Select the **Authentication**.
4.  To remove your security key: 

    1. Select **Edit** in the **Security Key Authentication** card. A drop-down menu shows more details about your security key.
    2. Select **Delete**.
    3. Enter your Cloudflare password, then select **Remove**.

5. To remove your TOTP mobile application authentication: 

    1. Select **Delete method** in the **Mobile App Authentication** card.
    2. Enter your Cloudflare password, authenticator application code, or a recovery code, then select **Disable**.

![how to disable your TOTP mobile application authentication.](https://developerdocsgifs.cloudflaretraining.com/resampled_5fps_disable_mobile_auth_v2_final.gif)

___

## Use a backup code

If you lose access to a mobile device, security key, or authentication code, you can solve these issues by using a backup code or retrieving a backup code from your preferred authentication app.

Refer to Google's documentation to [transfer Google Authenticator codes from one Android device to another](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en&oco=0).

When setting up 2FA, you should have saved your backup codes in a secure location. To restore lost access using a Cloudflare backup code:

1. Retrieve the backup code from where you stored it.
2. Go to the Cloudflare login page.
3. Enter the backup code in the login screen, then select **Log in**.

{{<Aside type="note">}}
Once you use a backup code, it becomes invalid.
{{</Aside>}}

## Recover your account

If you do not have access to your 2FA account or backup codes and cannot currently generate a 2FA code, use a verified device that you have logged in from before to request a temporary access code.

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. On the **Two-Factor Authentication** page, select **Try recovery** on **Lost all 2FA devices and backup codes?*.
3. Select **Begin recovery**.
4. A 6-digit access code will be sent to the email address associated with your Cloudflare account.
5. Enter the temporary access code into the Cloudflare Dashboard and select **Verify email**.
6. You will now be asked to verify your device using a device that you have logged in from before by clicking on "Verify device"
7. If you receive a "Device verification failed" message:

    - If you clear your cookies often or are logging in from a different IP address, you have wiped Cloudflare's memory of your device and will need to use a different device to verify.
   - For security reasons, you must wait three to five days after completing verification to receive your temporary access code.
    3. Errors like "Device verification failed" are usually a results of missing cookies, so sure that you have your browser set to save cookies and     not to clear cookies on exit or after browser and OS Upgrades.
    - You may be using anti-malware or other software that automatically clears your browser cookies and makes your device unregognizable by Cloudflare's Dashboard.

8. If at this point you are still unable to successfully enter the Cloudflare Dashboard due to a 2FA issue please **Contact Support**
https://dash.cloudflare.com/login-help

___

## Related resources

- [Google Authentication documentation](https://support.google.com/accounts/answer/1066447?hl=en&ref_topic=2954345&co=GENIE.Platform%3DiOS&oco=0)
- [YubiKey documentation](https://www.yubico.com/works-with-yubikey/catalog/cloudflare/)
- [Set up multi-user accounts on Cloudflare](/fundamentals/setup/manage-members/)
