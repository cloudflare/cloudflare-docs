---
pcx_content_type: how-to
title: GitHub Enterprise Cloud
weight: 24
---


# Connect to GitHub Enterprise Cloud through Access

This guide covers how to configure [GitHub Enterprise Cloud](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/using-saml-for-enterprise-iam/configuring-saml-single-sign-on-for-your-enterprise) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- A [SAML identity provider](/cloudflare-one/identity/idp-integration/generic-saml/) configured in Cloudflare Zero Trust
- A GitHub Enterprise Cloud subscription
- Access to a GitHub account which is Organization owner

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, select _GitHub_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
7. Copy the **Access Entity ID or Issuer**, **Public key**, and **SSO endpoint**.
8. Keep this window open without selecting **Select configuration**. You will finish this configuration in step [4. Finish adding a SaaS application to Cloudflare Zero Trust](#4-finish-adding-a-saas-application-to-cloudflare-zero-trust).

## 2. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3. Configure an identity provider and SAML SSO in GitHub Enterprise Cloud
1. When you are on your organization page, go to **Settings** > **Authentication security**.
2. In the section **SAML single sign-on**, click on the checkbox **Enable SAML authentication**.
3. Fill in the following fields:
    - **Sign on URL**:  SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Public certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
4. Copy the **Service provider entity URL** and **Service provider assertion consumer service URL**.

## 4. Finish adding a SaaS application to Cloudflare Zero Trust
1. In your open Zero Trust window, fill in the following fields:
    - **Entity ID**: Service provider entity URL from GitHub Enterprise Cloud SAML SSO set-up. ` https://github.com/orgs/YOUR_ORGANIZATION`
    - **Assertion Consumer Service URL**: Service provider assertion comsumer service URL from GitHub Enterprise Cloud SAML SSO set-up. ` https://github.com/orgs/YOUR_ORGANIZATION/saml/consume`
    - **Name ID format**: _Email_
2. Select **Save configuration**.
3. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
4. Select **Done**.

## 5. Test the integration


Click on **Test SAML configuration**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. 
When this is successful, you can turn on **Require SAML SSO authentication for all members of your organization** if you want to enforce the SSO with Cloudflare Access.
