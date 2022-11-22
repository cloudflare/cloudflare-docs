---
title: PhishNet - Office 365
pcx_content_type: how-to
weight: 1
---

# PhishNet - Office 365

PhishNET is an add-in button that helps users in organizations to submit phish samples that were missed by Area 1 detection directly to Area 1. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Area 1.

## Prerequisites

To set up PhishNet with Office 365, you will need the following:

— Area 1 account with admin access.
- Admin access to Microsoft.com

Only admin users can deploy PhishNet on the entire Office 365 account. Non-admin users can deploy PhishNet for themselves, but no other users will have access to it.

## Set up PhishNet for Office 365

1. Log in to [admin.microsoft.com](admin.microsoft.com) with your admin account.
2. Select the three-line button to open the menu.
3. Go to **Settings** > **Integrated Apps**.

    ![Select the three-line button to open the menu and go to settings and then integrated apps](/email-security/static/phish-submissions/phishnet-o365/step3-settings-apps.png)

4. Select **Upload custom apps**.

    ![Select upload custom apps](/email-security/static/phish-submissions/phishnet-o365/step4-custom-apps.png)

5. On a new browser tab, [log in to Area 1](https://horizon.area1security.com) with an admin account.

6. Select the **Settings** (gear icon).

7. Go to **Email Configuration** > **Phish Submissions** > **PhisNet O365**.

    ![Select the copy button to copy the URL to install PhishNet](/email-security/static/phish-submissions/phishnet-o365/step7-phish-submissions.png)

8. Select **Copy** to copy the URL to install PhishNet to Office 365.

9. Go back to the Microsoft Admin tab.

10. Select **Provide link to manifest file**, and paste the URL you copied from your Area 1 dashboard.

    ![Paste the URL you copied from Area 1 to the option called Provide link to manifest file](/email-security/static/phish-submissions/phishnet-o365/step10-link-manifest.png)

11. Select **Validate** and wait for a success message to appear below the input. Then, select **Next**.

12. Under **Assign users**, select **Entire Organization**. Select **Next**.

    ![Select Entire organization, under Assing users](/email-security/static/phish-submissions/phishnet-o365/step12-entire-org.png)

13. In **App Permissions and Capabilities**, make sure PhishNet has the correct permissions: `Outlook: ReadWriteMailbox, SendReceiveData`. Then, select **Next**.

    ![Make sure PhishNet has the correct permissions before continuing the setup.](/email-security/static/phish-submissions/phishnet-o365/step13-app-permissions.png)

14. In the next screen, make sure that in **Assigned Users** you have **Entire organization**. Then, select **Finish Deployment**.

    ![Make sure PhishNet is going to be deployed for the entire organization.](/email-security/static/phish-submissions/phishnet-o365/step14-entire-org.png)

15. Once deployment is complete, you should see a message confirming it. Note that it can take up to six hours for PhishNet to appear in Outlook (or six hours to update if previously installed.) Select **Done**.

    ![Outlook will show a message confirming that deployment is complete.](/email-security/static/phish-submissions/phishnet-o365/step15-deployed.png)

You have now installed PhishNet for Office 365. After the process is complete, PhishNet will show up on the Integrated Apps screen.

## Submit phish with PhishNet