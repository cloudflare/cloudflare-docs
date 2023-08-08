---
pcx_content_type: how-to
title: Okta
weight: 13
---

# Okta

Okta provides cloud software that helps companies manage and secure user authentication to modern applications, and helps developers build identity controls into applications, website web services, and devices. You can integrate Okta with Cloudflare Zero Trust and build rules based on user identity and group membership. Cloudflare Zero Trust supports Okta integrations using either the OIDC (default) or [SAML](/cloudflare-one/identity/idp-integration/okta-saml/) protocol.

## Set up Okta as an OIDC provider

1. On your Okta admin dashboard, go to **Applications** > **Applications**.
2. Select **Create App Integration**.
3. For the **Sign-in method**, select **OIDC - OpenID Connect**.

![Creating an OIDC application in Okta](/images/cloudflare-one/identity/okta/okta-1.png)

4. For the **Application type**, select **Web Application**. Select **Next**.

5. Enter any name for the application. In the **Sign-in redirect URIs** field, input your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

   ```txt
   https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
   ```

6. Choose the desired **Assignment** option and select **Save**.

7. From the application view, go to the **Sign On** tab.

8. Scroll down to the **OpenID ConnectID Token** and select **Edit**.

   ![Configuring the Groups claim filter in Okta](/images/cloudflare-one/identity/okta/okta-2.png)

9. Set the **Groups claim filter** to _Matches regex_ and its value to `.*`.

10. In the **General** tab, copy the **Client ID**, **Client secret**, and **Okta domain**.

    ![Finding your Client credentials and Okta domain in Okta](/images/cloudflare-one/identity/okta/okta-3.png)

11. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.

12. Under **Login methods**, select **Add new**. Select **Okta** as your identity provider.

13. Fill in the following information:

    - **Name**: Name your identity provider
    - **App ID**: Enter your Okta Client ID.
    - **Client secret**: Enter your Okta Client secret.
    - **Okta account URL**: Enter your Okta domain, for example `https://<your-domain>.okta.com`.

14. (Optional) Create an Okta API token and enter it in Zero Trust (the token can be read-only). This will prevent your Okta groups from failing if you have more than 100 groups.

15. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

16. Select **Save**.

To [test](/cloudflare-one/identity/idp-integration#test-idps-in-zero-trust) that your connection is working, select **Test**.

{{<Aside type="note">}}

If you see the error `Failed to fetch user/group information from the identity`, double-check your Okta configuration:

- If you have more than 100 Okta groups, ensure you include the API token.
- The request may be blocked by the [ThreatInsights feature](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/ti-index.htm) within Okta.

{{</Aside>}}

## Synchronize users and groups

The Okta OIDC integration supports the [System for Cross-domain Identity Management (SCIM)](https://www.rfc-editor.org/rfc/rfc7642.txt) protocol. With SCIM, Cloudflare Access can automatically deprovision users after they are deactivated in the identity provider and display synchronized group names in the Access policy builder.

To synchronize users and groups between Access and Okta, you need two separate app integrations in Okta:

- The Okta OIDC connector you created when adding [Okta as an identity provider](/cloudflare-one/identity/idp-integration/okta/#set-up-okta-as-an-oidc-provider).
- A second Okta application of type **SCIM 2.0 Test App (Header Auth)**. This is technically a SAML app but is responsible for sending user and group info via SCIM provisioning.

### 1. Enable SCIM in Zero Trust

{{<render file="_enable-scim-on-dashboard.md" withParameters="**Enable SCIM**">}}

### 2. Configure SCIM in Okta

1. On your Okta admin dashboard, go to **Applications** > **Applications**.

2. Select **Browse App Catalog**.

3. Search for `SCIM Header Auth` and select **SCIM 2.0 Test App (Header Auth)**.

4. Select **Add Integration**.

5. On the **General Settings** tab, name your application and select **Next**.

6. On the **Sign-on Options** tab, ensure that **SAML 2.0** is selected. Select **Done** to create the integration.

7. On the **Provisioning** tab, select **Configure API Integration**.

8. Select **Enable API integration**.

9. In the **Base URL** field, enter the **SCIM Endpoint** obtained from Zero Trust.

10. In the **API Token** field, enter the **SCIM Secret** obtained from Zero Trust.

    ![Enter SCIM values into Okta](/images/cloudflare-one/identity/okta/enter-scim-values.png)

11. Select **Test API Credentials** to ensure that the credentials were entered correctly. Select **Save**.

12. On the **Provisioning** tab, select **Edit** and enable:

    - **Create Users**
    - **Update User Attributes**
    - **Deactivate Users**

    ![Configure provisioning settings in Okta](/images/cloudflare-one/identity/okta/enable-provisioning.png)

13. Select **Save** to complete the configuration.

14. In the **Assignments** tab, add the users you want to synchronize with Cloudflare Access. You can add users in batches by assigning a group.
15. In the **Push Groups** tab, add the Okta groups you want to synchronize with Cloudflare Access. These groups will display in the Access policy builder.

Provisioning will begin immediately. To verify the integration, select **View Logs** in the Okta SCIM application.

## Example API Configuration

```json
{
  "config": {
    "client_id": "<your client id>",
    "client_secret": "<your client secret>",
    "okta_account": "https://dev-abc123.oktapreview.com"
  },
  "type": "okta",
  "name": "my example idp"
}
```
