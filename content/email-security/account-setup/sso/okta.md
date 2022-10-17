---
title: Okta guide
pcx_content_type: how-to
weight: 1
meta:
    title: Okta integration guide
---

# Okta integration guide

In this tutorial you will learn how to connect your Area 1 account to Okta. When single sign-on (SSO) is correctly configured, your authorized employees can connect to the Area 1 dashboard using a familiar username and password.

## 1. Creating an Area 1 app in Okta

You will need to manually create an app for Area 1 in Okta.

1. Log in to Okta as an administrator and select **Add Application**.

2. Go to **New App** > **SAML 2.0** and select **Create**.

3. Name the app `Area 1` and select **Next**.

4. In the **SAML Settings** dialog box that opens, enter the following settings:
    * **Single sing on URL**: `https://portal.area1security.com/api/users/saml`
    * **Audience URI**: `https://portal.area1security.com/api/users/saml`
    * **Default RelayState**: `https://portal.area1security.com`
    * **Name ID format**: From the dropdown menu, choose _EmailAddress_
    * **Application username**: From the dropdown menu, choose _Email_
    * **Attribute statements (optional)**
        * **Name**: `email`
        * **Name format**: From the dropdown menu, choose _Unspecified_
        * **Value**: `user.email`
    * Select **Next**.

5. In **Are you a customer or a partner?**, choose **I'm an Okta customer adding an internal app**.

6. In **App type**, choose **This is an internal app that we have created**.

7. Select **Finish**.

8. Select the app you have just created.

9. Go to the **Sign On** tab > **Settings**.

10. Select **Identity Provider metadata** and copy the URL from your browser's address bar. You will need this address to paste into your Area 1 dashboard.

## 2. Configure Area 1 to connect to Okta

1. Go to your [Area 1 Customer Portal](http://portal.area1security.com).

2. In **Settings** > **User Management**, add the email addresses of all your authorised administrators.

3. Go to **Settings** > **SSO Settings**.

4. Enable **Single Sign On** switch, and set enforcement as needed.

5. In **SAML SSO Domain** enter your SSO domain value. For example, `area1security-examplecorp.okta.com`.

6. In **Identity Provider Issuer** paste the URL you copied in step 10.

Log out of any customer portal sessions. Your Okta account should now show a tile for Area 1.