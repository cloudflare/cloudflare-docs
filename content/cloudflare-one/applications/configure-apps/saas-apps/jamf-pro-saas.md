---
pcx_content_type: how-to
title: Jamf Pro
weight: 8
---

# Connect to Jamf Pro through Access

This guide covers how to configure Jamf Pro in Cloudflare Zero Trust.

## Prerequisites

- Admin access to a Jamf Pro account

## 1. Collect Jamf Pro information

1. In Jamf Pro, go to **Settings** > **Systems** > **Single Sign-On** > **Edit**.
2. Copy the pre-populated URL in **Entity ID**.
3. Paste the URL in a web browser to download the Jamf metadata file.
4. Open the `metadata.xml` file in a text editor and copy the values for **Entity ID** and **Assertion Consumer Service**.

## 2. Create Jamf Pro app in Access

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **SaaS**.
3. For **Application**, type `Jamf`  or `Jamf Pro` and select the textbox that appears below.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: Entity ID value from Jamf Pro metadata file.
    - **Assertion Consumer Service URL**: Assertion Consumer Service value from Jamf Pro metadata file.
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 3. Add a SAML SSO provider in Jamf Pro

1. In Jamf Pro, go to **Settings** > **Single Sign-On** > **Edit**.
2. In Identity Provider menu, select **Other**.
3. Label **Other provider** as `Cloudflare`.
4. Fill in the following fields:
    - **Entity ID**: Entity ID from Jamf Pro metadata file.
    - **Identity Provider Metadata Source**: SSO endpoint from application configuration in Cloudflare Zero Trust with `/saml-metadata` appended.
    - **Identity Provider User Mapping**: _Name ID_
    - **Jamf Pro User Mapping**: _Email_
5. In the top right, turn on **Single Sign On**.

{{<Aside type="note">}}

The Failover Login URL located on this page can be used to log in if your SSO does not work.

{{</Aside>}}

## 4. Provision Users Locally in Jamf

1. Go to **Settings** > **Systems** > **User accounts and groups** > **New**.
2. Create the users as defined in your identity provider by entering each user's:
    - Username
    - Full name
    - Email
    - User type
    - Level of access
    - Privileges

## 5. Test the Integration

Log out of Jamf Pro and open an incognito browser window. Go to your Jamf Pro URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
