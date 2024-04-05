---
title: Configure an identity provider
pcx_content_type: overview
weight: 5
layout: learning-unit
---

An [identity provider (IdP)](https://www.cloudflare.com/learning/access-management/what-is-an-identity-provider/) stores and manages users’ digital identities. You can integrate your existing identity provider with Cloudflare Zero Trust in order to manage user access to your private network. This requires configuration both in Cloudflare and with the identity provider itself.

{{<Aside type="note">}}
Some admins choose to test by authenticating with a [one-time PIN (OTP)](/cloudflare-one/identity/one-time-pin/) instead of an IdP. OTP can also be used as an alternative login method for contractors or other guests that are not part of your IdP.
{{</Aside>}}

To add an identity provider:

{{<render file="access/_idp-integration.md" productFolder="cloudflare-one">}}

Users will now be able to select this IdP when they are prompted to authenticate. To learn more about IdP configuration, refer to [SSO integration](/cloudflare-one/identity/idp-integration/).
