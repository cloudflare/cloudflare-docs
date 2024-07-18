---
pcx_content_type: how-to
title: Tableau Cloud
weight: 20
---

# Connect to Tableau Cloud through Access

This guide covers how to configure [Tableau Cloud](https://help.tableau.com/current/online/en-us/saml_config_site.htm) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Tableau Cloud site

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, select _Tableau_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
7. Copy the **SAML Metadata endpoint**.
8. Keep this window open without selecting **Select configuration**. You will finish this configuration in step [4. Finish adding a SaaS application to Cloudflare Zero Trust](#4-finish-adding-a-saas-application-to-cloudflare-zero-trust).

## 2. Download the metadata file

1. Paste the SAML Metadata endpoint from application configuration in Cloudflare Zero Trust in a web browser.
2. Follow your browser-specific steps to download the URL's contents as an `.xml` file.

## 3. Add a SAML SSO provider to Tableau Cloud

1. In Tableau Cloud, go to **Settings** > **Authentication**.
2. Turn on **Enable an additional authentication method**. For **select authentication type**, select _SAML_.
3. Under **1. Get Tableau Cloud metadata**, copy the **Tableau Cloud entity ID** and **Tableau Cloud ACS URL**.
4. Under **4. Upload metatdata to Tableau**, select **Choose a file**, and upload the `.xml` file created in step [2. Download the metadata file](#2-download-the-metadata-file)
5. Under **5. Map attributes**, turn on **Full name**. For **Name (full name)**, enter `name`.
6. (Optional) Choose whether users who are accessing embedded views will **Authenticate in a separate pop-up window** or **Authenticate using an inline frame**.
7. Select **Save Changes**.

## 4. Finish adding a SaaS application to Cloudflare Zero Trust
1. In your open Zero Trust window, fill in the following fields:
    - **Entity ID**: Tableau Cloud entity ID from Tableau Cloud SAML SSO set-up.
    - **Assertion Consumer Service URL**: Tableau Cloud ACS URL from Tableau Cloud SAML SSO set-up.
    - **Name ID format**: _Email_
2. Select **Save configuration**.
3. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
4. Select **Done**.

## 5. Test the integration and set default authentication type
1. In Tableau Cloud, go to **Settings** > **Authentication**.
2. Under **7. Test Configuration**, select **Test Configuration**.
3. Sign in. If your sign-in is successful, **You are now signed in as (username)** will appear at the top of the page.
4. Close the pop-up window.
5. (Optional) Under **Default Authentication Type for Embedded Views**, turn on **cloudflareaccess.com (SAML)**. You can also configure the default authentication type for individual users under **Users** > **Actions** > **Authentication**.