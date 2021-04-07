---
order: 2
---

# Configure identity providers

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

You can integrate your organization's identity providers (IdPs) with Cloudflare Access. Your team can simultaneously use multiple providers, reducing friction when working with partners or contractors.

Cloudflare Access supports social identity providers that do not require administrator accounts, open source providers, and corporate providers. Cloudflare also supports using signed AuthN requests with SAML providers.

Adding an identity provider as a login method requires configuration both on the [Teams dashboard](https://dash.teams.cloudflare.com) and with the identity provider. Consult our IdP-specific documentation to learn more about what you need to set up.

## Set up IdPs on the Teams dashboard

1. Navigate to **Access > Authentication** on the [Teams dashboard](https://dash.teams.cloudflare.com).
2. In the **Login methods** card, click *+Add*.

![Login methods](../../static/summary/login-methods-card.png)

3. Select the identity provider you want to set up. You can integrate multiple providers of the same type.

4. Fill in the necessary fields to set up your identity provider.

Each identity provider will have different required fields for you to fill in. If you need help, step-by-step instructions can be expanded below the input form.

![IdP Setup Fields](../../static/summary/idp-setup-card.png)

If you do not see your identity provider listed, but they support SAML or OAuth, these providers can typically still be enabled. If they support SAML select the SAML option. If they support OAuth select the **OpenID Connect** option.

4. Once you have filled in the necessary fields, click **Save**.

## Test IdPs on the Teams dashboard

To test if an IdP is correctly configured, click on **Authentication** > **Login Methods** > **Test**. This will attempt to connect to the IdP to verify if a valid connection is established.

![Test and Edit IdPs](../../static/identity-index/auth-home.png)

### Your provider is connected

If your provider is connected, another window will open in your browser, with this message:

![Connected IdP](../../static/identity-index/connected-idp.png)
 
### Your provider is not connected

If your provider is not connected, another window will open in your browser. Along with an error message, you will receive a detailed explanation of why the test has failed.

## Using The API

We recommend that you use our dashboard to configure your identity providers. However, if you would like to use the [Cloudflare API](https://api.cloudflare.com/), each of the identity provider topics covered here include an example API configuration snippet as well.