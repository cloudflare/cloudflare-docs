---
pcx_content_type: how-to
title: GitHub Enterprise Cloud
weight: 9
---


# Connect to GitHub Enterprise Cloud through Access

This guide covers how to configure [GitHub Enterprise Cloud](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-iam/using-saml-for-enterprise-iam/configuring-saml-single-sign-on-for-your-enterprise) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- A GitHub Enterprise Cloud subscription
- Access to a GitHub account as an organization owner

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, select _Github_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://github.com/orgs/<your-organization>`
    - **Assertion Consumer Service URL**: `https://github.com/orgs/<your-organization>/saml/consume`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3. Configure an identity provider and SAML SSO in GitHub Enterprise Cloud
1. In your Github organization page, go to **Settings** > **Authentication security**.
2. Under **SAML single sign-on**, turn on **Enable SAML authentication**.
3. Fill in the following fields:
    - **Sign on URL**:  SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Public certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
4. Copy the **Service provider entity URL** and **Service provider assertion consumer service URL**.

## 4. Test the integration

Select **Test SAML configuration**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. 
When this is successful, you can turn on **Require SAML SSO authentication for all members of your organization** if you want to enforce SSO login with Cloudflare Access.
