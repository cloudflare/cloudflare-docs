---
order: 3
pcx-content-type: how-to
---

# Cloudflare dashboard SSO application

By adding a **Dashboard SSO application** to your Cloudflare Zero Trust account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice.

Once you have configured SSO, every user that wants to login with Dashboard SSO will need to also be a Cloudflare user. If the account does not exist, the request will not forward the authentication phase to the Identity Provider. Refer to [Managing Cloudflare account access](https://support.cloudflare.com/hc/articles/200167946#12345680) for information on adding users to your Cloudflare account.

Identity Provider initiated logins are not supported. As a workaround, a bookmark to https://dash.cloudflare.com/login can be implemented in your Identity Provider dashboard.

<Aside type="note">

Dashboard SSO is only available to Enterprise customers.

</Aside>

## Set up dashboard SSO

### Step 1 — Launch Cloudflare Zero Trust

To log into Cloudflare Zero Trust directly, go to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/) and select your account.

To log in through the Cloudflare dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
1. Log into the [Zero Trust dashboard](/setup#start-from-the-cloudflare-dashboard).

### Step 2 — Set up an IdP

Configure an IdP following [our detailed instructions](/identity/idp-integration).

Once you configure your IdP, make sure you also [test your IdP](/identity/idp-integration#test-idps-on-the-teams-dashboard).

### Step 3 — Contact your account team

Ask your account team to approve your SSO domain.

### Step 4 — Test and enable your application

To test and enable your SSO application:

1. Log into the [Zero Trust dashboard](https://dash.teams.cloudflare.com/).
1. Navigate to **Settings** > **Authentication**.
1. In the **Cloudflare dashboard SSO** section, find your email domain.
1. Set the toggle value to **Enabled**.
    1. This action can only be performed by Account Super Administrators.
1. **Do not** log out or close your browser window. Instead, open a different browser or an incognito window.
1. Navigate to the [Cloudflare dashboard](https://dash.cloudflare.com) and log in with your email address from your SSO domain.
1. If you can log in successfully, you have successfully set up your SSO application.
1. If you cannot log in successfully:

    1. Return to the [Zero Trust dashboard](https://dash.teams.cloudflare.com/).
    1. For **Cloudflare dashboard SSO**, set your email domain to **Disabled**.
    1. [Re-configure your IdP](/identity/idp-integration).
