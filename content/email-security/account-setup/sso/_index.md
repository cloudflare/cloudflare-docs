---
title: SSO integration
pcx_content_type: how-to
weight: 4
---

# SSO integration

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

For added security and convenience, Email Security (formerly Area 1) offers support for {{<glossary-tooltip term_id="SAML">}}Security Assertion Markup Language based (SAML-based){{</glossary-tooltip>}} single sign-on (SSO) logins. Organizations are able to choose between having users access Email Security (formerly Area 1) with a username and password plus a {{<glossary-tooltip term_id="two-factor authentication (2FA)">}}two-factor authentication (2FA){{</glossary-tooltip>}} code, or using an SSO provider, such as OneLogin or Okta.

## SAML configuration options

- **Identity Provider initiated (IDP-initiated) SAML**: IDP-initiated configurations (like Okta or OneLogin) require the IDP to be accessible to the Email Security infrastructure in order to successfully authenticate users. At the most basic level, the user selects an application from their IDP. Then, the IDP communicates with Email Security using a SAML assertion to provide identity information for the user requesting to login to the Email Security dashboard.
- **Service Provider Initiated (SP-initiated) SAML**: SP-initiated configurations are the most common SAML authentication mechanisms. The main difference compared to IDP is that the service provider (like Email Security) does not require any direct connection to the IDP in order to authenticate a user. The user's browser provides the ability for the SAML exchange to occur but the service provider and the IDP do not directly communicate with each other.

Email Security (formerly Area 1) only supports IDP-initiated SAML setup at this point.

## Setup

For more details on setup, refer to the following resources:

{{<directory-listing>}}