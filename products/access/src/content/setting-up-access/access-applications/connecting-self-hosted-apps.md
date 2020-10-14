---

order: 1
---

# Connecting Self-Hosted Applications

Cloudflare Access allows you to securely publish internal tools and applications to the Internet by providing an authentication layer using your existing identity providers to control who has access to your applications.


## 1. Add and configure your app

1. Navigate to the **Applications** tab on the Teams dashboard.

2. Click **Add an application**.

3. Select **Self-hosted**.

![Access Saas and Self-Hosted](../../static/summary/selfhosted-vs-saas.png)

You are now ready to start configuring your app.

4. Choose an **application name** and set a **session duration**.
The session duration will determine the minimum frequency a user will be prompted to authenticate with the configured provider.

![Set application name](../../static/summary/application-name.png)

5. From the drop-down menu under **Application domain**, select a hostname that will represent the application. The hostname must be an active zone in your Cloudflare account.

6. Scroll down to the **Application logo** card to configure your application logo.
To add a custom logo, click **Custom** and input a link to your desired image.

![Set application logo](../../static/summary/app-logo-sh.png)

7. Next, scroll down to the **Identity Providers** card to select the identity providers you want to enable for your app.

![Select identity providers](../../static/summary/idps-saas.png)

9. Click **Next**.

## 2. Add rules for your app

The **Add rules** step lets you configure rules to control who can access your app.

![Configure policy](../../static/summary/configure-policy.png)

1. First, specify a **Rule name**.

2. Specify a **Rule action**. By specifying an action, you define how this rule protects your application. You can set up a rule to either *block*, *allow*, or *bypass* certain users or user categories.

3. In the **Configure a rule** card, you can add rules to define which users or user categories are affected. You can add rules of the following types:
   * Include
   * Exclude
   * Require

4. Click **Next**.

## 3. Configure advanced settings

The **Setup section** allows you to configure CORS settings. To learn more about CORS, read our [Cross-Origin Resource Sharing (CORS) section](/setting-up-access/cors/).

 ![Advanced settings](../../static/summary/advanced-settings.png)

 Click **Add application**.

Your application is now connected to Access, and will appear in your Applications list.


