---
pcx_content_type: how-to
title: Asana
updated: 2024-08-01
weight: 4
---

# Connect to Asana through Access

This guide covers how to configure [Asana](https://help.asana.com/hc/en-us/articles/14075208738587-Authentication-and-access-management-options-for-paid-plans#gl-saml) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Super admin access to an Asana Enterprise, Enterprise+, or Legacy Enterprise account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, select _Asana_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://app.asana.com/`
    - **Assertion Consumer Service URL**: `https://app.asana.com/-/saml/consume`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Add a SAML SSO provider to Asana

1. In Asana, select your profile picture > **Admin console** > **Security** > **SAML authentication**.
2. Under **SAML options**, select _Optional_.
3. Fill in the following fields:
    - Sign-in page URL: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - X.509 certificate: Public key from application configuration in Cloudflare Zero Trust. Wrap the public key in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
4. Select **Save changes**.

## 3. Test the integration and require SSO

1. Open an incognito browser window and go to your Asana URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

2. After this is successful, you may want to require users to log in via SSO. In Asana, select your profile picture > **Admin console** > **Security** > **SAML authentication**. Under **SAML options**, select **Required for all members, except guest accounts**.