---
pcx_content_type: how-to
title: OIDC | Amazon Cognito
weight: 13
---

# OIDC | Amazon Cognito

Amazon Cognito provides SSO identity management. Cloudflare Access supports Amazon Cognito as an OIDC identity provider.

## Set up Amazon Cognito (OIDC)

### 1. Obtain Amazon Cognito settings

The following Amazon Cognito values are required to set up the integration:

- App (client) ID
- Client secret
- Auth URL
- Token URL
- Certificate (key) URL

To retrieve those values:

1. Log in to your Amazon Cognito admin portal.

2. Select **User pools** > **Your user pool name**.

3. Select the **App integration** tab.

4. Under **App client list** section, select **Create app client**.

5. Under **App client**, choose **Confidential client** option in **App type**.

6. Enter an **App client name** for your application.

7. Under **Hosted UI settings**, in the **Allowed callbak URLs** > **URL** field, enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

8. In the **OpenID Connect scopes** tab, select **OpenID**, **Email**, **Profile**.

9. Select **Create app client**.

10. After the app client is created, copy the **Client ID** and **Client secret**.

![Creating an app client in Amazon Cognito](/images/cloudflare-one/identity/amazoncognito/amazoncognito-1.png)

11. Confirm your OIDC endpoints that are created when you assign a domain to your user pool. Refer to [OAuth 2.0, OpenID Connect, and SAML 2.0 federation endpoints reference - Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/federation-endpoints.html)

    - **Auth URL**: `https://<Your user pool domain>/oauth2/authorize`.
    - **Token URL**: `https://<Your user pool domain>/oauth2/token`.
    - **Certificate (key) URL**: `https://cognito-idp.<Region>.amazonaws.com/<Your user pool ID>/.well-known/jwks.json`.

### 2. Add Amazon Cognito as an identity provider

1. In Zero Trust, go to **Settings** > **Authentication**.

2. Under **Login methods**, select **Add new**.

3. Choose **OpenID Connect** on the next page.

4. Name your identity provider and fill in the required fields with the information obtained above.

5. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/) if the protocol is supported by your IdP. PKCE will be performed on all login attempts.

6. (Optional) Under **Optional configurations**, enter [custom OIDC claims](#oidc-claims) that you wish to add to users' identity. This information will be available in the [user identity endpoint](/cloudflare-one/identity/authorization-cookie/application-token/#user-identity).

7. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to the login method you want to test.

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "auth_url": "https://<Your user pool domain>/oauth2/authorize",
    "token_url": "https://<Your user pool domain>/oauth2/token",
    "certs_url": "https://cognito-idp.<Region>.amazonaws.com/<Your user pool ID>/.well-known/jwks.json",
    "scopes": ["openid", "email", "profile"],
    "claims": ["sub", "cognito:username", "name", "cognito:groups"]
  },
  "type": "oidc",
  "name": "Generic Amazon Cognito"
}
```
