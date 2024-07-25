---
title: Office 365 directory integration
pcx_content_type: how-to
weight: 1
---

# Office 365 directory integration

Cloudflare Cloud Email Security (formerly Area 1) can integrate with Office 365 to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1. Authorize Cloud Email Security with Office 365 for Directory Access

You need to authorize Cloudflare Cloud Email Security to make connections into your [Office 365 tenant](https://learn.microsoft.com/en-us/microsoft-365/solutions/tenant-management-overview) to retrieve your directory details. The account used to authorize will require the **Privileged authentication admin** and **Privileged role admin** roles.

### How does the authorization work?

The authorization process grants Cloud Email Security access to the Azure environment with the least applicable privileges required to function. The Enterprise Application that Cloud Email Security registers is not tied to any administrator account. Inside of the Azure Active Directory admin center you can review the permissions granted to the application in the Enterprise Application section.

When assigning user roles in the Office 365 console, you will find these roles in **User permissions** > **Roles configuration** > **Identity admin roles**.

![A list of permissions for Cloud Email Security](/images/email-security/bec/o365/permissions.png)

1. Log in to the [Cloud Email Security (formerly Area 1) dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Directories**, and select **Add Directory** to start the authorization process.

    ![Go to Directories in the dashboard of Cloud Email Security, and then select Add Directory to start the authorization process](/images/email-security/bec/o365/step2-directories.png)

3. In the Add Directory configuration panel, enter the following details:
    - **Directory Type**: Open the drop-down menu and select **Office 365**.
    - **Directory Name**: Enter a string that represents the directory. This value will be referenced in the Business Email Compromise List configuration section. For example, `Office 365`.
    - **Sync Frequency**: Update the value to your preference.

    Select **Authorize** when you are done.

    ![Add the appropriate details to the configuration panel](/images/email-security/bec/o365/step3-directory-config-panel.png)
4. The Cloud Email Security dashboard will redirect you to a Microsoft login page. Select or enter the appropriate account to initiate the authentication process.

    <div class="large-img">

    ![Select the appropriate Microsoft account to continue](/images/email-security/bec/o365/step4-login.png)

    </div>

5. Once authenticated, the system will show a dialog box with a list of the requested permissions. Select **Accept** to authorize the change.

    <div class="medium-img">

    ![Accept the permissions to continue](/images/email-security/bec/o365/step5-permissions.png)

    </div>

6. Upon authorization, you will be automatically redirected back to the Add Directory configuration panel. Select **Save** to complete the authorization process.

    ![Select Save to complete the authorization process](/images/email-security/bec/o365/step6-save.png)

7. Once saved, your newly configured directory will appear in the configured directories table.

    ![Your directory will appear in the configured directories table](/images/email-security/bec/o365/step7-directories.png)

## 2. Configure the Business Email Compromise list

{{<render file="_bec-directory-guide-compromise-list.md">}}

## 3. Configure secondary email address (if required)

{{<render file="_bec-directory-guide-secondary-email.md">}}