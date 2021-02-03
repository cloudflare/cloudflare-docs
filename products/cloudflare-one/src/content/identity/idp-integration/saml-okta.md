---
order: 1
---

# SAML | Okta

Okta provides cloud software that helps companies manage and secure user authentication to modern applications, and helps developers build identity controls into applications, website web services, and devices. Cloudflare Access can integrate SAML with Okta as an identity provider.

## Set up Okta (SAML)

To set up SAML with Okta as your identity provider:

1. Log in to your Okta Admin portal, and choose **Applications**.
1. Click **Add Application**.

    ![Okta Applications page](../../static/documentation/identity/saml-okta/saml-okta-1.png)

1. Click **Create New App**.

    ![Okta Create New App](../../static/documentation/identity/saml-okta/saml-okta-2.png)

    The Create a New Application Integration card displays.

1. Select **SAML 2.0**.

    ![Okta Create a New Application Integration card](../../static/documentation/identity/saml-okta/saml-okta-3.png)

1. Click **Create**.

    The **Create SAML Integration** card displays.

    ![Okta Create SAML Integration card](../../static/documentation/identity/saml-okta/saml-okta-4.png)

1. Enter an **App name**.
1. Click **Next**.

    The SAML Settings card displays.

    ![Okta SAML Settings card](../../static/documentation/identity/saml-okta/saml-okta-5.png)

1. In the **Single sign on URL** and the **Audience URI** **(SP Entity ID)** fields, enter your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1. Select the value to pass from the **Name ID** drop-down list.
1. In **Attribute Statements** **Name** field, enter “email” to create a new attribute.
1. In the **Value** field, enter a user email.
1. Click **Next**.
1. Click **Finish**.

    ![Okta Create SAML Application page](../../static/documentation/identity/saml-okta/saml-okta-6.png)

    The _Applications_ page displays.

1. Click **Assign Applications**.

    The _application name_ page displays where you assign groups or users who can access this application. Our example application name is _samlapp_.

1. Click **People** or **Groups**.

    The _Assign application name to Groups_ card displays, where you grant users or groups permission to access your application.

 ![Okta Assign Application page](../../static/documentation/identity/saml-okta/saml-okta-7.png)

1. Click **Done**.

    The assignments display on the Application page.

    ![Okta Role Assignments](../../static/documentation/identity/saml-okta/saml-okta-8.png)

1. Choose the **Sign On** tab to retrieve the identity provider information.

    ![Okta SAML Settings Sign On page](../../static/documentation/identity/saml-okta/saml-okta-9.png)

1. Copy and paste the following information into the Cloudflare Access **Edit a SAML identity provider** card.

   * **Provider Name**: Name your IdP.
   * **Single Sign On URL**: Enter the IdP Single-Sign-On URL.
   * **IdP Entity ID**: Enter the IdP issuer.
   * **Signing Certificate**: Copy the certificate from Okta in **X.509 Certificate** between **Begin Certificate** and **End Certificate**.

1. After completing the information, enter the name “email” as your email attribute for the **SAML assertion** field.

1. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to the login method you want to test.

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1. Download your unique SAML metadata file at the following URL:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

    Replace `your-team-name`  with your [team name](/glossary#team-name).

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
