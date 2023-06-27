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

{{<render file="_idp-integration.md">}}

Your IdP will now be listed in the **Login methods** card.

## Test IdPs in Zero Trust

To test if an IdP is correctly configured, navigate to **Settings** > **Authentication**. Next, click **Test** next to the IdP you would like to test. This will attempt to connect to the IdP to verify if a valid connection is established.

### Your provider is connected

If your provider is connected, another window will open in your browser, with this message:

!["Your connection works!" message displayed for a successful IdP test](/cloudflare-one/static/identity/connected-idp.png)

### Your provider is not connected

If your provider is not connected, another window will open in your browser. Along with an error message, you will receive a detailed explanation of why the test has failed.

## Use The API

We recommend that you use our dashboard to configure your identity providers. However, if you would like to use the [Cloudflare API](https://api.cloudflare.com/), each of the identity provider topics covered here include an example API configuration snippet as well.
