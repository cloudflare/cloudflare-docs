---
title: PhishNet - Office 365
meta:
    title: PhishNet - Office 365 (Beta)
pcx_content_type: how-to
weight: 1
---

{{<beta>}}PhishNet - Office 365{{</beta>}}

PhishNET is an add-in button that helps users to submit directly to Area 1 phish samples missed by Area 1's detection. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Area 1.

## Prerequisites

To set up PhishNet with Office 365, you will need:

- An Area 1 account with admin access.
- Admin access to Microsoft.com

{{<Aside type="note">}} Only admin users can deploy PhishNet for all users in Office 365. Non-admin users can deploy PhishNet for themselves, but no other users will have access to it.{{</Aside>}}

## Set up PhishNet for Office 365

1. Log in to [admin.microsoft.com](admin.microsoft.com) with your admin account.

2. Select the three-line button to open the menu.

3. Go to **Settings** > **Integrated Apps**.

4. Select **Upload custom apps**.

5. On a new browser tab, [log in to Area 1](https://horizon.area1security.com) with an admin account.

6. Select the **Settings** (gear icon).

7. Go to **Email Configuration** > **Phish Submissions** > **PhishNet O365**.

8. Select **Copy** to copy the URL. This URL will let you install PhishNet in Office 365.

9. Go back to the Microsoft admin browser tab.

10. From **Upload Apps to deploy**, select **Provide link to manifest file**, and paste the URL you copied from your Area 1 dashboard.

11. Select **Validate**. Wait for a success message to appear below the input. Then, select **Next**.

12. Under **Assign users**, select **Entire Organization**, and then select **Next**.

13. In **App Permissions and Capabilities**, make sure PhishNet has the correct permissions: `Outlook: ReadWriteMailbox, SendReceiveData`. Then, select **Next**.

14. In the next screen, make sure that in **Assigned Users** you have **Entire organization**. Then, select **Finish Deployment**.

15. Once deployment is complete, you should see a message confirming it. Note that it can take up to six hours for PhishNet to appear in Outlook (or six hours to update if previously installed.) Select **Done**.

You have now installed PhishNet for Office 365. After the process is complete, PhishNet will show up on the Integrated Apps screen.

## Submit phish with PhishNet

1. Open the message you would like to flag as either spam or phish.

2. Select the PhishNet logo in the task pane, near the other action buttons - such as reply and forward.

{{<Aside type="note">}}If you cannot find the PhishNet icon, select the **More actions** menu (the three dots menu).{{</Aside>}}

3. Under **Select Submission Type**, select the type of your submission - Spam or Phish.

4. Select **Submit Report**.

Once the email has been successfully submitted to Cloudflare Area 1 for review, PhishNet will show you a **Submission Complete** message.