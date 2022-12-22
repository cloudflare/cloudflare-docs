---
title: Azure guide
pcx_content_type: how-to
weight: 3
meta:
    title: Azure integration guide
---

# Azure integration guide

This tutorial will walk you through the steps for configuring a non-gallery enterprise application within Azure Active Directory to establish a SAML SSO connection with Area 1.

## 1. Azure Active Directory configuration

1. 	[Log in to Azure portal](https://portal.azure.com/) and open **Enterprise Applications**.

2. 	Select **New Application** to create a new application.

    ![Create a new application](/email-security/static/sso/azure/step2-new-app.png)

3. Select **Non-gallery application**.

    ![Choose non-gallery as the type of application](/email-security/static/sso/azure/step3-non-gallery.png)

4. Give the application a descriptive name, and select **Add**.

    ![Give your application a descriptive name](/email-security/static/sso/azure/step4-add.png)

5. On the application **Overview** page, select **2. Set up Single Sign On**.

    ![Select single sign-on as the type of app](/email-security/static/sso/azure/step5-sso.png)

6. Select **SAML** as your single sign-on method.

7. Select the pencil icon to edit the **Basic SAML Configuration** as follows:
    - **Identifier (Entity ID)**: `https://horizon.area1security.com/api/users/saml`
    - **Reply URL (Assertion Consumer Service URL)**: `https://horizon.area1security.com/api/users/saml`
    - **Sign-On URL**: Leave blank
    - **Relay State**: Leave blank
    - **Logout Url**: Leave blank

8. Select **Save** to exit the Basic SAML Configuration.

9. Select the pencil icon to edit **SAML Signing Certificate**.
    - **Signing Option**: Select _Sign SAML response_ from the drop-down menu.
    - **Signing Algorithm**: Select _SHA-1_ from the drop-down menu.

    ![Select Sign SAML response and SHA-1 from the menu](/email-security/static/sso/azure/step9-saml-signing-certificate.png)

10. Select **Save** to exit **SAML Signing Certificate**.

11. Still in the **SAML Signing Certificate** section, find **Federation Metadata XML** and select **Download**. You will need this information for the SSO Configuration in the Area 1 dashboard.

{{<Aside type="note">}}
Now that the application configuration is complete, update **User Assignments** and **Application Properties** as needed to ensure that authorized personnel are able to access the new application from their Apps Catalog. Additionally, you may choose to update the application logo image file or the privacy policy URL.
{{</Aside>}} 

## 2. Configure Area 1 to connect to Okta

1. Log in to the Area 1 dashboard.

2. Go to **Settings** (the gear icon).

3. In **Users and Actions** add the email addresses of all your authorized administrators.

3. Go to **SSO Settings**.

4. Enable **Single Sign On** switch. 

5. In **SSO Enforcement**, choose one of the settings according to your specific needs. Refer to [**SSO Enforcements**](/email-security/account-setup/sso/generic-sso/#2-area-1-saml-setup) for more information.

6. For **SAML SSO Domain**, enter `login.microsoftonline.com`.

7. In **Metadata XML** paste the XML metadata you downloaded in the previous step 11. You can open the downloaded file with a text editor to copy all the text. Make sure there are no leading carriage returns or spaces when you copy the text. Your copied text should begin with:

    ```txt
    <?xml version="1.0" encoding="utf-8"?><EntityDescriptor ID="_<yourDescriptorID>" entityID="https://<yourEntityID> " xmlns="urn:oasis:names:tc:SAML:2.0:metadata">…
    ```
8. Select **Update Settings** to save your configuration.