---
pcx_content_type: how-to
title: Ironclad
weight: 16
---

# Connect to Ironclad through Access

This guide covers how to configure [Ironclad](https://support.ironcladapp.com/hc/articles/12286012625559-Set-Up-Generic-SSO-SAML-Integration) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Ironclad site

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, enter `Ironclad` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
7. Copy the **SSO Endpoint** and **Public key**.
8. Keep this window open without selecting **Select configuration**. You will finish this configuration in step [3. Finish adding a SaaS application to Cloudflare Zero Trust](#3-finish-adding-a-saas-application-to-cloudflare-zero-trust).

## 2. Add a SAML SSO provider to Ironclad

1. In Ironclad, select your profile picture > **Company settings** > **Integrations** > **SAML**.
2. Select **Add SAML Configuration** > **Show Additional IdP Settings**.
4. Copy the **Callback** value.
5. Fill in the following fields:
    -  **Entry Point**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Identity Provider Certificate**: Public key from application configuration in Cloudflare Zero Trust.  The key will automatically be wrapped in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
6. Select **Save**.

## 3. Finish adding a SaaS application to Cloudflare Zero Trust

1. In your open Zero Trust window, fill in the following fields:
    - **Entity ID**: `ironcladapp.com`
    - **Assertion Consumer Service URL**: Callback from Ironclad SAML SSO set-up.
    - **Name ID format**: _Email_
2. Select **Save configuration**.
3. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
4. Select **Done**.

## 4. Add a test user to Ironclad and test the integration

1. In Ironclad, select your profile picture > **Company settings** > **Users & Groups**.
2. Select **Invite User**.
3. For **Email addresses**, add your desired email address for your test user.
4. For **Sign-in Method**, ensure **Sign in with (your-team-domain.cloudflareaccess.com)** is selected
5. Select **Invite**.
6. In the invitation email sent to the test user, select **Join now**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
7. Once this is successful, you can contact your LE, CSM POC, or `support@ironcladapp.com` to migrate existing users to SSO login.