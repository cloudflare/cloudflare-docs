---
title: Office 365 directory integration
pcx_content_type: how-to
weight: 1
---

# Office 365 directory integration

Cloudflare Area 1 can integrate with Office 365 to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1. Authorize Area 1 with Office 365 for Directory Access

You need to authorize Cloudflare Area 1 to make connections into your [Office 365 tenant](https://learn.microsoft.com/en-us/microsoft-365/solutions/tenant-management-overview), to retrieve your directory details. The account used to authorize will require the **Privileged authentication admin** and **Privileged role admin** roles.

### How does the authorization work?

The authorization process grants Area 1 access to the Azure environment with the least applicable privileges required to function. The Enterprise Application that Area 1 registers is not tied to any administrator account. Inside of the Azure Active Directory admin center you can review the permissions granted to the application in the Enterprise Application section.

When assigning user roles in the Office 365 console, you will find these roles in **User permissions** > **Roles configuration** > **Identity admin roles**.

![A list of permissions for Area 1](/email-security/static/bec/permissions.png)

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Directories**, and select **Add Directory** to start the authorization process.

    ![Go to Directories in the dashboard of Area 1, and then select Add Directory to start the authorization process](/email-security/static/bec/step2-directories.png)

3. In the Add Directory configuration panel, enter fhe following details:
    - **Directory Type**: Use the drop-down menu and select **Office 365**.
    - **Directory Name**: Enter a string that represents the directory. This value will be referenced in the Business Email Compromise List configuration section. For example, `Office 365`.
    - **Sync Frequency**: Update the value to your preference.

    Select **Authorize** when you are done.

    ![Add the appropriate details to the configuration panel](/email-security/static/bec/step3-directory-config-panel.png)


4. The Area 1 dashboard will redirect you to a Microsoft login page. Select or enter the appropriate account to initiate the authentication process.

    <div class="large-img">

    ![Select the appropriate Microsoft account to continue](/email-security/static/bec/step4-login.png)

    </div>

5. Once authenticated, the system will show a dialog box with a list of the requested permissions. Select **Accept** to authorize the change.

    <div class="medium-img">

    ![Accept the permissions to continue](/email-security/static/bec/step5-permissions.png)

    </div>

6. Upon authorization, you will be automatically redirected back to the Add Directory configuration panel. Select **Save** to complete the authorization process.

    ![Select Save to complete the authorization process](/email-security/static/bec/step6-save.png)

7. Once saved, your newly configured directory will appear in the configured directories table.

    ![Your directory will appear in the configured directories table](/email-security/static/bec/step7-directories.png)

## 2. Configure the Business Email Compromise list

Now that Area 1 has been authorized to access and retrieve directory information, you will need to configure the Business Email Compromise list.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **Enhanced Detections** > **Business Email Compromise**.

    ![Access Business Email Compromise in Area 1 dashboard to star setting up this feature](/email-security/static/bec/step2-business-email-compromise.png)

3. Use the drop-down menu and select the directory you have created in the previous step 3. For the purposes of this example, it is `Office 365`.

    ![Select the directory you have created in the previous step 3](/email-security/static/bec/step3-office365.png)

4. If the initial directory synchronization has completed, the page will refresh and list groups and users. If you do not see any information, wait a few minutes as the system completes processing the initial synchronization.

    ![The screen should refresh and show a list of users and groups](/email-security/static/bec/step4-business-list.png)

5. Select the arrow next to a group to expand it and show its members.

    ![Select the arrow to expand it and show a list of its members](/email-security/static/bec/step5-show-members.png)

6. To protect an entire group, select the three-dots button next to it, and then **Protect**. When you protect a group, all of its members will be automatically protected. The protection markers will turn green to indicate that protection is active.

    ![You can protect an entire group of users. The protection markers will turn green to show that protection is active](/email-security/static/bec/step6-protect-group.png)

7. You can also protect individual users. Select the three-dots button next to each user you want to protect, and then **Protect**.

    ![You can also protect just one user](/email-security/static/bec/step7-protect-user.png)

## 3. Configure secondary email address (if required)

When the Business Email Compromise list is configured, Cloudflare Area 1 will enforce the proper match of the sender’s display name and email address. Any variation from this strict requirement will raise a detection event. The reason of detection will be `Protected Name <NAME> should not appear as <non-configured email address>`. 

In some instances, you may want to allow your protected users to send emails from an alternate email address (like their personal email address). To configure this alternate address, you will have to add it to their directory entry.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **Enhanced Detections** > **Business Email Compromise**.

3. Search for the user you want to allow an alternate email address.

4. Select the three-dots button > **Edit**.

    ![Select edit to add alternate email addresses to your user](/email-security/static/bec/step4-edit-user.png)

5. In **Secondary Emails** add the additional email addresses. Place each entry on a new line. Select **Save** to finish.

    ![Add each new email address to the Secondary Emails field. Place each address on a separate line](/email-security/static/bec/step5-new-email.png)
