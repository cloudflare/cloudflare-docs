---
pcx_content_type: how-to
title: Grafana Cloud
weight: 14
---

# Connect to Grafana Cloud through Access

This guide covers how to configure [Grafana Cloud](https://grafana.com/docs/grafana-cloud/account-management/authentication-and-permissions/authorization/#configure-oauth-20-with-generic-oauth) as an OIDC application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Grafana Cloud account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **SaaS**.
3. For **Application**, enter `Grafana Cloud` and select the corresponding textbox that appears.
4. For the authentication protocol, select **OIDC**.
5. Select **Add application**.
6. In **Scopes**, select the attributes that you want Access to send in the ID token.
7. In **Redirect URLs**, enter `https://<your-grafana-domain>/login/generic_oauth`.
8. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
9. Copy the **Client secret**, **Client ID**, **Token endpoint**, and **Authorization endpoint**.
10. Select **Save configuration**.
11. (Optional) configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) by turning on **Enable App in App Launcher** and, in **App Launcher URL**, entering `https://<your-grafana-domain>/login`.
12. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
13. Select **Done**.

## 2. Add a SSO provider to Grafana Cloud

1. In Grafana Cloud, select the **menu** icon > **Administration** > **Authentication** > **Generic OAuth**.
2. (Optional) For **Display name**, enter a new display name (for example, `Cloudflare Access`). Users will select **Sign in with (display name)** when signing in via SSO.
3. Fill in the following fields:
    - **Client Id**: Client ID from application configuration in Cloudflare Zero Trust
    - **Client secret**: Client secret from application configuration in Cloudflare Zero Trust
    - **Scopes**: Delete `user:email` and enter the scopes configured in Cloudflare Zero Trust
    - **Auth URL**: Authorization endpoint from application configuration in Cloudflare Zero Trust
    - **Token URL**: Token endpoint from application configuration in Cloudflare Zero Trust
4. Select **Save**.

## 3. Test the integration

Open an incognito browser window and go to your Grafana domain (`https://<your-grafana-domain>/login`). Select **Sign in with (display name)**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.