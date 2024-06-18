---
pcx_content_type: how-to
title: Slack
weight: 10
---

# Connect to Slack through Access

This guide covers how to configure Slack in Cloudflare Zero Trust.

## Prerequisites

- Slack Business+ or Enterprise Grid plan

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
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
3. Enable **Test**. Configuration changes will not apply until **Configuration** is turned on.
4. Fill in the following fields:
    - **SAML SSO URL**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Identity Provider Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Public Certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x.509-certificate).
5. Under **Settings**, choose whether SSO is _required_, _partially required_, or _optional_ for workspace members.
6. (Optional) Under **Customize**, enter a **Sign in Button Label**.
7. Test your set-up. If all works well, turn **Test** to **Configure**.

{{</tab>}}

{{<tab label="enterprise grid plan" no-code="true">}}

1. In Slack, go to **Settings & administration** > **Organization settings** > **Security**.
2. Select **SSO Settings**.
3. Fill in the following fields:
    - **SAML SSO URL**: SSO endpoint from application configuration in Cloudflare Zero Trust.
    - **Identity Provider Issuer**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust.
    - **Public Certificate**: Paste the entire x.509 certificate from step [2. Create a x.509 certificate](#2-create-a-x.509-certificate).
4. Select **Test Configuration**.
5. If all works well, select **Turn on SSO** or **Add SSO**.

{{</tab>}}
{{</tabs>}}