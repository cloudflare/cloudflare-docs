---
pcx_content_type: how-to
title: Okta
weight: 13
---

# Okta

Okta provides cloud software that helps companies manage and secure user authentication to modern applications, and helps developers build identity controls into applications, website web services, and devices. You can integrate Okta with Cloudflare Zero Trust and build rules based on user identity and group membership. Cloudflare Zero Trust supports Okta integrations using either the OIDC (default) or [SAML](/cloudflare-one/identity/idp-integration/okta-saml/) protocol.

## Set up Okta as an OIDC provider

1. On your Okta admin dashboard, navigate to **Applications** > **Applications**.
2. Click **Create App Integration**.
3. For the **Sign-in method**, select **OIDC - OpenID Connect**.

![Creating an OIDC application in Okta](/cloudflare-one/static/documentation/identity/okta/okta-1.png)

4. For the **Application type**, select **Web Application**. Click **Next**.

5. Enter any name for the application. In the **Sign-in redirect URIs** field, input your [team domain](/cloudflare-one/glossary/#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/callback
    ```

6. Select the desired **Assignment** option and click **Save**.

7. From the application view, navigate to the **Sign On** tab.

8. Scroll down to the **OpenID ConnectID Token** and click **Edit**.

    ![Configuring the Groups claim filter in Okta](/cloudflare-one/static/documentation/identity/okta/okta-2.png)

9. Set the **Groups claim filter** to _Matches regex_ and its value to `.*`.

10. In the **General** tab, copy the **Client ID**, **Client secret**, and **Okta domain**.

    ![Finding your Client credentials and Okta domain in Okta](/cloudflare-one/static/documentation/identity/okta/okta-3.png)

11. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Authentication**.

12. Under **Login methods**, click **Add new** and select **Okta** as your identity provider.

14. Fill in the following information:
    * **Name**: Name your identity provider
    * **App ID**: Enter your Okta Client ID.
    * **Client secret**: Enter your Okta Client secret.
    * **Okta account URL**: Enter your Okta domain, for example `https://<your-domain>.okta.com`.

15. (Optional) Create an Okta API token and enter it in the Zero Trust dashboard (the token can be read-only). This will prevent your Okta groups from failing if you have more than 100 groups.

16. (Optional) Enable [Proof of Key Exchange (PKCE)](https://www.oauth.com/oauth2-servers/pkce/). PKCE will be performed on all login attempts.

17. Click **Save**.

To test that your connection is working, navigate to **Settings** > **Authentication** > **Login methods** and click **Test** next to Okta.

{{<Aside type="note">}}

If you encounter the error `Failed to fetch user/group information from the identity`, double-check your Okta configuration:

* If you have more than 100 Okta groups, ensure you include the API token.
* The request may be blocked by the [ThreatInsights feature](https://help.okta.com/en/prod/Content/Topics/Security/threat-insight/ti-index.htm) within Okta.

{{</Aside>}}

## SCIM

Sign in to your Okta with your administrator account.

Click Admin in the upper-right right corner of the page.

Select Applications > Applications.

Click Browse App Catalog.


Search for SCIM Header Auth and select SCIM 2.0 Test App (Header Auth).

Click Add Integration 

On the General Settings tab, Set the name of your application, Click Next.

On the Sign-on Options tab, use the default SAML option. Click Done to create the integration.

Click the Provisioning tab, then in the main panel click Configure API Integration. Select Enable API integration.

In the Base URL field, enter the SCIM Endpoint obtained from the Zero Trust dashboard.

In the API Token field, enter the SCIM Secret obtained from the Zero Trust dashboard.

Select **Test API Credentials** to ensure that the credentials were entered correctly.

Select Save.

In the Provisioning tab, select Edit. Enable the following options:
- Create Users
- Update User Attributes
- Deactivate Users

Select Save to complete the integration.

In the Assignments tab, assign the users and groups you want to synchronize with Cloudflare Access.

To verify the SCIM integration, select View Logs.

>> Unlike with the Azure integration, Okta groups do not appear in the Access policy builder when you select _Okta groups_. You still have to enter the group names manually.

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
