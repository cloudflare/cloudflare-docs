---
pcx_content_type: how-to
title: Log into Cloudflare
weight: 3
---

# Log into Cloudflare

To log into the Cloudflare dashboard, go to the [Login page](https://dash.cloudflare.com/login) and choose your [sign-in option](#sign-in-options).

---

## Sign-in options

Cloudflare offers the following sign-in options:

### Email and password

Enter your email address and password.

### Single Sign-On (SSO) 

Enter your email address (available if your admin has [enabled SSO](/cloudflare-one/applications/configure-apps/dash-sso-apps/)).

{{<Aside type="note">}}

If you log into your Cloudflare user account with Single Sign-On (SSO), you will not be able to sign in with Apple.

{{</Aside>}}

### Sign in with Apple 

- *Same Cloudflare account email as Apple ID*: You can either sign in with your email and password or sign in with Apple.

- *Different Cloudflare account email as Apple ID*: This will create a new Cloudflare account. If you want to log into an existing account, [change your email address](/fundamentals/account-and-billing/account-billing/change-password-or-email/) to match the one used for your Apple ID.

If you have chosen to share your email when creating a Cloudflare account with Apple ID and want to set a password and obtain an API key, go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) login page and select **Forgot your password?** to trigger a password reset email.

If you have chosen to hide your email when creating a Cloudflare account with Apple ID, resetting your password will not work. You can use the suggested workaround below:

1. [Add a new member to your account](/fundamentals/setup/manage-members/manage/#add-account-members). For example, a secondary email address.
2. [Register a new Cloudflare account](/fundamentals/setup/account-setup/create-account/) with your secondary email address and set a password.
3. Access the Cloudflare dashboard with the new user and password to obtain an API key. 

Changing your Cloudflare account email address will unlink the login credentials with the Apple ID from your Cloudflare account. Attempting to log in using the same Apple ID after the email is changed will create a new Cloudflare account.

If you have created your Cloudflare account using Apple Relay and decide to change your Apple ID or email address, you are unable to retrieve the Cloudflare account and all login options are permanently lost.