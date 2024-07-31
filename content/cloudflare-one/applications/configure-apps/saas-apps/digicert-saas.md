---
pcx_content_type: how-to
title: Digicert
weight: 9
---

# Connect to Digicert through Access

This guide covers how to configure [Digicert](https://docs.digicert.com/en/certcentral/manage-account/saml-admin-single-sign-on-guide/configure-saml-single-sign-on.html) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Digicert account
- [SAML](https://docs.digicert.com/en/certcentral/manage-account/saml-admin-single-sign-on-guide/saml-single-sign-on-prerequisites.html) enabled in your Digicert account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `Digicert` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://www.digicert.com/account/sso/metadata`
    - **Assertion Consumer Service URL**: `https://www.digicert.com/account/sso/`
    - **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Add a SAML SSO provider in Digicert

1. In Digicert, select **Settings** > **Single Sign-On** > **Set up SAML**.
2. Under **How will you send data from your IDP?**, turn on **Use a dynamic URL**.
3. Under **Use a dynamic URL**, paste the SAML Metadata endpoint from application configuration in Cloudflare Zero Trust.
3. Under **How will you identify a user?**, turn on **NameID**.
4. Under **Federation Name**, enter a name (for example, `Cloudflare Access`). Your users will select this name when signing in.
5. Select **Save SAML Settings**.

## 3. Test and Enable SSO in Digicert
1. In Digicert, select **Settings** > **Single Sign-On**.
2. Copy the **SP Initiated Custom SSO URL**.
3. Paste the URL into an incognito browser window and sign in. Upon successful sign in, SAML SSO is fully enabled.
4. (Optional)  By default, users can choose to sign in directly or with SSO. To require SSO sign in, go to **Account** > **Users**. Turn on  **Only allow this user to log in through SAML/OIDC SSO** in the user details of the desired user.

{{<Aside type="note">}}

Users can sign in using service provider initiated SSO by using the **SP Initiated Custom SSO URL**. Alternatively, users can go to `www.digicert.com/account`, select **Sign in with SSO**, and enter the name of the identity provider configured in step [2. Add a SAML SSO provider in Digicert](#2-add-a-saml-sso-provider-in-digicert).

{{</Aside>}}





