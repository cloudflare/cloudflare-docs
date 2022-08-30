---
pcx_content_type: how-to
title: SaaS applications
weight: 1
layout: single
---

# Add a SaaS application to Access

Cloudflare Access allows you to add an additional authentication layer to your SaaS applications. When you integrate a SaaS application with Access, users log in using your existing identity providers and are only granted access if they pass your Access policies.

This page provides generic instructions for setting up a SaaS application on the Zero Trust dashboard.

## 1. Get SaaS application URLs

Obtain the following URLs from your SaaS application account:

- **Entity ID**: A unique URL issued for your SaaS application, for example `https://<your-domain>.my.salesforce.com`.
- **Assertion Consumer Service URL**: The service provider's endpoint for receiving and parsing SAML assertions.

## 2. Add your application to Access

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **SaaS**.

4. Select your **Application** from the drop-down menu. If your application is not listed, enter a custom name in the **Application** field and select the textbox that appears below.

5. Enter the **Entity ID** and **Assertion Consumer Service URL** obtained from your SaaS application account.

6. Select the **Name ID Format** expected by your SaaS application (usually _Email_).

7. If your SaaS application requires additional **SAML attribute statements**, add the mapping of your IdP’s attributes you would like to include in the SAML statement sent to the SaaS application.

8. (Optional) Turn on **App Launcher visibility** if you want the application to be visible in the [App Launcher](/cloudflare-one/applications/app-launcher/). 
{{<Aside type="note">}}
The toggle does not impact the ability for users to reach the application. Users with no access to the application will not see it in the App Launcher regardless of whether the toggle is enabled. Users with access to the application will still be able to reach it with a direct link.
{{</Aside>}}

9. (Optional) Add a custom logo for your application by selecting **Custom** and entering a link to your desired image.
{{<Aside type="note">}}
If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
{{</Aside>}}

10. Next, choose the **Identity providers** you want to enable for your application.

11. Turn on **Instant Auth** if you are selecting only one login method for your application, and would like your end users to skip the identity provider selection step.

12. Select **Next**.

## 2. Add an Access policy

1. To control who can access your application, [create an Access policy](/cloudflare-one/policies/access/).

2. Select **Next**.

## 3. Configure SSO in your SaaS application

Finally, you will need to configure your SaaS application to require users to log in through Cloudflare Access.

1. Configure the following fields with your SAML SSO-compliant application:

    * **SSO endpoint**
    * **Access Entity ID or Issuer**
    * **Public key**

    ![Copy SSO settings for a SaaS application from the Zero Trust dashboard](/cloudflare-one/static/documentation/applications/saas-integrate.png)

2. Select **Done**.

Your application will appear on the **Applications** page.

## Related tutorials

The following tutorials provide detailed integration instructions for specific SaaS applications.

- [Cloudflare Area 1](/cloudflare-one/tutorials/area-1/)

- [Zendesk](/cloudflare-one/tutorials/zendesk-sso-saas/)

- [Docusign](/cloudflare-one/tutorials/docusign-access/)

- [Hubspot](/cloudflare-one/tutorials/hubspot-saas/)

- [AWS](/cloudflare-one/tutorials/aws-sso-saas/)

- [Salesforce](/cloudflare-one/tutorials/salesforce-saas/)
