---
title: Okta guide
pcx_content_type: how-to
weight: 2
meta:
    title: Okta integration guide
---

# Okta integration guide

In this tutorial you will learn how to connect your Area 1 account to Okta. When single sign-on (SSO) is correctly configured, your authorized employees can connect to the Area 1 dashboard using a familiar user name and password.

## 1. Create an Area 1 app in Okta

You will need to manually create an app for Area 1 in Okta.

1. Log in to Okta as an administrator.

2. In the Admin console, go to **Applications** > **Applications**.

    ![Go to Applications in your Okta Admin console](/email-security/static/sso/okta/step2-applications.png)

3. Select **Create App Integration** > **SAML 2.0**, and select **Next**.

    ![Choose SAML 2.0 as the new app integration type](/email-security/static/sso/okta/step3-saml.png)

4. Enter a descriptive name for your app, such as `Area 1`, and select **Next**.

5. Enter the following settings for **SAML Settings**:
    | | |
    |-------------------------------------|---------------------------------------------------------------------------------------------|
    | **Single sing on URL**              | `https://horizon.area1security.com/api/users/saml`                                          |
    | **Audience URI (SP Entity ID)**     | `https://horizon.area1security.com/api/users/saml`                                          |
    | **Name ID format**                  | Select _EmailAddress_ from the drop-down menu.                                              |
    | **Application username**            | Select _Email_ from the drop-down menu.                                                     |
    | **Response**                        | _Signed_                                                                                    |
    | **Assertion signature**             | _Unsigned_                                                                                  |
    | **Signature Algorithm**             | _RSA-SHA1_                                                                                  |
    | **Digest Algorithm**                | _SHA1_                                                                                      |
    | **Attribute statements (optional)** |
    | **Name**                            | Enter email addresses for your users. Should match users already added to Area 1 dashboard. |
    | **Name format**                     | Select _Unspecified_ from the drop-down menu.                                               |
    | **Value**                           | Select `user.email` from the drop-down menu.                                                |

    ![Input the correct settings in SAML settings](/email-security/static/sso/okta/step5-saml-settings.png)

6. Select **Next**.

7. Under **Are you a customer or a partner?**, select **I'm an Okta customer adding an internal app**.

8. In **App type**, select **This is an internal app that we have created**.

9. Select **Finish**.

10. Okta should display the app you have just created. If not, go to **Applications** > **Applications**, and select it.

11. In the **Sign On** tab, go to **View SAML setup instructions** and select it to retrieve the SAML provider information.

    ![Find the View SAML setup instructions button](/email-security/static/sso/okta/step11-saml-instructions.png)

12. Copy and save the link in **Identity Provider Single Sign-On URL**. You will need it later to use in the Area 1 dashboard.

    ![Copy and save the SSO URL to use later in the Area 1 dashboard](/email-security/static/sso/okta/step12-sso-url.png)

13. Scroll down to **Optional**. You might need to enlarge the text box to copy and save all the XML data. You will need this information to  finish configuration in the Area 1 dashboard. The start of the metadata should be similar to the following:

    ```txt
    <?xml version="1.0" encoding="utf-8"?><EntityDescriptor ID="_<YOUR_DESCRIPTIOR_ID>" entityID="https://<YOUR_ENTITY_ID> " xmlns="urn:oasis:names:tc:SAML:2.0:metadata">...
    ```

    ![Copy and save the XML metadata to use later in the Area 1 dashboard](/email-security/static/sso/okta/step13-optional.png)

## 2. Configure Area 1 to connect to Okta

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon).

3. In **Users and Actions** > **Users and Permissions** add the email addresses of all your authorized administrators.

    ![Fill out your authorized administrators](/email-security/static/sso/generic/step3-users-actions.png)

4. Go to **SSO Settings** and enable **Single Sign On** switch.

    ![Enable SSO](/email-security/static/sso/generic/step4-sso.png)

5. In **SSO Enforcement**, choose one of the settings according to your specific needs:
{{<render file="_sso-enforcement.md">}}

6. In **SAML SSO Domain** enter the domain you saved from step 13. For example, `area1security-examplecorp.okta.com`.

7. In **Metadata XML** paste the XML metadata you saved from step 14.

8. Select **Update Settings** to save your configuration.

Log out of any customer portal sessions. Your Okta account should now show a tile for Area 1.