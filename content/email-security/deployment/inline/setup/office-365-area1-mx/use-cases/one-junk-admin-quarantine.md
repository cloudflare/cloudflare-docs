---
title: 1 - Junk email and Area 1 Admin Quarantine
pcx_content_type: tutorial
weight: 1
meta:
    title: Use case one - Deliver emails to junk email folder and Admin Quarantine in Area 1
---

# Use case 1: Deliver emails to Office 365 junk email folder and Admin Quarantine in Area 1

In this tutorial, you will learn how to deliver emails to the Office 365 junk email folder and the Admin Quarantine in Area 1.

## Configure domains

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email configuration** > **Domains & Routing** > **Domains**.
4. Make sure each domain you are onboarding has been added.
5. For each domain you are configuring, select **...** > **Edit**, and set the following options:
    - **Domain** - `<YOUR_DOMAIN>`
    - **Configured as** - `MX Records`
    - **Forwarding to** - This should match the expected MX for each domain in your [Office 365 account](https://admin.microsoft.com/#/Domains/).
    - **IP Restrictions** - Leave this field empty.
    - **Outbound TLS** - `Forward all messages over TLS`.
    - **Quarantine Policy** - Check the `MALICIOUS`, `SPAM` and `SPOOF` dispositions.

## Create quarantine policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Add custom policy**.
6. Set the **Policy name** to `UserNotifyAdminRelease`.
7. Select **Next**.
8. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**, choose _Allow recipients to request a message to be released from quarantine_.
    - In **Select additional actions recipients can take on quarantined messages**, select the **Delete** and **Preview** checkboxes.

    ![Configure the Recipient message access as stated in the step above](/email-security/static/inline-setup/o365-area1-mx/use-cases/step8-request-message-release.png)

9. Select **Next**.
10. In **Quarantine notification**, select **Enable**.
11. Select **Next**.
12. Review your settings and select **Submit**.
13. Select **Done**.

{{<render file="_configure-quarantine-notifications.md">}}

## Configure anti-spam policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In the **Actions** section, scroll down and select **Edit actions**.

    <div class="large-img">

    ![Go to Actions and find Edit actions](/email-security/static/inline-setup/o365-area1-mx/use-cases/step6-edit-actions.png)

    </div>

7. Set the following conditions and actions (you might need to scroll up or down to find them):
    - **Spam**: _Move messages to Junk Email folder_
    - **High confidence spam**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **Phishing**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **High confidence phishing**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **Retain spam in quarantine for this many days**: Default is 15 days. Cloudflare Area 1 recommends 15-30 days.

    <div class="large-img">

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step7-spam.png)

    </div>

8. Select **Save**.

## Create transport rules

1. Open the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. Set the following rule conditions:
    - **Name**: `Area 1 Deliver to Junk Email folder`
    - **Apply this rule if**: _The message headers_ > _includes any of these words_
        - **Enter text**: `X-Area1Security-Disposition` > **Save**
        - **Enter words**: `SUSPICIOUS`, `BULK` > **Add** > **Save**
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_

    ![Set the rules in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step4-rules.png)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule **Area 1 Deliver to Junk Email folder** you have just created, and select **Enable**.


