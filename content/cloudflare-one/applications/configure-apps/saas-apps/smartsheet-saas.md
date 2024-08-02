---
pcx_content_type: how-to
title: Smartsheet
weight: 25
---

# Connect to Smartsheet through Access

This guide covers how to configure [Smartsheet](https://help.smartsheet.com/articles/2483123-domain-level-saml-configuration) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Smartsheet Enterprise account
- A [domain](https://help.smartsheet.com/articles/2483051-domain-management) verified in Smartsheet

{{<Aside type="note">}}

In Smartsheet, SSO is configured for a domain. If you have multiple plans using the same domain, the SSO configuration will apply to all Smartsheet users in that domain, regardless of their plan type.

{{</Aside>}}

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `Smartsheet` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `urn:amazon:cognito:sp:us-east-1_xww1cbP43`
    - **Assertion Consumer Service URL**: `https://saml.authn.smartsheet.com/saml2/idpresponse`
    - **Name ID format**: _Unique ID_
7. Copy the **SAML Metadata endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Create and test a SAML SSO provider in Smartsheet

1. In your Smartsheet Admin Center, go to **Settings** > **Authentication** > **Add a SAML IdP**.
2. In **Other IdP (Customize)**, select **Configure**.
3. Select **Next**.
4. Under **XML URL**, paste the SAML Metadata endpoint from application configuration in Cloudflare Zero Trust.
5. Under **Name SAML IdP**, enter a name (for example, `Cloudflare Access`).
6. Select **Save & Next**.
7. Select **Verify connection** and sign in via Access. If validation is successful, you will see a **SAML IdP Successfully Connected!** message. Close the configuration verification page.
8. Turn on **I have successfully verified the connection**.
9. Select **Save & Next**.
10. Under **Assign domains to SAML IdP**, select your desired domain.
11. Select **Save and Next** and then **Finish**.