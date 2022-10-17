---
title: Generic SSO guide
pcx_content_type: how-to
weight: 1
---

# Single sign-on Overview

For added security and convenience, Cloudflare Area 1 offers support for SAML-based single sign-on (SSO) logins to our portal. Organizations will be able to choose between having users access the Area 1 security data with a username and password plus a two-factor authentication (2FA) code, or having them use an SSO provider, such as OneLogin or Okta, to access the portal.

## SAML configuration options

* **Identity Provider (IDP) initiated SAML**: Identity Provider (IDP) initiated configurations (like OneLogin) require that the IDP be accessible to the Area 1 infrastructure in order to successfully authenticate users. At the most basic level the user selects an application from their IDP, and the IDP communicates with the OneLogin portal using a SAML assertion to provide identity information for the user requesting to login to the Area 1 Security portal.
* **SP-Initiated SAML**: SP-Initiated configurations are the most common SAML authentication mechanisms. The main difference compared to IDP is that the Service Provider (SP) (like Area 1) does not require any direct connection to the IDP in order to authenticate a user. The user's browser provides the ability for the SAML exchange to occur but the SP and the IDP do not directly communicate with each other.

## All Area 1 SAML setup

1. If you do not have one already, select and set up an SSO provider (such as Onelogin or Okta) in [**SSO settings**](https://horizon.area1security.com/settings/single-sign-on) of your Area 1 dashboard. This SSO provider will manage the user interface and settings for your organization.

2. Set up **SSO enforcement** with the following settings:
    * **None** - Each user can choose between SSO or username and password plus 2FA (this is the recommended setting while testing SSO).
    * **Admin** - This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to login using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.
    * **Non-Admin Only** - This option will require that all “Read only” and “Read & Write” users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.

3. In **SAML SSO Domain** input the domain that points to your SSO provider.

4. In **METADATA XML** copy the SAML XML Metadata settings from your provider. These settings (and even their exact text descriptions) are in different locations depending on your SSO provider. Please contact your SSO provider or Area 1 support for assistance with this step if you run into any issues.

## Identity Provider SAML setup

The values to be configured in the IdP setup are as follows:
