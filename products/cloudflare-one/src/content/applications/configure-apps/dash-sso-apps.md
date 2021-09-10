---
order: 3
pcx-content-type: how-to
---

# Cloudflare dashboard SSO application

By adding a **Dashboard SSO application** to your Cloudflare Teams account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice.

<Aside type="note">

Dashboard SSO is only available to Enterprise customers.

</Aside>

## Set up dashboard SSO

### Step 1 — Launch Cloudflare for Teams

To log into Cloudflare for Teams directly, go to the [Teams dashboard](https://dash.teams.cloudflare.com/) and select your account.

To log in through the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
1. Select an account and an application.
1. Navigate to **Access**.
1. Select **Launch Teams**.
1. Select your account.

### Step 2 — Set up an IdP

Configure an IdP following [our detailed instructions](/identity/idp-integration).

### Step 3 — Contact your account team

Ask your account team to approve your SSO domain.

### Step 4 — Customize your SSO application

Once your account team has approved your SSO domain, you will see an **SSO App** in the [Teams dashboard](https://dash.teams.cloudflare.com/) (under **Access** > **Applications**). This application automatically has a rule to `allow email domain` and uses your IdP as the authentication provider.

If you have multiple IdPs, manage your allowed providers in the **Authentication** tab of the **SSO App**.

For help creating additional policies (IP access lists, etc.), refer to [Zero Trust policies](/policies/zero-trust).

### Step 5 — Test your application

To test your SSO application:

1. Log into the [Teams dashboard](https://dash.teams.cloudflare.com/).
1. Navigate to **Settings** > **Authentication**.
1. In the **Cloudflare dashboard SSO** section, find your email domain.
1. Click **Test** and verify that your authentication works properly.

### Step 6 — Enable your SSO application

Once you have customized and tested your SSO application, you can enable it to enforce SSO authentication.

To enable your SSO application:

1. Log into the [Teams dashboard](https://dash.teams.cloudflare.com/).
1. Navigate to **Settings** > **Authentication**.
1. In the **Cloudflare dashboard SSO** section, find your email domain.
1. Set the toggle value to **Enabled**.