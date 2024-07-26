---
pcx_content_type: integration-guide
title: ServiceNow (SAML)
weight: 20
---

# Connect to ServiceNow through Access (SAML)

This guide covers how to configure [ServiceNow](https://docs.servicenow.com/bundle/washingtondc-platform-security/page/integrate/single-sign-on/task/t_CreateASAML2Upd1SSOConfigMultiSSO.html) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a ServiceNow account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, enter `ServiceNow` and select the corresponding textbox that appears.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: `https://<INSTANCE-NAME>.service-now.com`
    - **Assertion Consumer Service URL**: `https://<INSTANCE-NAME>.service-now.com/navpage.do`
    - **Name ID format**: _Email_
7. Copy the **SAML Metadata endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Add the Multiple Provider Single Sign-On Installer Plugin to ServiceNow

1. In ServiceNow, select **All**.
2. In the search bar, enter `System Applications`, and under **All Available Applications**, select **All**.
3. In the search bar, enter `Integration - Multiple Provider Single Sign-On Installer`.
4. Select **Install**.
5. Ensure that **Install now** is selected, and select **Install**.

## 3. Add and Test a SAML SSO provider in ServiceNow

1. Select **All**.
2. In the search bar enter `Multi-Provider SSO`, and select **Identity Providers**.
3. Select **New** > **SAML**.
4. In the pop-up, ensure that **URL** is selected.
5. Paste the **SAML Metadata endpoint** from application configuration in Cloudflare Zero Trust in the empty field.
6. Select **Import**.
7. (Optional) Change the **Name** field to a more recognizable name.
8. Turn off **sign AuthenRequest**.
9. Select **Update**.
10. In the pop-up, select **Cancel** and then **>**.
11. Select the **Name** of the configuration you just completed.
12. Select **Test Connection**.
13. If the test succeeds, select **Activate**.
