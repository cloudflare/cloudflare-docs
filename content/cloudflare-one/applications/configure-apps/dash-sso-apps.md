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

All users in your email domain must exist as a member in your Cloudflare account and IdP.  To add users to your Cloudflare account, refer to [Manage Cloudflare account access](/fundamentals/setup/manage-members/).

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

   1. Return to Zero Trust and go to **Settings** > **Authentication**.
   2. For **Cloudflare dashboard SSO**, set your email domain to **Disabled**.
   3. [Re-configure your IdP](/cloudflare-one/identity/idp-integration/).

## Limitations

Cloudflare dashboard SSO does not support:

- Users with plus-addressed emails, such as `example+2@domain.com`. If you have users like this added to your Cloudflare organization, they will be unable to login with SSO.
- IdP initiated logins (such as a tile in Okta). All login attempts must originate from `https://dash.cloudflare.com`. You can create a bookmark for this URL in your IdP to assist users.

## Bypass dashboard SSO

This section describes how to restore access to the Cloudflare dashboard in case you are unable to login with SSO.

### Option 1: Add a backup IdP

If there is an issue with your SSO IdP provider, you can add an alternate IdP using the API. The following example shows how to add [Cloudflare One-time PIN](/cloudflare-one/identity/one-time-pin/) as a login method:

1. Enable one-time PIN :

```sh
```

2. Get the `id` of the **SSO App** Access application:

```sh

```

3. Configure **SSO App** to accept all identity providers:

```sh

```

Users will now have the option to log in using a one-time PIN.

### Option 2: Disable dashboard SSO

The following API calls will disable SSO enforcement for an account. You must be a Super Administrator to make this change.

1. Get your SSO `connector_id`:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/sso/v2/connectors \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"

"result": [
    {
      "connector_id": "2828",
      "connector_tag": "d616ac82cc7f87153112d75a711c5c3c",
      "email_domain": "domain.com",
      "connector_status": "V",
     } ]
```

2. Disable the SSO connector:

```bash
curl -X 'PATCH' 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/sso/v2/connectors/2828' \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json" \
     --data-raw '{"sso_connector_status":"DIS"}'

"result":{"id":"2828"},"success":true,"errors":[],"messages":[]}
```

Users can now log in using their Cloudflare account email and password.
