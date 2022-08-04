---
pcx_content_type: navigation
title: Identity
weight: 4
---

# Identity

Cloudflare Zero Trust integrates with your organization's identity provider to apply Zero Trust and Secure Web Gateway policies. If you work with partners, contractors, or other organizations, you can integrate multiple identity providers simultaneously.

As an alternative to configuring an identity provider, Cloudflare Zero Trust can send a [one-time PIN (OTP)](/cloudflare-one/identity/one-time-pin/) to approved email addresses. No configuration needed — simply add a user's email address to an [Access policy](/cloudflare-one/policies/access/) and to the group that allows your team to reach the application.

You can simultaneously configure an OTP and an identity provider to allow users to use their own authentication method.

Additionally, Cloudflare Zero Trust can integrate with [endpoint protection providers](/cloudflare-one/identity/devices/) to check requests for device posture. This allows you to configure security policies that rely on additional signals from endpoint security providers to allow or deny connections to your applications.

{{<directory-listing>}}

## Related tutorials

*   [Require U2F keys with Okta](/cloudflare-one/tutorials/okta-u2f/)
*   [Troubleshoot user login details](/cloudflare-one/tutorials/user-diagnostics/)
