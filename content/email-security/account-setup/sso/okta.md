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

1. Log in to Okta as an administrator

2. In the Admin console, go to **Applications** > **Applications**.

    ![Go to Applications in your Okta Admin console](/email-security/static/sso/okta/step2-applications.png)

3. Select **Create App Integration** > **SAML 2.0**, and select **Next**.

    ![Choose SAML 2.0 as the new app integration type](/email-security/static/sso/okta/step3-saml.png)

4. Enter a descriptive name for your app, such as `Area 1`, and select **Next**.

5. Enter the following settings for **SAML Settings**:
    - **Single sing on URL**: `https://portal.area1security.com/api/users/saml`
    - **Audience URI (SP Entity ID)**: `https://portal.area1security.com/api/users/saml`
    - **Default RelayState**: `https://portal.area1security.com`
    - **Name ID format**: Select _EmailAddress_ from the drop-down menu.
    - **Application username**: Select _Email_ from the drop-down menu.
    - **Attribute statements (optional)**
        - **Name**: Enter email addresses for your users. Should match users already added to Area 1 dashboard.
        - **Name format**: Select _Unspecified_ from the drop-down menu.
        - **Value**: Select `user.email` from the drop-down menu.

    ![Input the correct settings in SAML settings](/email-security/static/sso/okta/step5-saml-settings.png)

6. Select **Next**.

7. Under **Are you a customer or a partner?**, select **I'm an Okta customer adding an internal app**.

8. In **App type**, select **This is an internal app that we have created**.

9. Select **Finish**.

10. Okta should display the app you have just created. If not, go to **Applications** > **Applications**, and select it.

11. Go to **Sign On** > **Settings**.

10. Select **Identity Provider metadata** and copy the URL from your browser's address bar. You will need this address to paste into your Area 1 dashboard.

## 2. Configure Area 1 to connect to Okta

1. Go to your [Area 1 Customer Portal](http://portal.area1security.com).

2. In **Settings** > **User Management**, add the email addresses of all your authorised administrators.

3. Go to **Settings** > **SSO Settings**.

4. Enable **Single Sign On** switch, and set enforcement as needed.

5. In **SAML SSO Domain** enter your SSO domain value. For example, `area1security-examplecorp.okta.com`.

6. In **Identity Provider Issuer** paste the URL you copied in step 10.

Log out of any customer portal sessions. Your Okta account should now show a tile for Area 1.