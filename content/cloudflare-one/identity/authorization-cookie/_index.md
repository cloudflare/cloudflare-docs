---
pcx-content-type: concept
title: Authorization cookie
weight: 12
layout: single
---

# Cloudflare authorization cookie

When you protect a site with Cloudflare Access, Cloudflare checks every HTTP request bound for that site to ensure that the request has a valid `CF-Authorization` cookie. The cookie contains the user's identity in [JSON format](#access-jwts). If a request does not include the cookie, or if the identity data in the cookie does not match an Allow policy, the request will be blocked.

## Access JWTs

Cloudflare Access uses JSON Web Tokens (JWTs) to confirm a user’s identity before allowing or denying access to sensitive resources. Cloudflare securely creates these tokens through the OAUTH or SAML integration between Cloudflare Access and the configured identity provider.

Two tokens are generated:

- **Global session token**: a token generated when a user logs in to Access. This token is stored as a cookie at your [team domain](/cloudflare-one/glossary/#team-domain) (for example, `https://<your-team-name>.cloudflareaccess.com`) and prevents a user from needing to log in to each application.

- [**Application token**](/cloudflare-one/identity/authorization-cookie/application-token/): a token generated for each application that a user reaches. This token is stored as a cookie on the application (for example, `https://jira.site.com`) and may be used to [validate requests](/cloudflare-one/identity/authorization-cookie/validating-json) on your origin.

## Allow cross-site cookies in Firefox

By default, Firefox Private Browsing mode blocks all cross-site cookies including the `CF-Authorization` cookie. For XHR requests to work in private windows, you will need to exempt your site and [team domain](/cloudflare-one/glossary/#team-domain) from the browser's tracking protection system.

To enable cross-site cookies in Firefox:

1. In Firefox, go to **Settings** > **Privacy & Security**.
2. Scroll down to **Cookies and Site Data**.
3. Select **Manage Exceptions**.
4. Enter the URL of your Access application (for example, `https://jira.site.com`) and select **Allow**.
5. Enter `https://<your-team-name>.cloudflareaccess.com` and select **Allow**.
6. Select **Save Changes**.

You can now make XHR requests to your Access application in Firefox Private Browsing mode.
