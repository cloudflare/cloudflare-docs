---
pcx_content_type: how-to
title: SSO integration
weight: 3
layout: single
---

# Integrate Single Sign-On (SSO)

Cloudflare Zero Trust allows you to integrate your organization's identity providers (IdPs) with Cloudflare Access. Your team can simultaneously use multiple providers, reducing friction when working with partners or contractors.

Adding an identity provider as a login method requires configuration both in [Zero Trust](https://one.dash.cloudflare.com) and with the identity provider itself. Consult our IdP-specific documentation to learn more about what you need to set up.

{{<Aside>}}

Cloudflare Zero Trust supports social identity providers that do not require administrator accounts, open source providers, and corporate providers. Cloudflare also supports using signed AuthN requests with SAML providers.

{{</Aside>}}

## Set up IdPs in Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), navigate to **Settings > Authentication**.

2. In the **Login methods** card, click **Add new**.

3. Select the identity provider you want to add. You can add multiple providers of the same type.

If you do not see your identity provider listed, these providers can typically still be enabled. If they support OIDC or OAuth, select the generic OIDC option. If they support SAML, select the generic SAML option. Cloudflare supports all SAML and OIDC providers and can integrate with the majority of OAuth providers. If your provider supports both SAML and OIDC, we recommend OIDC for ease of configuration.

4. Fill in the necessary fields to set up your identity provider.

Each identity provider will have different required fields for you to fill in. If you need help, step-by-step instructions can be expanded below the input form.

5. Once you have filled in the necessary fields, click **Save**.

Your IdP will now be listed in the **Login methods** card.

## Test IdPs in Zero Trust

To test if an IdP is correctly configured, navigate to **Settings** > **Authentication**. Next, click **Test** next to the IdP you would like to test. This will attempt to connect to the IdP to verify if a valid connection is established.

### Your provider is connected

If your provider is connected, another window will open in your browser, with this message:

!["Your connection works!" message displayed for a successful IdP test](/cloudflare-one/static/documentation/identity/connected-idp.png)

### Your provider is not connected

If your provider is not connected, another window will open in your browser. Along with an error message, you will receive a detailed explanation of why the test has failed.

## Use The API

We recommend that you use our dashboard to configure your identity providers. However, if you would like to use the [Cloudflare API](https://api.cloudflare.com/), each of the identity provider topics covered here include an example API configuration snippet as well.
