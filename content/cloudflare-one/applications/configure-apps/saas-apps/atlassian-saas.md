---
pcx_content_type: integration-guide
title: Atlassian Cloud
weight: 4
---

# Connect to Atlassian Cloud through Access

This guide covers how to configure [Atlassian Cloud](https://support.atlassian.com/security-and-access-policies/docs/configure-saml-single-sign-on-with-an-identity-provider/) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to an Atlassian Cloud account
- Atlassian Guard Standard subscription
- A [domain](https://support.atlassian.com/user-management/docs/verify-a-domain-to-manage-accounts/) verified in Atlassian Cloud

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, select _Atlassian_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
7. Copy the **Access Entity ID or Issuer**, **Public key**, and **SSO endpoint**.
8. Keep this window open without selecting **Select configuration**. You will finish this configuration in step [4. Finish adding a SaaS application to Cloudflare Zero Trust](#4-finish-adding-a-saas-application-to-cloudflare-zero-trust).

## 2. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3. Configure an identity provider and SAML SSO in Atlassian Cloud

1. In Atlassian Cloud, go to **Security** > **Identity providers**.
2. Select **Other provider** > **Choose**.
3. For **Directory name**, enter your desired name. For example, you could enter `Cloudflare Access`.
4. Select **Add** > **Set up SAML single sign-on** > **Next**.

{{<Aside type="note">}}

This screen will advise you to create an authentication policy before proceeding. You will do this in step [5. Create an application policy to test integration](#5-create-an-authentication-policy-to-test-integration).

{{</Aside>}}

5. Fill in the following fields:
    - **Identity provider Entity ID**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Identity provider SSO URL**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Public x509 certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
6. Select **Next**.
7. Copy the **Service provider entity URL** and **Service provider assertion consumer service URL**.
8. Select **Next**.
9. Under **Link domain**, select the domain you want to use with SAML SSO.
10. Select **Next** > **Stop and save SAML**.

## 4. Finish adding a SaaS application to Cloudflare Zero Trust

1. In your open Zero Trust window, fill in the following fields:
    - **Entity ID**: Service provider entity URL from Atlassian Cloud SAML SSO set-up.
    - **Assertion Consumer Service URL**: Service provider assertion comsumer service URL from Atlassian Cloud SAML SSO set-up.
    - **Name ID format**: _Email_
2. Select **Save configuration**.
3. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
4. Select **Done**.

## 5. Create an authentication policy to test integration

To enable SSO for users in Atlassian Cloud, create an [Atlassian authentication policy](https://support.atlassian.com/security-and-access-policies/docs/configure-authentication-policies-for-your-organization/):

1. In Atlassian Cloud, go to **Security** > **Authentication policies**.
2. Select **Add policy**.
3. Under **Directory**, select the identity provider you used to configure SAML SSO.
4. For **Policy name**, enter your desired name.
5. Select **Add**.
6. In **Settings**, turn on **Enforce single sign-on**.
7. In **Members**, select **Add members**.
8. In **Individual Users**, select your desired test user(s) in the dropdown, and select **Add members**.
9. In **Settings**, select **Update** > **Update**.

## 6. Test the integration

Open an incognito browser window and log in with the credentials of the test user you added to the test authentication policy. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. When this is successful, turn on **Enforce single sign-on** in your desired authentication policy, or add the desired users to the application policy created in step [5. Create an Application Policy to test Integration](#5-create-an-authentication-policy-to-test-integration).
