---
order: 1
pcx-content-type: how-to
---

# SaaS applications

Cloudflare Access allows you to integrate your SaaS products by acting as an identity aggregator, or proxy. This way, users cannot login to SaaS applications without first meeting the criteria you want to introduce.

![SaaS applications diagram](../../static/documentation/applications/diagram-saas.jpg)

### 1. Add your application

1. On the [Teams dashboard](https://dash.teams.cloudflare.com), navigate to **Access > Applications**.

1. Click **Add an application**.

1. Select **SaaS**.

 ![Access Saas and Self-Hosted](../../static/documentation/applications/add-saas-application.png)

1. In the **Configure app** section, select an application from the Application drop-down menu. If your application is not listed, type its name in the textbox and select it.

1. In the **Entity ID** field, provide the unique identifier of your SaaS application.
SaaS applications store this information in different ways.

1. In the **Assertion Consumer Service URL** field, input the service provider’s endpoint for receiving and parsing SAML assertions.

1. If your SaaS application requires additional SAML statements, add the mapping of your IdP’s attributes you would like to include in the SAML statement sent to the SaaS application.

  ![Custom SaaS statements](../../static/documentation/applications/custom-saas-statements.png)


1. Scroll down to the **Application logo** card to choose a logo that will represent the application in the App Launcher and in the Applications page.

  <Aside>
  
  If you're having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, <code>http://www.example.com/upload/logo.png</code> will not work. However, <code>https://www.example.com/upload/logo.png</code> will.

  </Aside>

1. Next, scroll down to the **Identity Providers** card to select the identity providers you want to enable for your app.

  ![Setup SaaS IdPs](../../static/documentation/applications/saas-idp.png)

1. Turn on **Instant Auth** if you are selecting only one login method for your application, and would like your end users to skip the identity provider selection step.

1. Click **Next**.

### 2. Add a policy
You can now configure a policy to control who can access your app.

To learn more about how policies work, read our [Policies](/policies/).

1. First, specify a name for your rule. This is a mandatory field.
1. Specify a policy action.
1. Specify one or more rules in the **Configure a rule** box. You can add as many include, exception, or require statements as needed.
1. Click **Next** to add your application to Access.

### 3. Integrate your SaaS application with Access

Before you begin using your application through Access, your last step is to integrate your SaaS application to Access.

1. First, configure these fields with your SAML SSO-compliant application. Take note of these fields before you click **Done**:

  * Your SSO endpoint
  * Your Access Entity ID or Issuer
  * Your Public key

 ![Setup SaaS IdPs](../../static/documentation/applications/saas-integrate.png)

1. Click **Done** to see your application listed on your Applications tab.
