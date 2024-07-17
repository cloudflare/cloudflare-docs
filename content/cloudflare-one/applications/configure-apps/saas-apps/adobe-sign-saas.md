---
pcx_content_type: how-to
title: Adobe Acrobat Sign
weight: 2
---

# Connect to Adobe Acrobat Sign through Access

This guide covers how to configure [Adobe Acrobat Sign](https://helpx.adobe.com/sign/using/enable-saml-single-sign-on.html) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/index) configured in Cloudflare Zero Trust
- Admin access to a Adobe Acrobat Sign account
- A [claimed domain](https://helpx.adobe.com/sign/using/claim-domain-names.html) in Adobe Acrobat Sign

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, enter `Adobe Sign` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
7. Copy the **Access Entity ID or Issuer**, **Public key**, and **SSO endpoint**.
8. Keep this window open without selecting **Select configuration**. You will finish this configuration in step [3. Finish adding a SaaS application to Cloudflare Zero Trust](#3-finish-adding-a-saas-application-to-cloudflare-zero-trust).

## 2. Add a SAML SSO provider to Adobe Sign

1. In Adobe Acrobat Sign, select your profile picture > your name > **Account Settings** > **SAML Settings**.
2. Turn **SAML Allowed** on.
3. Enter a hostname (for example, `yourcompanyname`). Users can use this URL or `https://secure.adobesign.com/public/login` to sign in via SSO.
4. (Optional) For **Single Sign On Login Message**, enter a custom message (for example, `Log in via SSO`). The default message is **Sign in using your corporate credentials**.
5. Fill in the following fields:
    - **Entity ID/Issuer URL**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Login URL/SSO Endpoint**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **IdP Certificate**: Public key from application configuration in Cloudflare Zero Trust. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
6. Copy the **Entity ID/SAML Audience** and **Assertion Consumer URL**.
7. Select **Save**.

## 3. Finish adding a SaaS application to Cloudflare Zero Trust

1. In your open Zero Trust window, fill in the following fields:
    - **Entity ID**: Entity ID/SAML Audience from Adobe Acrobat Sign SAML SSO configuration.
    - **Assertion Consumer Service URL**: Assertion Consumer URL from Adobe Acrobat Sign SAML SSO configuration.
    - **Name ID format**: _Email_
2. Select **Save configuration**.
3. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
4. Select **Done**.

## 4. Test the integration and finalize configuration

1. Open an incognito browser window and go to your Adobe Sign hostname URL or `https://secure.adobesign.com/public/login`. Select the option to sign in via SSO (**Sign in using your corporate credentials** if you have not configured a custom message). You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

{{<Aside type="note">}}

If you receive an error while testing SSO integration, go to your profile picture > your name > **Account Settings** > **SAML Errors** for more information.

{{</Aside>}}

2. Once this is successful, you can make sign in via SSO mandatory. Select your profile picture > your name > **Account Settings** > **SAML Settings**, and then turn on **SAML Mandatory**. Keeping **Allow Acrobat Sign Account Administrators to log in using their Acrobat Sign Credentials** turned on will allow administrators to log in even if your account experiences SSO issues.