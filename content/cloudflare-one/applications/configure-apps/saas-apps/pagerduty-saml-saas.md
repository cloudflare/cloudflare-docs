---
pcx_content_type: how-to
title: PagerDuty
weight: 14
---

# Connect to PagerDuty through Access

This guide covers how to configure [PagerDuty](https://support.pagerduty.com/docs/sso) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- A [SAML identity provider](/cloudflare-one/identity/idp-integration/generic-saml/) configured in Cloudflare Zero Trust
- Admin access to a PagerDuty site

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, select _Pagerduty_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://<your-subdomain>.pagerduty.com`
    - **Assertion Consumer Service URL**: ` https://<your-subdomain>.pagerduty.com/sso/saml/consume`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Amend the public key so each row is a maxiumum of 64 characters long. Originally, each full row of the public key is 65 characters long.
3. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3. Add a SAML SSO provider to PagerDuty

1. In PagerDuty, select your profile picture and go to **Account Settings** > **Single Sign-on**.
2. Turn on **SAML**.
3. In **X.509 Certificate**, paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
4. In **Login URL**, paste the SSO endpoint from application configuration in Cloudflare Zero Trust.
5. Select **Save Changes**.

## 4. Test the integration and finalize SSO configuration

1. Open an incognito window and paste your PagerDuty URL into the address bar. Select **Sign Ian With Single Sign-On**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
1. In an incognito window, paste your PagerDuty URL and select **Sign In With Single Sign-On**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
2. Once SSO sign in is successful, select your profile picture and go to **Account Settings** > **Single Sign-on**.
3. Turn off **Allow username/password login** and select **Save Changes**. Now, users will only be able to sign in with SSO.