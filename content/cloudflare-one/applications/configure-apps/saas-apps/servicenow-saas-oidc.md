---
pcx_content_type: how-to
title: ServiceNow (OIDC)
weight: 17
---

# Connect to ServiceNow through Access (OIDC)

This guide covers how to configure [ServiceNow](https://docs.servicenow.com/bundle/washingtondc-platform-security/page/integrate/single-sign-on/task/create-OIDC-configuration-SSO.html) as an OIDC application in Cloudflare Zero Trust.

## Prerequisites

- An [OIDC identity provider](/cloudflare-one/identity/idp-integration/generic-oidc/) configured in Cloudflare Zero Trust
- Admin access to a ServiceNow account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **SaaS**.
3. For **Application**, type `ServiceNow` and select the textbox that appears below.
4. For the authentication protocol, select **OIDC**.
5. Select **Add application**.
6. In **Scopes**, select the attributes that you want Access to send in the ID token.
7. In **Redirect URLs**, enter `https://<INSTANCE-NAME>.service-now.com/navpage.do`.
8. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.
9. Copy the **Client secret** and **Client ID**.
10. Select **Save configuration**.
11. (Optional) configure [App Launcher settings](/cloudflare-one/applications/app-launcher/) by turning on **Enable App in App Launcher** and, in **App Launcher URL**, entering `https://<INSTANCE-NAME>.service-now.com`.
12. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
13. Select **Done**.

## 2. Add the Multiple Provider Single Sign-On Installer Plugin to ServiceNow

1. In ServiceNow, select **All**.
2. In the search bar, enter `System Applications`, and under **All Available Applications**, select **All**.
3. In the search bar, enter `Integration - Multiple Provider Single Sign-On Installer`.
4. Select **Install**.
5. Ensure that **Install now** is selected, and select **Install**.

## 3. Add and Test an OIDC SSO provider in ServiceNow

1. Select **All**.
2. In the search bar enter `Multi-Provider SSO`, and select **Identity Providers**.
3. Select **New** > **OpenID Connect**.
4. In the pop-up, fill in the following fields:
    - **Name**: Name of the SSO (for example, `Cloudflare Access`). Unless otherwise configured, users will select this name when signing in to ServiceNow.
    - **Client ID**: **Client ID** from application configuration in Cloudflare Zero Trust.
    - **Client Secret**: **Client Secret** from application configuration in Cloudflare Zero Trust.
    - **Well Known Configuration URL**: `https://<TEAM-DOMAIN>.cloudflareaccess.com/cdn-cgi/access/sso/oidc/<CLIENT-ID>/.well-known/openid-configuration`.
5. Select **Import**.
6. Ensure **Active** is turned on
7. Turn on **Show as Login option**, and for **SSO label** enter a label for the user login screen, if desired.
7. Select **Update**.

## 4. Test the integration

For SSO to appear on the login screen, you must have [account recovery](https://docs.servicenow.com/bundle/washingtondc-platform-security/page/integrate/single-sign-on/concept/sso-acct-recovery.html) enabled and configured for at least one admin account. After account recovery is configured, log out of ServiceNow and open an incognito browser window. Go to your ServiceNow URL. Select the SSO name you just configured, which will prompt you to sign in with your identity provider. When the integration is successful, you can go back to the OIDC configuration screen to turn on **Default** and/or **Auto Redirect IDP**.