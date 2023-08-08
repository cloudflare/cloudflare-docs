---
pcx_content_type: how-to
title: Generic OIDC
weight: 12
---

# Generic OIDC

Cloudflare Access has a generic OpenID Connect (OIDC) connector to help you integrate IdPs not already set in Access.

## Set up a generic OIDC

1. Visit your identity provider and create a client/app.

2. When creating a client/app, your IdP may request an **authorized redirect URI**. Enter your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
   ```

3. Copy the content of these fields:

   - Client ID
   - Client secret
   - Auth URL: The `authorization_endpoint` URL of your IdP
   - Token URL: The `token_endpoint` URL of your IdP
   - Certificate URL: The `jwks_uri` endpoint of your IdP to allow the IdP keys to sign the tokens

   You can find these values on your identity provider’s **OIDC discovery endpoint**. Some providers call this the “well-known URL”.

4. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

5. Under **Login methods**, select **Add new**.

6. Choose **OpenID Connect**..

7. Name your identity provider and fill in the required fields with the information obtained in Step 3.

8. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.

9. (Optional) Under **Optional configurations**, enter [custom OIDC claims](#oidc-claims) that you wish to add to your Access [application token](/cloudflare-one/identity/authorization-cookie/application-token/).

10. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to the login method you want to test. On success, a confirmation screen displays.

## OIDC claims

Generic OIDC integrations support the use of custom OIDC claims. Custom OIDC claims can be referenced in [Access policies](/cloudflare-one/policies/access/), offering a means to control user access based on these specific attributes.

### Multi-record OIDC claims

Cloudflare Access extends support for multi-record OIDC claims. These claims are parsed out and can be individually referenced in policies. This feature enables granular access control and precise user authorization in applications.

Cloudflare Access does not support partial OIDC claim value references or OIDC scopes.

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "auth_url": "https://accounts.google.com/o/oauth2/auth",
    "token_url": "https://accounts.google.com/o/oauth2/token",
    "certs_url": "https://www.googleapis.com/oauth2/v3/certs",
    "scopes": ["openid", "email", "profile"]
  },
  "type": "oidc",
  "name": "Generic Google"
}
```
