---
updated: 2023-01-10
category: 🔐 Access
pcx_content_type: tutorial
title: Use Azure AD Conditional Access policies in Cloudflare Access
---

# Use Azure AD Conditional Access policies in Cloudflare Access

With Azure Active Directory (AD)'s [Conditional Access](https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/overview), administrators can enforce policies on applications and users directly in Azure AD. Conditional Access has a set of checks that are specialized to Windows and are often preferred by organizations with Windows power users.

## Prerequisites

- Global admin rights to an Azure AD account
- Configured users in the Azure AD account

## 1. Set up an identity provider for your application

Refer to [our IdP setup instructions](/cloudflare-one/identity/idp-integration/azuread/#set-up-azure-ad-as-an-identity-provider) for Azure AD.

We suggest naming the IdP integration after the target application, for example `Azure AD - Customer management portal`.

## 2. Configure Conditional Access in Azure AD

1. In **Azure Active Directory**, go to **App registrations** and select the application you created for the IdP integration.

2. Go to **Branding & properties**.

3. In **Home page URL**, enter the hostname of the protected application.
   ![Customer Management portal fields and home page URL](/images/cloudflare-one/zero-trust-security/azuread-access-policies/homepage-url.png)

4. Return to the **Azure Active Directory** dashboard and go to **Enterprise applications**.

5. Select your application.

6. Select **Properties**.

7. To show the application in the Microsoft App Launcher, change **Visible to users** to **Yes**. The application will appear when the user goes to [**My Apps**](https://myapplications.microsoft.com/).

8. Next, go to **Conditional Access** and [build a new policy](https://learn.microsoft.com/en-us/azure/active-directory/conditional-access/concept-conditional-access-policies).

9. Create and enable any additional policies for your application.

## 3. Create an Access application

To enforce your Conditional Access policies on a Cloudflare Access application:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Create a new [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/).

3. In **Application domain**, enter the target URL of the protected application.

4. For **Identity providers**, select only the IdP integration that was configured for this application. This limits which IdPs are shown to the user.

![List of identity providers highlighting the Azure AD option](/images/cloudflare-one/zero-trust-security/azuread-access-policies/access-app-idp.png)

5. Finally, create an [Access policy](/cloudflare-one/policies/access/) to require logins from the selected IdP. For example:

   | Action | Rule type | Selector         | Value                                              |
   | ------ | --------- | ---------------- | -------------------------------------------------- |
   | Allow  | Include   | Emails ending in | `@example.com`                                     |
   |        | Require   | Login methods    | `Azure AD • Azure AD - Customer management portal` |

Users will only be allowed access if they meet the criteria in your Azure AD Conditional Access policies.

You can reuse the same IdP integration for multiple applications as long as they require the same set of Conditional Access policies. For example, you could design a baseline IdP integration with a Conditional Access policy requiring MFA and a modern auth client. If an application requires special Conditional Access policies, you would need to set up a dedicated IdP instance for that application.
