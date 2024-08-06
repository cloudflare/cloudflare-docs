---
pcx_content_type: integration-guide
title: Jamf Pro
updated: 2024-06-18
weight: 18
---

# Connect to Jamf Pro through Access

This guide covers how to configure [Jamf Pro](https://learn.jamf.com/en-US/bundle/jamf-pro-documentation-current/page/Single_Sign-On.html) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Jamf Pro account

## 1. Collect Jamf Pro information

1. In Jamf Pro, go to **Settings** > **Systems** > **Single Sign-On** > **Edit**.
2. Copy the pre-populated URL in **Entity ID**.
3. Paste the URL in a web browser to download the Jamf metadata file.
4. Open the `metadata.xml` file in a text editor, and copy the values for **Entity ID** and **Assertion Consumer Service**.

## 2. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, enter `Jamf`  or `Jamf Pro` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: Entity ID value from Jamf Pro metadata file.
    - **Assertion Consumer Service URL**: Assertion Consumer Service value from Jamf Pro metadata file.
    - **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 3. Edit Access SAML Metadata
1. Paste the **SAML Metdata endpoint** from application configuration in Cloudflare Zero Trust into a browser.
2. Copy the file and paste it into a text editor.
3. Change `WantAuthnRequestsSigned="true"` to `WantAuthnRequestsSigned="false"`.
4. Set the file extension as `.xml` and save.

## 4. Add a SAML SSO provider to Jamf Pro

1. In Jamf Pro, go to **Settings** > **Single Sign-On** > **Edit**.
2. In Identity Provider menu, select **Other**.
3. Label **Other provider** as `Cloudflare`.
4. Fill in the following fields:
    - **Entity ID**: Entity ID from Jamf Pro metadata file.
    - **Identity Provider Metadata Source**: Select **Metadata File** and upload the `.xml` file from step [2. Edit Access SAML Metadata](#2-add-a-saas-application-to-cloudflare-zero-trust).
    - **Identity Provider User Mapping**: _Name ID_
    - **Jamf Pro User Mapping**: _Email_
5. Turn on **Single Sign On**.

{{<Aside type="note">}}

The Failover Login URL located on this page can be used to log in if your SSO does not work.

{{</Aside>}}

## 5. Test the Integration

Log out of Jamf Pro and open an incognito browser window. Go to your Jamf Pro URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
