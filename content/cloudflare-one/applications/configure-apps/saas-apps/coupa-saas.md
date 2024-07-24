---
pcx_content_type: how-to
title: Coupa
weight: 7
---

# Connect to Zoom through Access

This guide covers how to configure [Coupa](https://compass.coupa.com/en-us/products/product-documentation/integration-technical-documentation/coupa-core-user-authentication/coupa-saml-sso-setup) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Coupa Stage or Production account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `Coupa` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**:
`sso-stg1.coupahost.com` for a stage account or `sso-prd1.coupahost.com` for a production account
    - **Assertion Consumer Service URL**: `https://sso-stg1.coupahost.com/sp/ACS.saml2` for a stage account or `https://sso-prd1.coupahost.com/sp/ACS.saml2` for a production account
    - **Name ID format**: _Email_
7. Copy the **Access Entity ID or Issuer** and **SAML Metadata Endpoint**.
8. In **Default relay state**, enter `https://<your-subdomain>.coupahost.com/sessions/saml_post`.
9. Select **Save configuration**.
10. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
11. Select **Done**.

## 2. Download the metadata file

1. Paste the SAML metadata endpoint from application configuration in Cloudflare Zero Trust in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3. Add a SAML SSO provider in Coupa

1. In Coupa, go to **Setup** > **Company Setup** > **Security Controls**.
2. Under **Sign in using SAML**, turn on **Sign in using SAML**.
3. In **Upload IdP metadata**, select **Choose File**, and upload the `.xml` file you downloaded in step [2. Download the metadata file](#2-download-the-metadata-file).
4. Turn on **Advanced Options**.
5. For **Sign in page URL** and **Timeout URL**, enter `https://sso-stg1.coupahost.com/sp/startSSO.ping?PartnerIdpId=<access-entity-id-or-issuer>&TARGET=https://<your-subdomain>.coupahost.com/sessions/saml_post` using the Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
5. Select **Save**.

## 3. Create a test user and test the integration

1. In Coupa, go to **Setup** > **Company Setup** > **Users**.
2. Select **Create**, then enter the user details for your test user. For **Login** and **Single Sign-On ID**, enter the user's email address.
3. Select **Save**.
4. Open an incognito browser window and go to your Coupa URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
5. Once the login is successful, you can configure other users for SSO by adding their email to the **Single Sign-On ID** field in **Setup** > **Company Setup** > **Users** > user's name.

{{<Aside type="note">}}

You can use the following URL to bypass SSO and login via a username and password: `https://<your-subdomain>.coupahost.com/sessions/support_login`.

{{</Aside>}}