---
pcx_content_type: how-to
title: Pingboard
weight: 19
---

# Connect to Pingboard through Access (SAML)

This guide covers how to configure [Pingboard](https://support.pingboard.com/hc/en-us/articles/360046585994-Set-Up-a-Custom-SSO-Solution) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Pingboard account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `Pingboard` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `http://app.pingboard.com/sp`
    - **Assertion Consumer Service URL**: `https://sso-demo.pingboard.com/auth/saml/consume`
    - **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Add a SAML SSO provider to Pingboard

1. In Pingboard, go to **Account** > **Add-Ons**.
2. Under **Third-Party Integrations**, select **Custom SSO**.
3. In a web browser, paste the SAML Metadata endpoint you copied from the application configuration in Cloudflare Zero Trust. Next, copy the contents of the displayed page.
4. In Pingboard, under **IdP Metadata**, paste the contents from the SAML Metadata endpoint.
5. (Optional) Under **Sign in with**, enter a name (for example, `Cloudflare Access`). Your users will select this name when signing in.

## 3. Test the integration

Open an incognito browser window and go to your Pingboard URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.