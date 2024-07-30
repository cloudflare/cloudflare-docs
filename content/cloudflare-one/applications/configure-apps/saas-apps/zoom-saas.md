---
pcx_content_type: how-to
title: Zoom
weight: 27
---

# Connect to Zoom through Access

This guide covers how to configure [Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060673) as a SAML application in Cloudflare Zero Trust.

## Prerequisites

- An [identity provider](/cloudflare-one/identity/idp-integration/) configured in Cloudflare Zero Trust
- Admin access to a Zoom Business, Education, or Enterprise account
- An [associated domain](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0066259) configured in your Zoom account
- A [vanity URL](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0061540) configured in your Zoom account

## 1. Add a SaaS application to Cloudflare Zero Trust

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.
2. Select **Add an application** > **SaaS** > **Select**.
3. For **Application**, select _Zoom_.
4. For the authentication protocol, select **SAML**.
5. Select **Add application**.
6. Fill in the following fields:
    - **Entity ID**: ` https://<your-vanity-url>.zoom.us`
    - **Assertion Consumer Service URL**: `https://<your-vanity-url>.zoom.us/saml/SSO`
    - **Name ID format**: _Email_
7. Copy the **Access Entity ID or Issuer**, **Public key**, and **SSO endpoint**.
8. Select **Save configuration**.
9. Configure [Access policies](/cloudflare-one/policies/access/) for the application.
10. Select **Done**.

## 2. Add a SAML SSO provider in Zoom

1. In Zoom, go to **Advanced** > **Single Sign-On**.
2. For **Vanity URL**, select the vanity URL you want to configure SSO for.
3. Fill out the following fields:
    - **Sign in page URL**: SSO endpoint from application configuration in Cloudflare Zero Trust
    - **Identity Provider Certificate**: Public key from application configuration in Cloudflare Zero Trust
    - **Service Provider (SP) Entity ID**: `yourvanityurl.zoom.us` (no `https://`)
    - **Issuer (DP Entity ID)**: Access Entity ID or Issuer from application configuration in Cloudflare Zero Trust
4. For **Binding**, select _http-redirect_.
5. For **Signature Hash Algorithm**, ensure **SHA-256** is selected.
6. Under **Security**, turn off **Sign SAML request** and **Sign SAML logout request**.
7. Select **Save Changes**.
8. Go to **Advanced** > **Security**.
9. Under **Sign-in Methods**, ensure **Allow users to sign in with Single Sign-On (SSO)** is turned on.

## 3. Test the integration

Open an incognito browser window, go to your Zoom vanity URL, and select **Sign in**. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

Once this is successful, you can require SSO for users in your associated domain(s) by completing the following steps:
  1. In Zoom, go to **Advanced** > **Security**.
  2. Under **Sign-in Methods**, turn on **Require users to sign in with SSO if their e-mail address belongs to one of the domains below**.
  3. Under **Select Domains**, turn on the domains that you want to require SSO for.
  4. (Optional) Under **Specify users who can bypass SSO sign-in**, add your desired users.
  5. Select **Save**.


