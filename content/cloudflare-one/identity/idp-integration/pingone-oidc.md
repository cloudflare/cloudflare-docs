---
pcx_content_type: how-to
title: PingOne®
weight: 7
---

# PingOne®

The PingOne® cloud platform from PingIdentity provides SSO identity management. Cloudflare Access supports PingOne as an OIDC identity provider.

## Set up PingOne as an identity provider

1. In your PingIdentity environment, navigate to **Connections** > **Applications**.
2. Click **Add Application**.
3. Enter an **Application Name**.
4. Select **OIDC Web App**.
5. Click **Save**.
6. Click **Resource Access** and add the **email** and **profile** scopes.
7. In the **Configuration** tab, click **General** and save the Client ID, Client Secret, and Environment IDs. These ids will be used in a later step to add PingOne to the Zero Trust Dashboard.
8. In the **Configuration** tab, click the pencil in the top right corner and enter your [team domain](/cloudflare-one/glossary/#team-domain) in **Redirect URIs** and click **Save**.
9. On the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **Settings** > **Authentication**.
10. Under **Login methods**, click **Add new**.
11. Select PingOne.
12. Input the Client ID, Client Secret, and Environment ID fields generated previously.
13. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.
14. Click **Save**.

You can now [test your connection](/cloudflare-one/identity/idp-integration/#test-idps-on-the-zero-trust-dashboard) and create [Access policies](/cloudflare-one/policies/access/) based on the configured login method.
