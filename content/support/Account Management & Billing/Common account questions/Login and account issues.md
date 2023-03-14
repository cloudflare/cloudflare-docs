---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/203471284-Login-and-account-issues
title: Login and account issues
---

# Login and account issues

## Forgot your email?

#### **Enterprise plans**

If you forget the email address associated with your account, contact your Customer Success Manager.

#### **Free, Pro, and Business plans**

If you forget the email address associated with your application:

1\. Go to [](http://dash.cloudflare.com/forgot-email)[Forgot Email?](https://dash.cloudflare.com/forgot-email)

2\. Enter your domain name.

3\. Cloudflare will send an email to the address associated with your domain name. If you do not receive an email within 20 minutes, check your spam folder. The message will be sent from `no-reply@cloudflare.com` or `noreply@notify.cloudflare.com`.

{{<Aside type="note">}}
This process does not affect your account or share your email address
with anyone.
{{</Aside>}}

If you still cannot access the email address associated with your Cloudflare account, you need to [move your domain to another account](https://support.cloudflare.com/hc/articles/204615358).

Cloudflare requires these steps to prevent account hijacking.

___

## Forgot your password?

If you forget your account password:

1\. Go to [](http://dash.cloudflare.com/forgot-email)[Password Reset](https://dash.cloudflare.com/password-reset).

2\. Enter your email address.

3\. You should receive an email from Cloudflare. If you do not receive it within 20 minutes, check your spam folder. The message will be sent from `no-reply@cloudflare.com` or `noreply@notify.cloudflare.com`.

4\. Select the password reset link. This link will expire after two hours.

{{<Aside type="tip">}}
Cloudflare recommends strong passwords. Minimum requirements are:

-   Password must be at least 8 characters.
-   Password must contain a digit.
-   Password must contain a special character.
{{</Aside>}}

{{<Aside type="note">}}
If you still cannot access your account, look for help in the
[Cloudflare
Community](https://community.cloudflare.com/t/i-cannot-login-to-my-account/27823).
{{</Aside>}}

___

## Issues with two-factor authentication?

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

## Cannot verify your email?

For more help with email verification, refer to [Verify email address](/fundamentals/account-and-billing/account-setup/verify-email-address/).

___

## Change your Cloudflare email address or password

For more help, refer to [Change password or email address](/fundamentals/account-and-billing/account-maintenance/change-password-or-email/).

___

## Secure a compromised account

If you observe suspicious activity within your Cloudflare account, secure your account via [these steps](/fundamentals/account-and-billing/account-security/securing-a-compromised-account/).

___

## Sign-in options

You have several sign-in options for the [Cloudflare dashboard](https://dash.cloudflare.com/login):

-   **Email and password**: Enter your email address and password to log in.
-   **Single sign on (SSO)**: Enter your email address (so long as your admin has [configured SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/) as a sign in option).
-   **Sign in with Apple**:
    -   _Same Cloudflare account email as Apple ID_: You can either sign in with your email and password or sign in with Apple.
    -   _Different Cloudflare account email as Apple ID_: Will create a new Cloudflare account if you sign in with Apple. If you want to log into an existing account, [change your email address](https://support.cloudflare.com/hc/en-us/articles/203471284-Login-and-account-issues#12345679) to match the one used for your Apple ID.

{{<Aside type="note">}}
If you login to your Cloudflare user account with Single Sign-On (SSO),
you will not be able to sign in with Apple.
{{</Aside>}}

___

## Related resources

-   [Moving domains between Cloudflare accounts](https://support.cloudflare.com/hc/articles/204615358)
-   [Securing user access with two-factor authentication (2FA)](https://support.cloudflare.com/hc/articles/200167906)
-   [Changing your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/articles/205195708)
-   [Managing API keys and tokens](https://support.cloudflare.com/hc/articles/200167836)
