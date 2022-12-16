---
_build:
  publishResources: false
  render: never
  list: never
---

Now that Area 1 has been authorized to access and retrieve directory information, you will need to configure the Business Email Compromise list.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **Enhanced Detections** > **Business Email Compromise**.

    ![Access Business Email Compromise in Area 1 dashboard to star setting up this feature](/email-security/static/bec/o365/step2-business-email-compromise.png)

3. Use the drop-down menu and select the directory you have created in the previous step 3. For the purposes of this example, it is `Office 365`.

    ![Select the directory you have created in the previous step 3](/email-security/static/bec/o365/step3-office365.png)

4. If the initial directory synchronization has completed, the page will refresh and list groups and users. If you do not see any information, wait a few minutes as the system completes processing the initial synchronization.

    ![The screen should refresh and show a list of users and groups](/email-security/static/bec/o365/step4-business-list.png)

5. Select the arrow next to a group to expand it and show its members.

    ![Select the arrow to expand it and show a list of its members](/email-security/static/bec/o365/step5-show-members.png)

6. To protect an entire group, select the three-dots button next to it, and then **Protect**. When you protect a group, all of its members will be automatically protected. The protection markers will turn green to indicate that protection is active.

    ![You can protect an entire group of users. The protection markers will turn green to show that protection is active](/email-security/static/bec/o365/step6-protect-group.png)

7. You can also protect individual users. Select the three-dots button next to each user you want to protect, and then **Protect**.

    ![You can also protect just one user](/email-security/static/bec/o365/step7-protect-user.png)