---
updated: 2024-01-12
category: 🔐 Access
pcx_content_type: tutorial
title: Use Azure AD Conditional Access policies in Cloudflare Access
---

# Use Azure AD Conditional Access policies in Cloudflare Access

With Azure Active Directory (AD)'s [Conditional Access](https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/overview), administrators can enforce policies on applications and users directly in Azure AD. Conditional Access has a set of checks that are specialized to Windows and are often preferred by organizations with Windows power users.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- Global admin rights to an Azure AD account
- Configured users in the Azure AD account

{{</tutorial-prereqs>}}

{{<tutorial-step title="Set up an identity provider for your application">}}

Refer to [our IdP setup instructions](/cloudflare-one/identity/idp-integration/azuread/#set-up-azure-ad-as-an-identity-provider) for Azure AD.

{{</tutorial-step>}}

{{<tutorial-step title="Add API permission in Azure AD">}}

Once the base IdP integration is tested and working, grant permission for Cloudflare to read Conditional Access policies from Azure AD.

1. In Azure Active Directory, go to **App registrations**.

2. Select the application you created for the IdP integration.

3. Go to **API permissions** and select **Add a permission**.

4. Select **Microsoft Graph**.

5. Select **Application permissions** and add `Policy.Read.ConditionalAccess`.

6. Select **Grant admin consent**.

{{</tutorial-step>}}

{{<tutorial-step title="Configure Conditional Access in Azure AD">}}

1. In Azure Active Directory, go to **Enterprise applications** > **Conditional Access**.
2. Go to **Authentication Contexts**.
3. [Create an authentication context](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps#authentication-context) to reference in your Cloudflare Access policies. Give the authentication context a descriptive name (for example, `Require compliant devices`).
4. Next, go to **Policies**.
5. [Create a new Conditional Access policy](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies) or select an existing policy.
6. Assign the conditional access policy to an authentication context:
    1. In the policy builder, select **Target resources**.
    2. In the **Select what this policy applies to** dropdown, select _Authentication context_.
    3. Select the authentication context that will use this policy.
    4. Save the policy.

{{</tutorial-step>}}

{{<tutorial-step title="Sync Conditional Access with Zero Trust">}}

To import your Conditional Access policies into Cloudflare Access:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Authentication**.
2. Find your Azure AD integration and select **Edit**.
3. Enable **Azure AD Policy Sync**.
4. Select **Save**.

{{</tutorial-step>}}

{{<tutorial-step title="Create an Access application">}}

To enforce your Conditional Access policies on a Cloudflare Access application:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Create a new [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/).

3. In **Application domain**, enter the target URL of the protected application.

4. For **Identity providers**, select your Azure AD integration.

5. Finally, create an [Access policy](/cloudflare-one/policies/access/) using the _Azure AD - Auth context_ selector. For example:

   | Action | Rule type | Selector         | Value                                              |
   | ------ | --------- | ---------------- | -------------------------------------------------- |
   | Allow  | Include   | Emails ending in | `@example.com`                                     |
   |        | Require   | Azure AD - Auth context     | `Require compliant devices` |

Users will only be allowed access if they pass the Azure AD Conditional Access policies associated with this authentication context.

{{</tutorial-step>}}

{{</tutorial>}}