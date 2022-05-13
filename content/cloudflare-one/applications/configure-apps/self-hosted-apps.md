---
pcx-content-type: how-to
title: Self-hosted applications
weight: 2
---

# Self-hosted applications

{{<Aside>}}

<b>Before you start</b>

- **<a href="/fundamentals/get-started/setup/add-site/">Add a website to Cloudflare</a>**
- **<a href="/dns/zone-setups/full-setup/">Change your domain nameservers to Cloudflare</a>**

{{</Aside>}}

Cloudflare Access allows you to securely publish internal tools and applications to the Internet, by providing an authentication layer using your existing identity providers to control who has access to your applications.

![Self-hosted applications diagram](/cloudflare-one/static/documentation/applications/network-diagram.png)

Make sure you create [Access policies](/cloudflare-one/policies/access/) before connecting your application to Cloudflare. To [connect your origin](/cloudflare-one/connections/connect-apps/) to Cloudflare, you can use [Cloudflare Tunnel](/cloudflare-one/glossary/#cloudflare-tunnel). If you do not wish to use Cloudflare Tunnel, you must [validate the token](/cloudflare-one/identity/users/validating-json/) issued by Cloudflare on your origin.

### 1. Add your application

1.  On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Access > Applications**.

1.  Click **Add an application**.

1.  Select **Self-hosted**.

    ![Access Saas and Self-Hosted](/cloudflare-one/static/documentation/applications/add-saas-application.png)

    You are now ready to start configuring your app.

1.  Choose an **application name** and set a **session duration**.

    {{<Aside>}}
    The session duration for an application will determine the minimum frequency a user will be prompted to authenticate with the configured provider. If you want users to be prompted to authenticate every time they reach your application, select `No duration, expires immediately`.
    {{</Aside>}}

    ![Set application name](/cloudflare-one/static/documentation/applications/applications-name-session.png)

1.  From the drop-down menu under **Application domain**, select a hostname that will represent the application. The hostname must be an active zone in your Cloudflare account.

{{<Aside>}}
When specifying an application domain, you can use wildcards to protect multiple parts of an application that share a root path. For more information on how to use wildcards, refer to the instructions in the [Application paths](/cloudflare-one/policies/access/app-paths/) page.
{{</Aside>}}

1.  Scroll down to the **Application visibility** card.

        *   Toggle on **Show application in the App Launcher** if you want the application to be visible in the App Launcher. The toggle does not impact the ability for users to reach the application. Users with no access to the application will not see it in the App Launcher regardless of whether the toggle is enabled. Users with access to the application will still be able to reach it with a direct link.
        *   \[Optional] Add a custom logo for your application by clicking **Custom** and entering a link to your desired image.

         {{<Aside>}}

    If you're having issues specifying a custom logo, check that the image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` will not work. However, `https://www.example.com/upload/logo.png` will.
    {{</Aside>}}

1.  Next, scroll down to the **Identity Providers** card to select the identity providers you want to enable for your app.

    ![Select identity providers](/cloudflare-one/static/documentation/applications/saas-idp.png)

1.  Turn on **Instant Auth** if you are selecting only one login method for your application, and would like your end users to skip the identity provider selection step.

1.  Click **Next**.

### 2. Add a policy

You can now configure a policy to control who can access your app.

To learn more about how policies work, read our [Policies section](/cloudflare-one/policies/).

1.  First, specify a name for your rule. This is a mandatory field.

1.  Specify a policy action.

1.  Specify one or more rules in the **Configure a rule** box. You can add as many include, exception, or require statements as needed.

1.  Click **Next** to add your application to Access.

### 3. Advanced settings

The **Setup section** allows you to configure a few advanced settings for your application.

1.  Configure [Cross-Origin Resource Sharing (CORS) settings](/cloudflare-one/policies/access/cors/).

![Advanced settings](/cloudflare-one/static/documentation/applications/advanced-settings.png)

1.  Configure **cookie settings**. For more information, you can read about [session management here](/cloudflare-one/identity/users/session-management/#browser-cookies-configuration-options).

![Cookies and cloudflared settings](/cloudflare-one/static/documentation/applications/cookie-cloudflared.png)

1.  Configure **`cloudflared` settings**. For more information, read more about [automatic `cloudflared` authentication](/cloudflare-one/applications/non-http/#automatic-cloudflared-authentication).

1.  Once you've configured the settings as needed, click **Add application**.

Your application is now available in Cloudflare Access, and will appear in your Applications list. You can proceed with [connecting your origin](/cloudflare-one/connections/connect-apps/) to Cloudflare using this address.
