---
title: Authenticate without integrated SSO
pcx_content_type: overview
weight: 2
layout: learning-unit
---

A common goal for many security organizations is to implement continuous authentication and authorization. The challenge is to accomplish this without introducing significant user interruption or requiring behavioral changes for your end users. Instead of [managing a direct SSO integration](/learning-paths/zero-trust-web-access/migrate-applications/integrated-sso/) in your application, you can use the JSON Web Token (JWT) issued by Cloudflare Access to authenticate requests. Cloudflare becomes the primary responsible party for validating the token returned from your SSO provider, and your users only have a single authentication event required to access their applications.

## Consume the Cloudflare JWT

When Cloudflare sends a request to your application, the request will include a JWT signed with a key pair unique to your account. You can build a workflow in your application to [validate the Cloudflare Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/). This will give you stronger-than-HTML security for users who have authenticated to Cloudflare and will make your user login experience seamless.

## Send authorization headers with Workers

When applications do not have integrated SSO, or any other method to deliver just-in-time (JIT) user provisioning or management, it is common to look for a way within Cloudflare to automatically pass user information into the private application. To best accomplish this, we recommend using Cloudflare Workers to send custom HTTP headers. As requests route through Cloudflare's network to your application, the Worker can insert headers into the request which contain the user's identity, device posture attributes, and other custom SAML/OIDC claims from the [Cloudflare Access JWT](/cloudflare-one/identity/authorization-cookie/application-token/).

Refer to [this tutorial](/cloudflare-one/tutorials/access-workers/) for setup details.
