---
title: SSO integration
pcx_content_type: how-to
weight: 4
---

# SSO integration

For added security and convenience, Cloudflare Area 1 offers support for Security Assertion Markup Language based (SAML-based) single sign-on (SSO) logins. Organizations are able to choose between having users access Area 1 with a username and password plus a two-factor authentication (2FA) code, or using an SSO provider, such as OneLogin or Okta.

## SAML configuration options

- **Identity Provider initiated (IDP-initiated) SAML**: IDP-initiated configurations (like Okta or OneLogin) require the IDP to be accessible to the Area 1 infrastructure in order to successfully authenticate users. At the most basic level, the user selects an application from their IDP. Then, the IDP communicates with Area 1 using a SAML assertion to provide identity information for the user requesting to login to the Area 1 dashboard.
- **Service Provider Initiated (SP-initiated) SAML**: SP-initiated configurations are the most common SAML authentication mechanisms. The main difference compared to IDP is that the service provider (like Area 1) does not require any direct connection to the IDP in order to authenticate a user. The user's browser provides the ability for the SAML exchange to occur but the service provider and the IDP do not directly communicate with each other.

Area 1 only supports IDP-initiated SAML setup at this point.

## SSO enforcement

In the Area 1 dashboard, you can configure different types of SSO enforcement according to your needs. 

- **None**: Each user can choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).
- **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to log in using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.
- **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.


For more details on setup, refer to the following resources:

{{<directory-listing>}}
- [Cloudflare Access for SaaS](/cloudflare-one/tutorials/area-1/)