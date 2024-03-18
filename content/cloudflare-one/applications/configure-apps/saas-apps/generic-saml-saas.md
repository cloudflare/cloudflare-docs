---
pcx_content_type: how-to
title: Generic SAML application
weight: 1
---

# Generic SAML application

This page provides generic instructions for setting up a SaaS application in Cloudflare Access using the SAML authentication protocol.

## 1. Get SaaS application URLs

Obtain the following URLs from your SaaS application account:

- **Entity ID**: A unique URL issued for your SaaS application, for example `https://<your-domain>.my.salesforce.com`.
- **Assertion Consumer Service URL**: The service provider's endpoint for receiving and parsing SAML assertions.

## 2. Add your application to Access

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **SaaS**.

4. Select your **Application** from the drop-down menu. If your application is not listed, enter a custom name in the **Application** field and select the textbox that appears below.

5. Select **SAML**.

6. Select **Add application**.

7. Enter the **Entity ID** and **Assertion Consumer Service URL** obtained from your SaaS application account.

8. Select the **Name ID Format** expected by your SaaS application (usually _Email_).

9. If your SaaS application requires additional **SAML attribute statements**, add the mapping of your IdP’s attributes you would like to include in the SAML statement sent to the SaaS application.

{{<Aside type="note" header="IdP groups">}}
If you are using Okta, AzureAD, Google Workspace, or GitHub as your IdP, Access will automatically send a SAML attribute titled `groups` with all of the user's associated groups as attribute values.
{{</Aside>}}

10. (Optional) Configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) for the application.

11. {{<render file="access/_access-block-page.md">}}

12. {{<render file="access/_access-choose-idps.md">}}

13. Select **Next**.

## 2. Add an Access policy

1. To control who can access your application, [create an Access policy](/cloudflare-one/policies/access/).

2. Select **Next**.

## 3. Configure SSO in your SaaS application

Finally, you will need to configure your SaaS application to require users to log in through Cloudflare Access.

1. Configure the following fields with your SAML SSO-compliant application:

   - **SSO endpoint**
   - **Access Entity ID or Issuer**
   - **Public key**

   You can either manually enter this data into your SaaS application or upload a metadata XML file. The metadata is available at the URL: `<SSO Endpoint>/saml-metadata`. The SSO Endpoint can be copied out of the dashboard.

2. Select **Done**.

## 4. Test the integration

{{<render file="access/saas-apps/_test-integration.md" withParameters="the SaaS application's login URL">}}