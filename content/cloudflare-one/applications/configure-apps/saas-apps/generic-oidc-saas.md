---
pcx_content_type: how-to
title: Generic OIDC application
weight: 1
---

{{<heading-pill style="beta" heading="h1">}} Generic OIDC application {{</heading-pill>}}

This page provides generic instructions for setting up a SaaS application in Cloudflare Access using the OpenID Connect (OIDC) authentication protocol.

## 1. Get SaaS application URL

In your SaaS application account, obtain the **Redirect URL** (also known as the callback URL). This is the SaaS endpoint where users are redirected to after they authenticate with Cloudflare Access.

Some SaaS applications provide the Redirect URL after you [configure the SSO provider](#3-configure-sso-in-your-saas-application).

## 2. Add your application to Access

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Select **Add an application**.

3. Select **SaaS**.

4. Select your **Application** from the drop-down menu. If your application is not listed, enter a custom name in the **Application** field and select the textbox that appears below.

5. Select **OIDC**.

6. Select **Add application**.

7. In **Scopes**, select the attributes that you want Access to send in the ID token.

    | Scope | Description |
    | ----- | ----------- |
    | `openid` | Include a unique identifier for the user (required). |
    | `email` | Include the user's email address. |
    | `profile` | Include all custom OIDC claims from the IdP. |
    | `groups` | Include the user's IdP group membership. |

8. In **Redirect URLs**, enter the callback URL obtained from the SaaS application.

9. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.

10. Copy the following values to input into your SaaS application. Different SaaS applications may require different sets of input values.
    | Field | Description |
    | ----- | ----------- |
    | Client secret | Credential used to authorize Access as an SSO provider |
    | Client ID | Unique identifier for this Access application |
    | Configuration endpoint| If supported by your SaaS application, you can configure OIDC using this endpoint instead of manually entering the URLs listed below. </br> `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/.well-known/openid-configuration`|
    | Issuer | Base URL for this OIDC integration </br> `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>` |
    | Token endpoint | Returns the user's ID token </br> `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/token`|
    | Authorization endpoint |  URL where users authenticate with Access </br> `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/authorization` |
    | Key endpoint | Returns the current public keys used to [verify the Access JWT](/cloudflare-one/identity/authorization-cookie/validating-json/) </br> `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/jwks`|
    | User info endpoint | Returns all user claims in JSON format </br> `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<client-id>/userinfo` |

11. (Optional) Configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) for the application.

12. {{<render file="access/_access-block-page.md">}}

13. {{<render file="access/_access-choose-idps.md">}}

14. Select **Save configuration**.

## 3. Add an Access policy

1. To control who can access the SaaS application, [create an Access policy](/cloudflare-one/policies/access/).

2. Select **Done**.

## 4. Configure SSO in your SaaS application

Next, configure your SaaS application to require users to log in through Cloudflare Access. Refer to your SaaS application documentation for instructions on how to configure a third-party OIDC SSO provider.

## 5. Test the integration

Open an incognito browser window and go to the SaaS application's login URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.