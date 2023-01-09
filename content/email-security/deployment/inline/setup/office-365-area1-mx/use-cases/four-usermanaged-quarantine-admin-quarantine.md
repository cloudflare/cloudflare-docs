---
title: O365 User Managed quarantine and Administrative quarantine
pcx_content_type: tutorial
weight: 3
meta:
    title: Use Case 4 - Deliver Spam and Spoof messages to the User Managed quarantine, and Malicious messages to the Administrative quarantine (requires administrator release)
---

# Use case 4: Deliver emails to the User Managed quarantine and Administrative quarantine

In this tutorial you will learn to deliver `Spam` and `Spoof` messages to the User Managed quarantine, and `Malicious` messages to the Administrative Quarantine (requires administrator release).

## Configure Domains

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Navigate to **Email configuration** > **Domains & Routing** > **Domains**.
4. Make sure each domain you are onboarding has been added.
5. For each domain you are configuring select **...** > **Edit**, and set the following options:
    - **Domain** - `<YOUR_DOMAIN>`
    - **Configured as** - `MX Records`
    - **Forwarding to** - This should match the expected MX for each domain in your [O365 account](https://admin.microsoft.com/#/Domains/)
    - **IP Restrictions** - Leave this field empty
    - **Outbound TLS** - `Forward all messages over TLS`
    - **Quarantine Policy** - Do not check any dispositions

## Create Quarantine Policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Add custom policy**.
6. Set the **Policy name** to `UserNotifyUserRelease`.
7. Select **Next**.
8. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**: From the drop-down menu, choose _Allow recipients release a message from quarantine_.
    - In **Select additional actions recipients can take on quarantined messages**: Select the **Delete** and **Preview** checkboxes.

    ![Configure the Recipient message access as stated in step 8 above](/email-security/static/inline-setup/o365-area1-mx/use-cases/step8-allow-message-release.png)

9. Select **Next**.
10. In **Quarantine notification**, select **Enable**.
11. Select **Next**.
12. Review your settings and select **Submit**.
13. Select **Done**.
14. Select **Add custom policy**.
15. Set the **Policy name** to `UserNotifyAdminRelease`.
16. Select **Next**.
17. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**: From the drop-down menu, choose _Allow recipients to request a message to be released from quarantine_.
    - In **Select additional actions recipients can take on quarantined messages**: Select the **Delete** and **Preview** checkboxes.

    ![Configure the Recipient message access as stated in step 8 above](/email-security/static/inline-setup/o365-area1-mx/use-cases/step8-request-message-release.png)

18. Select **Next**.
19. In **Quarantine notification**, select **Enable**.
20. Select **Next**.
21. Review your settings and select **Submit**.
22. Select **Done**.