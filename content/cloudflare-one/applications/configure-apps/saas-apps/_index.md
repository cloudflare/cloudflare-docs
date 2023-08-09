---
pcx_content_type: how-to
title: SaaS applications
weight: 1
layout: single
---

# Add a SaaS application to Access

Cloudflare Access allows you to add an additional authentication layer to your SaaS applications. When you integrate a SaaS application with Access, users log in using your existing identity providers and are only granted access if they pass your Access policies.

This page provides generic instructions for setting up a SaaS application in Zero Trust.

## 1. Get SaaS application URLs

Obtain the following URLs from your SaaS application account:

- **Entity ID**: A unique URL issued for your SaaS application, for example `https://<your-domain>.my.salesforce.com`.
- **Assertion Consumer Service URL**: The service provider's endpoint for receiving and parsing SAML assertions.

## 2. Add your application to Access

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **SaaS**.

4. Select your **Application** from the drop-down menu. If your application is not listed, enter a custom name in the **Application** field and select the textbox that appears below.

5. Enter the **Entity ID** and **Assertion Consumer Service URL** obtained from your SaaS application account.

6. Select the **Name ID Format** expected by your SaaS application (usually _Email_).

7. If your SaaS application requires additional **SAML attribute statements**, add the mapping of your IdP’s attributes you would like to include in the SAML statement sent to the SaaS application.

{{<Aside type="note" header="IdP groups">}}
If you are using Okta, AzureAD, Google Workspace, or GitHub as your IdP, Access will automatically send a SAML attribute titled `groups` with all of the user's associated groups as attribute values.
{{</Aside>}}

9. (Optional) Under **Application Appearance**, configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) for the application.

10. {{<render file="_access-block-page.md">}}

11. Next, choose the **Identity providers** you want to enable for your application.

12. Turn on **Instant Auth** if you are selecting only one login method for your application, and would like your end users to skip the identity provider selection step.

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

   You can either manually enter this data into your SaaS application or upload a metadata XML file. The metadata is available at the URL: `<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata`

2. Select **Done**.

Your application will appear on the **Applications** page.

## Related tutorials

The following tutorials provide detailed integration instructions for specific SaaS applications.

- [Cloudflare Area 1](/cloudflare-one/tutorials/area-1/)

- [Zendesk](/cloudflare-one/applications/configure-apps/saas-apps/zendesk-sso-saas/)

- [Docusign](/cloudflare-one/applications/configure-apps/saas-apps/docusign-access/)

- [Hubspot](/cloudflare-one/applications/configure-apps/saas-apps/hubspot-saas/)

- [AWS](/cloudflare-one/applications/configure-apps/saas-apps/aws-sso-saas/)

- [Salesforce](/cloudflare-one/applications/configure-apps/saas-apps/salesforce-saas/)
