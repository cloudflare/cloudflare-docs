---
title: PhishNet for Office 365
pcx_content_type: how-to
weight: 1
---

# PhishNet for Office 365

PhishNet is an add-in button that helps users to submit directly to Area 1 phish samples missed by Area 1's detection. PhishNet avoids the previous process, where users had to report phish to their email admins, which then had to manually download and forward the sample to Area 1.

## Prerequisites

To set up PhishNet with Office 365, you will need:

- An Area 1 account with admin access.
- Admin access to Microsoft.com.

{{<Aside type="note">}}
Only admin users can deploy PhishNet for all users in Office 365. Non-admin users can deploy PhishNet for themselves, but no other users will have access to it.
{{</Aside>}}

## Set up PhishNet for Office 365

1. Log in to [admin.microsoft.com](https://admin.microsoft.com/) with your admin account.

2. Select the three-line button to open the menu.

3. Go to **Settings** > **Integrated Apps**.

    ![Select Integrated apps from the menu](/email-security/static/phish-submissions/phishnet-o365/step3-apps.png)

4. Select **Upload custom apps**.

    ![Select upload custom apps](/email-security/static/phish-submissions/phishnet-o365/step4-custom-apps.png)

5. On a new browser tab, [log in to Area 1](https://horizon.area1security.com) with an admin account.

6. Select **Settings** (gear icon).

    ![Select settings (the gear icon)](/email-security/static/phish-submissions/phishnet-o365/step6-settings.png)

7. Go to **Email Configuration** > **Phish Submissions** > **PhishNet O365**.

    ![The PhishNet settings will let you copy the appropriate URL to install it on Office 365](/email-security/static/phish-submissions/phishnet-o365/step7-phishnet.png)

8. Select **Copy** to copy the URL. This URL will let you install PhishNet in Office 365.

9. Go back to the Microsoft admin browser tab.

10. From **Upload Apps to deploy**, select **Provide link to manifest file**, and paste the URL you copied from your Area 1 dashboard.

    ![Paste the URL you have copied from Area 1.](/email-security/static/phish-submissions/phishnet-o365/step10-upload-apps.png)

11. Select **Validate**. Wait for a success message to appear below the input. Then, select **Next**.

12. Under **Assign users**, select **Entire Organization**, and then select **Next**.

    ![Paste the URL you have copied from Area 1.](/email-security/static/phish-submissions/phishnet-o365/step12.png)

13. In **App Permissions and Capabilities**, make sure PhishNet has the correct permissions: `Outlook: ReadWriteMailbox, SendReceiveData`. Then, select **Next**.

    ![Make sure PhishNet has the correct permissions.](/email-security/static/phish-submissions/phishnet-o365/step13.png)

14. In the next screen, make sure that in **Assigned Users** you have **Entire organization**. Then, select **Finish Deployment**.

15. Once deployment is complete, you should see a message confirming it. Note that it can take up to six hours for PhishNet to appear in Office 365 (or six hours to update if previously installed.) Select **Done**.

    ![PhishNet might take up to six hours to appear in Office 365.](/email-security/static/phish-submissions/phishnet-o365/step15.png)

You have now installed PhishNet for Office 365. After the process is complete, PhishNet will show up on the Integrated Apps screen.

![Search for PhishNet in the Integrated Apps screen.](/email-security/static/phish-submissions/phishnet-o365/phishnet-installed-apps.png)

## Submit phish with PhishNet

1. Open the message you would like to flag as either spam or phish.

2. Select the PhishNet logo in the task pane, near the other action buttons - such as reply and forward.

{{<Aside type="note">}}
If you cannot find the PhishNet icon, select the **More actions** menu (the three dots menu).
{{</Aside>}}

3. Under **Select Submission Type**, select the type of your submission - Spam or Phish.

    ![Choose the type of submission you would like to make](/email-security/static/phish-submissions/phishnet-o365/step3-submit-phish.png)

4. Select **Submit Report**.

Once the email has been successfully submitted to Cloudflare Area 1 for review, PhishNet will show you a **Submission Complete** message.