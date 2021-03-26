---
order: 0
---

# SAML | Centrify

Centrify secures access to infrastructure, DevOps, cloud, and other modern enterprise so you can prevent the #1 cause of breaches – privileged access abuse.

## Set up Centrify (SAML)

To set up SAML with Centrify as your identity provider:

1. Log in to your **Centrify** admin portal and click **Apps**.

    ![Centrify Apps page](../../static/documentation/identity/saml-centrify/saml-centrify-1.png)

1. Select **Add Web Apps**.

    The **Add Web Apps** card displays.

    ![Centrify Add Web Apps card](../../static/documentation/identity/saml-centrify/saml-centrify-2.png)

1. Click the **Custom** tab.

1. Next to the **SAML** icon click **Add**.

    ![Centrify Settings Add Application details page](../../static/documentation/identity/saml-centrify/saml-centrify-3.png)

1. Enter the required information for your application.

1. Click **Save**.

1. Click **Settings** in the left pane.

1. In the middle menu pane, select **Trust**.

    ![Centrify Setting Trust page](../../static/documentation/identity/saml-centrify/saml-centrify-4.png)

1. Choose the **Manual Configuration** option.

1. In the **SP Entity ID** and **Assertion Consumer Service (ACS) URL fields**, enter your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1. Click **Save**.

1. In the middle menu pane, select **User Access**.

    ![Centrify Settings User Access](../../static/documentation/identity/saml-centrify/saml-centrify-5.png)

1. Click **Add**.

    The **Select Role** dialog displays.

    ![Centrify Settings Select Role dialog](../../static/documentation/identity/saml-centrify/saml-centrify-6.png)

1. Complete your roles access assignments.

    The Role rules display on the **User Access** card.

    ![Centrify Added Roles list](../../static/documentation/identity/saml-centrify/saml-centrify-7.png)

1. In the middle menu pane, select **SAML Response**.

    ![Centrify Settings  SAML Response page](../../static/documentation/identity/saml-centrify/saml-centrify-8.png)

1. Click **Active > Add** to create a new **Attribute Name**, **Email**.

    ![Centrify Settings Email Attribute](../../static/documentation/identity/saml-centrify/saml-centrify-9.png)

1. Enter the user email addresses in the **Attribute Value** field.

1. Click **Save**.

1. Select **Settings** again from the left menu pane, and **Trust**.

    ![Centrify Settings Trust page](../../static/documentation/identity/saml-centrify/saml-centrify-10.png)

1. Select the **Manual Configuration** option.

1. On the **Teams dashboard**, navigate to **Configuration > Authentication**.

1. Click *+ Add* under **Login Methods**, and select SAML.

1. Copy and paste the corresponding information from Centrify into the fields.

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
1. Upload the XML document to your **Centrify** account.

## Example API configuration

```json
{
    "config":
    {
        "issuer_url": "https://abc123.my.centrify.com/baaa2117-0ec0-4d76-84cc-abccb551a123",
        "sso_target_url": "https://abc123.my.centrify.com/applogin/appKey/baaa2117-0ec0-4d76-84cc-abccb551a123/customerId/abc123",
        "attributes": ["email"],
        "email_attribute_name": "",
        "sign_request": false,
        "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
    },
    "type": "saml",
    "name": "centrify saml example"
}
```
