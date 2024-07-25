---
pcx_content_type: how-to
title: Generic SAML 2.0
weight: 2
---

# Generic SAML 2.0

Cloudflare Zero Trust integrates with any identity provider that supports SAML 2.0. If your identity provider is not listed in the integration list of login methods in Zero Trust, it can be configured using SAML 2.0 (or OpenID if OIDC based). Generic SAML can also be used if you would like to pass additional SAML headers or claims for an IdP in the integration list.

## Prerequisites

Minimum requirements for identity providers:

- The IdP must conform to SAML 2.0.
- The IdP must provide a **Single sign-on URL**, an **Entity ID or Issuer URL**, and a **Signing certificate**.
- The IdP must include the signing public key in the SAML response.

## 1. Create an application in your identity provider

Most identity providers allow users to create an **Application**. In this context, an application is a set of parameters that the identity provider will then pass on to Cloudflare to establish an integration.

The typical setup requirements are:

1. Create a new integration in the identity provider with the type set as **SAML**.
2. Set both the **Entity/Issuer ID** and the **Single sign-on URL** to:
    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```
    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.
3. Set the **Name ID/Email format** to `emailAddress`.
4. (Optional) Set the signature policy to _Always Sign_.

### (Optional) Upload SAML metadata

If your identity provider supports metadata file configuration, use the endpoint: `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/saml-metadata` to download and generate an XML file. Upload this XML file to the identity provider.

## 2. Add a SAML identity provider to Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication** > **Login methods**.
2. Select **Add new** and select **SAML**.
3. Choose a descriptive name for your identity provider.
4. Enter the **Single Sign on URL**, **IdP Entity ID or Issuer URL**, and **Signing certificate** obtained from your identity provider.
5. (Optional) Enter [optional configurations](#optional-configurations).
6. Select **Save**.

## 3. Test the connection

You can now [test the IdP integration](/cloudflare-one/identity/idp-integration/#test-idps-in-zero-trust). A success response should return the configured SAML attributes.

## Optional configurations

SAML integrations allow you to pass additional headers or claims to applications.

### Sign SAML authentication request

This optional configuration signs the [Access JWT](/cloudflare-one/identity/authorization-cookie/) with the Cloudflare Access public key to ensure that the JWT is coming from a legitimate source. The Cloudflare public key can be obtained at `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/certs`.

### Email attribute name

Many [Access policies](/cloudflare-one/policies/access/) depend on a user’s email address. Some identity providers have a different naming for the email address attribute (for example, `Email`, `e-mail`, `emailAddress`). This can typically be checked in the identity provider's SAML test option.

Example in Okta:

![Preview the SAML assertion from the Okta dashboard](/images/cloudflare-one/identity/saml-assertion.png)
![Determine the email attribute name from the SAML assertion](/images/cloudflare-one/identity/saml-attributes.png)

### SAML headers and attributes

Cloudflare Access supports SAML (Security Assertion Markup Language) attributes and SAML headers for all SAML IdP integrations.

[**SAML attributes**](#saml-attributes) refer to specific data points or characteristics that the IdP shares about the authenticated user. These attributes often include details like email address, name, or role, and are passed along to the service provider upon successful authentication.

[**SAML headers**](#saml-headers) are metadata in the SAML protocol communication which convey information about the sender, recipient, and the message itself. These headers can be leveraged to provide extra context or control over the communication.

#### SAML attributes

SAML attributes are added to the [Access JWT](/cloudflare-one/identity/authorization-cookie/). These attributes can then be consumed by self-hosted or SaaS applications connected to Access. Any SAML attribute configured in the SAML integration must also be sent from the IdP.

Example in Okta:

![Configure Okta to send SAML attributes](/images/cloudflare-one/identity/attribute-statements.png)

How to receive these SAML attributes in Cloudflare:

![Configure Cloudflare to receive SAML attributes](/images/cloudflare-one/identity/attributes-cloudflare.png)

#### SAML headers

If an application specifically requires SAML attributes upon sign-in, then the attributes can be passed as headers. The **Attribute name** should be the value coming from your IdP (for example, `department`). You can assign any **Header name** to the attribute. The header name will appear in the response headers when Access makes the initial authorization request to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.

#### Multi-record SAML attributes

Cloudflare Access extends support for multi-record SAML attributes such as groups. These attributes are parsed out and can be individually referenced in policies. This feature enables granular access control and precise user authorization in applications.

Cloudflare Access does not currently support partial attribute value references.
