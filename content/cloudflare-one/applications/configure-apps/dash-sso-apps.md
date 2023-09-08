---
pcx_content_type: how-to
title: Cloudflare dashboard SSO application
weight: 3
---

# Set up Cloudflare dashboard SSO

By adding a Dashboard SSO application to your Cloudflare Zero Trust account, you can enforce single sign-on (SSO) to the Cloudflare dashboard with the identity provider (IdP) of your choice. SSO will be enforced for every user in your email domain.

## Availability

{{<feature-table id="account.single_sign_on">}}

## Prerequisites

All users in your email domain must exist as a member in your Cloudflare account and IdP.  To add users to your Cloudflare account, refer to [Manage Cloudflare account access](/fundamentals/account-and-billing/members/).

{{<Aside>}}

Cloudflare dashboard SSO does not support users with plus-addressed emails, such as `example+2@domain.com`. If you have users like this added to your Cloudflare organization, they will be unable to login with SSO.

{{</Aside>}}

## 1. Set up an IdP

Add an IdP to Cloudflare Zero Trust by following [our detailed instructions](/cloudflare-one/identity/idp-integration/).

Once you configure your IdP, make sure you also [test your IdP](/cloudflare-one/identity/idp-integration/#test-idps-in-zero-trust).

## 2. Contact your account team

Ask your account team to approve and create your SSO domain. An SSO domain is the email domain associated with the members in your Cloudflare account. For example, if your SSO domain is configured for emails ending in `@yourcompany.com`, a member with email `@test.com` would not see the **Log in with SSO** option and would have to enter their username and password.

Once your SSO domain is approved, a new **SSO App** application will appear under **Access** > **Applications**. The application is pre-configured with `allow email domain` as the default rule and your IdP as the authentication providers.

### SSO domain requirements

- The email domain must belong to your organization. Public email providers such as `@gmail.com` are not allowed.
- Every user with that email domain must be an employee in your organization. For example, university domains such as `@harvard.edu` are not allowed because they include student emails.
- Your SSO domain can include multiple email domains.

## 3. Enable dashboard SSO

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Authentication**.
2. In the **Cloudflare dashboard SSO** card, set your email domain to **Enabled**. This action can only be performed by Super Administrators.
3. Do not log out or close your browser window. Instead, open a different browser or an incognito window.
4. In the [Cloudflare dashboard](https://dash.cloudflare.com), log in with your email address from your SSO domain.
5. If you can log in successfully, you have successfully set up your dashboard SSO application.
6. If you cannot log in successfully:

   1. Return to [Zero Trust](https://one.dash.cloudflare.com/) and go to **Settings** > **Authentication**.
   2. For **Cloudflare dashboard SSO**, set your email domain to **Disabled**.
   3. [Re-configure your IdP](/cloudflare-one/identity/idp-integration/).
