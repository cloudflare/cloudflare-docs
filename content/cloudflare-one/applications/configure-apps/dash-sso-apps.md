---
pcx_content_type: how-to
title: Cloudflare dashboard SSO application
weight: 4
---

# Cloudflare dashboard SSO application

By adding a **Dashboard SSO application** to your Cloudflare Zero Trust account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice.

Once you have configured SSO, every user that wants to login with Dashboard SSO will need to exist as a member in your Cloudflare account and IdP. If there is no Cloudflare member account for this user, the request will not forward the authentication phase to the IdP. Refer to [Managing Cloudflare account access](/fundamentals/account-and-billing/account-setup/manage-account-members/) for information on adding users to your Cloudflare account.

{{<Aside type="note">}}

Dashboard SSO is only available to Enterprise customers on the Standard or Premium Success Plans.

{{</Aside>}}

## Set up dashboard SSO

### Step 1 — Launch Cloudflare Zero Trust

To log in to Cloudflare Zero Trust directly, go to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/) and select your account.

To log in through the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
1.  Log in to the [Zero Trust dashboard](/cloudflare-one/setup/#start-from-the-cloudflare-dashboard).

### Step 2 — Set up an IdP

Configure an IdP following [our detailed instructions](/cloudflare-one/identity/idp-integration/).

Once you configure your IdP, make sure you also [test your IdP](/cloudflare-one/identity/idp-integration/#test-idps-on-the-teams-dashboard).

### Step 3 — Contact your account team

Ask your account team to approve and create your SSO domain. The SSO domain can be configured for multiple email domains associated with the members in your Cloudflare account. For example, if your SSO domain is configured for emails ending in `@example.com`, a member with email `@test.com` would not see the **Log in with SSO** option and would have to enter their username and password.

{{<Aside type="note">}}

  Mail providers (e.g. `gmail.com`) will not qualify.
  SSO is enforced for all users whose emails end in n owned given domain.
  
{{</Aside>}}

### Step 4 — Test and enable your application

To test and enable your SSO application:

1.  Log in to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/).
1.  Navigate to **Settings** > **Authentication**.
1.  In the **Cloudflare dashboard SSO** section, find your email domain.
1.  Set the toggle value to **Enabled**. This action can only be performed by Account Super Administrators.
1.  **Do not** log out or close your browser window. Instead, open a different browser or an incognito window.
1.  Navigate to the [Cloudflare dashboard](https://dash.cloudflare.com) and log in with your email address from your SSO domain.
1.  If you can log in successfully, you have successfully set up your SSO application.
1.  If you cannot log in successfully:

    1.  Return to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/).
    2.  For **Cloudflare dashboard SSO**, set your email domain to **Disabled**.
    3.  [Re-configure your IdP](/cloudflare-one/identity/idp-integration/).
