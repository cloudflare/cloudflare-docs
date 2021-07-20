---
order: 3
pcx-content-type: faq
---

[❮ Back to FAQ](/faq)

# Identity

## Can Access work with multiple identity providers at the same time?

Yes. Your team can simultaneously use multiple providers, reducing friction when working with partners or contractors. Get started by adding your preferred identity providers as login methods on the Teams dashboard. Then, when securing a new application behind Access, you'll be able to choose which providers you want your users to log in with to reach that application. 

## What if the identity provider my team uses is not listed?

You can add your preferred identity providers to Cloudflare Access even if you do not see them listed on the Teams dashboard, as long as these providers support SAML 2.0 or [OpenID Connect (OIDC)](/identity/idp-integration/generic-oidc). 

## How do end users log out of an application protected by Access?

Access provides a URL that will end a user's current session. To force log out of an Access application, use the following URL:

```
[your-application-domain]/cdn-cgi/access/logout
```

To log out of an App Launcher session, use the following URL:

```
[your-team-name].cloudflareaccess.com/cdn-cgi/access/logout
```

You can use these URLs to create custom logout buttons or links directly within applications.
