---
pcx_content_type: how-to
title: Slack
weight: 18
---

# Connect to Slack through Access

This guide covers how to configure [Slack](https://slack.com/help/articles/203772216-SAML-single-sign-on) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Slack Business+ or Enterprise Grid plan account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, select _Slack_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://slack.com`
    - **Assertion Consumer Service URL**: `https://<YOUR_DOMAIN>.slack.com/sso/saml`
    - **Name ID format**: The format expected by Slack, usually _Email_
7. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create a x.509 certificate

1. Paste the **Public key** in a text editor.
2. Wrap the certificate in `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`.

## 3. Add a SAML SSO provider to Slack

{{<tabs labels="Business+ plan | Enterprise Grid plan">}}
{{<tab label="business+ plan" no-code="true">}}

1. In Slack, go to **Settings & administrations** > **Workspace settings** > **Authentication**.
2. Select **Configure**.
3. Turn on **Test**. Configuration changes will not apply until **Configure** is turned on.
4. Fill in the following fields:
    - **Service Provider Issuer URL**: Ensure set to `https://slack.com`.
    - **SAML SSO URL**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Identity Provider Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Public Certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
4. Under **Advanced Options**, select **Expand**.
5. For **AuthnContextClassRef**, ensure _urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport_ is selected.
6. Ensure **Sign the AuthnRequest** is turned off.
7. For **SAML Response Signing**, turn on **Sign the Response** and **Sign the Assertion**.
8. In the main configuration page under **Settings**, choose whether SSO is _required_, _partially required_, or _optional_ for workspace members.
9. (Optional) Under **Customize**, enter a **Sign in Button Label**.
10. Test your set-up. If all works well, turn **Test** to **Configure**.

{{</tab>}}

{{<tab label="enterprise grid plan" no-code="true">}}

1. In Slack, go to **Settings & administration** > **Organization settings** > **Security** > **SSO Settings**.
2. For **SSO name**, enter your desired name.
3. Fill in the following fields:
    - **SAML 2.0 Endpoint URL**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Identity Provider Issuer URL**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Service Provider Issuer URL**: Ensure set to `https://slack.com`.
    - **x.509 Certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x509-certificate).
4. For **AuthnContextClassRef**, ensure _urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport_ is selected.
5. Ensure **Sign the AuthnRequest** is turned off.
6. For **SAML Response Signing**, turn on **Sign the Response** and **Sign the Assertion**.
7. Select **Test Configuration**.
8. If all works well, select **Turn on SSO** or **Add SSO**.

{{</tab>}}
{{</tabs>}}