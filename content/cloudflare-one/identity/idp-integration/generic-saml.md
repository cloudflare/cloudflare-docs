---
pcx_content_type: how-to
title: Generic SAML 2.0
weight: 1
---

# Generic SAML 2.0

Cloudflare Zero Trust integrates with any identity provider that supports SAML 2.0. If your identity provider is not listed in the integration list of login methods on the Zero Trust Dashboard, it can be configured using SAML 2.0 (or OpenID if OIDC based). Generic SAML can also be used if you would like to pass additional SAML headers or claims for an IdP in the integration list.

## Prerequisites

Minimum requirements for identity providers:

- The IdP must conform to SAML 2.0.
- The IdP must provide a **Single sign-on URL**, an **Entity ID** or **Issuer URL**, and a **Signing certificate**.
- The IdP must include the signing public key in their SAML response.

## 1. Create an application in your identity provider

Most identity providers allow users to create an **Application**. In this context, an application is a set of parameters that the identity provider will then pass on to Cloudflare to establish an integration.

The typical setup requirements are:

1. Create a new integration in the identity provider with the type set as **SAML**.
2. Set the **Entity/Issuer ID** to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`, where `<your-team-name>` should be your Cloudflare Zero Trust [team name](/cloudflare-one/glossary/#team-name).
3. Set the **Single sign-on URL** (or similarly named) to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`, where `<your-team-name>` should be your Cloudflare Zero Trust [team name](/cloudflare-one/glossary/#team-name).
4. Set the **Name ID/Email format** to `emailAddress`.
5. (Optional) Set the signature policy to _Always Sign_.

### (Optional) Upload SAML metadata

If your identity provider supports metadata file configuration, use the endpoint: `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata` to download and generate an XML file. Upload this XML file to the identity provider.

## 2. Add a SAML identity provider to the Zero Trust Dashboard

1. On the [Zero Trust dashboard](dash.teams.cloudflare.com/), go to **Settings** > **Authentication** > **Login methods**.
2. Select **Add new** and select **SAML**.
3. Choose a descriptive name for your identity provider.
4. Enter the **Single Sign on URL**, **IdP Entity ID or Issuer URL**, and **Signing certificate** obtained from your identity provider.
5. (Optional) Enter [additional SAML configurations](#additional-saml-configurations).
6. Select **Save**.

## 3. Test the connection

You can now [test the IdP integration](/cloudflare-one/identity/idp-integration/#test-idps-on-the-zero-trust-dashboard). A success response should return the configured SAML attributes.

## Additional SAML configurations

SAML integrations allow users to include additional headers or claims that can be passed to applications.

### Sign SAML authentication request

This optional configuration signs the Access JWT with the Cloudflare Access public key to ensure that the JWT is coming from a legitimate source. The Cloudflare public key can be obtained at `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/certs`.

### Email attribute name

Many [Access policies](/cloudflare-one/policies/access/) depend on a user’s email address. Some identity providers have a different naming for the email address attribute (for example, `Email`, `e-mail`, `emailAddress`). This can typically be checked in the identity provider's SAML test option.

Example in Okta:

![Preview the SAML assertion from the Okta dashboard](/cloudflare-one/static/documentation/identity/saml-assertion.png)
![Determine the email attribute name from the SAML assertion](/cloudflare-one/static/documentation/identity/saml-attributes.png)

### SAML attributes

SAML attributes can be added to the Access JWT. These can then be consumed by self-hosted or SaaS applications connected to Access. Any SAML attribute configured in the SAML integration must also be sent from the IdP.

Example in Okta:

![Configure Okta to send SAML attributes](/cloudflare-one/static/documentation/identity/attribute-statements.png)

How to receive these SAML attributes in Cloudflare:

![Configure Cloudflare to receive SAML attributes](/cloudflare-one/static/documentation/identity/attributes-cloudflare.png)

### SAML header attributes

If an application only requires specific SAML attributes on sign-in, then the attributes can be passed as headers. The **Attribute name** should be the values coming from the IdP. The **Header name** is what will appear in the initial authorization header from Access.
