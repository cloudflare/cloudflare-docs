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
2. Under **Global session timeout**, select **Edit**,
3. Select the desired timeout duration from the dropdown menu.

### Set application session duration

You can set an application session duration ranging from immediate timeout to 1 month.

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Applications**.
2. Locate the application you want to configure and select **Edit**.
3. In the **Overview** tab, select a **Session Duration** from the dropdown menu.

## Revoke user sessions

Access provides two options for revoking user sessions: per-application and per-user.

The authentication process involves Cloudflare Access issuing a signed JSON Web Token (JWT) when a user authenticates and meets the criteria defined in your Access application policy. The token is valid for the duration configured in the application (default is 24 hours). The user can access the application for the entire duration of that token’s lifecycle without re-authenticating until the session expires.

### Per-Application

To immediately terminate all active sessions for a specific application:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Applications**.

2. Locate the application for which you would like to revoke active sessions and select **Edit**.

3. In the **Overview** tab, select **Revoke existing tokens**.

Unless there are changes to rules in the policy, users can generate a new token during authentication if their profile in your identity provider is still active.

### Per-User

Access can immediately revoke a single user session across all applications in your account. However, if the user’s identity profile is still active, they can generate a new session.

If you want to permanently revoke a user's access:

1. Disable their account in your identity provider so that they cannot authenticate.

2. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Users**.

3. Search for and select the user you want to revoke.

4. Select **Update Status** > **Revoke access**.

The user will no longer be able to log in to any application protected by Access. The user will still count towards your seat subscription until you [remove the user](/cloudflare-one/identity/users/seat-management) from your account.

### Subsequent Logins

When administrators revoke a user's Cloudflare Access token, that user will not be able to log in again for up to 1 minute. If they attempt to do so, Cloudflare Access will display an error.

## Log out as a user

To log out of Access, the end user can visit either of the following URLs:

- `<your-application-domain>/cdn-cgi/access/logout`
- `<your-team-name>.cloudflareaccess.com/cdn-cgi/access/logout`

This action [revokes the user's session](#per-user) across all applications. Access will immediately clear the authorization cookie from the user's browser, and all previously issued tokens will stop being accepted in 20-30 seconds. The only difference between these two URLs is which domain the authorization cookie is deleted from. For example, going to `<your-application-domain>/cdn-cgi/access/logout` will remove the application cookie and make the logout action feel more instantaneous.

You can use these URLs to create custom logout buttons or links directly within your application.

{{<Aside type="note">}}
At this time, end users cannot log themselves out on a per-application basis.
{{</Aside>}}

## AJAX

Pages that rely heavily on AJAX or single-page applications can block sub-requests due to an expired Access token without prompting the user to re-authenticate.

You can configure Access to provide a `401` response on sub-requests with an expired session token. We recommend using this response code to either force a page refresh or to display a message to the user that their session has expired.

In order to receive a `401` for expired session, add the following header to all AJAX requests:

`X-Requested-With: XMLHttpRequest`

## Configure browser cookie settings

Cloudflare Access provides optional security settings that can be added to the browser cookies generated by Access for an authenticated user. The three enhanced browser cookie settings available are:

- [SameSite](#samesite-attribute)
- [HttpOnly flag](#httponly)
- [Binding cookie](#enable-binding-cookie)

To enable these settings:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access** > **Applications**.

2. Locate the application you would like to configure and select **Edit**.

3. Select **Settings** and scroll down to **Cookie settings**.

4. Configure the desired cookie settings.

5. Select **Save application**.

### SameSite Attribute

The [SameSite](https://web.dev/samesite-cookies-explained/) Attribute selector restricts the cookie to only being sent if the cookie’s defined site matches the site being requested in the browser. This adds protection against [cross-site request forgery (CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

The selector options are:

- **None** - Cookies will be sent in all contexts, including cross-origin requests.
- **Lax** - Cookies are allowed to be sent with top-level navigations and will be sent along with GET requests initiated by third party websites.
- **Strict** - Cookies will only be sent in a first-party context and not be sent along with requests initiated by third party websites.

Refer to the [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) for more information.

#### When not to use SameSite

Do not enable SameSite restrictions if you have additional sites or applications that rely on a specific application’s authorization cookie.

### HttpOnly

The HttpOnly flag is a cookie attribute that prevents the cookie from being accessed by any client-side scripts, reducing the likelihood of Cross-Site Scripting (XSS) attacks. This flag is enabled by default.

#### When not to use HttpOnly

Do not enable HttpOnly if:

- You are using the Access application for non-browser based tools.
- You have software that relies on being able to access a user’s cookie generated by Access.

### Binding Cookie

The Binding Cookie is an additional cookie created when a user successfully authenticates, shared with Cloudflare to verify identity, and then stripped before it reaches the origin server. The Binding Cookie associates the browser with the Access token; the association protects against compromised authorization tokens because the origin webapp would never see this binding cookie. This protects against session hijack style attacks.

#### When not to use the Binding Cookie

Do not use the Binding Cookie for:

- Non-browser based Access applications that rely on protocols such as SSH and RDP
- Routes that use Cloudflare Workers
