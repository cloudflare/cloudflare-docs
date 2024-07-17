---
pcx_content_type: how-to
title: Salesforce (OIDC)
weight: 14
---

# Connect to Salesforce through Access (OIDC)

This guide covers how to configure [Salesforce](https://help.salesforce.com/s/articleView?id=sf.sso_provider_openid_connect.htm&type=5) as an OpenID Connect (OIDC) application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Salesforce account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **SaaS**.
3. For **Application**, select _Salesforce_.
4. For the authentication protocol, select **OIDC**.
5. Select **Add application**.
6. In **Scopes**, select the attributes that you want Access to send in the ID token.
7. In **Redirect URLs**, enter the callback URL obtained from Salesforce (`https://<your-domain>.my.salesforce.com/services/authcallback/<URL Suffix>`). Refer to [Add a SSO provider to Salesforce](#2-add-a-sso-provider-to-salesforce) for instructions on obtaining this value.
8. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
9. Copy the following values:
    - **Client ID**
    - **Client Secret**
    - **Authorization endpoint**
    - **Token endpoint**
    - **User info endpoint**
10. (Optional) configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) by turning on **Enable App in App Launcher** and, in **App Launcher URL**, entering `https://<your-domain>.my.salesforce.com`.
11. Select **Save configuration**.
12. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
13. Select **Done**.

## 2. Add a SSO provider to Salesforce

1. In Salesforce, go to **Setup**.
2. In the **Quick Find** box, enter `auth` and select **Auth providers**.
3. Select **New**.
4. For the provider type, select **OpenID Connect**.
5. Enter a name for the SSO provider (for example, `Cloudflare Access`).
6. Fill in the following fields with values obtained from Cloudflare Access:
    - **Consumer Key**: Client ID
    - **Consumer Secret**: Client Secret
    - **Authorize Endpoint URL**: Authorization endpoint
    - **Token endpoint URL**: Token endpoint
    - **User Info Endpoint URL**: User info endpoint
    - **Token Issuer**: Issuer
7. (Optional) Enable **Use Proof Key for Code Exchange** if you enabled it in Access.
8. In **Default Scopes**, enter a space-separated list of the scopes you configured in Access (for example, `openid email profile groups`).
9. Select **Save**.
10. Copy the **Callback URL**:
    ```txt
    https://<your-domain>.my.salesforce.com/services/authcallback/<URL Suffix>
    ```
11. In Zero Trust, paste the Callback URL into the **Redirect URL** field.

To test the integration, open an incognito browser window and go to the **Test-Only Initialization URL** (   `https://<your-domain>.my.salesforce.com/services/auth/test/<URL Suffix>`)

## 3. Enable Single Sign-On in Salesforce

1. {{<render file="access/saas-apps/_salesforce-sso.md">}}
2. (Optional) To require users to login with Cloudflare Access:
    1. In the **Quick Find** box, enter `single sign-on` and select **Single Sign-On Settings**.
    2. Turn on **Disable login with Salesforce credentials**.

To test, open an incognito browser window and go to your Salesforce domain (`https://<your-domain>.my.salesforce.com`).

