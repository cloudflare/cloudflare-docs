---
title: Deliver to Junk Email folder and Admin Quarantine in Area 1
pcx_content_type: tutorial
weight: 1
meta:
    title: Use case one - Deliver to Junk Email folder and Admin Quarantine in Area 1
---

# Deliver to Junk Email folder and Admin Quarantine in Area 1

In this tutorial you will learn how to deliver emails to the Junk Email folder and Amin Quarantine in Area 1.

## Configure domains

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to Settings (the gear icon).
3. Navigate to **Email configuration** > **Domains & Routing** > **Domains**.
4. Make sure each domain you are onboarding has been added.
5. For each domain you are configuring select **...** > **Edit**, and set the following options:
    - **Domain** - `<YOUR_DOMAIN>`
    - **Configured as** - `MX Records`
    - **Forwarding to** - This should match the expected MX for each domain in your [O365 account](https://admin.microsoft.com/#/Domains/)
    - **IP Restrictions** - Leave this field empty
    - **Outbound TLS** - `Forward all messages over TLS`
    - **Quarantine Policy** - You should check the `MALICIOUS`, `SPAM` and `SPOOF` dispositions

## Create quarantine policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Add custom policy**.
6. Set the **Policy name** to `UserNotifyAdminRelease`.
7. Select **Next**.
8. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**: From the drop-down menu, choose **Allow recipients to request a message to be released from quarantine**.
    - In **Select additional actions recipients can take on quarantined messages**: Select the **Delete** and **Preview** checkboxes

    ![Configure the Recipient message access as stated in step 8 above](/email-security/static/inline-setup/o365-area1-mx/use-cases/step8-recipient-message-access.png)

9. Select **Next**.
10. Select the **Enable** checkbox > **Next**.
11. Review your settings and select **Submit**.
12. Select **Done**.

## Configure quarantine notifications

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Global settings**.
6. Scroll to the bottom and set the desired frequency in **Send end-user spam notifications every (days)**. This value can only be incremented in days.

     <div class="medium-img">

    ![Configure the desired spam notification frequency](/email-security/static/inline-setup/o365-area1-mx/use-cases/step6-spam-notifications.png)

    </div>

7. Select **Save**.

## Configure anti-spam policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In the **Actions** section, scroll down and select **Edit actions**.

    <div class="medium-img">

    ![Go to Actions and find Edit actions](/email-security/static/inline-setup/o365-area1-mx/use-cases/step6-edit-actions.png)

    </div>

7. Set the following conditions and actions (you might need to scroll up or down to see them):
    - **Spam**: _Move messages to Junk Email folder_
    - **High confidence spam**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **Phishing**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **High confidence phishing**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **Retain spam in quarantine for this many days**: Default is 15 days. Cloudflare Area 1 recommends 15-30 days.

    <div class="medium-img">

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step7-spam.png)

    </div>

8. Select **Save**.

## Create transport rules