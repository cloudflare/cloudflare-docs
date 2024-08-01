---
pcx_content_type: how-to
title: Greenhouse Recruiting
weight: 14
---

# Connect to Greenhouse Recruiting through Access

This guide covers how to configure [Greenhouse Recruiting](https://support.greenhouse.io/hc/en-us/articles/360040753811-Configure-single-sign-on-SSO-for-Greenhouse-Recruiting) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to an Advanced or Expert Greenhouse Recruiting site

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, enter `Greenhouse` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
7. Copy the **SAML Metadata endpoint**.
8. Keep this window open without selecting **Select configuration**. You will finish this configuration in step [4. Finish adding a SaaS application to Cloudflare Zero Trust](#4-finish-adding-a-saas-application-to-cloudflare-zero-trust).

## 2. Download the metadata file

1. Paste the SAML Metadata endpoint from application configuration in Cloudflare Zero Trust in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3. Add a SAML SSO provider to Greenhouse

1. In Greenhouse Recruiting, go to the **Configure** icon > **Dev Center** > **Single sign-on**.
2. Copy the **SSO Assertion Consumer URL**.
3. Under **Upload XML file**, select **Choose a file**, and upload the `.xml` file created in step [2. Download the metadata file](#2-download-the-metadata-file).
4. Change the **Entity ID** to `greenhouse.io`.
5. Keep this window open without selecting **Begin testing**. You will finish this configuration in step [5. Test the integration and finalize configuration](#5-test-the-integration-and-finalize-configuration).

## 4. Finish adding a SaaS application to Cloudflare Zero Trust

1. In your open Zero Trust window, fill in the following fields:
    - **Entity ID**: `greenhouse.io`
    - **Assertion Consumer Service URL**: SSO Assertion Consumer URL from SSO configuration in Greenhouse Recruiting.
    - **Name ID format**: _Email_
2. Select **Save configuration**.
3. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
4. Select **Done**.

## 5. Test the integration and finalize configuration

1. In your open Greenhouse Recruiting window, select **Begin Testing** > **Proceed**.
2. Open an incognito browser window and go to your Greenhouse Recruiting URL. Choose the SSO login option. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
3. Once SSO sign in is successful, go to the **Configure** icon > **Dev Center** > **Single sign-on**.
4. Select **Finalize Configuration**.
5. In the text field, enter `CONFIGURE`.
6. Select **Finalize**. Now, users will only be able to sign in with SSO.
