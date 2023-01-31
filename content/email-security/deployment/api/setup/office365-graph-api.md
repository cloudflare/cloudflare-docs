---
title: Office 365 Graph API setup
pcx_content_type: tutorial
weight: 4
meta:
    Description: Learn how to scan and protect Office 365 emails with Area 1 via a Microsoft Graph API set up.
---

{{<beta>}}Office 365 Graph API set up with Area 1{{</beta>}}

For customers using Microsoft Office 365, setting up a phishing risk assessment with Area 1 and Microsoft Graph API setup is quick and easy. The following email flow shows how this works:

![Email flow when setting up Area 1 with the Microsoft Graph API](/email-security/static/deployment/api-setup/ms-graph/ms-graph.png)

{{<Aside type="note">}}For this beta release, scanning Microsoft 365 domains via the Microsoft Graph API is only available for onboarding new domains. This option will not show up on domains already onboarded on your Area 1 dashboard. If you want to use Microsoft Graph API with a domain already set up, you will need to delete it and add it again.{{</Aside>}}

## User roles

Area 1 uses two roles for retraction and directory integration purposes:

- **Privileged authentication administrator**: Users with this role can view the current authentication method information and set or reset non-password credentials for all users, including global administrators. Privileged authentication administrators can force users to re-register against existing non-password credentials (like MFA or FIDO) and revoke the `remember MFA on the device` message prompting for MFA on the next login of all users.
- **Privileged role administrator**: Users with this role can manage role assignments in Azure Active Directory, as well as within Privileged Identity Management. In addition, this role allows management of all aspects of Privileged Identity Management.

Directory Integration requires the use of both roles mentioned above. Email retraction only requires the **Privileged role administrator**. Any Azure administrator with a membership in the required role can perform these authorizations. The authorization process grants the Area 1 dashboard access to the Azure environment. This access is performed with the least applicable privileges required to function, as shown in the table below. 

The Enterprise Applications that Area 1 registers are not tied to any administrator account. Inside of the Azure Active Directory admin center you can review the permissions granted to each application in the Enterprise Application section. Refer to [Application management documentation documentation](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/) for more information.

## Set up Microsoft Graph API

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon).

3. In **Email Configuration** > **Domains & Routing** > **Domains**, select **New Domain**.

4. In **Domain**, enter the domain you want to onboard.

5. In **Authorize Mail Access**, select **Authorize Access**.


    <div class="medium-img">
    
    ![Select Authorize access to give the correct permissions do Area 1](/email-security/static/deployment/api-setup/ms-graph/step5.png)

    </div>

6. In the new tab that opens, choose an Office 365 account you want to authorize, or enter your credentials. 

7. Read the permissions, and select **Accept** to continue. You will be directed back to the Area 1 dashboard. 

8. In **Directory Scanning**, select **Authorize Access**.  

9. In the new tab that opens, choose an Office 365 account you want to authorize, or enter your credentials.

10. Read the permissions, and select **Accept** to continue. You will be directed back to the Area 1 dashboard.

11. Now that both types of authorizations have been complete, select **Publish Domain**.

    <div class="medium-img">
    
    ![Now that both authorizations are complete, select Publish domain](/email-security/static/deployment/api-setup/ms-graph/step11.png)

    </div>

Your authorized domain will show up in **Email Configuration** > **Domains & Routing** > **Domains**, with messages about the progress of directory syncing between Office 365 and Area 1.

![Now that both authorizations are complete, select Publish domain](/email-security/static/deployment/api-setup/ms-graph/domain-sync-state.png)