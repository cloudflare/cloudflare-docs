---
pcx_content_type: how-to
title: Session management
weight: 3
---

# Manage user sessions

## Session duration

When users log in to an application protected by Access, Access generates two session tokens:

{{<table-wrap>}}

| Token                    | Description                                                        | Storage                                                              |
| ------------------------ | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Global session token** | Establishes the maximum amount of time for a user’s Access session | Your Cloudflare [team domain](/cloudflare-one/glossary/#team-domain) |
| **Application token**    | Establishes a session for a specific application                   | The hostname of the application protected                            |

{{</table-wrap>}}

When users log in, the global session token will default to the duration of the application token. You can configure the duration of the global session token to be shorter or longer than the application’s session token.

If the global session duration is shorter than an application’s session length, users will be required to re-authenticate each time the global session time elapses. This can be helpful to establish a maximum session duration across all applications.

If the global session duration is longer than an application’s session length, a user’s application session will be automatically refreshed until the global session expires. This provides a more secure way to allow for longer user sessions, since the global session cookie cannot be used to directly access an application.

### Set global session duration

You can set a global session duration between 15 minutes and 1 month.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Authentication**.
2. Under **Global session timeout**, click **Edit**,
3. Select the desired timeout duration from the dropdown menu.

### Set application session duration

You can set an application session duration ranging from immediate timeout to 1 month.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Applications**.
2. Locate the application you want to configure and click **Edit**.
3. In the **Overview** tab, select a **Session Duration** from the dropdown menu.

## Revoke user sessions

Access provides two options for revoking user sessions: per-application and per-user.

The authentication process involves Cloudflare Access issuing a signed JSON Web Token (JWT) when a user authenticates and meets the criteria defined in your Access application policy. The token is valid for the duration configured in the application (default is 24 hours). The user can access the application for the entire duration of that token’s lifecycle without re-authenticating until the session expires.

### Per-Application

To immediately terminate all active sessions for a specific application:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Applications**.

2. Locate the application for which you would like to revoke active sessions and click **Edit**.

3. In the **Overview** tab, click **Revoke existing tokens**.

Unless there are changes to rules in the policy, users can generate a new token during authentication if their profile in your identity provider is still active.

### Per-User

Access can immediately revoke a single user session across all applications in your account.However, if the user’s identity profile is still active, they can generate a new session.

If you want to permanently revoke a user's access:

1. Disable their account in your identity provider so that they cannot authenticate.

2. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Users**.

3. Search for and select the user you want to revoke.

4. Click **Update Status** > **Revoke access**.

The user will no longer be able to log in to any application protected by Access. The user will still count towards your seat subscription until you [remove the user](/cloudflare-one/identity/users/seat-management) from your account.

### Subsequent Logins

When administrators revoke a user's Cloudflare Access token, that user will not be able to log in again for up to 1 minute. If they attempt to do so, Cloudflare Access will display an error.

## AJAX

Pages that rely heavily on AJAX or single-page applications can block sub-requests due to an expired Access token without prompting the user to re-authenticate.

You can configure Access to provide a `401` response on sub-requests with an expired session token. We recommend using this response code to either force a page refresh or to display a message to the user that their session has expired.

In order to receive a `401` for an expired session, add the following header to all AJAX requests:

`X-Requested-With: XMLHttpRequest`
