---
pcx_content_type: how-to
title: SAML | Keycloak
weight: 10
---

# SAML | Keycloak

Keycloak is an open source identity and access management solution built by JBoss. If you need a Keycloak lab environment for testing, refer to [this examples](https://github.com/mw866/tunnel-keycloak).

## Set up Keycloak (SAML)

To set up Keycloak (SAML) as your identity provider:

1. In Keycloak, select **Clients** in the navigation bar and create a new client.

2. Under **Client ID**, enter the following URL:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

    You can find your team name in Zero Trust under **Settings** > **Custom Pages**.

    ![SAML Client interface with team domain and callback in Client ID](/images/cloudflare-one/identity/keycloak/configure-client.png)

3. Change the `Name ID Format` to `email`

4. Next, set the valid redirect URI to the Keycloak domain that you are using. For example, `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.

5. Set the Master SAML Processing URL using the same Keycloak domain: `https://<keycloak_domain>/auth/realms/master/protocol/saml`.

6. If you wish to enable client signatures, enable `Client Signature Required` and select **save**.

    1. You will need to [follow the steps here to get the certificate and enable it in the Cloudflare dashboard](/cloudflare-one/identity/idp-integration/signed_authn/).

    2. Import the Access certificate you downloaded into the `SAML Keys` tab. Use `Certificate PEM` as the format.

7. Set the built-in protocol mapper for the `email` property.

    ![Protocol Mapper with email property set](/images/cloudflare-one/identity/keycloak/protocol-mapper.png)

    Next, you will need to integrate with Cloudflare Access.

8. In Zero Trust, go to **Settings** > **Authentication**.

9. Under **Login methods**, select **Add new**.

10. Choose **SAML** on the next page.

    You will need to input the Keycloak details manually. The examples below should be replaced with the specific domains in use with Keycloak and Cloudflare Access.

    | Field                       | Example                                                            |
    | --------------------------- | ------------------------------------------------------------------ |
    | Single Sign-On URL          | `https://<keycloak_domain>/auth/realms/master/protocol/saml`       |
    | IdP Entity ID or Issuer URL | `https://<unique_id>.cloudflareaccess.com/cdn-cgi/access/callback` |
    | Signing certificate         | Use the X509 Certificate in the Realm Settings from Keycloak       |

11. Select **Save**.

To test that your connection is working, go to **Authentication** > **Login methods** and select **Test** next to the login method you want to test.
