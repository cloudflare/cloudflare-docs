---
pcx_content_type: how-to
title: SaaS applications
weight: 2
---

# SaaS applications

Cloudflare Access allows you to integrate your SaaS products by acting as an identity aggregator, or proxy. This way, users cannot login to SaaS applications without first meeting the criteria you want to introduce.

![SaaS applications diagram](/cloudflare-one/static/documentation/applications/diagram-saas.jpg)

## 1. Add your application

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access > Applications**.

2.  Click **Add an application**.

3.  Select **SaaS**.

    ![Access Saas and Self-Hosted](/cloudflare-one/static/documentation/applications/add-saas-application.png)

4.  In the **Configure app** section, select an application from the Application drop-down menu. If your application is not listed, type its name in the textbox and select it.

5.  In the **Entity ID** field, provide the unique identifier of your SaaS application.
    SaaS applications store this information in different ways.

6.  In the **Assertion Consumer Service URL** field, input the service provider’s endpoint for receiving and parsing SAML assertions.

7.  If your SaaS application requires additional SAML statements, add the mapping of your IdP’s attributes you would like to include in the SAML statement sent to the SaaS application.

    ![Custom SaaS statements](/cloudflare-one/static/documentation/applications/custom-saas-statements.png)

8.  Scroll down to the **Application visibility** card.

    * Toggle on **Show application in the App Launcher** if you want the application to be visible in the App Launcher. The toggle does not impact the ability for users to reach the application. Users with no access to the application will not see it in the App Launcher regardless of whether the toggle is enabled. Users with access to the application will still be able to reach it with a direct link.

    * (Optional) Add a custom logo for your application by clicking **Custom** and entering a link to your desired image.

    {{<Aside type="note">}}
If you are having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
    {{</Aside>}}

9.  Next, scroll down to the **Identity Providers** card to select the identity providers you want to enable for your app.

    ![Setup SaaS IdPs](/cloudflare-one/static/documentation/applications/saas-idp.png)

10.  Turn on **Instant Auth** if you are selecting only one login method for your application, and would like your end users to skip the identity provider selection step.

11.  Click **Next**.

## 2. Add a policy

You can now configure a policy to control who can access your app.

To learn more about how policies work, read our [Policies](/cloudflare-one/policies/).

1.  First, specify a name for your rule. This is a mandatory field.
2.  Specify a policy action.
3.  Specify one or more rules in the **Configure a rule** box. You can add as many include, exception, or require statements as needed.
4.  Click **Next** to add your application to Access.

## 3. Integrate your SaaS application with Access

Before you begin using your application through Access, your last step is to integrate your SaaS application to Access.

1.  First, configure these fields with your SAML SSO-compliant application. Take note of these fields before you click **Done**:

    - Your SSO endpoint
    - Your Access Entity ID or Issuer
    - Your Public key

    ![Setup SaaS IdPs](/cloudflare-one/static/documentation/applications/saas-integrate.png)

2.  Click **Done** to see your application listed on your Applications tab.
