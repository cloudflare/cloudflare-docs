---
title: Generic SSO guide
pcx_content_type: how-to
weight: 1
meta:
    title: Generic single sign-on integration guide
---

# Generic single sign-on integration guide

Below is a generic guide to successfully set up an identity provider based SAML. These options might change depending on your identity provider (IDP). However, make sure you set up the following or equivalent options: 

1. **Log in** to your SAML provider and access its setup section.

2. Enter the following values to configure your IDP provider:
    - **Single sign on URL**: `https://horizon.area1security.com/api/users/saml`
    - **Audience URI (SP Entity ID)**: `https://horizon.area1security.com/api/users/saml`
    - **Name ID format**: _Email Address_
    - **Application username**: _Email_
    - **Response**: _Signed_
    - **Assertion signature**: _Unsigned_
    - **Signature Algorithm**: _RSA-SHA1_
    - **Digest Algorithm**: _SHA1_

3. In the **Attribute Statements**, add your users to the application. Emails you add here should match emails users already have in the Area 1 dashboard.

4. When you are finished configuring your IDP setup, download the IDP metadata file. Copy and paste it into the **METADATA XML** field in the [SSO section](https://horizon.area1security.com/settings/single-sign-on) of Area 1’s dashboard.

## 2. Area 1 SAML setup

If you do not have one already, start by selecting and setting up an SSO provider in your Area 1 dashboard, such as Onelogin or Okta. This SSO provider will manage the user interface and settings for your organization.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon).

3. In **SSO**, enable **Single Sign on**.

4. In **SSO Enforcement**, choose one of the following settings, according to your specific needs:
    **None**: Each user can choose SSO, or username and password plus 2FA (this is the recommended setting while testing SSO).
    **Admin**: This setting will force only the administrator account to use SSO. The user that enables this setting will still be able to log in using username and password plus 2FA. This is a backup, so that your organization does not get locked out of the portal in emergencies.
    **Non-Admin Only**: This option will require that all `Read only` and `Read & Write` users use SSO to access the portal. Admins will still have the option to use either SSO or username and password plus 2FA.

5. In **SAML SSO Domain** enter the domain that points to your SSO provider.

6. In **METADATA XML** paste the SAML XML metadata settings from your provider. These settings (and even their exact text descriptions) are in different locations depending on your SSO provider.

## Troubleshooting

If you have trouble connecting your SAML provider to Area 1, make sure that:

- The users you have configured in your SAML provider exist in the Area 1 dashboard.
- You are using email address as an attribute (in step 2, refer to **Name ID format** and **Application username**).
- You are using the SHA-1 algorithm.
- Your encryption is set to 2048 bits.

If all else fails, enable Chrome browser debug logs. Then, log your activity when SSO is initiated, and contact [Cloudflare support](https://support.cloudflare.com/hc/articles/200172476).