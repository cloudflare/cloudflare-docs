---
pcx_content_type: integration-guide
title: Miro
weight: 17
---

# Connect to Miro through Access

This guide covers how to configure [Miro](https://help.miro.com/hc/articles/360017571414-Single-sign-on-SSO) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Miro Business or Enterprise plan account
- A [verified domain](https://help.miro.com/hc/articles/360034831793-Domain-control) added to your Miro account (Enterprise plan), or be prepared to do so during SSO configuration (Business or Enterprise plan)

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS**.
3. For **Application**, enter `Miro` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://miro.com/`
    - **Assertion Consumer Service URL**: `https://miro.com/sso/saml`
    - **Name ID format**: _Email_
7. Copy the **SSO endpoint** and **Public key**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Add a SAML SSO provider to Miro

{{<tabs labels="Business plan | Enterprise plan">}}
{{<tab label="business plan" no-code="true">}}

{{<render file="access/saas-apps/_miro-sso.md" withParameters="**Security**;;Enter">}}

{{</tab>}}

{{<tab label="enterprise plan" no-code="true">}}

{{<render file="access/saas-apps/_miro-sso.md" withParameters="**Security and Compliance** > **Authentication** > **Single sign-on**;;If you have not previously [verified the domain](https://help.miro.com/hc/articles/360034831793-Domain-control), enter">}}

{{</tab>}}
{{</tabs>}}

## 3. Test the integration

In the Miro SAML/SSO configuration page, select **Test SSO Configuration**.  You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider. If the login is successful, you will receive a **SSO configuration test was successful** message.

{{<Aside type="note">}}

When testing the integration, you do not have to use an email from a domain you have configured for SSO or a user configured in Miro. The only requirement is that the user is already configured in your identity provider.

{{</Aside>}}
