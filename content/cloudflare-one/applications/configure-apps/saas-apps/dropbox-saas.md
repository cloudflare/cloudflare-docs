---
pcx_content_type: how-to
title: Dropbox
updated: 2024-07-30
weight: 11
---

# Connect to Dropbox through Access

This guide covers how to configure [Dropbox](https://help.dropbox.com/security/sso-admin) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Dropbox  Advanced, Business Plus, or Enterprise account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, select `Dropbox`.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `Dropbox`
    - **Assertion Consumer Service URL**: `https://www.dropbox.com/saml_login`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create a certificate file

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.
3. Set the file extension as `.pem` and save.

## 3. Add a SAML SSO provider to Dropbox

1. In Dropbox, go to your profile picture > **Settings** > **Admin Console** > **Security** > **Single sign-on**.
2. For **Single sign-on**, select _Optional_.
3. Select **Add Identity provider sign-in URL**.
4. Paste the SSO endpoint from application configuration in Cloudflare Zero Trust and select **Done**.
5. Select **Add X.509 certificate** and upload the `.pem` file from step [2. Create a certificate file](#2-create-a-certificate-file).
6. Copy **SSO sign-in URL**. This is your custom Dropbox SSO URL.
7. Select **Save**.

## 3. Test the integration and require SSO

1. Open an incognito browser window and go to your custom Dropbox SSO URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

2. After this is successful, you may want to require users to log in via SSO. Go to your profile picture > **Settings** > **Admin Console** > **Security** > **Single sign-on**. For **Single sign-on**, select _Required_. Dropbox will send an email to your users notifying them of the change.