---
pcx_content_type: how-to
title: Cloudflare dashboard SSO application
weight: 4
---

# Cloudflare dashboard SSO application

By adding a **Dashboard SSO application** to your Cloudflare Zero Trust account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice.

Once you have configured SSO, every user that wants to login with Dashboard SSO will need to exist as a member in your Cloudflare account and IdP. If there is no Cloudflare member account for this user, the request will not forward the authentication phase to the IdP. Refer to [Managing Cloudflare account access](/fundamentals/account-and-billing/members/) for information on adding users to your Cloudflare account.

{{<Aside type="note">}}

Dashboard SSO is only available to Enterprise customers on the Standard or Premium Success Plans.

{{</Aside>}}

## Set up dashboard SSO

### Step 1 — Launch Cloudflare Zero Trust

To log in to Cloudflare Zero Trust, go to [Zero Trust](https://one.dash.cloudflare.com/).

### Step 2 — Set up an IdP

Configure an IdP following [our detailed instructions](/cloudflare-one/identity/idp-integration/).

Once you configure your IdP, make sure you also [test your IdP](/cloudflare-one/identity/idp-integration/#test-idps-in-zero-trust).

### Step 3 — Contact your account team

Ask your account team to approve and create your SSO domain. The SSO domain can be configured for multiple email domains associated with the members in your Cloudflare account. For example, if your SSO domain is configured for emails ending in `@example.com`, a member with email `@test.com` would not see the **Log in with SSO** option and would have to enter their username and password.

### Step 4 — Test and enable your application

To test and enable your SSO application:

1. Log in to [Zero Trust](https://one.dash.cloudflare.com/).
2. Go to **Settings** > **Authentication**.
3. In the **Cloudflare dashboard SSO** section, find your email domain.
4. Set the toggle value to **Enabled**. This action can only be performed by Account Super Administrators.
5. **Do not** log out or close your browser window. Instead, open a different browser or an incognito window.
6. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) and log in with your email address from your SSO domain.
7. If you can log in successfully, you have successfully set up your SSO application.
8. If you cannot log in successfully:

   1. Return to [Zero Trust](https://one.dash.cloudflare.com/).
   2. For **Cloudflare dashboard SSO**, set your email domain to **Disabled**.
   3. [Re-configure your IdP](/cloudflare-one/identity/idp-integration/).
