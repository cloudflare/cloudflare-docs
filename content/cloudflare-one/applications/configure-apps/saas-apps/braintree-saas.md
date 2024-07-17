---
pcx_content_type: how-to
title: Braintree
weight: 5
---

# Connect to Braintree through Access

This guide covers how to configure [Braintree](https://developer.paypal.com/braintree/articles/guides/single-sign-on-sso) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Braintree production or sandbox account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `Braintree` and select the textbox that appears below.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields with temporary values:
    - **Entity ID**: `placeholder`
    - **Assertion Consumer Service URL**: `https://www.placeholder.com`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Enable SSO Configuration in Braintree

1. In Braintree, create a [support ticket](https://developer.paypal.com/braintree/help).
2. In **Search Issues**, enter `Login and password issues` and select the corresponding value.
3. In **Issue Details**, fill in the following:
    - **Merchant ID**: Your Braintree Merchant ID. This is the 16-digit value that follows `/merchants/`in your Braintree Control Panel URL.
    - **Email domain(s) to be used in user IDs**: The email domain(s) that should be allowed to sign in to your account via SSO.
    - **Single Sign-on HTTP POST Binding URL**: SSO endpoint from application configuration in Cloudflare Zero Trust
    - **Certificate for validation**: Public key from application configuration in Cloudflare Zero Trust.
4. Select whether you are using a **Production** or **Sandbox** account.
5. Fill out the **Your contact information** fields and select **Submit a help request**.
6. When you receive an email stating SSO has been successfully configured for your account, you can proceed to the next step.

## 3. Finish adding a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Braintree** > **Edit** > **Overview**.
3. Replace the temporary values for **Entity ID** and **Assertion Consumer Service URL** with the link provided in the successful SSO configuration email from Braintree support. You will use the same link for both values.
4. Select **Save Application**.

## 4. Test the integration and add SSO users

1. In your Braintree Control Panel, select the **settings** icon > **Team**.
2. Select your desired test user.
3. Under **Single Sign-On**, select **Enable**.
4. Open an incognito browser window. In the address bar, paste `https://id.sandbox.braintreegateway.com` for a sandbox account or
`https://id.braintreegateway.com` for a production account.
5. In **Your corporate email address** field, type your test user's email. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.
6. Upon successful sign-in, you can enable SSO for other users using steps 4.1 - 4.3.