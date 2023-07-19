---
pcx_content_type: faq
title: Identity
weight: 4
meta:
  description: Review frequently asked questions about identity and identity providers in Cloudflare Zero Trust.
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Identity

## Can Access work with multiple identity providers at the same time?

Yes. Your team can simultaneously use multiple providers, reducing friction when working with partners or contractors. Get started by adding your preferred identity providers as login methods in Zero Trust. Then, when securing a new application behind Access, you'll be able to choose which providers you want your users to log in with to reach that application.

## What if the identity provider my team uses is not listed?

You can add your preferred identity providers to Cloudflare Access even if you do not see them listed in Zero Trust, as long as these providers support SAML 2.0 or [OpenID Connect (OIDC)](/cloudflare-one/identity/idp-integration/generic-oidc/).

## How do end users log out of an application protected by Access?

Access provides a URL that will end a user's current session.

To force log out of an Access application, go to:

`<your-application-domain>/cdn-cgi/access/logout`

To log out of an App Launcher session, go to:

`<your-team-name>.cloudflareaccess.com/cdn-cgi/access/logout`

For more information, refer to our [session management page](/cloudflare-one/identity/users/session-management/#log-out-as-a-user).
