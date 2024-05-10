---
pcx_content_type: how-to
title: Centrify (SAML)
weight: 8
---

# Centrify (SAML)

Centrify secures access to infrastructure, DevOps, cloud, and other modern enterprise so you can prevent the #1 cause of breaches – privileged access abuse.

## Set up Centrify (SAML)

To set up SAML with Centrify as your identity provider:

1. Log in to your **Centrify** admin portal and select **Apps**.

2. Select **Add Web Apps**.

3. Select the **Custom** tab.

4. Next to the **SAML** icon, select **Add**.

    ![Centrify Settings Add Application details page with template text](/images/cloudflare-one/identity/saml-centrify/saml-centrify-3.png)

5. Enter the required information for your application.

6. Select **Save**.

7. Select **Settings** in the left pane.

8. In the middle menu pane, select **Trust**.

9. Choose the **Manual Configuration** option.

10. In the **SP Entity ID** and **Assertion Consumer Service (ACS) URL fields**, enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

11. Select **Save**.

12. In the middle menu pane, select **User Access**.

13. Select **Add**. The **Select Role** dialog displays.

14. Complete your roles access assignments. The Role rules display on the **User Access** card.

15. In the **User Access** card's middle menu pane, select **SAML Response**.

16. Select **Active** > **Add** to create a new **Attribute Name**, **Email**.

    ![Centrify SAML Response card with Settings Email Attribute selected](/images/cloudflare-one/identity/saml-centrify/saml-centrify-9.png)

17. Enter the user email addresses in the **Attribute Value** field.

18. Select **Save**.

19. Select **Settings** again from the left menu pane, and **Trust**.

20. Select the **Manual Configuration** option.

21. In Zero Trust, go to **Settings** > **Authentication**.

22. Under **Login methods**, select **Add new**.

23. Select SAML.

24. Copy and paste the corresponding information from Centrify into the fields.

25. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to the login method you want to test.

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1. Download your unique SAML metadata file at the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

1. Save the file in XML format.

1. Upload the XML document to your **Centrify** account.

## Example API configuration

```json
{
  "config": {
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
