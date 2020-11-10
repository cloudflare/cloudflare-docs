---
order: 12
---

# Microsoft Azure AD® (Active Directory)



These steps help you set up Azure AD as your identity provider (IdP).

<Aside>

Azure AD integrates with the Office365 identity service as well as other SaaS applications.
</Aside>

1. Sign in to [the Azure dashboard](https://portal.azure.com/).
2. Click **Azure Active Directory** in the Azure Services section.

    ![Azure AD Services](../../static/azure/azuread-1.png)

3. On the **Azure AD** dashboard, click **App registrations** in the **Manage** section of the _Azure Active Directory_ pane.
4. Click **+ New application registration**.

    ![New Azure AD App Registration](../../static/azure/azuread-2.png)

5. Name your application and enter your **Sign-on URL** (for example, `https://<your authentication domain>/cdn-cgi/access/callback`). Click **Register**.

    ![Azure AD App Registration](../../static/azure/azuread-3.png)

6. Select your new application and copy the **Application ID** and **Directory ID** into your **Cloudflare** dashboard.

    ![Azure AD Cloudflare Access App](../../static/azure/azuread-4.png)

7. In the left hand panel, click **Manage > Certificates & Secrets** and then click **New client secret**.

8. Give it a **Description** and **Expires** setting and click **Add**.

     ![Azure AD Client Secret](../../static/azure/azuread-6.png)

9. Copy the value to the **Application Secret** field in your **Cloudflare** dashboard.

10. In the left hand panel, select **API permissions**, and then click **Add a permission**.

    ![Azure AD Add API PErmissions](../../static/azure/azuread-7.png)

11. Click Microsoft Graph.

    ![Azure AD Use microsoft graph](../../static/azure/azuread-8.png)

12. Click Microsoft Graph and then delegated permissions. Add the following permissions.

    - email
    - openid
    - profile
    - offline_access
    - User.Read
    - Directory.Read.All
    - Group.Read.All

13. Click **Grant Admin Consent for ...**.

    ![Azure AD Grant admin consent](../../static/azure/azuread-9.png)

14. Return to your **Cloudflare** dashboard.
15. If you are using Azure AD groups, toggle **Support Groups** slider **On** in the **Edit your Azure AD identity provider** window.

    ![Azure AD Edit IdP](../../static/azure/azuread-10.png)

16. Click **Save and Test** to check your connection to the IdP.

    ![Azure AD Test Connection](../../static/azure/azuread-11.png)

## Using AzureAD Groups

AzureAD exposes directory groups in a format that consists of random strings, the `Object Id`, that is distinct from the `Name`. In the example below, the group named "Admins" has an ID of "61503835-b6fe-4630-af88-de551dd59a2".

![Azure AD Test Connection](../../static/azure/object-id.png)

When configuring Access to use Azure groups, you must input the `Object Id`.

![Azure AD Test Connection](../../static/azure/group-config.png)

## Example API Configuration

```json
{
    "config": {
        "client_id": "<your client id>",
        "client_secret": "<your client secret",
        "directory_id": "<your azure directory uuid",
        "support_groups": true
    },
    "type": "azureAD",
    "name": "my example idp"
}
```
