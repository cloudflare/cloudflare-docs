---
order: 3
pcx-content-type: navigation
---

# Identity

Cloudflare for Teams integrates with your organization's identity provider to apply Zero Trust and Secure Web Gateway policies. If you work with partners, contractors, or other organizations, you can integrate multiple identity providers simultaneously.

As an alternative to configuring an identity provider, Cloudflare for Teams can send a [one-time PIN (OTP)](/identity/one-time-pin) to approved email addresses. No configuration needed — simply add a user's email address to a [Zero Trust policy](/policies/zero-trust) and to the group that allows your team to reach the application.

You can simultaneously configure an OTP and an identity provider to allow users to use their own authentication method.

Additionally, Cloudflare for Teams can integrate with [endpoint protection providers](/identity/devices) to check requests for device posture. This allows you to configure security policies that rely on additional signals from endpoint security providers to allow or deny connections to your applications.

<DirectoryListing path="/identity"/>

## Related tutorials

* [Require U2F keys with Okta](/tutorials/okta-u2f)
* [Troubleshoot user login details](/tutorials/user-diagnostics)