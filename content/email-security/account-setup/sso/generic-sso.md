---
title: Generic SSO guide
pcx_content_type: how-to
weight: 1
meta:
    title: Generic single sign-on integration guide
---

# Generic single sign-on integration guide

Below is a generic guide to successfully set up an identity provider based SAML. These options might change depending on your identity provider (IDP). However, make sure you set up the options below or their equivalent.

## 1. Identity Provider SAML setup

1. Log in to your SAML provider and access its setup section.

2. Enter the following values to configure your IDP provider:
    | | |
    |---------------------------------|----------------------------------------------------|
    | **Single sign on URL**          | `https://horizon.area1security.com/api/users/saml` |
    | **Audience URI (SP Entity ID)** | `https://horizon.area1security.com` |
    | **Name ID format**              | _Email Address_                                      |
    | **Application username**        | _Email_                                              |
    | **Response**                    | _Signed_                                             |
    | **Assertion signature**         | _Unsigned_                                           |
    | **Signature Algorithm**         | _RSA_-SHA1                                           |
    | **Digest Algorithm**            | _SHA1_                                               |

3. In the **Attribute Statements**, add your application users. Emails you add here should match emails users already have in the Area 1 dashboard.

4. After finishing the setup, download the IDP metadata file. Copy and paste it into the **METADATA XML** field in the SSO section of Area 1’s dashboard. Refer to **step 4** in the guide below for more details.

## 2. Area 1 SAML setup

After configuring settings in your SSO provider, log in to the Area 1 dashboard to finish setting up.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon).

3. In **Users and Actions** > **Users and Permissions** add the email addresses of all your authorized administrators.

    ![Fill out your authorized administrators](/email-security/static/sso/generic/step3-users-actions.png)

4. Go to **SSO**, and enable **Single Sign on**.

    ![Enable SSO](/email-security/static/sso/generic/step4-sso.png)

5. In **SSO Enforcement**, choose one of the settings, according to your specific needs:
{{<render file="_sso-enforcement.md">}}

6. In **SAML SSO Domain** enter the domain that points to your SSO provider.

7. In **METADATA XML** paste the SAML XML metadata settings from your provider. These settings (and even their exact text descriptions) are in different locations depending on your SSO provider.

8. Select **Update Settings** to save your configuration.

## Troubleshooting

If you have trouble connecting your SAML provider to Area 1, make sure that:

- The users you have configured in your SAML provider exist in the Area 1 dashboard.
- You are using email address as an attribute (in step 2, refer to **Name ID format** and **Application username**).
- You are using the SHA-1 algorithm.
- Your encryption is set to 2048 bits.

If all else fails, enable Chrome browser debug logs. Then, log your activity when SSO is initiated, and contact [Cloudflare support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/).