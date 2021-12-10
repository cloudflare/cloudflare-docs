---
order: 1
pcx-content-type: how-to
---

# SAML | Okta

Okta provides cloud software that helps companies manage and secure user authentication to modern applications, and helps developers build identity controls into applications, website web services, and devices. Cloudflare Access can integrate SAML with Okta as an identity provider.

## Set up Okta (SAML)

To set up SAML with Okta as your identity provider:

1. Log in to your **Okta Admin** portal, and choose **Applications**.
1. Click **Create App Integration**.
1. In the pop-up dialog, select **SAML 2.0**.
1. Click **Next**. 
1. Enter an app name and click **Next**.

    ![Okta Applications page](../../static/documentation/identity/saml-okta/saml-okta-1.png)

1. In the Single sign on URL and the Audience URI (SP Entity ID) fields, enter your team domain followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```
    
1. In the **Attribute Statements Name** field, enter `email` to create a new attribute.
1. In the **Value** field, enter `user.email`.
1. Click **Next**.
1. Select **I’m an Okta customer adding an internal app** and check **This is an internal app that we have created**.

    ![Okta Applications page](../../static/documentation/identity/saml-okta/saml-okta-2.png)

1. Click **Finish**.
1. On the Applications page, navigate to **Assignments**. 
1. Click **Assign** and assign individuals or groups you want to grant access to.
1. Click **Done**. The assignments display on the Applications page.
1. Navigate to the **General** tab to retrieve the SAML provider information.
1. On the Teams dashboard, navigate to **Settings** > **Authentication**.
1. Click **Add new** under **Login Methods**, and select *SAML*.
1. Fill in the following information:
    * **Name**: Name your identity provider.
    * **Single Sign On URL**: Enter the IdP Single-Sign-On URL. You can find it under **General** > **SAML Settings** in your Okta Admin portal.
    * **Issuer ID**: enter `http://www.okta.com/<your-okta-entity-id>`
    * **Signing Certificate**: Under **Sign On** > **SAML Signing Certificates** in your Okta Admin portal, download the active certificate. Open the certificate and copy-paste the contents of the certificate into this field.
    * **Optional configurations**: enter `email` as your SAML attribute.
1. Click **Save**.

The identity provider is now set up.

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1. Download your unique SAML metadata file at the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

    Replace `<your-team-name>`  with your [team name](/glossary#team-name).

1. Save the file in XML format.
1. Upload the XML document to your **Okta **account.

## Example API configuration

```json
{
    "config": {
        "issuer_url": "http://www.okta.com/exkbhqj29iGxT7GwT0h7",
        "sso_target_url": "https://dev-abc123.oktapreview.com/app/myapp/exkbhqj29iGxT7GwT0h7/sso/saml",
        "attributes": [
            "email",
            "group",
            "email_attribute_name": "",
            "sign_request": false,
            "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
        ]
    },
    "type": "saml",
    "name": "okta saml example"
}
```
