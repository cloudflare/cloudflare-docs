---
updated: 2020-11-28
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Use multiple Azure AD Conditional Access Policies with Access
---

# Use multiple AzureA D Conditional Access Policies with Access

With Azure Active Directory (AD)'s Conditional Access, administrators can enforce policies on applications and users directly in Azure AD. Conditional Access has a set of checks that are specialized to Windows and are often preferred by organizations with Windows power users.

## Prerequisites

To complete this tutorial, you will need:

- Admin Access to a Cloudflare Access account
- Global admin rights to an Azure AD account
- Configured users in the Azure AD account
- A non-Cloudflare Azure AD account to use for testing.

## Setup

1. Open the Azure Active Directory Admin Center and select **Enterprise applications**.
2. Select **Create your own application**. 

![Azure Active Directory's Enterprise applications page](/cloudflare-one/static/zero-trust-security/azuread-access-policies/create-app.png)

3. From **Create your own application**, select **Integrate any other application you don't find in the gallery (Non-gallery)**.
4. From **Register an application**, select **Accounts in this organization directory only** and add the **Redirect URI**.

![Register an application dialog with supported account types and the redirect URI](/cloudflare-one/static/zero-trust-security/azuread-access-policies/register-app-redirects.png)

5. Navigate and select the new application from the **Enterprise Applications** menu.
6. Locate the **Application ID** field and select the **Copy** button. Select **Save**.

![Application properties with the Application ID indicating a copied field](/cloudflare-one/static/zero-trust-security/azuread-access-policies/application-id.png)

7. From the **Azure Active Directory Overview**, copy the **Tenant ID**.

![Azure Active Directory Overview displaying the Tenant ID field](/cloudflare-one/static/zero-trust-security/azuread-access-policies/tenant-id.png)

8. Select **App registrations** > your new application > **Certificates and secrets**.
9. Create a new client secret and copy the secret value. Note that you can only access this information from **App registrations** and not **Enterprise Applications**.

![Certificate and secrets page with the Client secrets tab selected](/cloudflare-one/static/zero-trust-security/azuread-access-policies/certificates-secrets.png)

## Cloudflare Access Identity provider configuration and Application creation

In this section, you will create an Access Idenetify Provider per Application or Application Group that you would like to assign different Conditional Access Policies.

1. After copying the three values – the Application ID, Tenant ID, and the Application Secret – from the steps above, navigate to the Cloudflare Zero Trust Dashboard and create a new AzureAD integration. Name it after your target application.

![Edit Azure AD dialog with the three copied values](/cloudflare-one/static/zero-trust-security/azuread-access-policies/edit-azuread-values.png)

2. Test the authentication. You should receive a **Your connection works!** message.
3. Create an Access Application with the target URL of the protected application. 

![Edit Customer Management view with a target URL example](/cloudflare-one/static/zero-trust-security/azuread-access-policies/access-app-target-url.png)

4. Select the corresponding IdP that was just configured for this specific Conditional Access Policy. 

![List of identity providers highlighting the Azure AD option](/cloudflare-one/static/zero-trust-security/azuread-access-policies/access-app-idp.png)

Repeat the two sections above for each individual application or group of applications. 

## Azure AD and Conditional Access configuration

1. From the **Azure Active Directory admin center**, update the application's visibility setting so it shows up in the Microsoft App Launcher.

![List of identity providers highlighting the Azure AD option](/cloudflare-one/static/zero-trust-security/azuread-access-policies/app-visibility.png)

2. Set the **Home page URL** for the application to be the hostname of the application. Note that this value can only be set from **App Registrations** under **Branding & Properties**.

![Customer Management portal fields and home page URL](/cloudflare-one/static/zero-trust-security/azuread-access-policies/homepage-url.png)

3. For confirmation, check whether the app shows up under [**My apps**](https://myapplications.microsoft.com/).
4. Navigate to **Conditional Access** and select your policy from under **Policy Name**.
5. Create a new policy and assign your user and application. 

![Customer Management portal fields and home page URL](/cloudflare-one/static/zero-trust-security/azuread-access-policies/new-policy.png)

6. Create any additional policies for each target application or application group.
