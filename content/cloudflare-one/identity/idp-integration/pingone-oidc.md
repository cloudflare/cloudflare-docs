---
pcx_content_type: how-to
title: PingOne®
weight: 7
---

# PingOne®

The PingOne® cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as an OIDC identity provider.

## Set up PingOne as an identity provider

1. In your PingIdentity environment, navigate to **Connections** > **Applications**.
2. Select **Add Application**.
3. Enter an **Application Name**.
4. Select **OIDC Web App**.
5. Select **Save**.
6. Select **Resource Access** and add the **email** and **profile** scopes.
7. In the **Configuration** tab, select **General**.
8. Save the **Client ID**, **Client Secret**, and **Environment ID**. These ids will be used in a later step to add PingOne to the Zero Trust dashboard.
8. In the **Configuration** tab, select the pencil icon.
9. In the **Redirect URIs** field, enter your [team domain](/cloudflare-one/glossary/#team-domain) and select **Save**.
10. On the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **Settings** > **Authentication**.
11. Under **Login methods**, select **Add new**.
11. Select PingOne.
13. Input the **Client ID**, **Client Secret**, and **Environment ID** generated previously.
14. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
15. Select **Save**.

You can now [test your connection](/cloudflare-one/identity/idp-integration/#test-idps-on-the-zero-trust-dashboard) and create [Access policies](/cloudflare-one/policies/access/) based on the configured login method.
