---
title: Google Workspaces directory integration
pcx_content_type: how-to
weight: 2
---

# Gmail directory integration

Cloudflare Area 1 can integrate with Google to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1. Create a service account in Google for Area 1 Directory Integration

You need to authorize Cloudflare Area 1 to make connections into your Google tenant to retrieve your directory details. Cloudflare recommends that you create a service account for this purpose. This account will require the following following privileges:

- View group subscriptions on your domain.
- View organization units on your domain.
- View groups on your domain.
- See info about users on your domain.

Start by creating a service account. If you already have one, you can skip this step.

1. Access your [Google admin console](https://admin.google.com/), and go to **Account** > **Admin roles**.

    ![Access the admin console in your Google account](/images/email-security/bec/gmail/step1-access-gadmin.png)

2. Select **Create new role**, and give it a descriptive name and description. When you are finished, select **Continue**.

3. In **Admin console privileges**, select the following privileges: 
    - _Organizational Units > Read_
    - _Users > Read_
    - _Directory Settings > Settings >Google Support Settings_
    - _Directory Sync > Manage Directory Sync Settings > Read Directory Sync Settings_

    ![Select only the privileges mentioned here](/images/email-security/bec/gmail/step3-console-privileges.png)

4. When you specify Admin console privileges, you also grant the corresponding Admin API privileges. In any case, make sure the following privileges are selected for **Admin API privileges**:
    - _Organizational Units > Read_
    - _Users > Read_
    - _Groups > Read_

    ![Select only the privileges mentioned here](/images/email-security/bec/gmail/step4-api-privileges.png)

5. Select **Continue**.

6. Review your information and select **Create Role**. 

## 2. Authorize Area 1 for Directory Access with Google

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Directories**, and select **Add Directory** to start the authorization process.

    ![Go to Directories in the dashboard of Area 1, and then select Add Directory to start the authorization process](/images/email-security/bec/gmail/step2-directories.png)

3. In the Add Directory configuration panel, enter the following details:
    - **Directory Type**: Open the drop-down menu and select **Google**.
    - **Directory Name**: Enter a string that represents the directory. This value will be referenced in the Business Email Compromise List configuration section. For example, `Gmail`.
    - **Sync Frequency**: Update the value to your preference.

    Select **Authorize** when you are done.

4. The Area 1 dashboard will redirect you to a Google login page. Select or enter the appropriate account to initiate the authentication process.

5. Once authenticated, the system will show a dialog box with a list of the required permissions. Check all the checkboxes, and select **Continue** to authorize the change.

    ![Select all the settings to authorize Google](/images/email-security/bec/gmail/step5-authorize-google.png)

6. Upon authorization, you will be automatically redirected back to the Add Directory configuration panel. Select **Save** to complete the authorization process.

    ![Select Save to complete the authorization process](/images/email-security/bec/gmail/step6-save.png)

7. Once saved, your newly configured directory will appear in the configured directories table.

    ![Your directory will appear in the configured directories table](/images/email-security/bec/gmail/step7-directories.png)

## 3. Configure the Business Email Compromise list

{{<render file="_bec-directory-guide-compromise-list.md">}}

## 4. Configure secondary email address (if required)

{{<render file="_bec-directory-guide-secondary-email.md">}}